import * as React from "react"
import {
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronRight,
  Menu,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

/* ========================================================
   1. ATOMIC HEADER SUB-COMPONENTS
   ======================================================== */

/** Molécula: Breadcrumbs de Navegação do Header */
export interface HeaderBreadcrumbsProps {
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export function HeaderBreadcrumbs({
  breadcrumbs = [{ label: "Joinha DS" }, { label: "Documentação Oficial" }],
}: HeaderBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 type-body-sm text-xs text-muted-foreground">
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />}
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
  )
}

/** Átomo: Gatilho da Command Palette (Busca Rápida) com Kbd */
export interface HeaderCommandTriggerProps {
  onClick?: () => void
  placeholder?: string
  className?: string
}

export function HeaderCommandTrigger({
  onClick,
  placeholder = "Buscar componentes...",
  className,
}: HeaderCommandTriggerProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative hidden md:flex items-center w-56 cursor-pointer group",
        className
      )}
    >
      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
      <Input
        readOnly
        placeholder={placeholder}
        className="pl-8 pr-12 h-8 text-xs bg-surface-card border-border cursor-pointer group-hover:border-primary/50 transition-colors"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <Kbd className="text-[9px] px-1 py-0.5 shadow-none">⌘K</Kbd>
      </div>
    </div>
  )
}

/** Átomo: Alternador de Tema Dark/Light */
export interface HeaderThemeToggleProps {
  theme: "dark" | "light"
  onToggleTheme: () => void
}

export function HeaderThemeToggle({ theme, onToggleTheme }: HeaderThemeToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggleTheme}
      className="h-8 px-2.5 text-xs flex items-center gap-1.5 cursor-pointer font-sans"
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
  )
}

/* ========================================================
   2. ROOT ORGANISM: HEADER
   ======================================================== */

export interface HeaderProps {
  breadcrumbs?: Array<{ label: string; href?: string }>
  onOpenMobileMenu?: () => void
  theme: "dark" | "light"
  onToggleTheme: () => void
  onOpenCommand?: () => void
  showNotifications?: boolean
  showNewAction?: boolean
  newActionLabel?: string
  onNewAction?: () => void
  className?: string
  children?: React.ReactNode
}

export function Header({
  breadcrumbs,
  onOpenMobileMenu,
  theme,
  onToggleTheme,
  onOpenCommand,
  showNotifications = false,
  showNewAction = false,
  newActionLabel = "Novo Registro",
  onNewAction,
  className,
  children,
}: HeaderProps) {
  const handleCopyRegistry = () => {
    const cmd =
      "npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/tokens.json"
    navigator.clipboard.writeText(cmd)
    toast.success("Comando Shadcn CLI copiado!", { description: cmd })
  }

  return (
    <header
      className={cn(
        "min-h-[56px] h-14 shrink-0 border-b border-border bg-background/95 backdrop-blur-md px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-20 select-none",
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

        <HeaderBreadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      {/* Right: Search + Theme + CLI + GitHub */}
      <div className="flex items-center gap-2 sm:gap-3 h-full">
        {children || (
          <>
            <HeaderCommandTrigger onClick={onOpenCommand} />
            <HeaderThemeToggle theme={theme} onToggleTheme={onToggleTheme} />

            {/* CLI Quick Copy Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyRegistry}
              className="h-8 px-2.5 text-xs hidden lg:flex items-center gap-1.5 cursor-pointer font-mono text-muted-foreground hover:text-primary hover:border-primary"
              title="Copiar comando de instalação do registro Shadcn CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span>CLI</span>
            </Button>

            {/* GitHub Repository Link */}
            <a
              href="https://github.com/jeffdomingos/Joinha_DS"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-(--tc-radius-md) text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors inline-flex items-center justify-center cursor-pointer border border-transparent hover:border-border"
              aria-label="Ver repositório no GitHub"
              title="Ver repositório no GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            {/* Optional Notifications */}
            {showNotifications && (
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
                    <DropdownMenuLabel className="p-0 text-xs font-semibold">
                      Notificações
                    </DropdownMenuLabel>
                    <Badge variant="success" size="sm" dot>
                      2 novas
                    </Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-2.5 cursor-pointer">
                    <span className="text-xs font-semibold text-foreground">Novo Componente</span>
                    <span className="type-body-sm text-[11px] text-muted-foreground">
                      FloatingToolbar adicionado ao registry.
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Optional Primary Action */}
            {showNewAction && onNewAction && (
              <Button
                variant="primary"
                size="sm"
                onClick={onNewAction}
                className="h-8 px-3 text-xs flex items-center gap-1.5 cursor-pointer font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{newActionLabel}</span>
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  )
}
