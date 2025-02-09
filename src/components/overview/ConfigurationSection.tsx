
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings, Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SectionContainer from "@/components/ui/section-container";

interface ConfigurationSectionProps {
  configurationXml: string;
}

const ConfigurationSection = ({ configurationXml }: ConfigurationSectionProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configurationXml);
      toast.success("Configuration copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy configuration");
    }
  };

  return (
    <SectionContainer title="Config">
      <Collapsible>
        <CollapsibleTrigger className="w-full">
          <Button variant="ghost" className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <span className="font-medium text-sm">View Configuration XML</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="absolute top-4 right-4"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <pre className="mt-4 bg-black/20 p-4 rounded-md overflow-x-auto text-xs text-foreground/90">
            {configurationXml}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </SectionContainer>
  );
};

export default ConfigurationSection;
