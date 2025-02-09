
export interface UserProfile {
  id: string;
  username: string;
  discord: string | null;
  linkedin: string | null;
  x: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserConfiguration {
  id: string;
  omni_model: string;
  omni_reasoning_effort: string;
  omni_custom_config: string | null;
  assistant_model: string;
  assistant_reasoning_effort: string;
  assistant_temperature: number;
  assistant_system_prompt: string | null;
  data_sharing_enabled: boolean;
  openrouter_api_key: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}
