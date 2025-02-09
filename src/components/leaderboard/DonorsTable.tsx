
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DonorStats } from "@/types/leaderboard";

interface DonorsTableProps {
  donors: DonorStats[];
}

export const DonorsTable = ({ donors }: DonorsTableProps) => {
  return (
    <Card className="bg-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Top Donors
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Supporting prize pools, API costs, and research initiatives</p>
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
                <TableHead>Donor</TableHead>
                <TableHead>Total Donated</TableHead>
                <TableHead className="hidden md:table-cell">Last Donation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor, index) => (
                <TableRow key={donor.id} className="hover:bg-white/5">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {donor.is_anonymous ? "Anonymous" : `User ${donor.user_id.slice(0, 8)}`}
                  </TableCell>
                  <TableCell>${donor.total_donated.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {donor.last_donation_date
                      ? new Date(donor.last_donation_date).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
