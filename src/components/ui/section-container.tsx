
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  description?: string;
}

const SectionContainer = ({ 
  children, 
  className,
  title,
  description 
}: SectionContainerProps) => {
  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-100">{title}</h2>
        {description && <span className="text-sm text-gray-300">{description}</span>}
      </div>
      <Card className="bg-card/50 border-white/10">
        <div className="p-6">
          {children}
        </div>
      </Card>
    </section>
  );
};

export default SectionContainer;
