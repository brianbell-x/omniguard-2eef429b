
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectInfo = () => {
  return (
    <section id="info" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Project Information</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-medium">Development Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground/80">Start Date</span>
                <span>January 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/80">Development Phase</span>
                <span>3 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/80">Testing Phase</span>
                <span>1 month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-medium">Cost Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground/80">Development</span>
                <span>$75,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/80">API Usage</span>
                <span>$12,000/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/80">Infrastructure</span>
                <span>$3,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProjectInfo;
