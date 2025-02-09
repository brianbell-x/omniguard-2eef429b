
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PRESET_AMOUNTS = [
  { value: "5", label: "$5" },
  { value: "25", label: "$25" },
  { value: "100", label: "$100" },
  { value: "custom", label: "Custom" }
];

const DonationForm = () => {
  const { user } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<string>("25");
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allocations, setAllocations] = useState({
    api: 50,
    bounties: 50,
    creator: 0,
  });

  const getCurrentAmount = () => {
    if (isCustom) {
      return parseFloat(customAmount) || 0;
    }
    return parseFloat(selectedAmount) || 0;
  };

  const getAllocatedAmount = (percentage: number) => {
    const total = getCurrentAmount();
    return ((percentage / 100) * total).toFixed(2);
  };

  const handleAmountSelect = (amount: string) => {
    if (amount === "custom") {
      setIsCustom(true);
      setSelectedAmount("custom");
    } else {
      setIsCustom(false);
      setSelectedAmount(amount);
      setCustomAmount("");
    }
  };

  const handleAllocationChange = (type: "api" | "bounties" | "creator", value: number) => {
    const newAllocations = { ...allocations };
    newAllocations[type] = value;

    if (type === "api") {
      newAllocations.bounties = 100 - value - allocations.creator;
    } else if (type === "bounties") {
      newAllocations.api = 100 - value - allocations.creator;
    } else {
      const remaining = 100 - value;
      const total = allocations.api + allocations.bounties;
      if (total > 0) {
        newAllocations.api = Math.round((allocations.api / total) * remaining);
        newAllocations.bounties = remaining - newAllocations.api;
      }
    }

    setAllocations(newAllocations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to make a donation");
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
      setSelectedAmount("25");
      setCustomAmount("");
      setIsCustom(false);
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PRESET_AMOUNTS.map((amount) => (
          <button
            key={amount.value}
            type="button"
            onClick={() => handleAmountSelect(amount.value)}
            className={cn(
              "h-12 px-4 rounded-lg border transition-colors",
              selectedAmount === amount.value
                ? "border-primary bg-primary/10"
                : "border-input hover:border-primary"
            )}
          >
            {amount.label}
          </button>
        ))}
      </div>

      {isCustom && (
        <div className="space-y-2">
          <Label htmlFor="customAmount">Custom Amount (USD)</Label>
          <Input
            id="customAmount"
            type="number"
            step="0.01"
            min="0.01"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="bg-black/20"
          />
        </div>
      )}

      <div className="space-y-4">
        <Label>Allocation</Label>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>API Balance</span>
              <span>${getAllocatedAmount(allocations.api)} ({allocations.api}%)</span>
            </div>
            <Slider
              value={[allocations.api]}
              onValueChange={([value]) => handleAllocationChange("api", value)}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Bounties</span>
              <span>${getAllocatedAmount(allocations.bounties)} ({allocations.bounties}%)</span>
            </div>
            <Slider
              value={[allocations.bounties]}
              onValueChange={([value]) => handleAllocationChange("bounties", value)}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Creator</span>
              <span>${getAllocatedAmount(allocations.creator)} ({allocations.creator}%)</span>
            </div>
            <Slider
              value={[allocations.creator]}
              onValueChange={([value]) => handleAllocationChange("creator", value)}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="anonymous"
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />
        <Label htmlFor="anonymous">Make donation anonymous</Label>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting || !user}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isSubmitting ? "Processing..." : "Continue"}
      </Button>
    </form>
  );
};

const Donations = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Support the Project</h1>
        <DonationForm />
      </div>
    </div>
  );
};

export default Donations;
