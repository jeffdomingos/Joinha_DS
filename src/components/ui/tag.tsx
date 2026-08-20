import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-(--tc-radius-sm) type-ui-dense font-medium border transition-colors select-none",
  {
    variants: {
      variant: {
        purple:
          "bg-(--tag-purple-subtle) text-(--tag-purple-text) border-(--tag-purple-border)",
        pink:
          "bg-(--tag-pink-subtle) text-(--tag-pink-text) border-(--tag-pink-border)",
        teal:
          "bg-(--tag-teal-subtle) text-(--tag-teal-text) border-(--tag-teal-border)",
        indigo:
          "bg-(--tag-indigo-subtle) text-(--tag-indigo-text) border-(--tag-indigo-border)",
        gray:
          "bg-muted/60 text-muted-foreground border-border",
      },
      size: {
        sm: "text-[11px] px-1.5 py-0",
        default: "text-xs px-2 py-0.5",
        lg: "text-xs px-2.5 py-1 font-semibold",
      },
    },
    defaultVariants: {
      variant: "gray",
      size: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, size, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant, size }), className)} {...props} />
  )
}

export { Tag, tagVariants }
