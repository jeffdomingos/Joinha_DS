import * as React from "react"
import { Sparkles, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface BannerAnnouncementProps extends React.HTMLAttributes<HTMLDivElement> {
  badgeText?: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  dismissible?: boolean
}

export function BannerAnnouncement({
  badgeText = "Novo",
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  dismissible = true,
  className,
  ...props
}: BannerAnnouncementProps) {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      role="region"
      aria-label="Anúncio de novidade"
      className={cn(
        "relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-(--tc-radius-lg) bg-surface-elevated/70 border border-primary/30 [box-shadow:0_0_16px_oklch(67%_0.17_53_/_0.08)] backdrop-blur-xs transition-all duration-300 ease-(--tc-ease-smooth)",
        className
      )}
      {...props}
    >
      <div className="flex items-start sm:items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {badgeText && (
            <Badge variant="info" size="sm" className="font-bold">
              {badgeText}
            </Badge>
          )}
          <span className="font-semibold text-xs text-foreground tracking-tight">{title}</span>
          {description && (
            <span className="text-xs text-muted-foreground hidden md:inline">
              — {description}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        {actionLabel && (
          <Button
            variant="primary"
            size="sm"
            className="h-7 text-xs gap-1.5 px-3"
            onClick={onAction}
          >
            <span>{actionLabel}</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        )}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dispensar anúncio"
            className="text-muted-foreground hover:text-foreground p-1 rounded-xs transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
