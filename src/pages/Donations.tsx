
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import type { Donation } from "@/types/donation";

const DonationForm = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allocations, setAllocations] = useState({
    api: 50,
    bounties: 50,
    creator: 0,
  });

  // Update other allocations when one changes to maintain 100% total
  const handleAllocationChange = (type: "api" | "bounties" | "creator", value: number) => {
    const oldValue = allocations[type];
    const difference = value - oldValue;
    
    if (difference === 0) return;

    const newAllocations = { ...allocations };
    newAllocations[type] = value;

    // Adjust other allocations proportionally
    const othersTotal = 100 - value;
    const types = ["api", "bounties", "creator"].filter((t) => t !== type) as Array<"api" | "bounties" | "creator">;
    
    if (othersTotal > 0) {
      const currentOthersTotal = types.reduce((sum, t) => sum + allocations[t], 0);
      types.forEach((t) => {
        newAllocations[t] = Math.round((allocations[t] / currentOthersTotal) * othersTotal);
      });
      
      // Handle rounding errors
      const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
      if (total !== 100) {
        newAllocations[types[0]] += 100 - total;
      }
    } else {
      types.forEach((t) => {
        newAllocations[t] = 0;
      });
    }

    setAllocations(newAllocations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to make a donation");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder for Stripe integration
      toast.info("Stripe integration coming soon!");
      
      const { error } = await supabase.from("donations").insert({
        user_id: user.id,
        amount: numAmount,
        message,
        is_anonymous: isAnonymous,
        api_balance_allocation: allocations.api,
        bounties_allocation: allocations.bounties,
        creator_allocation: allocations.creator,
      });

      if (error) throw error;

      toast.success("Thank you for your donation!");
      setAmount("");
      setMessage("");
      setIsAnonymous(false);
      setAllocations({ api: 50, bounties: 50, creator: 0 });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (USD)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Allocation</Label>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>API Balance</span>
              <span>{allocations.api}%</span>
            </div>
            <Slider
              value={[allocations.api]}
              onValueChange={([value]) => handleAllocationChange("api", value)}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Bounties</span>
              <span>{allocations.bounties}%</span>
            </div>
            <Slider
              value={[allocations.bounties]}
              onValueChange={([value]) => handleAllocationChange("bounties", value)}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Creator</span>
              <span>{allocations.creator}%</span>
            </div>
            <Slider
              value={[allocations.creator]}
              onValueChange={([value]) => handleAllocationChange("creator", value)}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message with your donation"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
        <Label htmlFor="anonymous">Make donation anonymous</Label>
      </div>

      <Button type="submit" disabled={isSubmitting || !user}>
        {isSubmitting ? "Processing..." : "Donate"}
      </Button>
    </form>
  );
};

const DonationsList = () => {
  const { data: donations, isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("donations")
        .select("*, profiles:user_id(username)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div>Loading donations...</div>;

  return (
    <div className="space-y-4">
      {donations?.map((donation: any) => (
        <div
          key={donation.id}
          className="p-4 rounded-lg border border-border bg-card"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg font-medium">
                ${donation.amount.toFixed(2)} USD
              </p>
              <p className="text-sm text-muted-foreground">
                by{" "}
                {donation.is_anonymous
                  ? "Anonymous"
                  : `@${donation.profiles?.username}`}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {new Date(donation.created_at).toLocaleDateString()}
            </p>
          </div>
          {donation.message && (
            <p className="mt-2 text-sm text-muted-foreground">
              {donation.message}
            </p>
          )}
          <div className="mt-2 text-sm text-muted-foreground">
            <p>Allocations: API {donation.api_balance_allocation}% • Bounties {donation.bounties_allocation}% • Creator {donation.creator_allocation}%</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Donations = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Support the Project</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Make a Donation</h2>
            <DonationForm />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
            <ScrollArea className="h-[600px] pr-4">
              <DonationsList />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;
