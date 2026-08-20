import * as React from "react"
import { Sparkles, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Database, ExternalLink, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export interface ConfidenceMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number // 0 to 100
  label?: string
  showBar?: boolean
  sourceCount?: number
  compact?: boolean
}

export function ConfidenceMeter({
  score,
  label = "Confiança da IA",
  showBar = true,
  sourceCount,
  compact = false,
  className,
  ...props
}: ConfidenceMeterProps) {
  const getVariant = (val: number) => {
    if (val >= 90) return { badge: "success" as const, text: "Alta Confiança", color: "text-success", bg: "bg-success" }
    if (val >= 70) return { badge: "warning" as const, text: "Média Confiança", color: "text-warning", bg: "bg-warning" }
    return { badge: "danger" as const, text: "Atenção / Baixa", color: "text-destructive", bg: "bg-destructive" }
  }

  const variant = getVariant(score)

  if (compact) {
    return (
      <div className={cn("inline-flex items-center gap-1.5 font-mono text-xs", className)} {...props}>
        <span className={cn("inline-block h-2 w-2 rounded-full", variant.bg)} />
        <span className="font-semibold text-foreground">{score}%</span>
        {sourceCount !== undefined && (
          <span className="text-[10px] text-muted-foreground">({sourceCount} fontes)</span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-(--tc-radius-lg) border border-border bg-surface-elevated/40 p-3 text-foreground transition-all",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-foreground">{label}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {sourceCount !== undefined && (
            <Badge variant="neutral" size="sm" className="gap-1 text-[10px] font-mono">
              <Database className="h-2.5 w-2.5" />
              <span>{sourceCount} fontes</span>
            </Badge>
          )}
          <Badge variant={variant.badge} size="sm" className="font-mono font-bold">
            {score}% · {variant.text}
          </Badge>
        </div>
      </div>

      {showBar && (
        <Progress value={Math.min(100, Math.max(0, score))} className="mt-2.5 h-1.5" />
      )}
    </div>
  )
}

export interface ReasoningStep {
  title: string
  detail?: string
  status?: "done" | "in_progress" | "warning"
  durationMs?: number
  source?: string
}

export interface ReasoningTraceProps {
  steps: ReasoningStep[]
  defaultOpen?: boolean
  title?: string
  executionTimeMs?: number
  className?: string
}

export function ReasoningTrace({
  steps,
  defaultOpen = false,
  title = "Raciocínio & Grounding (Chain-of-Thought)",
  executionTimeMs,
  className,
}: ReasoningTraceProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div
      className={cn(
        "rounded-(--tc-radius-lg) border border-border/80 bg-surface/50 overflow-hidden text-foreground text-xs",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-3 text-left hover:bg-surface-elevated/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-foreground">{title}</span>
          <Badge variant="neutral" size="sm" className="font-mono text-[10px]">
            {steps.length} etapas
          </Badge>
          {executionTimeMs !== undefined && (
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
              <Clock className="h-3 w-3" />
              {executionTimeMs}ms
            </span>
          )}
        </div>

        <div className="text-muted-foreground hover:text-foreground">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-border/60 p-3.5 space-y-3 bg-surface-elevated/20 animate-in fade-in-0 duration-200">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs">
              <div className="mt-0.5 shrink-0">
                {step.status === "warning" ? (
                  <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{step.title}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {step.durationMs !== undefined && (
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {step.durationMs}ms
                      </span>
                    )}
                    {step.source && (
                      <span className="flex items-center gap-0.5 text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20">
                        <ExternalLink className="h-2.5 w-2.5" />
                        {step.source}
                      </span>
                    )}
                  </div>
                </div>
                {step.detail && (
                  <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed font-mono bg-surface/60 p-1.5 rounded border border-border/40">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
