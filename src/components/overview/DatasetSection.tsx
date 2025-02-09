
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DatasetSectionProps {
  datasetExample: string;
}

const DatasetSection = ({ datasetExample }: DatasetSectionProps) => {
  const handleDownload = (format: 'jsonl' | 'csv') => {
    // TODO: Implement actual download logic
    console.log(`Downloading in ${format} format`);
  };

  return (
    <section id="dataset" className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Dataset</h2>
      <Card className="bg-card/50 border-white/10">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-medium text-base">Download Complete Dataset</h3>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 transition-colors text-white">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDownload('jsonl')}>
                  JSONL Format
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('csv')}>
                  CSV Format
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Collapsible className="space-y-3">
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-[#0EA5E9] hover:text-[#0EA5E9]/80 transition-colors">
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
