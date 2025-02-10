import { useState, useEffect } from "react"
import ChatMessage from "@/components/chat/ChatMessage"
import ChatInput from "@/components/chat/ChatInput"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OmniGuardService } from "@/services/omniguard"
import { type Message } from "@/types/chat"
import { useToast } from "@/components/ui/use-toast"
import { useUserConfiguration } from "@/hooks/useUserConfiguration"

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const { config } = useUserConfiguration()

  // Initialize OmniGuard service
  const omniguard = new OmniGuardService({
    site_url: window.location.origin,
    site_name: "OmniGuard Chat",
    selected_model: config.omni_model,
    system_prompt: config.omni_custom_config,
    developer_prompt: "You are a developer reviewing chat messages.",
    data_sharing_enabled: config.data_sharing_enabled
  })

  const handleSendMessage = async (content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      content,
      isUser: true,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Check message with OmniGuard
      const result = await omniguard.omniguardCheck([userMessage])
      
      // Update user message with OmniGuard result
      setMessages(prev => prev.map(msg => 
        msg === userMessage ? { ...msg, omniguardResult: result } : msg
      ))

      // If message is allowed, get assistant response
      if (result.action === "Allow") {
        const assistantResponse = await omniguard.processOmniGuardResult(result, [userMessage])
        
        if (assistantResponse) {
          // Add assistant message
          const assistantMessage: Message = {
            content: assistantResponse.content,
            isUser: false,
            timestamp: Date.now(),
            assistantResponse
          }
          
          // Check assistant message with OmniGuard
          const assistantResult = await omniguard.omniguardCheck([userMessage], assistantMessage.content)
          
          setMessages(prev => [...prev, {
            ...assistantMessage,
            omniguardResult: assistantResult
          }])
        }
      } else {
        // Show rejection message
        toast({
          title: "Message Rejected",
          description: result.details?.reason || "Your message was rejected by OmniGuard.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error processing message:", error)
      toast({
        title: "Error",
        description: "Failed to process your message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleEditMessage = (index: number) => {
    setMessages(prev =>
      prev.map((m, i) =>
        i === index ? { ...m, isEditing: !m.isEditing } : m
      )
    )
  }

  const updateMessage = async (index: number, newContent: string) => {
    const message = messages[index]
    if (!message) return

    setIsLoading(true)
    try {
      // Check edited message with OmniGuard
      const result = await omniguard.omniguardCheck([{
        ...message,
        content: newContent
      }])

      if (result.action === "Allow") {
        setMessages(prev =>
          prev.map((m, i) => 
            i === index ? {
              ...m,
              content: newContent,
              isEditing: false,
              edited: true,
              omniguardResult: result
            } : m
          )
        )
      } else {
        toast({
          title: "Edit Rejected",
          description: result.details?.reason || "Your edit was rejected by OmniGuard.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error updating message:", error)
      toast({
        title: "Error",
        description: "Failed to update your message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

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
                omniguardResult={message.omniguardResult}
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
      <div className="max-w-3xl mx-auto w-full p-4">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}

export default Chat
