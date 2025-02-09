export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contributor_stats: {
        Row: {
          assistant_rejections: number | null
          created_at: string
          id: string
          success_rate: number | null
          total_contributions: number | null
          updated_at: string
          user_id: string | null
          verified_harmful_prompts: number | null
        }
        Insert: {
          assistant_rejections?: number | null
          created_at?: string
          id?: string
          success_rate?: number | null
          total_contributions?: number | null
          updated_at?: string
          user_id?: string | null
          verified_harmful_prompts?: number | null
        }
        Update: {
          assistant_rejections?: number | null
          created_at?: string
          id?: string
          success_rate?: number | null
          total_contributions?: number | null
          updated_at?: string
          user_id?: string | null
          verified_harmful_prompts?: number | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          is_anonymous: boolean | null
          message: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donor_stats: {
        Row: {
          created_at: string
          id: string
          is_anonymous: boolean | null
          last_donation_date: string | null
          total_donated: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          last_donation_date?: string | null
          total_donated?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_anonymous?: boolean | null
          last_donation_date?: string | null
          total_donated?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          discord: string | null
          id: string
          linkedin: string | null
          updated_at: string
          username: string
          x: string | null
        }
        Insert: {
          created_at?: string
          discord?: string | null
          id: string
          linkedin?: string | null
          updated_at?: string
          username: string
          x?: string | null
        }
        Update: {
          created_at?: string
          discord?: string | null
          id?: string
          linkedin?: string | null
          updated_at?: string
          username?: string
          x?: string | null
        }
        Relationships: []
      }
      reported_conversations: {
        Row: {
          assistant_violation_votes: number | null
          created_at: string
          decision_details: Json | null
          decision_made_at: string | null
          final_decision: string | null
          id: string
          message_content: string
          reason: string
          reported_at: string
          safe_votes: number | null
          status: string | null
          total_votes: number | null
          updated_at: string
          user_id: string | null
          user_violation_votes: number | null
        }
        Insert: {
          assistant_violation_votes?: number | null
          created_at?: string
          decision_details?: Json | null
          decision_made_at?: string | null
          final_decision?: string | null
          id?: string
          message_content: string
          reason: string
          reported_at?: string
          safe_votes?: number | null
          status?: string | null
          total_votes?: number | null
          updated_at?: string
          user_id?: string | null
          user_violation_votes?: number | null
        }
        Update: {
          assistant_violation_votes?: number | null
          created_at?: string
          decision_details?: Json | null
          decision_made_at?: string | null
          final_decision?: string | null
          id?: string
          message_content?: string
          reason?: string
          reported_at?: string
          safe_votes?: number | null
          status?: string | null
          total_votes?: number | null
          updated_at?: string
          user_id?: string | null
          user_violation_votes?: number | null
        }
        Relationships: []
      }
      user_configurations: {
        Row: {
          assistant_model: string | null
          assistant_reasoning_effort: string | null
          assistant_system_prompt: string | null
          assistant_temperature: number | null
          created_at: string | null
          data_sharing_enabled: boolean | null
          id: string
          omni_custom_config: string | null
          omni_model: string | null
          omni_reasoning_effort: string | null
          openrouter_api_key: string | null
          updated_at: string | null
        }
        Insert: {
          assistant_model?: string | null
          assistant_reasoning_effort?: string | null
          assistant_system_prompt?: string | null
          assistant_temperature?: number | null
          created_at?: string | null
          data_sharing_enabled?: boolean | null
          id: string
          omni_custom_config?: string | null
          omni_model?: string | null
          omni_reasoning_effort?: string | null
          openrouter_api_key?: string | null
          updated_at?: string | null
        }
        Update: {
          assistant_model?: string | null
          assistant_reasoning_effort?: string | null
          assistant_system_prompt?: string | null
          assistant_temperature?: number | null
          created_at?: string | null
          data_sharing_enabled?: boolean | null
          id?: string
          omni_custom_config?: string | null
          omni_model?: string | null
          omni_reasoning_effort?: string | null
          openrouter_api_key?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      verification_votes: {
        Row: {
          comment: string | null
          conversation_id: string | null
          created_at: string
          id: string
          vote_type: string
          voter_id: string | null
        }
        Insert: {
          comment?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          vote_type: string
          voter_id?: string | null
        }
        Update: {
          comment?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          vote_type?: string
          voter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_votes_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "reported_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
