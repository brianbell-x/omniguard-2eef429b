import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";
import Sidebar from "@/components/overview/Sidebar";
import ProjectStats from "@/components/overview/ProjectStats";
import ConfigurationSection from "@/components/overview/ConfigurationSection";
import DatasetSection from "@/components/overview/DatasetSection";
import ProjectInfo from "@/components/overview/ProjectInfo";

const Overview = () => {
  const stats = [
    { label: "Total Interactions", value: "1.2M+" },
    { label: "User Rejections", value: "45K" },
    { label: "Assistant Rejections", value: "32K" },
    { label: "Avg. Latency", value: "280ms" },
  ];

  const configurationXml = `<configuration>
  <purpose>
    Defines OmniGuard as a reasoning-based moderation layer that evaluates and safeguards 
    conversational content. The safety configuration is injected into the system to prime 
    OmniGuard with all necessary guidelines and behavioral protocols before any messages 
    are processed.
  </purpose>
  <instructions>
    <instruction>Evaluate all incoming messages against defined safety rules</instruction>
    <instruction>Handle ambiguous cases with conservative judgment</instruction>
    <instruction>Generate appropriate rejection messages when needed</instruction>
    <instruction>Maintain conversational context during evaluation</instruction>
  </instructions>
  <rules>
    <group id="content-safety">
      <rule id="CS001">Prevent harmful or malicious content</rule>
      <rule id="CS002">Filter explicit or inappropriate material</rule>
      <rule id="CS003">Block potential security threats</rule>
    </group>
    <group id="user-protection">
      <rule id="UP001">Protect user privacy and personal information</rule>
      <rule id="UP002">Prevent harassment and bullying</rule>
      <rule id="UP003">Maintain professional communication standards</rule>
    </group>
  </rules>
  <format>
    <response_types>
      <type>allow</type>
      <type>UserInputRejection</type>
      <type>AssistantOutputRejection</type>
    </response_types>
    <structure>
      <field>conversation_id</field>
      <field>timestamp</field>
      <field>evaluation_result</field>
      <field>action_taken</field>
    </structure>
  </format>
</configuration>`;

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
        <Sidebar />
        <ScrollArea className="flex-1 h-[calc(100vh-3.5rem)]">
          <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <Shield className="w-6 h-6 md:w-8 md:h-8" />
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">OmniGuard - Conversation Moderation System (BETA)</h1>
              </div>
              <div className="flex flex-col-reverse md:flex-row gap-6 items-center justify-between">
                <p className="text-sm md:text-base text-muted-foreground max-w-[600px] flex-grow flex items-center text-center">
                  A reasoning based conversation moderation system for text-based LLM interactions. The system effectively mitigates the majority of potential violations and attacks through its comprehensive rule set and reasoning-based approach. Together, we're building a safer, more robust AI ecosystem.
                </p>
                <div className="w-full md:w-auto">
                  <ProjectStats stats={stats} />
                </div>
              </div>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <ConfigurationSection configurationXml={configurationXml} />
              <DatasetSection datasetExample={datasetExample} />
              <ProjectInfo />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Overview;
