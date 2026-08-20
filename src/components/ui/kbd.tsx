import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const kbdVariants = cva(
  "inline-flex items-center justify-center rounded-(--tc-radius-xs) border border-border bg-(--bg-surface-elevated) font-mono font-medium text-muted-foreground shadow-xs select-none [box-shadow:0_1px_0_1px_rgba(0,0,0,0.2)]",
  {
    variants: {
      size: {
        sm: "h-4 min-w-4 px-1 text-[10px]",
        default: "h-5 min-w-5 px-1.5 text-[11px]",
        lg: "h-6 min-w-6 px-2 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export function Kbd({ className, size, children, ...props }: KbdProps) {
  return (
    <kbd className={cn(kbdVariants({ size, className }))} {...props}>
      {children}
    </kbd>
  )
}
