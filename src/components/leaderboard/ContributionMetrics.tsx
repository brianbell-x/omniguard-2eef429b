
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ContributorStats } from "@/types/leaderboard";

interface ContributionMetricsProps {
  contributors: ContributorStats[];
}

export const ContributionMetrics = ({ contributors }: ContributionMetricsProps) => {
  const chartData = contributors.map((contributor) => ({
    name: `User ${contributor.user_id.slice(0, 8)}`,
    "Verified Harmful": contributor.verified_harmful_prompts,
    "Assistant Rejections": contributor.assistant_rejections,
  }));

  return (
    <Card className="bg-card border-white/10">
      <CardHeader>
        <CardTitle>Contribution Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend wrapperStyle={{ display: window.innerWidth < 768 ? 'none' : 'block' }} />
              <Bar dataKey="Verified Harmful" fill="#4ADE80" />
              <Bar dataKey="Assistant Rejections" fill="#FB923C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
