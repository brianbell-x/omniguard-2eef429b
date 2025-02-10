import { type Message, type ChatConfig } from "../types/chat"
import { 
  type OmniGuardResponse, 
  type OmniGuardResult,
  type AssistantResponse,
  type TokenUsage,
  type RequestTimings,
  type ConversationTurn
} from "../types/omniguard"
import { supabase } from "../integrations/supabase/client"
import { type Json, type Database } from "../integrations/supabase/types"
import { upsertConversation, type ConversationData } from "../integrations/supabase/conversations"
import { type CostBreakdown } from "../types/omniguard"

/**
 * Model cost configuration types
 */
interface ModelCost {
  input: number
  output: number
  cached_input?: number
}

type ModelFamily = {
  [version: string]: ModelCost
}

/**
 * Model pricing per 1K tokens (in cents)
 */
const MODEL_FAMILIES = {
  // Standard GPT-4o models
  GPT4O: {
    "gpt-4o-2024-08-06":  { input: 2.50, cached_input: 1.25, output: 10.00 },
    "gpt-4o-2024-11-20":  { input: 2.50, cached_input: 1.25, output: 10.00 },
    "gpt-4o-2024-05-13":  { input: 5.00, output: 15.00 }
  },

  // Mini models and their variants
  GPT4O_MINI: {
    "gpt-4o-mini-2024-07-18":                    { input: 0.15, cached_input: 0.075, output: 0.60 },
    "gpt-4o-mini-audio-preview-2024-12-17":      { input: 0.15, output: 0.60 },
    "gpt-4o-mini-realtime-preview-2024-12-17":   { input: 0.60, cached_input: 0.30, output: 2.40 }
  },

  // O1 models and variants
  O1: {
    "o1-2024-12-17":           { input: 15.00, cached_input: 7.50, output: 60.00 },
    "o1-preview-2024-09-12":   { input: 15.00, cached_input: 7.50, output: 60.00 },
    "o1-mini-2024-09-12":      { input: 1.10,  cached_input: 0.55, output: 4.40 }
  },

  // O3 models
  O3: {
    "o3-mini-2025-01-31":      { input: 1.10,  cached_input: 0.55, output: 4.40 }
  }
} as const

// Flatten model families into a single lookup object
const MODEL_COSTS = Object.values(MODEL_FAMILIES).reduce((acc, family) => ({
  ...acc,
  ...family
}), {}) as Record<string, ModelCost>

/**
 * Calculate costs for model usage
 * @param modelName - Name of the model being used
 * @param promptTokens - Number of tokens in the prompt
 * @param completionTokens - Number of tokens in the completion
 * @param isCached - Whether the input is cached (affects pricing for supported models)
 * @returns Breakdown of input, output, and total costs in cents
 * @throws Error if model is not found in pricing table
 */
const calculateCosts = (
  modelName: string,
  promptTokens: number,
  completionTokens: number,
  isCached: boolean = false
): CostBreakdown => {
  const model = MODEL_COSTS[modelName]
  if (!model) {
    throw new Error(`Unknown model: ${modelName}`)
  }

  // Calculate input cost, using cached rate if available and applicable
  const inputRate = isCached && model.cached_input ? model.cached_input : model.input
  const inputCost = (promptTokens * inputRate) / 1000

  // Calculate output cost (not affected by caching)
  const outputCost = (completionTokens * model.output) / 1000

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost
  }
}

const createTimings = (): RequestTimings => ({
  start: performance.now(),
  prep: 0,
  api: 0,
  process: 0,
  total: 0
})

const updateTiming = (timings: RequestTimings, key: keyof RequestTimings) => {
  timings[key] = performance.now() - timings.start
}

// Convert our types to JSON-compatible types for Supabase
const toJson = <T>(data: T): Json => {
  return JSON.parse(JSON.stringify(data)) as Json
}

export class OmniGuardService {
  private config: ChatConfig

  constructor(config: ChatConfig) {
    this.config = config
  }

