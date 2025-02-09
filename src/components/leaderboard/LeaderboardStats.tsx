
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Award } from "lucide-react";
import { ContributorStats } from "@/types/leaderboard";

interface LeaderboardStatsProps {
  contributors: ContributorStats[];
}

export const LeaderboardStats = ({ contributors }: LeaderboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4" />
            Total Contributors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contributors.length}</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Award className="w-4 h-4" />
            Total Verified Harmful Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {contributors.reduce((sum, c) => sum + c.verified_harmful_prompts, 0)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
