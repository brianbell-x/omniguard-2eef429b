
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, DollarSign, Award, HelpCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { supabase } from "@/integrations/supabase/client";
import { ContributorStats, DonorStats } from "@/types/leaderboard";

const Leaderboards = () => {
  const { data: contributors = [], isLoading: isLoadingContributors } = useQuery({
    queryKey: ["contributors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contributor_stats")
        .select("*")
        .order("total_contributions", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as ContributorStats[];
    },
  });

  const { data: donors = [], isLoading: isLoadingDonors } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donor_stats")
        .select("*")
        .order("total_donated", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as DonorStats[];
    },
  });

  const chartData = contributors.map((contributor) => ({
    name: `User ${contributor.user_id.slice(0, 8)}`,
    "Verified Harmful": contributor.verified_harmful_prompts,
    "Assistant Rejections": contributor.assistant_rejections,
  }));

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <ScrollArea className="h-full">
        <div className="p-4 md:p-6">
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 md:w-8 md:h-8" />
                Leaderboards
              </h1>
              <p className="text-muted-foreground">
                Track top contributors and donors supporting our mission
              </p>
            </div>

            <Tabs defaultValue="contributors" className="space-y-6">
              <TabsList>
                <TabsTrigger value="contributors">Contributors</TabsTrigger>
                <TabsTrigger value="donors">Donors</TabsTrigger>
              </TabsList>

              <TabsContent value="contributors" className="space-y-6">
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
              </TabsContent>

              <TabsContent value="donors" className="space-y-6">
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Leaderboards;

