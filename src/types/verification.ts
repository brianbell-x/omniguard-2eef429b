
export interface ReportedConversation {
  id: string;
  reported_at: string;
  user_id: string;
  message_content: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'archived';
  total_votes: number;
  user_violation_votes: number;
  assistant_violation_votes: number;
  safe_votes: number;
  final_decision?: string;
  decision_details?: any;
  decision_made_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VerificationVote {
  id: string;
  conversation_id: string;
  voter_id: string;
  vote_type: 'user_violation' | 'assistant_violation' | 'safe';
  comment?: string;
  created_at: string;
}
