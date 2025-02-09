
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ContributorStats } from "@/types/leaderboard";

interface ContributorsTableProps {
  contributors: ContributorStats[];
}

export const ContributorsTable = ({ contributors }: ContributorsTableProps) => {
  return (
    <Card className="bg-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Top Contributors
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Success rate is calculated as the percentage of verified harmful prompts out of total contributions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Contributor</TableHead>
                <TableHead className="hidden md:table-cell">Verified Harmful</TableHead>
                <TableHead className="hidden md:table-cell">Assistant Rejections</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributors.map((contributor, index) => (
                <TableRow key={contributor.id} className="hover:bg-white/5">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>User {contributor.user_id.slice(0, 8)}</TableCell>
                  <TableCell className="hidden md:table-cell">{contributor.verified_harmful_prompts}</TableCell>
                  <TableCell className="hidden md:table-cell">{contributor.assistant_rejections}</TableCell>
                  <TableCell>{contributor.total_contributions}</TableCell>
                  <TableCell>{contributor.success_rate.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
