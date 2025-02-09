
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SectionContainer from "@/components/ui/section-container";

interface DatasetSectionProps {
  datasetExample: string;
}

const DatasetSection = ({ datasetExample }: DatasetSectionProps) => {
  const handleDownload = (format: 'jsonl' | 'csv') => {
    // TODO: Implement actual download logic
    console.log(`Downloading in ${format} format`);
  };

  return (
    <SectionContainer title="Data">
      <div className="border border-primary/20 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h3 className="font-medium text-base text-foreground">Download Dataset</h3>
            <p className="text-sm text-muted-foreground">
              1.2M+ entries • 450MB compressed
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4" />
                Download
              </Button>
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

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium w-full justify-start">
              <ChevronDown className="w-4 h-4 shrink-0" />
              View Dataset Format Example
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 p-4 bg-muted/50 rounded-md">
              <pre className="text-xs text-foreground/90 overflow-x-auto whitespace-pre">
                {datasetExample}
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </SectionContainer>
  );
};

export default DatasetSection;
