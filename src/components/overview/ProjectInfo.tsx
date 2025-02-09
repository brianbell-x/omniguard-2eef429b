
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProjectInfo = () => {
  return (
    <section 
      id="info" 
      className="space-y-6"
      aria-label="Project timeline and cost information"
    >
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white">Project Information</h2>
        <span className="text-sm text-gray-300">Overview of timeline and costs</span>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card 
          className="bg-card/50 border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/60"
          role="region"
          aria-labelledby="timeline-title"
        >
          <CardHeader className="space-y-2">
            <CardTitle id="timeline-title" className="text-lg font-medium text-white">Development Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between group cursor-default">
                <span className="text-[#38BDF8] transition-colors duration-200 group-hover:text-[#60CDFF]">Start Date</span>
                <span className="text-gray-100 transition-colors duration-200 group-hover:text-white">January 2024</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-[#38BDF8] transition-colors duration-200 group-hover:text-[#60CDFF]">Development Phase</span>
                <span className="text-gray-100 transition-colors duration-200 group-hover:text-white">3 months</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-[#38BDF8] transition-colors duration-200 group-hover:text-[#60CDFF]">Testing Phase</span>
                <span className="text-gray-100 transition-colors duration-200 group-hover:text-white">1 month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card 
          className="bg-card/50 border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-card/60"
          role="region"
          aria-labelledby="cost-title"
        >
          <CardHeader className="space-y-2">
            <CardTitle id="cost-title" className="text-lg font-medium text-white">Cost Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between group cursor-default">
                <span className="text-[#38BDF8] transition-colors duration-200 group-hover:text-[#60CDFF]">Development</span>
                <span className="text-gray-100 transition-colors duration-200 group-hover:text-white">$75,000</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-[#38BDF8] transition-colors duration-200 group-hover:text-[#60CDFF]">API Usage</span>
                <span className="text-gray-100 transition-colors duration-200 group-hover:text-white">$12,000/month</span>
              </div>
              <div className="flex justify-between group cursor-default">
                <span className="text-[#38BDF8] transition-colors duration-200 group-hover:text-[#60CDFF]">Infrastructure</span>
                <span className="text-gray-100 transition-colors duration-200 group-hover:text-white">$3,000/month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProjectInfo;

