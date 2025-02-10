import { type Message } from "./chat"
import { type Json } from "../integrations/supabase/types"

export interface OmniGuardResponse {
  response: {
    analysisSummary: string
    action: "Allow" | "UserInputRejection" | "AssistantOutputRejection"
    details?: {
      reason?: string
      severity?: string
      category?: string
    }
  }
  choices: [{
    message: {
      content: string
    }
  }]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface TokenUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface RequestTimings {
  start: number
  prep: number
  api: number
  process: number
  total: number
}

export interface CostBreakdown {
  inputCost: number
  outputCost: number
  totalCost: number
}

export interface OmniGuardResult {
  success: boolean
  action: OmniGuardResponse["response"]["action"]
  usage: TokenUsage
  timings: RequestTimings
  cost: CostBreakdown
  details?: OmniGuardResponse["response"]["details"]
}

export interface AssistantResponse {
  content: string
  usage: TokenUsage
  timings: RequestTimings
  cost: CostBreakdown
}

export interface ConversationTurn {
  messages: Message[]
  user_violates_rules: boolean
  assistant_violates_rules: boolean
  usage: TokenUsage
  timings: RequestTimings
  cost: CostBreakdown
  omniguard_response?: OmniGuardResponse
  assistant_response?: string
}