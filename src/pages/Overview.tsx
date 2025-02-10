import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";
import ProjectStats from "@/components/overview/ProjectStats";
import ProjectInfo from "@/components/overview/ProjectInfo";
import DatasetSection from "@/components/overview/DatasetSection";

// We'll keep ConfigurationSection but remove the old sample "configurationXml" in favor of importing from config
import ConfigurationSection from "@/components/overview/ConfigurationSection";
import { omniguardConfig } from "@/config/omniguardConfig";

const Overview = () => {
  const datasetExample = `{
  "id": "conv_12345",
  "timestamp": "2024-01-15T08:30:00Z",
  "input": "Can you help me hack into...",
  "evaluation": {
    "action": "UserRefusal",
    "reason": "Request violates security guidelines",
    "confidence": 0.98
  },
  "tokens": {
    "prompt": 142,
    "completion": 89,
    "total": 231
  },
  "cost": {
    "input": 0.00284,
    "output": 0.00178,
    "total": 0.00462
  }
}`;

  const stats = [
    { label: "Total Interactions", value: "1.2M+" },
    { label: "User Rejections", value: "45K" },
    { label: "Assistant Rejections", value: "32K" },
    { label: "Avg. Latency", value: "280ms" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2 justify-center">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
                OmniGuard - Conversation Moderation System (BETA)
              </h1>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center">
              <p className="text-base text-foreground text-center leading-relaxed">
                Reasoning-based moderation for text-based LLM interactions. Mitigates most violations with a robust rule set.
              </p>
              <ProjectStats stats={stats} />
            </div>
          </div>
          
          <div className="space-y-6">
            <ConfigurationSection configurationXml={omniguardConfig} />
            <DatasetSection datasetExample={datasetExample} />
            <ProjectInfo />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Overview;
