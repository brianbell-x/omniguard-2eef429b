import { type OmniGuardResult, type AssistantResponse } from "./omniguard"

export interface Message {
  content: string
  isUser: boolean
  isEditing?: boolean
  edited?: boolean
  timestamp: number
  omniguardResult?: OmniGuardResult
  assistantResponse?: AssistantResponse
}

export interface ChatConfig {
  site_url: string
  site_name: string
  selected_model: string
  system_prompt: string
  developer_prompt: string
  data_sharing_enabled: boolean
}