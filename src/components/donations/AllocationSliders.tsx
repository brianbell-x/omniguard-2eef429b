
import { Slider } from "@/components/ui/slider";

interface AllocationSlidersProps {
  allocations: {
    api: number;
    bounties: number;
    creator: number;
  };
  currentAmount: number;
  onAllocationChange: (type: "api" | "bounties" | "creator", value: number) => void;
}

const getAllocatedAmount = (total: number, percentage: number) => {
  return ((percentage / 100) * total).toFixed(2);
};

export const AllocationSliders = ({
  allocations,
  currentAmount,
  onAllocationChange
}: AllocationSlidersProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>API Balance</span>
          <span>${getAllocatedAmount(currentAmount, allocations.api)}</span>
        </div>
        <Slider
          value={[allocations.api]}
          onValueChange={([value]) => onAllocationChange("api", value)}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Bounties</span>
          <span>${getAllocatedAmount(currentAmount, allocations.bounties)}</span>
        </div>
        <Slider
          value={[allocations.bounties]}
          onValueChange={([value]) => onAllocationChange("bounties", value)}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Creator</span>
          <span>${getAllocatedAmount(currentAmount, allocations.creator)}</span>
        </div>
        <Slider
          value={[allocations.creator]}
          onValueChange={([value]) => onAllocationChange("creator", value)}
          max={100}
          step={1}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
