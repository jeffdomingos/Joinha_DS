import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border bg-surface shadow-xs",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-display font-bold text-xs",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  total?: number
}

function AvatarGroup({ className, children, max, total, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const count = total ?? childrenArray.length
  const displayed = max ? childrenArray.slice(0, max) : childrenArray
  const remaining = max && count > max ? count - max : 0

  return (
    <div className={cn("flex items-center -space-x-2.5", className)} {...props}>
      {displayed.map((child, index) => (
        <div key={index} className="ring-2 ring-(--bg-base) rounded-full">
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-(--bg-surface-elevated) font-mono text-[11px] font-bold text-muted-foreground ring-2 ring-(--bg-base)">
          +{remaining}
        </div>
      )}
    </div>
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
