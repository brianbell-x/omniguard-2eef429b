
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings, Copy } from "lucide-react";
import { toast } from "sonner";
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
    <SectionContainer title="Configuration">
      <Collapsible>
        <CollapsibleTrigger className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#38BDF8]" />
            <span className="font-medium text-sm text-gray-100">View Configuration XML</span>
          </div>
          <ChevronDown className="w-4 h-4 text-[#38BDF8]" />
        </CollapsibleTrigger>
        <CollapsibleContent className="relative">
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-md hover:bg-white/10 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <pre className="mt-4 bg-black/20 p-4 rounded-md overflow-x-auto text-xs text-gray-300">
            {configurationXml}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </SectionContainer>
  );
};

export default ConfigurationSection;
