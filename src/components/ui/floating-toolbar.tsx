import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface FloatingToolbarItemProps {
  icon: React.ReactNode
  label: string
  shortcut?: string
  onClick?: () => void
  active?: boolean
  disabled?: boolean
  className?: string
  badge?: string | number
}

export function FloatingToolbarItem({
  icon,
  label,
  shortcut,
  onClick,
  active,
  disabled,
  className,
  badge,
}: FloatingToolbarItemProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-(--tc-radius-md) text-muted-foreground transition-all duration-200 ease-(--tc-ease-smooth) hover:text-foreground hover:bg-surface-hover/80 hover:scale-105 active:scale-95 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
              active && "bg-primary/15 text-primary border border-primary/30 shadow-xs [box-shadow:0_0_8px_oklch(67%_0.17_53_/_0.25)]",
              className
            )}
            aria-label={label}
          >
            {icon}
            {badge !== undefined && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground font-mono">
                {badge}
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={8} className="text-xs">
          <div className="flex items-center gap-1.5">
            <span>{label}</span>
            {shortcut && (
              <kbd className="rounded-xs bg-muted/80 px-1 py-0.5 text-[10px] font-mono text-muted-foreground">
                {shortcut}
              </kbd>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export interface FloatingToolbarSeparatorProps {
  className?: string
}

export function FloatingToolbarSeparator({ className }: FloatingToolbarSeparatorProps) {
  return <div className={cn("h-4 w-px bg-border/80 mx-1", className)} />
}

export interface FloatingToolbarProps {
  children: React.ReactNode
  position?: "bottom-center" | "bottom-right" | "bottom-left" | "top-center"
  collapsible?: boolean
  defaultCollapsed?: boolean
  className?: string
}

export function FloatingToolbar({
  children,
  position = "bottom-center",
  collapsible = true,
  defaultCollapsed = false,
  className,
}: FloatingToolbarProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  const positionClasses = {
    "bottom-center": "bottom-6 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-center": "top-6 left-1/2 -translate-x-1/2",
  }

  return (
    <aside
      role="toolbar"
      aria-label="Barra de ferramentas flutuante"
      className={cn(
        "fixed z-50 flex items-center gap-1.5 p-1.5 rounded-(--tc-radius-xl) bg-(--bg-surface-elevated)/85 backdrop-blur-md border border-border text-foreground shadow-2xl transition-all duration-300 ease-(--tc-ease-smooth) [box-shadow:var(--surface-highlight),0_12px_32px_rgba(0,0,0,0.35)] animate-in fade-in slide-in-from-bottom-3",
        positionClasses[position],
        collapsed && "p-1 rounded-full",
        className
      )}
    >
      {!collapsed ? (
        <>
          <div className="flex items-center gap-1">{children}</div>

          {collapsible && (
            <>
              <FloatingToolbarSeparator />
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setCollapsed(true)}
                      className="flex h-7 w-7 items-center justify-center rounded-(--tc-radius-md) text-muted-foreground hover:text-foreground hover:bg-surface-hover/80 transition-colors p-1 cursor-pointer"
                      aria-label="Minimizar barra de ferramentas"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" sideOffset={8} className="text-xs">
                    Minimizar Dock
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </>
      ) : (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-md cursor-pointer"
                aria-label="Expandir barra de ferramentas"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className="text-xs">
              Expandir Menu Flutuante
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </aside>
  )
}
