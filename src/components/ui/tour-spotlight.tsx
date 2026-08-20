import * as React from "react"
import { ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface TourStep {
  title: string
  description: string
  targetSelector?: string
  position?: "top" | "bottom" | "left" | "right" | "center"
}

export interface TourSpotlightProps {
  steps: TourStep[]
  currentStepIndex: number
  isOpen: boolean
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  onComplete?: () => void
  className?: string
}

export function TourSpotlight({
  steps,
  currentStepIndex,
  isOpen,
  onNext,
  onPrev,
  onClose,
  onComplete,
  className,
}: TourSpotlightProps) {
  const currentStep = steps[currentStepIndex]
  const isFirst = currentStepIndex === 0
  const isLast = currentStepIndex === steps.length - 1

  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowRight" || e.key === "Enter") {
        if (isLast) {
          onComplete ? onComplete() : onClose()
        } else {
          onNext()
        }
      } else if (e.key === "ArrowLeft" && !isFirst) {
        onPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, isFirst, isLast, onNext, onPrev, onClose, onComplete])

  if (!isOpen || !currentStep) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Tour: ${currentStep.title}`}
        className={cn(
          "relative w-full max-w-md rounded-(--tc-radius-xl) bg-(--bg-surface-modal) p-5 text-foreground shadow-2xl border border-primary/40 [box-shadow:0_0_24px_oklch(67%_0.17_53_/_0.2)] animate-in zoom-in-95 duration-200",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-hover text-foreground border border-border">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="info" size="sm" className="font-sans font-medium text-xs">
                  {currentStepIndex + 1} de {steps.length}
                </Badge>
                <h3 className="text-sm font-semibold font-display text-heading tracking-tight">
                  {currentStep.title}
                </h3>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Pular tour"
            className="text-muted-foreground hover:text-foreground p-1 rounded-xs transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
          {currentStep.description}
        </p>

        {/* Step dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === currentStepIndex
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-surface-elevated border border-border"
              )}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            Pular Tour (Esc)
          </Button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1"
                onClick={onPrev}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Anterior</span>
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={isLast ? (onComplete ? onComplete : onClose) : onNext}
            >
              <span>{isLast ? "Concluir Tour" : "Próximo"}</span>
              {!isLast && <ChevronRight className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
