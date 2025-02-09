
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DonationAmountSelectorProps {
  selectedAmount: string;
  customAmount: string;
  isCustom: boolean;
  onAmountSelect: (amount: string) => void;
  onCustomAmountChange: (amount: string) => void;
}

const PRESET_AMOUNTS = [
  { value: "5", label: "$5" },
  { value: "25", label: "$25" },
  { value: "100", label: "$100" },
  { value: "custom", label: "Custom" }
];

export const DonationAmountSelector = ({
  selectedAmount,
  customAmount,
  isCustom,
  onAmountSelect,
  onCustomAmountChange
}: DonationAmountSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PRESET_AMOUNTS.map((amount) => (
          <button
            key={amount.value}
            type="button"
            onClick={() => onAmountSelect(amount.value)}
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
            onChange={(e) => onCustomAmountChange(e.target.value)}
            placeholder="Enter amount"
            required
            className="bg-black/20"
          />
        </div>
      )}
    </div>
  );
};
