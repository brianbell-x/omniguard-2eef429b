import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from './types'

export interface ConversationData {
  conversation_id: string
  omniguard_evaluation_input: string
  omniguard_raw_response: string
  assistant_output: string
  user_violates_rules: boolean
  assistant_violates_rules: boolean
  model_name: string
  reasoning_effort: number
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
  input_cost: number
  output_cost: number
  total_cost: number
  latency_ms: number
  usage_data: Record<string, any>
  request_timings: Record<string, any>
  needed_human_verification?: boolean
  human_verification?: boolean
  created_at?: string
  updated_at?: string
}

export async function upsertConversation(
  supabase: SupabaseClient<Database>,
  data: ConversationData
): Promise<{ error: Error | null; data: ConversationData | null }> {
  try {
    // First try to update if record exists
    const { data: existingData, error: selectError } = await supabase
      .from('conversations')
      .select()
      .eq('conversation_id', data.conversation_id)
      .single()

    if (selectError && selectError.message !== 'No rows found') {
      throw selectError
    }

    const timestamp = new Date().toISOString()
    const conversationData = {
      ...data,
      updated_at: timestamp,
      // Only set created_at if this is a new record
      ...(existingData ? {} : { created_at: timestamp })
    }

    const { data: upsertedData, error: upsertError } = await supabase
      .from('conversations')
      .upsert([conversationData], {
        onConflict: 'conversation_id'
      })

    if (upsertError) {
      throw upsertError
    }

    // If no error occurred but we didn't get data back, return the input data
    // This can happen when the database doesn't return the inserted/updated row
    return {
      error: null,
      data: (upsertedData?.[0] as ConversationData) || data
    }
  } catch (error) {
    console.error('Error upserting conversation:', error)
    return {
      error: error as Error,
      data: null
    }
  }
}