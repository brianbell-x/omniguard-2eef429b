import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { DonationAmountSelector } from "@/components/donations/DonationAmountSelector";
import { AllocationSliders } from "@/components/donations/AllocationSliders";

const DonationForm = () => {
  const { user } = useAuth();
  // Combined the selectedAmount and customAmount into one state.
  const [donationAmount, setDonationAmount] = useState("25");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allocations, setAllocations] = useState({
    api: 50,
    bounties: 50,
    creator: 0,
  });

  // Now simply parse the donationAmount value.
  const getCurrentAmount = () => parseFloat(donationAmount) || 0;

  // Simplified allocation logic: recalculate the remaining allocations in one pass.
  const handleAllocationChange = (
    type: "api" | "bounties" | "creator",
    value: number
  ) => {
    const newAllocations = { ...allocations, [type]: value };

    if (type === "creator") {
      const remaining = 100 - value;
      const total = allocations.api + allocations.bounties;
      if (total > 0) {
        newAllocations.api = Math.round((allocations.api / total) * remaining);
        newAllocations.bounties = remaining - newAllocations.api;
      } else {
        newAllocations.api = Math.round(remaining / 2);
        newAllocations.bounties = remaining - newAllocations.api;
      }
    } else {
      const remaining = 100 - newAllocations.creator;
      if (type === "api") {
        newAllocations.bounties = remaining - value;
      } else if (type === "bounties") {
        newAllocations.api = remaining - value;
      }
    }

    setAllocations(newAllocations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Sign in required");
      return;
    }

    const amount = getCurrentAmount();
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    try {
      // Placeholder for Stripe integration
      toast.info("Stripe integration coming soon!");

      const { error } = await supabase.from("donations").insert({
        user_id: user.id,
        amount,
        is_anonymous: isAnonymous,
        api_balance_allocation: allocations.api,
        bounties_allocation: allocations.bounties,
        creator_allocation: allocations.creator,
      });

      if (error) throw error;

      toast.success("Thank you for your donation!");
      setDonationAmount("25");
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
      <DonationAmountSelector
        donationAmount={donationAmount}
        onDonationAmountChange={setDonationAmount}
      />

      <div className="space-y-4">
        <Label>Allocation</Label>
        <AllocationSliders
          allocations={allocations}
          currentAmount={getCurrentAmount()}
          onAllocationChange={handleAllocationChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
        {/* Renamed label for clarity */}
        <Label htmlFor="anonymous">Anonymous</Label>
      </div>

      {/* Use shadcn-ui Button variant instead of custom className */}
      <Button type="submit" disabled={isSubmitting || !user} variant="primary" className="w-full">
        {isSubmitting ? "Processing..." : "Continue"}
      </Button>
    </form>
  );
};

const Donations = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Swapped to a shadcn-ui Heading component with minimal styling */}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Donate
        </h1>
        <DonationForm />
      </div>
    </div>
  );
};

export default Donations;
