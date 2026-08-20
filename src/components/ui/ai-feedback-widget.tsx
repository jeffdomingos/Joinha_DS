import * as React from "react"
import { ThumbsUp, ThumbsDown, Copy, Check, Flag, MessageSquarePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface AIFeedbackWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  onThumbUp?: () => void
  onThumbDown?: () => void
  onReportHallucination?: () => void
  onRefinePrompt?: () => void
  onCopy?: () => void
  contentToCopy?: string
}

export function AIFeedbackWidget({
  onThumbUp,
  onThumbDown,
  onReportHallucination,
  onRefinePrompt,
  onCopy,
  contentToCopy,
  className,
  ...props
}: AIFeedbackWidgetProps) {
  const [rated, setRated] = React.useState<"up" | "down" | null>(null)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    onCopy?.()
  }

  const handleRate = (direction: "up" | "down") => {
    setRated(direction)
    if (direction === "up") onThumbUp?.()
    else onThumbDown?.()
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-(--tc-radius-md) bg-surface border border-border text-foreground text-xs",
        className
      )}
      {...props}
    >
      <TooltipProvider delayDuration={150}>
        {/* Thumbs Up */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => handleRate("up")}
              aria-label="Resposta útil"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-xs transition-colors cursor-pointer",
                rated === "up"
                  ? "bg-success/20 text-success font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">Resposta Útil</TooltipContent>
        </Tooltip>

        {/* Thumbs Down */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => handleRate("down")}
              aria-label="Resposta com erro ou inútil"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-xs transition-colors cursor-pointer",
                rated === "down"
                  ? "bg-destructive/20 text-destructive font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              )}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">Não foi útil</TooltipContent>
        </Tooltip>

        <div className="h-3.5 w-px bg-border/80 mx-0.5" />

        {/* Report Hallucination */}
        {onReportHallucination && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onReportHallucination}
                aria-label="Reportar alucinação"
                className="flex h-7 w-7 items-center justify-center rounded-xs text-muted-foreground hover:text-warning hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <Flag className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">Reportar Alucinação / Fato Incorreto</TooltipContent>
          </Tooltip>
        )}

        {/* Refine Prompt */}
        {onRefinePrompt && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onRefinePrompt}
                aria-label="Refinar prompt in-place"
                className="flex h-7 w-7 items-center justify-center rounded-xs text-muted-foreground hover:text-primary hover:bg-surface-hover transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">Refinar Instrução da IA</TooltipContent>
          </Tooltip>
        )}

        {/* Copy */}
        {contentToCopy && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copiar resposta"
                className="flex h-7 w-7 items-center justify-center rounded-xs text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">{copied ? "Copiado!" : "Copiar Resposta"}</TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  )
}
