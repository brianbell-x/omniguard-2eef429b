
import { useIsMobile } from "@/hooks/use-mobile";

interface StatItem {
  label: string;
  value: string;
}

interface ProjectStatsProps {
  stats: StatItem[];
}

const ProjectStats = ({ stats }: ProjectStatsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 md:p-4 rounded-lg 
                     border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] 
                     transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-xs md:text-sm font-medium text-gray-300 mb-1">
              {stat.label}
            </span>
            <span className="font-bold text-sm md:text-lg tracking-tight text-white">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStats;

