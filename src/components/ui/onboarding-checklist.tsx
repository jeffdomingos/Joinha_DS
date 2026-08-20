import * as React from "react"
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Sparkles, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface OnboardingStep {
  id: string
  title: string
  description?: string
  completed: boolean
  actionLabel?: string
  onAction?: () => void
}

export interface OnboardingChecklistProps {
  title?: string
  subtitle?: string
  steps: OnboardingStep[]
  docked?: boolean
  collapsible?: boolean
  defaultExpanded?: boolean
  onDismiss?: () => void
  className?: string
}

export function OnboardingChecklist({
  title = "Primeiros Passos no Workspace",
  subtitle = "Complete as etapas abaixo para desbloquear o potencial máximo.",
  steps,
  docked = false,
  collapsible = true,
  defaultExpanded = true,
  onDismiss,
  className,
}: OnboardingChecklistProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  const completedCount = steps.filter((s) => s.completed).length
  const progressPercent = Math.round((completedCount / steps.length) * 100)
  const isAllDone = completedCount === steps.length

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={cn(
        "rounded-(--tc-radius-xl) bg-(--bg-surface-elevated) border border-border text-foreground shadow-2xl transition-all duration-300 ease-(--tc-ease-smooth) overflow-hidden [box-shadow:var(--surface-highlight)]",
        docked && "fixed bottom-6 right-6 z-40 w-full max-w-sm sm:max-w-md animate-in slide-in-from-bottom-5",
        !docked && "w-full",
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border/80 bg-surface/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-hover text-foreground border border-border">
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold font-display tracking-tight text-heading">
                  {title}
                </h3>
                {isAllDone ? (
                  <Badge variant="success" size="sm">Concluído 🎉</Badge>
                ) : (
                  <Badge variant="neutral" size="sm">{progressPercent}%</Badge>
                )}
              </div>
              {subtitle && isExpanded && (
                <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {collapsible && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-xs transition-colors"
                aria-label={isExpanded ? "Minimizar checklist" : "Expandir checklist"}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            )}
            {onDismiss && (
              <button
                type="button"
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground p-1 rounded-xs transition-colors"
                aria-label="Fechar checklist"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs font-sans text-muted-foreground">
            <span>{completedCount} de {steps.length} etapas concluídas</span>
            <span className="font-bold text-primary font-mono">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} variant={isAllDone ? "success" : "default"} className="h-1.5" />
        </div>
      </div>

      {/* Steps List */}
      {isExpanded && (
        <div className="p-3 space-y-2 max-h-[320px] overflow-y-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "group flex items-start gap-3 p-3 rounded-(--tc-radius-md) transition-all duration-200 ease-(--tc-ease-smooth)",
                step.completed
                  ? "bg-surface/30 opacity-80"
                  : "bg-surface/60 hover:bg-surface-hover/60"
              )}
            >
              <div className="mt-0.5 shrink-0">
                {step.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold tracking-tight",
                      step.completed ? "line-through text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.actionLabel && !step.completed && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-[10px] px-2 gap-1 shrink-0 border-border hover:border-primary"
                      onClick={step.onAction}
                    >
                      <span>{step.actionLabel}</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </Button>
                  )}
                </div>
                {step.description && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {step.description}
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
