import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { UserConfiguration } from "@/types/auth";

type ConfigurationState = Omit<UserConfiguration, 'id' | 'created_at' | 'updated_at'>;

const defaultConfig: ConfigurationState = {
  omni_model: "o3-mini-2025-01-31",
  omni_reasoning_effort: "medium",
  omni_custom_config: "",
  assistant_model: "gpt-4o-mini",
  assistant_reasoning_effort: "medium",
  assistant_temperature: 0.7,
  assistant_system_prompt: "",
  data_sharing_enabled: true,
  openrouter_api_key: "",
};

export const useUserConfiguration = () => {
  const { user } = useAuth();
  const [config, setConfig] = useState<ConfigurationState>(defaultConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfiguration = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_configurations')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setConfig({
            omni_model: data.omni_model || defaultConfig.omni_model,
            omni_reasoning_effort: data.omni_reasoning_effort || defaultConfig.omni_reasoning_effort,
            omni_custom_config: data.omni_custom_config || defaultConfig.omni_custom_config,
            assistant_model: data.assistant_model || defaultConfig.assistant_model,
            assistant_reasoning_effort: data.assistant_reasoning_effort || defaultConfig.assistant_reasoning_effort,
            assistant_temperature: data.assistant_temperature ?? defaultConfig.assistant_temperature,
            assistant_system_prompt: data.assistant_system_prompt || defaultConfig.assistant_system_prompt,
            data_sharing_enabled: data.data_sharing_enabled ?? defaultConfig.data_sharing_enabled,
            openrouter_api_key: data.openrouter_api_key || defaultConfig.openrouter_api_key,
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load configuration');
      } finally {
        setIsLoading(false);
      }
    };

    loadConfiguration();
  }, [user]);

  return {
    config,
    isLoading,
    error,
  };
};