
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
    <div className="flex justify-center">
      <div className="inline-block overflow-hidden rounded-lg border border-white/10">
        <Table>
          <TableBody>
            {stats.map((stat, index) => (
              <TableRow key={index} className="hover:bg-white/5">
                <TableCell className={`py-2 ${isMobile ? 'px-3' : 'px-4'} text-center`}>
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </span>
                </TableCell>
                <TableCell className={`py-2 ${isMobile ? 'px-3' : 'px-4'} text-center`}>
                  <span className="font-bold text-base md:text-lg">
                    {stat.value}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProjectStats;
