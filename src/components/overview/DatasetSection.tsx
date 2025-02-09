
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-medium text-base text-foreground">Download Complete Dataset</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
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
        <CollapsibleTrigger>
          <Button variant="ghost" className="flex items-center gap-2 text-sm font-medium">
            <ChevronDown className="w-4 h-4" />
            View Dataset Format Example
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-4 p-4 bg-black/20 rounded-md">
            <pre className="text-xs text-foreground/90 overflow-x-auto whitespace-pre">
              {datasetExample}
            </pre>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </SectionContainer>
  );
};

export default DatasetSection;
