import * as React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface HintBeaconProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  className?: string
  children?: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

export function HintBeacon({
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  className,
  children,
  side = "top",
}: HintBeaconProps) {
  const [open, setOpen] = React.useState(false)

  const handleDismiss = () => {
    setOpen(false)
    onDismiss?.()
  }

  const handleAction = () => {
    setOpen(false)
    onAction?.()
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {children}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={`Dica: ${title}`}
            className="relative flex h-4 w-4 items-center justify-center cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-xs [box-shadow:0_0_8px_oklch(67%_0.17_53_/_0.6)]" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          side={side}
          sideOffset={8}
          className="z-50 w-72 rounded-(--tc-radius-lg) bg-(--bg-surface-elevated) p-3.5 text-foreground shadow-xl border border-border/80 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 [box-shadow:var(--surface-highlight)]"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <h4 className="text-xs font-semibold font-display tracking-tight text-heading">
                {title}
              </h4>
            </div>
            <button
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-xs"
              aria-label="Fechar dica"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>

          <div className="mt-3 flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-[11px] px-2" onClick={handleDismiss}>
              Dispensar
            </Button>
            {actionLabel && (
              <Button variant="primary" size="sm" className="h-7 text-[11px] px-2.5" onClick={handleAction}>
                {actionLabel}
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
