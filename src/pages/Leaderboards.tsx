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

// --- Reusable data fetching function ---
async function fetchTable(table: string, orderKey: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(orderKey, { ascending: false })
    .limit(10);
  if (error) throw error;
  return data;
}

const Leaderboards = () => {
  const { data: contributors = [] } = useQuery(
    ["contributors"],
    () => fetchTable("contributor_stats", "total_contributions")
  );

  const { data: donors = [] } = useQuery(
    ["donors"],
    () => fetchTable("donor_stats", "total_donated")
  );

  return (
    <div className="min-h-[calc(100vh-56px)] bg-background">
      <ScrollArea className="h-full">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 md:w-8 md:h-8" />
                Leaderboards
              </h1>
              {/*
                Subheading removed to minimize cognitive load.
                The purpose is now clear from the title and the tabs.
              */}
            </div>

            <Tabs defaultValue="contributors">
              <TabsList>
                <TabsTrigger value="contributors">Contributors</TabsTrigger>
                <TabsTrigger value="donors">Donors</TabsTrigger>
              </TabsList>

              <TabsContent value="contributors">
                <LeaderboardStats contributors={contributors} />
                <ContributionMetrics contributors={contributors} />
                <ContributorsTable contributors={contributors} />
              </TabsContent>

              <TabsContent value="donors">
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
