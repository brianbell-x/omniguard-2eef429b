
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign } from "lucide-react";
import { DonorStats as DonorStatsType } from "@/types/leaderboard";

interface DonorStatsProps {
  donors: DonorStatsType[];
}

export const DonorStats = ({ donors }: DonorStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4" />
            Total Donors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{donors.length}</div>
        </CardContent>
      </Card>

      <Card className="bg-card border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <DollarSign className="w-4 h-4" />
            Total Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${donors.reduce((sum, d) => sum + d.total_donated, 0).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
