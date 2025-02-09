
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg 
                     border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] 
                     transition-all duration-200"
          >
            <span className="text-sm font-medium text-foreground/80 mb-2">
              {stat.label}
            </span>
            <span className="font-bold text-lg tracking-tight text-foreground">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectStats;
