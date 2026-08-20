import * as React from "react"
import { ShieldAlert, ShieldCheck, AlertTriangle, Check, X, Edit3, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface HITLApprovalBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  actionType?: string
  impactSummary?: string
  severity?: "critical" | "warning" | "info"
  onApprove?: () => void
  onReject?: () => void
  onEdit?: () => void
  approveLabel?: string
  rejectLabel?: string
  editLabel?: string
  isLoading?: boolean
  resourceCount?: number
}

export function HITLApprovalBanner({
  title,
  description,
  actionType = "Ação Proposta por Agente de IA",
  impactSummary,
  severity = "warning",
  onApprove,
  onReject,
  onEdit,
  approveLabel = "Aprovar & Executar",
  rejectLabel = "Rejeitar Ação",
  editLabel = "Editar Parâmetros",
  isLoading = false,
  resourceCount,
  className,
  ...props
}: HITLApprovalBannerProps) {
  const config = {
    critical: {
      border: "border-destructive/60",
      bg: "bg-destructive/10",
      badge: "danger" as const,
      icon: ShieldAlert,
      glow: "[box-shadow:0_0_20px_oklch(48%_0.115_25_/_0.2)]",
      badgeText: "Ação Crítica / Irreversível",
    },
    warning: {
      border: "border-warning/60",
      bg: "bg-warning/10",
      badge: "warning" as const,
      icon: AlertTriangle,
      glow: "[box-shadow:0_0_20px_oklch(50%_0.105_85_/_0.15)]",
      badgeText: "Requer Aprovação Humana",
    },
    info: {
      border: "border-primary/60",
      bg: "bg-primary/10",
      badge: "info" as const,
      icon: ShieldCheck,
      glow: "[box-shadow:0_0_20px_oklch(67%_0.17_53_/_0.15)]",
      badgeText: "Revisão Recomendada",
    },
  }[severity]

  const Icon = config.icon

  return (
    <div
      role="alertdialog"
      aria-labelledby="hitl-banner-title"
      className={cn(
        "relative overflow-hidden rounded-(--tc-radius-xl) border bg-(--bg-surface-elevated) p-4 sm:p-5 text-foreground transition-all duration-300",
        config.border,
        config.glow,
        className
      )}
      {...props}
    >
      {/* Top Section: Icon & Explanatory Content */}
      <div className="flex items-start gap-3.5 w-full">
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border mt-0.5", config.bg, config.border)}>
          <Icon className="h-5 w-5 text-foreground" />
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={config.badge} size="sm" className="gap-1 font-semibold shrink-0">
              <Lock className="h-2.5 w-2.5" />
              {config.badgeText}
            </Badge>
            <span className="text-[11px] font-mono text-muted-foreground">· {actionType}</span>
            {resourceCount !== undefined && (
              <Badge variant="neutral" size="sm" className="font-mono text-[10px] shrink-0">
                {resourceCount} recursos afetados
              </Badge>
            )}
          </div>

          <h3 id="hitl-banner-title" className="text-sm sm:text-base font-bold font-display tracking-tight text-foreground">
            {title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>

          {impactSummary && (
            <div className="mt-2.5 inline-block rounded-md bg-surface p-2.5 text-xs text-foreground font-mono border border-border/80">
              <strong className="text-primary font-sans font-semibold">Impacto Estimado: </strong>
              {impactSummary}
            </div>
          )}
        </div>
      </div>

      {/* Action Controls Footer */}
      {(onEdit || onReject || onApprove) && (
        <div className="mt-4 pt-3 border-t border-border/40 flex flex-wrap items-center justify-end gap-2.5 w-full">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5"
              onClick={onEdit}
              disabled={isLoading}
            >
              <Edit3 className="h-3 w-3" />
              <span>{editLabel}</span>
            </Button>
          )}

          {onReject && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-destructive"
              onClick={onReject}
              disabled={isLoading}
            >
              <X className="h-3.5 w-3.5" />
              <span>{rejectLabel}</span>
            </Button>
          )}

          {onApprove && (
            <Button
              variant={severity === "critical" ? "destructive" : "primary"}
              size="sm"
              className="h-8 text-xs gap-1.5 font-semibold"
              onClick={onApprove}
              disabled={isLoading}
            >
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>{approveLabel}</span>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
