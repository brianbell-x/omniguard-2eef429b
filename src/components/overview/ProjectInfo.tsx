
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectInfo = () => {
  return (
    <section id="info" className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-center">Project Information</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-center">Development Timeline</CardTitle>
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
            <CardTitle className="text-center">Cost Metrics</CardTitle>
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
  );
};

export default ProjectInfo;
