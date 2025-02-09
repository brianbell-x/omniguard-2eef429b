
import { useState } from "react";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  content: string;
  isUser: boolean;
  isEditing?: boolean;
  edited?: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    setMessages((prev) => [...prev, { content, isUser: true }]);
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: "This is a simulated response. Connect to an AI API to get real responses!",
          isUser: false,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const toggleEditMessage = (index: number) => {
    setMessages(prev =>
      prev.map((m, i) =>
        i === index ? { ...m, isEditing: !m.isEditing } : m
      )
    );
  };

  const updateMessage = (index: number, newContent: string) => {
    setMessages(prev =>
      prev.map((m, i) => 
        i === index ? { ...m, content: newContent, isEditing: false, edited: true } : m
      )
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-background">
      <ScrollArea className="flex-1">
        <div className="px-4 py-4">
          <div className="max-w-3xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isUser={message.isUser}
                isEditing={message.isEditing}
                edited={message.edited}
                onEdit={() => toggleEditMessage(index)}
                onSave={(content) => updateMessage(index, content)}
                onCancel={() => toggleEditMessage(index)}
              />
            ))}
            {isLoading && (
              <ChatMessage
                content="..."
                isUser={false}
                animate={false}
              />
            )}
          </div>
        </div>
      </ScrollArea>
      <div className="max-w-3xl mx-auto w-full">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Index;
