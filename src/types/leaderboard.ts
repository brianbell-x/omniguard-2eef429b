
export interface ContributorStats {
  id: string;
  user_id: string;
  verified_harmful_prompts: number;
  assistant_rejections: number;
  total_contributions: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

export interface DonorStats {
  id: string;
  user_id: string;
  total_donated: number;
  is_anonymous: boolean;
  last_donation_date: string | null;
  created_at: string;
  updated_at: string;
}
