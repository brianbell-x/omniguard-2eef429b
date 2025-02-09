
export interface Donation {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  message?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}
