
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  animate?: boolean;
}

const ChatMessage = ({ content, isUser, animate = true }: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [content]);

  const handleReport = () => {
    // TODO: Implement report functionality
    console.log(`Reporting message: ${content}`);
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
          "max-w-[80%] rounded-2xl overflow-hidden",
          isUser
            ? "bg-white/10 text-white glass-morphism"
            : "bg-white/5 text-white/90 neo-blur"
        )}
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="message-details" className="border-none">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-left">
                {content}
              </p>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-3 text-sm text-white/70">
              <div className="space-y-2">
                <p>Sent by: {isUser ? 'You' : 'Assistant'}</p>
                <p>Length: {content.length} characters</p>
                <p>Time: {new Date().toLocaleTimeString()}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={handleReport}
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Report Message
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ChatMessage;
