
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

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

  const handleAllocationChange = (type: "api" | "bounties" | "creator", value: number) => {
    const newAllocations = { ...allocations };
    newAllocations[type] = value;

    // Adjust other allocations
    if (type === "api") {
      newAllocations.bounties = 100 - value - allocations.creator;
    } else if (type === "bounties") {
      newAllocations.api = 100 - value - allocations.creator;
    } else {
      // If creator is changed, adjust API and bounties proportionally
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
    <form onSubmit={handleSubmit} className="space-y-8">
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
          className="bg-black/20"
        />
      </div>

      <div className="space-y-4">
        <Label>Allocation</Label>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>API Balance</span>
              <span>{allocations.api}%</span>
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
              <span>{allocations.bounties}%</span>
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
              <span>{allocations.creator}%</span>
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

      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message with your donation"
          className="bg-black/20 min-h-[100px]"
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

      <Button 
        type="submit" 
        disabled={isSubmitting || !user}
        className="w-32 bg-white/10 hover:bg-white/20"
      >
        {isSubmitting ? "Processing..." : "Donate"}
      </Button>
    </form>
  );
};

const Donations = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Support the Project</h1>
        <div>
          <h2 className="text-xl font-semibold text-center mb-8">Make a Donation</h2>
          <DonationForm />
        </div>
      </div>
    </div>
  );
};

export default Donations;
