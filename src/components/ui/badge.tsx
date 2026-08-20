import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-(--tc-radius-full) font-medium border transition-colors select-none leading-none tracking-normal",
  {
    variants: {
      variant: {
        success:
          "bg-(--status-success-subtle) text-(--status-success-text) border-(--status-success-border)",
        danger:
          "bg-(--status-danger-subtle) text-(--status-danger-text) border-(--status-danger-border)",
        warning:
          "bg-(--status-warning-subtle) text-(--status-warning-text) border-(--status-warning-border)",
        info:
          "bg-(--status-info-subtle) text-(--status-info-text) border-(--status-info-border)",
        neutral:
          "bg-secondary/60 text-secondary-foreground border-border",
        // Solid variants
        "success-solid":
          "bg-(--status-success-bg) text-(--status-success-fg) border-transparent font-semibold",
        "danger-solid":
          "bg-(--status-danger-bg) text-(--status-danger-fg) border-transparent font-semibold",
        "warning-solid":
          "bg-(--status-warning-bg) text-(--status-warning-fg) border-transparent font-semibold",
        "info-solid":
          "bg-(--status-info-bg) text-(--status-info-fg) border-transparent font-semibold",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px] pt-[0.5px]",
        default: "h-6 px-2.5 text-xs pt-[0.5px]",
        lg: "h-7 px-3 text-xs font-semibold pt-[0.5px]",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            variant === "success" || variant === "success-solid"
              ? "bg-(--status-success-text)"
              : variant === "danger" || variant === "danger-solid"
              ? "bg-(--status-danger-text)"
              : variant === "warning" || variant === "warning-solid"
              ? "bg-(--status-warning-text)"
              : variant === "info" || variant === "info-solid"
              ? "bg-(--status-info-text)"
              : "bg-muted-foreground"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
