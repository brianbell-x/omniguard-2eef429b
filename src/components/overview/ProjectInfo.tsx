
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionContainer from "@/components/ui/section-container";

const ProjectInfo = () => {
  return (
    <SectionContainer title="Project Info">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-card/50 border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/60">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-medium">Development Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between group cursor-default">
                <span className="text-primary transition-colors duration-200 group-hover:text-primary/90">Start Date</span>
                <span className="text-foreground transition-colors duration-200 group-hover:text-foreground/90">January 2024</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-primary transition-colors duration-200 group-hover:text-primary/90">Development Phase</span>
                <span className="text-foreground transition-colors duration-200 group-hover:text-foreground/90">3 months</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-primary transition-colors duration-200 group-hover:text-primary/90">Testing Phase</span>
                <span className="text-foreground transition-colors duration-200 group-hover:text-foreground/90">1 month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/60">
          <CardHeader className="space-y-2">
            <CardTitle className="text-lg font-medium">Cost Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between group cursor-default">
                <span className="text-primary transition-colors duration-200 group-hover:text-primary/90">Development</span>
                <span className="text-foreground transition-colors duration-200 group-hover:text-foreground/90">$75,000</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-primary transition-colors duration-200 group-hover:text-primary/90">API Usage</span>
                <span className="text-foreground transition-colors duration-200 group-hover:text-foreground/90">$12,000/month</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-primary transition-colors duration-200 group-hover:text-primary/90">Infrastructure</span>
                <span className="text-foreground transition-colors duration-200 group-hover:text-foreground/90">$3,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
};

export default ProjectInfo;
