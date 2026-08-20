import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md type-ui-base ring-offset-background transition-all duration-200 ease-(--tc-ease-smooth) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-(--tc-floating-item-gap) micro-press",
  {
    variants: {
      variant: {
        primary: "border-gradient-primary text-primary-foreground font-semibold hover:brightness-110 shadow-sm",
        secondary: "border-gradient-secondary text-secondary-foreground hover:brightness-110 shadow-xs",
        destructive: "border-gradient-destructive text-destructive-foreground font-semibold hover:brightness-110 shadow-sm",
        outline: "border-gradient-outline text-foreground hover:brightness-115 shadow-xs",
        ghost: "hover:bg-foreground/[0.06] hover:text-foreground",
        navItem: "border border-transparent bg-transparent text-muted-foreground hover:border-primary-ui/50 hover:text-primary-ui hover:bg-transparent data-[active=true]:bg-surface-hover data-[active=true]:text-foreground data-[active=true]:font-semibold data-[active=true]:border-border-strong data-[active=true]:shadow-xs",
      },
      size: {
        default: "h-(--tc-control-h-md) px-(--tc-control-px-md)",
        sm: "h-(--tc-control-h-sm) px-(--tc-control-px-sm) rounded-md",
        lg: "h-(--tc-control-h-lg) px-(--tc-control-px-lg) rounded-md",
        icon: "h-(--tc-control-h-md) w-(--tc-control-h-md) gap-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isActive?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, isActive = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        data-active={isActive ? "true" : undefined}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
