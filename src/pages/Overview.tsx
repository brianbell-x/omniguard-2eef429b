import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, LayoutDashboard, MessageCircle, Settings, Shield, UserCheck, FileText, Info, Database, Download, ChevronDown } from "lucide-react";

const Overview = () => {
  const sections = [
    {
      title: "System Overview",
      description: "OmniGuard is a reasoning based conversation moderation system for text-based LLM interactions, continuously running rule violation assessment for each turn of user and assistant messages.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "Message Flow",
      description: "Handles message processing including inspection, sanitization, and clarification prompts.",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      title: "Configuration",
      description: "Customize safety rules and operational instructions for message evaluation.",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Dataset Access",
      description: "Download and analyze conversation data with detailed statistics.",
      icon: <Database className="w-6 h-6" />,
    },
  ];

  const stats = [
    { label: "Total Interactions", value: "1.2M+" },
    { label: "User Rejections", value: "45K" },
    { label: "Assistant Rejections", value: "32K" },
    { label: "Avg. Latency", value: "280ms" },
  ];

  const datasetExample = `{
  "conversation_id": "Unique identifier for this evaluation instance",
  "omniguard_evaluation_input": {
    "configuration": "<configuration>Safety configuration with rules and instructions</configuration>",
    "conversation": "<input><![CDATA[{
      \\"id\\": \\"string\\",
      \\"messages\\": [
        {\\"role\\": \\"system\\", \\"content\\": \\"\\"},
        {\\"role\\": \\"user\\", \\"content\\": \\"\\"},
        {\\"role\\": \\"assistant\\", \\"content\\": \\"\\"}
      ]
    }]]></input>"
  },
  "omniguard_raw_response": {
    "conversation_id": "string",
    "analysisSummary": "Short note on triggered rules or 'No violations'.",
    "response": {
      "action": "allow | UserInputRejection | AssistantOutputRejection",
      "UserInputRejection": "string",
      "AssistantOutputRejection": "string"
    }
  },
  "assistant_output": "Final response from assistant (if OmniGuard allowed the content)",
  "user_violates_rules": true,
  "assistant_violates_rules": false,
  "model_name": "Model used for OmniGuard evaluation",
  "reasoning_effort": "Level of reasoning effort applied",
  "contributor": "Who contributed this data point",
  "created_at": "2024-02-07T13:30:03.123Z",
  "prompt_tokens": 0,
  "completion_tokens": 0,
  "total_tokens": 0,
  "input_cost": 0.0000,
  "output_cost": 0.0000,
  "total_cost": 0.0000,
  "latency_ms": 0,
  "needed_human_verification": false
}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="w-64 h-[calc(100vh-3.5rem)] border-r border-white/10 p-4 hidden lg:block">
          <nav className="space-y-2">
            <a href="#overview" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </a>
            <a href="#system-flow" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
              <ArrowRight className="w-4 h-4" />
              System Flow
            </a>
            <a href="#configuration" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
              <Settings className="w-4 h-4" />
              Configuration
            </a>
            <a href="#dataset" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
              <FileText className="w-4 h-4" />
              Dataset
            </a>
            <a href="#info" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/5 transition-colors">
              <Info className="w-4 h-4" />
              Project Info
            </a>
          </nav>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-3.5rem)]">
          <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8" />
                <h1 className="text-3xl font-bold tracking-tight">OmniGuard - Conversation Moderation System (BETA)</h1>
              </div>
              <p className="text-muted-foreground">
                A reasoning based conversation moderation system for text-based LLM interactions. The system effectively mitigates the majority of potential violations and attacks through its comprehensive rule set and reasoning-based approach. Together, we're building a safer, more robust AI ecosystem.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card/50 border-white/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((section, index) => (
                <Card key={index} className="bg-card/50 border-white/10">
                  <CardHeader className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {section.icon}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-8">
              <section id="system-flow" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">System Flow</h2>
                <Card className="bg-card/50 border-white/10">
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>Message Input</span>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          <span>Rule Assessment</span>
                        </div>
                        <ArrowRight className="w-4 h-4" />
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4" />
                          <span>Moderation Output</span>
                        </div>
                      </div>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <p>OmniGuard inspects every incoming message to assess compliance with the active rules. If a violation is detected, OmniGuard either sanitizes minor issues or, in cases of major violations, replaces the message with a safe, generic refusal.</p>
                        <p>When ambiguity exists, OmniGuard proactively asks for clarification to fully understand the user's intent before finalizing a moderation decision.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section id="configuration" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Configuration</h2>
                <Tabs defaultValue="purpose" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="purpose">Purpose</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="format">Format</TabsTrigger>
                  </TabsList>
                  <TabsContent value="purpose" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                          Clearly defines OmniGuard as a reasoning-based moderation layer that evaluates and safeguards conversational content. The safety configuration is injected into the system to prime OmniGuard with all necessary guidelines and behavioral protocols before any messages are processed.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="instructions" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                          Detailed guidelines for evaluating messages, handling ambiguity, responding to violations, and maintaining conversational engagement. The configuration provides comprehensive instructions on message evaluation, violation handling, and engagement preservation.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="rules" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Each rule group includes a category and a list of specific rules. Each rule contains a unique identifier, description, and illustrative examples of its application.
                          </p>
                          <div className="text-sm bg-black/20 p-4 rounded-md font-mono overflow-x-auto">
                            {`{
  "group": "Content Safety",
  "rules": [
    {
      "ruleId": "CS001",
      "description": "Prevent harmful content",
      "examples": ["..."]
    }
  ]
}`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="format" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-medium">Configuration Format</h3>
                          <div className="text-sm bg-black/20 p-4 rounded-md font-mono overflow-x-auto">
                            {`{ "role": "developer", "content": {"type": "text", "text": "<CONFIGURATION>"} }
{ "role": "user", "content": {"type": "text", "text": "<CONVERSATION>"} }`}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-medium">Actions</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><span className="font-medium">allow:</span> Proceeds normally if no violations are detected</li>
                            <li><span className="font-medium">UserInputRejection:</span> Returns a succinct, neutral refusal for problematic user inputs</li>
                            <li><span className="font-medium">AssistantOutputRejection:</span> Provides a sanitized or generic refusal for problematic assistant outputs</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>

              <section id="dataset" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Dataset</h2>
                <Card className="bg-card/50 border-white/10">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="font-medium">Download Complete Dataset</h3>
                        <p className="text-sm text-muted-foreground">
                          Access the full conversation dataset in JSONL format
                        </p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 transition-colors">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>

                    <Collapsible className="space-y-2">
                      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:underline">
                        <ChevronDown className="w-4 h-4" />
                        View Dataset Format Example
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 p-4 bg-black/20 rounded-md">
                          <pre className="text-xs overflow-x-auto whitespace-pre">
                            {datasetExample}
                          </pre>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              </section>

              <section id="info" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Project Information</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-card/50 border-white/10">
                    <CardHeader>
                      <CardTitle>Development Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Date</span>
                          <span>January 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Development Phase</span>
                          <span>3 months</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Testing Phase</span>
                          <span>1 month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/50 border-white/10">
                    <CardHeader>
                      <CardTitle>Cost Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Development</span>
                          <span>$75,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">API Usage</span>
                          <span>$12,000/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Infrastructure</span>
                          <span>$3,000/month</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Overview;