  private async callOpenRouter(messages: Message[], model: string): Promise<OmniGuardResponse> {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "HTTP-Referer": this.config.site_url,
        "X-Title": this.config.site_name,
        // Add your API key header here
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`)
    }

    return response.json()
  }

  private assembleConversation(messages: Message[], draftResponse?: string): Message[] {
    const conversation: Message[] = [
      {
        role: "developer" as const,
        content: this.config.developer_prompt,
        timestamp: Date.now()
      },
      ...messages
    ]

    if (draftResponse) {
      conversation.push({
        role: "assistant" as const,
        content: draftResponse,
        timestamp: Date.now()
      })
    }

    return conversation
  }

  async omniguardCheck(
    messages: Message[],
    draftResponse?: string
  ): Promise<OmniGuardResult> {
    const timings = createTimings()
    let usage: TokenUsage = { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }

    try {
      const conversation = this.assembleConversation(messages, draftResponse)
      updateTiming(timings, "prep")

      const apiStartTime = performance.now()
      const response = await this.callOpenRouter(
        conversation,
        this.config.selected_model
      )
      timings.api = performance.now() - apiStartTime
      usage = response.usage

      const cost = calculateCosts(
        this.config.selected_model,
        usage.prompt_tokens,
        usage.completion_tokens,
        false // Not cached for OmniGuard checks
      )

      const result: OmniGuardResult = {
        success: true,
        action: response.response.action,
        usage,
        timings,
        cost,
        details: response.response.details
      }

      updateTiming(timings, "process")
      updateTiming(timings, "total")

      // Save to database
      await this.saveConversation({
        messages: conversation,
        user_violates_rules: result.action === "UserInputRejection",
        assistant_violates_rules: result.action === "AssistantOutputRejection",
        usage,
        timings,
        cost: result.cost,
        omniguard_response: response
      })

      return result
    } catch (error) {
      updateTiming(timings, "total")
      throw error
    }
  }

  async processOmniGuardResult(
    result: OmniGuardResult,
    messages: Message[]
  ): Promise<AssistantResponse | null> {
    if (result.action === "UserInputRejection") {
      return null
    }

    if (result.action === "Allow") {
      return this.fetchAssistantResponse(messages)
    }

    return null
  }

  async fetchAssistantResponse(messages: Message[]): Promise<AssistantResponse> {
    const timings = createTimings()

    try {
      const conversation: Message[] = [
        {
          role: "system" as const,
          content: this.config.system_prompt,
          timestamp: Date.now()
        },
        ...messages
      ]
      updateTiming(timings, "prep")

      const apiStartTime = performance.now()
      const response = await this.callOpenRouter(
        conversation,
        this.config.selected_model
      )
      timings.api = performance.now() - apiStartTime

      const cost = calculateCosts(
        this.config.selected_model,
        response.usage.prompt_tokens,
        response.usage.completion_tokens,
        false // Not cached for assistant responses
      )

      const assistantResponse: AssistantResponse = {
        content: response.choices[0].message.content,
        usage: response.usage,
        timings,
        cost
      }

      updateTiming(timings, "process")
      updateTiming(timings, "total")

      // Save to database
      await this.saveConversation({
        messages: conversation,
        user_violates_rules: false,
        assistant_violates_rules: false,
        usage: response.usage,
        timings,
        cost: assistantResponse.cost,
        assistant_response: assistantResponse.content
      })

      return assistantResponse
    } catch (error) {
      updateTiming(timings, "total")
      throw error
    }
  }

  private async saveConversation(turn: ConversationTurn): Promise<void> {
    // Generate a unique conversation ID using timestamp and random string
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const conversationId = `${timestamp}-${randomStr}`

    const conversationData: ConversationData = {
      conversation_id: conversationId,
      omniguard_evaluation_input: JSON.stringify(turn.messages),
      omniguard_raw_response: JSON.stringify(turn.omniguard_response || {}),
      assistant_output: turn.assistant_response || '',
      user_violates_rules: turn.user_violates_rules,
      assistant_violates_rules: turn.assistant_violates_rules,
      model_name: this.config.selected_model,
      reasoning_effort: 1.0, // Default to 1.0 for now
      prompt_tokens: turn.usage.prompt_tokens,
      completion_tokens: turn.usage.completion_tokens,
      total_tokens: turn.usage.total_tokens,
      input_cost: turn.cost.inputCost,
      output_cost: turn.cost.outputCost,
      total_cost: turn.cost.totalCost,
      latency_ms: Math.round(turn.timings.total),
      usage_data: toJson(turn.usage) as Record<string, any>,
      request_timings: toJson(turn.timings) as Record<string, any>
    }

    const { error } = await upsertConversation(supabase, conversationData)

    if (error) {
      console.error("Error saving conversation:", error)
      throw error
    }
  }
}