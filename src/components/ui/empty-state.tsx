import * as React from "react"
import { FolderSearch } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ElementType
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon = FolderSearch,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[260px] flex-col items-center justify-center rounded-(--tc-radius-xl) border border-dashed border-border/80 bg-surface-elevated/20 p-8 text-center animate-in fade-in duration-300",
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-hover border border-border text-muted-foreground shadow-xs">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold font-display text-foreground tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
