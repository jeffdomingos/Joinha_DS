import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Check,
  Plus,
  LogOut,
  Building2,
  BookOpen,
  Layers,
  Palette,
  LayoutGrid,
  Bot,
  Terminal,
  Compass,
  Box,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrandSymbol } from "@/components/ui/brand-symbol"
import { Tag } from "@/components/ui/tag"
import { cn } from "@/lib/utils"

export interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: {
    text: string
    variant?: "success" | "warning" | "danger" | "info" | "neutral"
  }
}

export interface NavGroup {
  groupLabel?: string
  items: NavItem[]
}

const defaultNavGroups: NavGroup[] = [
  {
    groupLabel: "Documentação & Guias",
    items: [
      { id: "docs-overview", label: "Visão Geral & Filosofia", icon: BookOpen },
      { id: "docs-tokens", label: "Tokens de Design & OKLCH", icon: Palette },
      { id: "docs-layout", label: "Enterprise Layout & Densidade", icon: LayoutGrid },
      { id: "docs-xai", label: "Padrões XAI & HITL", icon: Bot },
      { id: "docs-cli", label: "Instalação via Shadcn CLI", icon: Terminal, badge: { text: "npx", variant: "info" } },
    ],
  },
  {
    groupLabel: "Componentes (50 Itens)",
    items: [
      {
        id: "lab-all",
        label: "Todos os Componentes",
        icon: Layers,
        badge: { text: "50", variant: "neutral" },
      },
      {
        id: "lab-primitives",
        label: "Primitivos & Controles",
        icon: Box,
        badge: { text: "18", variant: "neutral" },
      },
      {
        id: "lab-layout",
        label: "Navegação & Layout",
        icon: LayoutGrid,
        badge: { text: "10", variant: "neutral" },
      },
      {
        id: "lab-data",
        label: "Visualização de Dados",
        icon: BarChart3,
        badge: { text: "7", variant: "neutral" },
      },
      {
        id: "lab-onboarding",
        label: "Onboarding & Adoção",
        icon: Compass,
        badge: { text: "5", variant: "neutral" },
      },
      {
        id: "lab-xai",
        label: "XAI & Human-in-the-Loop",
        icon: Sparkles,
        badge: { text: "5", variant: "neutral" },
      },
    ],
  },
  {
    groupLabel: "Templates & Exemplos Live",
    items: [
      {
        id: "template-dashboard",
        label: "Template: SaaS Executive",
        icon: LayoutDashboard,
        badge: { text: "Demo", variant: "success" },
      },
    ],
  },
]

const workspaces = [
  { id: "v1-latest", name: "Joinha DS v1.0.0", plan: "Oficial" },
  { id: "oklch-reg", name: "Shadcn Registry (50)", plan: "CLI Ready" },
  { id: "gh-template", name: "GitHub Starter Template", plan: "React 19" },
]

export interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  activeItem?: string
  onSelectItem?: (id: string) => void
  showWorkspaceSwitcher?: boolean
  brandTitle?: string
  brandSubtitle?: string
  workspacesList?: Array<{ id: string; name: string; plan: string }>
  className?: string
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  activeItem = "dashboard",
  onSelectItem,
  showWorkspaceSwitcher = false,
  brandTitle = "Joinha DS",
  brandSubtitle = "Design System v1.0",
  workspacesList = workspaces,
  className,
}: SidebarProps) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(workspacesList[0] || workspaces[0])

  return (
    <aside
      className={cn(
        "relative flex flex-col justify-between h-screen shrink-0 border-r border-border bg-surface-card select-none transition-all duration-300 ease-(--tc-ease-smooth) z-30",
        collapsed ? "w-[68px]" : "w-64",
        className
      )}
    >
      {/* Top Header: Brand (with optional Workspace Switcher) */}
      <div className="min-h-[56px] h-14 shrink-0 px-3 py-2.5 border-b border-border flex items-center">
        {showWorkspaceSwitcher ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-(--tc-radius-md) hover:bg-surface-hover hover:border-gradient-subtle transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary text-left cursor-pointer",
                  collapsed && "justify-center px-1"
                )}
              >
                {/* Brand Avatar */}
                <div className="w-8 h-8 rounded-(--tc-radius-md) bg-primary flex items-center justify-center text-primary-foreground font-bold font-display shrink-0 p-1 shadow-xs">
                  <BrandSymbol className="h-5.5 w-auto text-primary-foreground" />
                </div>

                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between min-w-0">
                    <div className="flex flex-col min-w-0">
                      <span className="font-display font-bold text-sm tracking-tight text-foreground truncate">
                        {selectedWorkspace.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground truncate font-medium">
                        {selectedWorkspace.plan} Workspace
                      </span>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0 ml-1" />
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="text-xs text-muted-foreground font-sans font-medium">
                Alternar Organização
              </DropdownMenuLabel>
              {workspacesList.map((ws) => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => setSelectedWorkspace(ws)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <div className="flex flex-col">
                      <span className="font-medium text-xs">{ws.name}</span>
                      <span className="text-[10px] text-muted-foreground">{ws.plan}</span>
                    </div>
                  </div>
                  {selectedWorkspace.id === ws.id && (
                    <Check className="w-3.5 h-3.5 text-primary" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer text-primary">
                <Plus className="w-4 h-4" />
                <span className="text-xs font-semibold">Novo Workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          /* Clean, dedicated DS Brand Header */
          <div
            className={cn(
              "w-full flex items-center gap-3 p-1.5 rounded-(--tc-radius-md)",
              collapsed && "justify-center px-0"
            )}
          >
            <div className="w-8 h-8 rounded-(--tc-radius-md) bg-primary flex items-center justify-center text-primary-foreground font-bold font-display shrink-0 p-1 shadow-xs">
              <BrandSymbol className="h-5.5 w-auto text-primary-foreground" />
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm tracking-tight text-foreground truncate">
                    {brandTitle}
                  </span>
                  <Badge variant="info" size="sm" className="text-[9px] py-0 px-1 font-medium font-sans">
                    v1.0
                  </Badge>
                </div>
                <span className="text-[11px] text-muted-foreground truncate font-medium font-sans">
                  {brandSubtitle}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6 scrollbar-thin">
        {defaultNavGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && group.groupLabel && (
              <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80 font-sans">
                {group.groupLabel}
              </div>
            )}

            <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.id

                return (
                  <Button
                    key={item.id}
                    variant="navItem"
                    isActive={isActive}
                    onClick={() => onSelectItem?.(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group text-xs font-medium cursor-pointer",
                      collapsed
                        ? "w-10 h-10 p-0 justify-center"
                        : "w-full justify-between px-2.5 py-2 h-auto gap-3"
                    )}
                  >
                    <div className={cn("flex items-center min-w-0", !collapsed && "gap-3")}>
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <Badge
                        variant={item.badge.variant || "neutral"}
                        size="sm"
                        className="text-[10px] px-1.5 py-0 leading-tight"
                      >
                        {item.badge.text}
                      </Badge>
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer: User Profile & Collapse Toggle */}
      <div className="p-3 border-t border-border space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-full flex items-center gap-2.5 p-1.5 rounded-(--tc-radius-md) hover:bg-surface-hover transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary text-left",
                collapsed && "justify-center p-1"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs shrink-0 border border-border">
                JD
              </div>

              {!collapsed && (
                <div className="flex flex-1 items-center justify-between min-w-0">
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-xs text-foreground truncate leading-tight">
                      Jefferson D.
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate leading-tight">
                      jeff@temcomo.design
                    </span>
                  </div>
                  <Tag variant="purple" size="sm" className="ml-1 text-[10px] px-1 py-0">
                    PRO
                  </Tag>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="right" className="w-52">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Settings className="w-4 h-4" /> Preferências
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2">
              <Shield className="w-4 h-4" /> Chaves de Acesso
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer gap-2 text-danger hover:text-danger">
              <LogOut className="w-4 h-4" /> Sair da Conta
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Collapse Button */}
        <Button
          variant="navItem"
          onClick={onToggleCollapse}
          className={cn(
            "w-full text-muted-foreground border border-border/40 text-xs transition-colors cursor-pointer",
            collapsed ? "w-10 h-10 p-0 mx-auto justify-center" : "justify-center py-1.5 h-auto gap-2"
          )}
          title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-medium">Recolher Menu</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}
