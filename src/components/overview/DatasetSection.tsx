
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download } from "lucide-react";

interface DatasetSectionProps {
  datasetExample: string;
}

const DatasetSection = ({ datasetExample }: DatasetSectionProps) => {
  return (
    <section id="dataset" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Dataset</h2>
      <Card className="bg-card/50 border-white/10">
        <CardContent className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h3 className="font-medium text-base">Download Complete Dataset</h3>
              <p className="text-sm text-muted-foreground/80">
                Access the full conversation dataset in JSONL format
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          <Collapsible className="space-y-3">
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-muted-foreground/80 transition-colors">
              <ChevronDown className="w-4 h-4" />
              View Dataset Format Example
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 p-4 bg-black/20 rounded-md">
                <pre className="text-xs text-muted-foreground/90 overflow-x-auto whitespace-pre">
                  {datasetExample}
                </pre>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </section>
  );
};

export default DatasetSection;
