
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, MessageCircle, Settings, UserCheck, Trophy } from "lucide-react";

const Overview = () => {
  const features = [
    {
      title: "Chat Interface",
      description: "Engage with our AI assistant through a modern chat interface",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      title: "Configuration",
      description: "Customize your experience with detailed settings",
      icon: <Settings className="w-6 h-6" />,
    },
    {
      title: "Human Verification",
      description: "Ensure secure and verified interactions",
      icon: <UserCheck className="w-6 h-6" />,
    },
    {
      title: "Leaderboards",
      description: "Track and compare performance metrics",
      icon: <Trophy className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">Overview</h1>
          <p className="text-muted-foreground">
            Welcome to our AI Chat Platform. Explore our features below.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-white/10">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
