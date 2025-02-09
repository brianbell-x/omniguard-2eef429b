
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: string;
}

interface ProjectStatsProps {
  stats: StatItem[];
}

const ProjectStats = ({ stats }: ProjectStatsProps) => {
  return (
    <div className="grid gap-3">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card/50 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProjectStats;
