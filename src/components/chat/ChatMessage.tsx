
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

type MessageStatus = "safe" | "unsafe" | "warning";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  animate?: boolean;
  safetyAssessment?: {
    safe: boolean;
    reason?: string;
  };
}

const ChatMessage = ({ 
  content, 
  isUser, 
  animate = true,
  safetyAssessment = { 
    safe: false,
    reason: "Test message - all messages are marked unsafe by default for testing"
  }
}: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const messageStatus: MessageStatus = safetyAssessment.safe ? "safe" : "unsafe";

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content]);

  const handleReport = () => {
    // TODO: Implement report functionality
    console.log(`Reporting message: ${content}`);
  };

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case "unsafe":
        return "outline outline-1 outline-destructive/30";
      case "warning":
        return "outline outline-1 outline-yellow-500/30";
      default:
        return "";
    }
  };

  return (
    <div
      ref={messageRef}
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start",
        animate && "animate-fade-in"
      )}
    >
      <div
        className={cn(
          "relative max-w-[80%] rounded-2xl p-4",
          isUser
            ? "bg-white/10 text-white glass-morphism"
            : "bg-white/5 text-white/90 neo-blur",
          !safetyAssessment.safe && getStatusColor(messageStatus)
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {content}
            </p>
            {!safetyAssessment.safe && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive/80"
                      onClick={handleReport}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Report this message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          {!safetyAssessment.safe && (
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-[10px]">
                UNSAFE
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-5 px-2 text-xs text-muted-foreground hover:text-foreground">
                      Details
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="space-y-2">
                    <p>Sent by: {isUser ? "You" : "Assistant"}</p>
                    <p>Length: {content.length} characters</p>
                    <p>Time: {new Date().toLocaleTimeString()}</p>
                    <p>Reason: {safetyAssessment.reason}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
