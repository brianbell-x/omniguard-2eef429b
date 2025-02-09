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
import { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

// --- Type-safe data fetching function ---
async function fetchContributorStats(): Promise<ContributorStats[]> {
  const { data, error } = await supabase
    .from("contributor_stats")
    .select("*")
    .order("total_contributions", { ascending: false })
    .limit(10);

  if (error) throw error;

  return (data as Tables["contributor_stats"]["Row"][]).map(row => ({
    id: row.id,
    user_id: row.user_id || "",
    verified_harmful_prompts: row.verified_harmful_prompts || 0,
    assistant_rejections: row.assistant_rejections || 0,
    total_contributions: row.total_contributions || 0,
    success_rate: row.success_rate || 0,
    created_at: row.created_at,
    updated_at: row.updated_at
  }));
}

async function fetchDonorStats(): Promise<DonorStats[]> {
  const { data, error } = await supabase
    .from("donor_stats")
    .select("*")
    .order("total_donated", { ascending: false })
    .limit(10);

  if (error) throw error;

  return (data as Tables["donor_stats"]["Row"][]).map(row => ({
    id: row.id,
    user_id: row.user_id || "",
    total_donated: row.total_donated || 0,
    is_anonymous: row.is_anonymous || false,
    last_donation_date: row.last_donation_date,
    created_at: row.created_at,
    updated_at: row.updated_at
  }));
}

const Leaderboards = () => {
  const { data: contributors = [] } = useQuery<ContributorStats[]>({
    queryKey: ["contributors"],
    queryFn: fetchContributorStats
  });

  const { data: donors = [] } = useQuery<DonorStats[]>({
    queryKey: ["donors"],
    queryFn: fetchDonorStats
  });

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
