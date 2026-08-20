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
    groupLabel: "Laboratório & Templates",
    items: [
      {
        id: "lab-all",
        label: "Galeria Geral (Showcase)",
        icon: Layers,
        badge: { text: "50", variant: "neutral" },
      },
      {
        id: "template-dashboard",
        label: "Template: SaaS Executive",
        icon: LayoutDashboard,
        badge: { text: "Live", variant: "success" },
      },
    ],
  },
  {
    groupLabel: "Primitivos & Controles (18)",
    items: [
      { id: "comp-button", label: "Button", icon: Box },
      { id: "comp-input", label: "Input", icon: Box },
      { id: "comp-textarea", label: "Textarea", icon: Box },
      { id: "comp-checkbox", label: "Checkbox", icon: Box },
      { id: "comp-switch", label: "Switch", icon: Box },
      { id: "comp-radio-group", label: "RadioGroup", icon: Box },
      { id: "comp-select", label: "Select", icon: Box },
      { id: "comp-slider", label: "Slider", icon: Box },
      { id: "comp-badge", label: "Badge", icon: Box },
      { id: "comp-tag", label: "Tag", icon: Box },
      { id: "comp-skeleton", label: "Skeleton", icon: Box },
      { id: "comp-kbd", label: "Kbd", icon: Box },
      { id: "comp-tooltip", label: "Tooltip", icon: Box },
      { id: "comp-dropdown-menu", label: "DropdownMenu", icon: Box },
      { id: "comp-dialog", label: "Dialog", icon: Box },
      { id: "comp-alert-dialog", label: "AlertDialog", icon: Box },
      { id: "comp-sheet", label: "Sheet", icon: Box },
      { id: "comp-sonner", label: "Sonner", icon: Box },
    ],
  },
  {
    groupLabel: "Navegação & Layout (10)",
    items: [
      { id: "comp-app-layout", label: "AppLayout", icon: LayoutGrid },
      { id: "comp-header", label: "Header", icon: LayoutGrid },
      { id: "comp-sidebar", label: "Sidebar", icon: LayoutGrid },
      { id: "comp-tabs", label: "Tabs", icon: LayoutGrid },
      { id: "comp-resizable", label: "Resizable", icon: LayoutGrid },
      { id: "comp-separator", label: "Separator", icon: LayoutGrid },
      { id: "comp-pagination", label: "Pagination", icon: LayoutGrid },
      { id: "comp-empty-state", label: "EmptyState", icon: LayoutGrid },
      { id: "comp-banner-announcement", label: "BannerAnnouncement", icon: LayoutGrid },
      { id: "comp-floating-toolbar", label: "FloatingToolbar", icon: LayoutGrid },
    ],
  },
  {
    groupLabel: "Visualização de Dados (7)",
    items: [
      { id: "comp-data-table", label: "DataTable", icon: BarChart3 },
      { id: "comp-metric-card", label: "MetricCard", icon: BarChart3 },
      { id: "comp-chart", label: "Chart", icon: BarChart3 },
      { id: "comp-sparkline", label: "Sparkline", icon: BarChart3 },
      { id: "comp-progress", label: "Progress", icon: BarChart3 },
      { id: "comp-avatar", label: "Avatar", icon: BarChart3 },
      { id: "comp-table", label: "Table", icon: BarChart3 },
    ],
  },
  {
    groupLabel: "Onboarding UX (5)",
    items: [
      { id: "comp-tour-spotlight", label: "TourSpotlight", icon: Compass },
      { id: "comp-onboarding-checklist", label: "OnboardingChecklist", icon: Compass },
      { id: "comp-hint-beacon", label: "HintBeacon", icon: Compass },
      { id: "comp-persona-selector", label: "PersonaSelector", icon: Compass },
      { id: "comp-brand-symbol", label: "BrandSymbol", icon: Compass },
    ],
  },
  {
    groupLabel: "XAI & Human-in-the-Loop (5)",
    items: [
      { id: "comp-confidence-meter", label: "ConfidenceMeter", icon: Sparkles },
      { id: "comp-hitl-approval-banner", label: "HITLApprovalBanner", icon: Sparkles },
      { id: "comp-ai-diff-viewer", label: "AIDiffViewer", icon: Sparkles },
      { id: "comp-agent-status-hud", label: "AgentStatusHUD", icon: Sparkles },
      { id: "comp-ai-feedback-widget", label: "AIFeedbackWidget", icon: Sparkles },
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
      aria-label="Menu Lateral Principal"
      className={cn(
        "relative flex flex-col h-screen select-none",
        "bg-(--bg-surface-elevated)/90 backdrop-blur-xl border-r border-border shadow-md",
        "transition-all duration-300 ease-(--tc-ease-smooth)",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Top Header */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-border">
        {showWorkspaceSwitcher ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "w-full flex items-center justify-between p-1.5 rounded-(--tc-radius-md) hover:bg-surface-hover transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  collapsed && "justify-center px-0"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-(--tc-radius-md) bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-sm shrink-0 shadow-xs">
                    J
                  </div>
                  {!collapsed && (
                    <div className="flex flex-col text-left min-w-0">
                      <span className="font-semibold text-xs text-foreground truncate">
                        {selectedWorkspace.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground truncate font-mono">
                        {selectedWorkspace.plan}
                      </span>
                    </div>
                  )}
                </div>
                {!collapsed && (
                  <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-2" />
                )}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-56 p-1 bg-(--bg-surface-elevated)">
              <DropdownMenuLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                Workspaces & Registries
              </DropdownMenuLabel>
              {workspacesList.map((ws) => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => setSelectedWorkspace(ws)}
                  className="flex items-center justify-between gap-2 p-2 rounded-(--tc-radius-sm) cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <div className="flex flex-col">
                      <span className="font-medium text-xs">{ws.name}</span>
                      <span className="text-[10px] text-muted-foreground">{ws.plan}</span>
                    </div>
                  </div>
                  {selectedWorkspace.id === ws.id && <Check className="w-3.5 h-3.5 text-primary" />}
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
          <div className={cn("w-full flex items-center gap-3 p-1.5", collapsed && "justify-center px-0")}>
            <div className="w-8 h-8 rounded-(--tc-radius-md) bg-primary flex items-center justify-center text-primary-foreground font-bold font-display shrink-0 p-1 shadow-xs">
              <BrandSymbol className="h-5.5 w-auto text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-display font-bold text-sm tracking-tight text-foreground truncate">
                  {brandTitle}
                </span>
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
              <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {group.groupLabel}
              </div>
            )}

            <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.id || activeItem === `comp-${item.id}`

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
