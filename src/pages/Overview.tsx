
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, LayoutDashboard, MessageCircle, Settings, Shield, UserCheck, FileText, Info, Database, Download } from "lucide-react";

const Overview = () => {
  const sections = [
    {
      title: "System Overview",
      description: "OmniGuard is a conversation moderation system designed to enforce content safety through rule-based assessments.",
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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <ScrollArea className="flex-1 h-[calc(100vh-3.5rem)]">
          <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8" />
                <h1 className="text-3xl font-bold tracking-tight">OmniGuard - Conversation Moderation System (BETA)</h1>
              </div>
              <p className="text-muted-foreground">
                A comprehensive solution for moderating conversations and enforcing content safety through intelligent rule-based assessments.
              </p>
            </div>

            {/* Stats */}
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

            {/* Features Grid */}
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

            {/* Detailed Sections */}
            <div className="space-y-8">
              {/* System Flow */}
              <section id="system-flow" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">System Flow</h2>
                <Card className="bg-card/50 border-white/10">
                  <CardContent className="p-6 space-y-4">
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
                  </CardContent>
                </Card>
              </section>

              {/* Configuration */}
              <section id="configuration" className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">Configuration</h2>
                <Tabs defaultValue="purpose" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="purpose">Purpose</TabsTrigger>
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                  </TabsList>
                  <TabsContent value="purpose" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                          OmniGuard serves as a content moderation system, evaluating conversations for compliance with safety guidelines and content policies.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="instructions" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                          Detailed guidelines for message evaluation, including criteria for acceptance, rejection, and clarification requests.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="rules" className="mt-4">
                    <Card className="bg-card/50 border-white/10">
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">
                          Specific content policies enforced by the system, organized by categories with clear examples and explanations.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </section>

              {/* Dataset */}
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
                  </CardContent>
                </Card>
              </section>

              {/* Project Info */}
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
