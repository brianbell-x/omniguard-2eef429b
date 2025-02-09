import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Shield, User2, Share2, ChevronDown } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserConfiguration } from "@/types/auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ConfigurationForm = Omit<UserConfiguration, 'id' | 'created_at' | 'updated_at'>;

const Configuration = () => {
  const { user } = useAuth();
  const form = useForm<ConfigurationForm>({
    defaultValues: {
      data_sharing_enabled: true,
    },
  });

  useEffect(() => {
    const loadConfiguration = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_configurations')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error("Failed to load configuration");
        return;
      }

      if (data) {
        form.reset({
          omni_model: data.omni_model,
          omni_reasoning_effort: data.omni_reasoning_effort,
          omni_custom_config: data.omni_custom_config || "",
          assistant_model: data.assistant_model,
          assistant_reasoning_effort: data.assistant_reasoning_effort,
          assistant_temperature: data.assistant_temperature,
          assistant_system_prompt: data.assistant_system_prompt || "",
          data_sharing_enabled: data.data_sharing_enabled ?? true,
          openrouter_api_key: data.openrouter_api_key || "",
        });
      }
    };

    loadConfiguration();
  }, [user, form]);

  const onSubmit = async (data: ConfigurationForm) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_configurations')
      .upsert({
        id: user.id,
        ...data,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      toast.error("Failed to save configuration");
      return;
    }

    toast.success("Configuration saved successfully");
  };

  return (
    <div className="min-h-screen bg-background p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Configuration</h1>
          <p className="text-muted-foreground">
            Customize your chat experience
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-card/50 border-white/10">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      OmniGuard Settings
                    </CardTitle>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="omni_model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OmniGuard Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="o1-2024-12-17">o1-2024-12-17</SelectItem>
                              <SelectItem value="o3-mini-2025-01-31">o3-mini-2025-01-31 (Default)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="omni_reasoning_effort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reasoning Effort</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select effort level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium (Default)</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="omni_custom_config"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Configuration</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter custom configuration..."
                              className="h-[400px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Configure organization-specific requirements
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="bg-card/50 border-white/10">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User2 className="w-5 h-5" />
                      Assistant Settings
                    </CardTitle>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="assistant_model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assistant Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                              <SelectItem value="gpt-4o-mini">gpt-4o-mini (Default)</SelectItem>
                              <SelectItem value="o1-2024-12-17">o1-2024-12-17</SelectItem>
                              <SelectItem value="o3-mini-2025-01-31">o3-mini-2025-01-31</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {form.watch("assistant_model")?.startsWith("o") ? (
                      <FormField
                        control={form.control}
                        name="assistant_reasoning_effort"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reasoning Effort</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select effort level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium (Default)</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="assistant_temperature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temperature ({field.value})</FormLabel>
                            <FormControl>
                              <Slider
                                min={0}
                                max={2}
                                step={0.1}
                                value={[field.value]}
                                onValueChange={([value]) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormDescription>
                              Higher values = more random output, Lower values = more deterministic output
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="assistant_system_prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>System Prompt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Define behavioral guidelines, security parameters, and sensitive information handling..."
                              className="h-[150px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <Card className="bg-card/50 border-white/10">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Data Sharing Settings
                    </CardTitle>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="data_sharing_enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Contribute to AI Safety Research</FormLabel>
                            <FormDescription>
                              Enable anonymous data integration and research dataset contribution
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {!form.watch("data_sharing_enabled") && (
                      <FormField
                        control={form.control}
                        name="openrouter_api_key"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OpenRouter API Key</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Enter your OpenRouter API key"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Required when data sharing is disabled
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Configuration;
