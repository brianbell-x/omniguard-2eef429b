import { type OmniGuardResult } from "@/types/omniguard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

interface OmniGuardDetailsProps {
  result: OmniGuardResult
  isUser: boolean
}

const OmniGuardDetails = ({ result, isUser }: OmniGuardDetailsProps) => {
  const formatCost = (cost: number) => `$${cost.toFixed(4)}`
  const formatTime = (ms: number) => `${ms.toFixed(2)}ms`

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="details">
        <AccordionTrigger className="text-xs">
          OmniGuard Evaluation Details
        </AccordionTrigger>
        <AccordionContent className="space-y-4 text-xs">
          <div className="space-y-2">
            <h4 className="font-medium">Safety Assessment</h4>
            <div className="flex items-center gap-2">
              <Badge variant={result.action === "Allow" ? "default" : "destructive"}>
                {result.action}
              </Badge>
              {result.details?.reason && (
                <span className="text-muted-foreground">{result.details.reason}</span>
              )}
            </div>
            {result.details?.category && (
              <div>
                <span className="text-muted-foreground">Category: </span>
                <span>{result.details.category}</span>
              </div>
            )}
            {result.details?.severity && (
              <div>
                <span className="text-muted-foreground">Severity: </span>
                <span>{result.details.severity}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">Preparation: </span>
                <span>{formatTime(result.timings.prep)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">API Call: </span>
                <span>{formatTime(result.timings.api)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Processing: </span>
                <span>{formatTime(result.timings.process)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Time: </span>
                <span>{formatTime(result.timings.total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Token Usage</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">Prompt Tokens: </span>
                <span>{result.usage.prompt_tokens}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Completion Tokens: </span>
                <span>{result.usage.completion_tokens}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Tokens: </span>
                <span>{result.usage.total_tokens}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Cost Breakdown</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-muted-foreground">Input Cost: </span>
                <span>{formatCost(result.cost.inputCost)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Output Cost: </span>
                <span>{formatCost(result.cost.outputCost)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Cost: </span>
                <span>{formatCost(result.cost.totalCost)}</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default OmniGuardDetails