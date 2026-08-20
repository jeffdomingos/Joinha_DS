import * as React from "react"
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronRight,
  Menu,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  breadcrumbs?: Array<{ label: string; href?: string }>
  onOpenMobileMenu?: () => void
  theme: "dark" | "light"
  onToggleTheme: () => void
  densityMode?: "default" | "compact" | "comfortable"
  onDensityChange?: (mode: "default" | "compact" | "comfortable") => void
  onOpenCommand?: () => void
  onNewAction?: () => void
  className?: string
}

export function Header({
  breadcrumbs = [
    { label: "Joinha DS" },
    { label: "Documentação Oficial" },
  ],
  onOpenMobileMenu,
  theme,
  onToggleTheme,
  densityMode = "default",
  onDensityChange,
  onOpenCommand,
  onNewAction,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "min-h-[56px] h-14 shrink-0 border-b border-border bg-background/95 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-20",
        className
      )}
    >
      {/* Left: Mobile Menu Trigger + Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0 h-full">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-1.5 rounded-(--tc-radius-md) text-muted-foreground hover:text-foreground hover:bg-surface-hover cursor-pointer"
            aria-label="Abrir menu lateral"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1
            return (
              <React.Fragment key={idx}>
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />}
                <span
                  className={cn(
                    "truncate font-medium transition-colors",
                    isLast ? "text-foreground font-semibold" : "hover:text-foreground cursor-pointer"
                  )}
                >
                  {crumb.label}
                </span>
              </React.Fragment>
            )
          })}
        </nav>
      </div>

      {/* Right: Search Bar + Density Matrix + Theme + Actions */}
      <div className="flex items-center gap-2 sm:gap-3 h-full">
        {/* Quick Search Input */}
        <div
          onClick={onOpenCommand}
          className="relative hidden md:block w-60 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            readOnly
            placeholder="Buscar componentes..."
            className="pl-8 pr-12 h-8 text-xs bg-surface-card border-border cursor-pointer hover:border-primary/50 transition-colors"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground opacity-100">
            ⌘K
          </kbd>
        </div>

        {/* Global Density Mode Switcher */}
        <div className="hidden sm:flex items-center p-0.5 rounded-(--tc-radius-md) bg-surface-card border border-border">
          <span className="text-[10px] font-mono text-muted-foreground px-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-muted-foreground" />
          </span>
          <button
            type="button"
            onClick={() => onDensityChange?.("compact")}
            className={cn(
              "px-2 py-1 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
              densityMode === "compact"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Densidade Compacta (32px / Fiscal)"
          >
            Compact
          </button>
          <button
            type="button"
            onClick={() => onDensityChange?.("default")}
            className={cn(
              "px-2 py-1 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
              densityMode === "default"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Densidade Padrão (40px / SaaS)"
          >
            Default
          </button>
          <button
            type="button"
            onClick={() => onDensityChange?.("comfortable")}
            className={cn(
              "px-2 py-1 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
              densityMode === "comfortable"
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
            title="Densidade Confortável (48px / Executiva)"
          >
            Comfortable
          </button>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleTheme}
          className="h-8 px-2.5 text-xs flex items-center gap-1.5 cursor-pointer"
          title={`Alternar para ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-3.5 h-3.5 text-warning" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-foreground" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </Button>

        {/* Notifications Popover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative p-2 rounded-(--tc-radius-md) text-muted-foreground hover:text-foreground hover:bg-surface-hover cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Notificações"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-2">
              <DropdownMenuLabel className="p-0 text-xs font-semibold">Notificações</DropdownMenuLabel>
              <Badge variant="success" size="sm" dot>2 novas</Badge>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-2.5 cursor-pointer">
              <span className="text-xs font-semibold text-foreground">Novo Componente</span>
              <span className="text-[11px] text-muted-foreground">FloatingToolbar adicionado ao registry.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-2.5 cursor-pointer">
              <span className="text-xs font-semibold text-foreground">Tokens OKLCH</span>
              <span className="text-[11px] text-muted-foreground">Paleta calibrada para WCAG 2.2 AA.</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Optional New Action */}
        {onNewAction && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNewAction}
            className="h-8 px-3 text-xs flex items-center gap-1.5 cursor-pointer font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Novo Registro</span>
          </Button>
        )}
      </div>
    </header>
  )
}
