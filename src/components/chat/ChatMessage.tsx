import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flag, Pencil, Check, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import OmniGuardDetails from "./OmniGuardDetails"
import { type OmniGuardResult } from "@/types/omniguard"

interface ChatMessageProps {
  content: string
  isUser: boolean
  animate?: boolean
  isEditing?: boolean
  edited?: boolean
  onEdit?: () => void
  onSave?: (content: string) => void
  onCancel?: () => void
  omniguardResult?: OmniGuardResult
}

const ChatMessage = ({ 
  content, 
  isUser, 
  animate = true,
  isEditing = false,
  edited = false,
  onEdit,
  onSave,
  onCancel,
  omniguardResult
}: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null)
  const [tempContent, setTempContent] = useState(content)
  const isSafe = omniguardResult?.action === "Allow"

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [content])

  useEffect(() => {
    if (isEditing) {
      setTempContent(content)
    }
  }, [isEditing, content])

  const handleReport = () => {
    console.log(`Reporting message: ${content}`)
  }

  const handleSave = () => {
    if (onSave && tempContent.trim()) {
      onSave(tempContent)
    }
  }

  const getStatusColor = (action?: OmniGuardResult["action"]) => {
    switch (action) {
      case "UserRefusal":
      case "AssistantRefusal":
        return "outline outline-1 outline-destructive/30"
      case "Allow":
        return ""
      default:
        return "outline outline-1 outline-yellow-500/30" // For undefined/loading state
    }
  }

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
          omniguardResult && getStatusColor(omniguardResult.action)
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            {isEditing ? (
              <div className="w-full space-y-2">
                <Textarea
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  className="min-h-[60px] resize-none bg-background/50"
                  placeholder="Edit your message..."
                />
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-green-500 hover:text-green-400"
                    onClick={handleSave}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive/80"
                    onClick={onCancel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {content}
                  </p>
                  {edited && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-xs text-muted-foreground">(edited)</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This message has been edited</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isUser && onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      onClick={onEdit}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {!isSafe && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive/80"
                      onClick={handleReport}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          
          {omniguardResult && !isSafe && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="destructive" className="text-[10px]">
                  {omniguardResult.action.toUpperCase()}
                </Badge>
                {omniguardResult.details?.reason && (
                  <span className="text-xs text-muted-foreground">
                    {omniguardResult.details.reason}
                  </span>
                )}
              </div>
              <OmniGuardDetails result={omniguardResult} isUser={isUser} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
