import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 rounded-(--tc-radius-sm) font-medium border transition-colors select-none leading-none tracking-normal",
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
        // Reaproveita os tokens de STATUS (warning=ambar, success=verde) em vez de
        // inventar OKLCH novo -- util pra tags que precisam de amarelo/verde sem sair
        // da paleta ja existente do DS (ex: representar branding de plataformas
        // externas como InHire=amarelo, Greenhouse=verde).
        amber:
          "bg-(--status-warning-subtle) text-(--status-warning-text) border-(--status-warning-border)",
        green:
          "bg-(--status-success-subtle) text-(--status-success-text) border-(--status-success-border)",
        gray:
          "bg-muted/60 text-muted-foreground border-border",
      },
      size: {
        sm: "h-5 px-1.5 text-[11px] pt-[0.5px]",
        default: "h-6 px-2.5 text-xs pt-[0.5px]",
        lg: "h-7 px-3 text-xs font-semibold pt-[0.5px]",
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
