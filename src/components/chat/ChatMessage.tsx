
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

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
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isUser
            ? "bg-white/10 text-white glass-morphism"
            : "bg-white/5 text-white/90 neo-blur"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
