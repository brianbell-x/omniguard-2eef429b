
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Settings } from "lucide-react";

interface ConfigurationSectionProps {
  configurationXml: string;
}

const ConfigurationSection = ({ configurationXml }: ConfigurationSectionProps) => {
  return (
    <section id="configuration" className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight text-center">Configuration</h2>
      <Card className="bg-card/50 border-white/10">
        <Collapsible>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-6">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <span className="font-medium">View Configuration XML</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <pre className="bg-black/20 p-4 rounded-md overflow-x-auto text-sm">
                {configurationXml}
              </pre>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </section>
  );
};

export default ConfigurationSection;
