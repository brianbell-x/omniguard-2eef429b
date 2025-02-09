
import { useQuery } from "@tanstack/react-query";
import { Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { ContributorStats, DonorStats } from "@/types/leaderboard";
import { LeaderboardStats } from "@/components/leaderboard/LeaderboardStats";
import { ContributionMetrics } from "@/components/leaderboard/ContributionMetrics";
import { ContributorsTable } from "@/components/leaderboard/ContributorsTable";
import { DonorStats as DonorStatsComponent } from "@/components/leaderboard/DonorStats";
import { DonorsTable } from "@/components/leaderboard/DonorsTable";

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
                <LeaderboardStats contributors={contributors} />
                <ContributionMetrics contributors={contributors} />
                <ContributorsTable contributors={contributors} />
              </TabsContent>

              <TabsContent value="donors" className="space-y-6">
                <DonorStatsComponent donors={donors} />
                <DonorsTable donors={donors} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Leaderboards;
