import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
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

export interface NavItemChild {
  id: string
  label: string
  cliName: string
}

export interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: {
    text: string
    variant?: "success" | "warning" | "danger" | "info" | "neutral"
  }
  children?: NavItemChild[]
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
        label: "Galeria Geral (Showcase)",
        icon: Layers,
        badge: { text: "50", variant: "neutral" },
      },
      {
        id: "lab-primitives",
        label: "Primitivos & Controles",
        icon: Box,
        badge: { text: "18", variant: "neutral" },
        children: [
          { id: "comp-button", label: "Button", cliName: "button" },
          { id: "comp-input", label: "Input", cliName: "input" },
          { id: "comp-textarea", label: "Textarea", cliName: "textarea" },
          { id: "comp-checkbox", label: "Checkbox", cliName: "checkbox" },
          { id: "comp-switch", label: "Switch", cliName: "switch" },
          { id: "comp-radio-group", label: "RadioGroup", cliName: "radio-group" },
          { id: "comp-select", label: "Select", cliName: "select" },
          { id: "comp-slider", label: "Slider", cliName: "slider" },
          { id: "comp-badge", label: "Badge", cliName: "badge" },
          { id: "comp-tag", label: "Tag", cliName: "tag" },
          { id: "comp-skeleton", label: "Skeleton", cliName: "skeleton" },
          { id: "comp-kbd", label: "Kbd", cliName: "kbd" },
          { id: "comp-tooltip", label: "Tooltip", cliName: "tooltip" },
          { id: "comp-dropdown-menu", label: "DropdownMenu", cliName: "dropdown-menu" },
          { id: "comp-dialog", label: "Dialog", cliName: "dialog" },
          { id: "comp-alert-dialog", label: "AlertDialog", cliName: "alert-dialog" },
          { id: "comp-sheet", label: "Sheet", cliName: "sheet" },
          { id: "comp-sonner", label: "Sonner", cliName: "sonner" },
        ],
      },
      {
        id: "lab-layout",
        label: "Navegação & Layout",
        icon: LayoutGrid,
        badge: { text: "10", variant: "neutral" },
        children: [
          { id: "comp-app-layout", label: "AppLayout", cliName: "app-layout" },
          { id: "comp-header", label: "Header", cliName: "header" },
          { id: "comp-sidebar", label: "Sidebar", cliName: "sidebar" },
          { id: "comp-tabs", label: "Tabs", cliName: "tabs" },
          { id: "comp-resizable", label: "Resizable", cliName: "resizable" },
          { id: "comp-separator", label: "Separator", cliName: "separator" },
          { id: "comp-pagination", label: "Pagination", cliName: "pagination" },
          { id: "comp-empty-state", label: "EmptyState", cliName: "empty-state" },
          { id: "comp-banner-announcement", label: "BannerAnnouncement", cliName: "banner-announcement" },
          { id: "comp-floating-toolbar", label: "FloatingToolbar", cliName: "floating-toolbar" },
        ],
      },
      {
        id: "lab-data",
        label: "Visualização de Dados",
        icon: BarChart3,
        badge: { text: "7", variant: "neutral" },
        children: [
          { id: "comp-data-table", label: "DataTable", cliName: "data-table" },
          { id: "comp-metric-card", label: "MetricCard", cliName: "metric-card" },
          { id: "comp-chart", label: "Chart", cliName: "chart" },
          { id: "comp-sparkline", label: "Sparkline", cliName: "sparkline" },
          { id: "comp-progress", label: "Progress", cliName: "progress" },
          { id: "comp-avatar", label: "Avatar", cliName: "avatar" },
          { id: "comp-table", label: "Table", cliName: "table" },
        ],
      },
      {
        id: "lab-onboarding",
        label: "Onboarding & Adoção",
        icon: Compass,
        badge: { text: "5", variant: "neutral" },
        children: [
          { id: "comp-tour-spotlight", label: "TourSpotlight", cliName: "tour-spotlight" },
          { id: "comp-onboarding-checklist", label: "OnboardingChecklist", cliName: "onboarding-checklist" },
          { id: "comp-hint-beacon", label: "HintBeacon", cliName: "hint-beacon" },
          { id: "comp-persona-selector", label: "PersonaSelector", cliName: "persona-selector" },
          { id: "comp-brand-symbol", label: "BrandSymbol", cliName: "brand-symbol" },
        ],
      },
      {
        id: "lab-xai",
        label: "XAI & Human-in-the-Loop",
        icon: Sparkles,
        badge: { text: "5", variant: "neutral" },
        children: [
          { id: "comp-confidence-meter", label: "ConfidenceMeter", cliName: "confidence-meter" },
          { id: "comp-hitl-approval-banner", label: "HITLApprovalBanner", cliName: "hitl-approval-banner" },
          { id: "comp-ai-diff-viewer", label: "AIDiffViewer", cliName: "ai-diff-viewer" },
          { id: "comp-agent-status-hud", label: "AgentStatusHUD", cliName: "agent-status-hud" },
          { id: "comp-ai-feedback-widget", label: "AIFeedbackWidget", cliName: "ai-feedback-widget" },
        ],
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
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    "lab-primitives": true,
    "lab-layout": false,
    "lab-data": false,
    "lab-onboarding": false,
    "lab-xai": false,
  })

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

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
                const hasChildren = Boolean(item.children && item.children.length > 0)
                const isGroupExpanded = Boolean(expandedGroups[item.id])
                const isDirectActive = activeItem === item.id
                const isChildActive = Boolean(item.children?.some((c) => activeItem === c.id || activeItem === `comp-${c.cliName}` || activeItem === c.cliName))
                const isActive = isDirectActive || (collapsed && isChildActive)

                return (
                  <div key={item.id} className="w-full space-y-0.5">
                    <Button
                      variant="navItem"
                      isActive={isActive}
                      onClick={() => {
                        if (hasChildren && !collapsed) {
                          toggleGroup(item.id)
                        }
                        onSelectItem?.(item.id)
                      }}
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

                      {!collapsed && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {item.badge && (
                            <Badge
                              variant={item.badge.variant || "neutral"}
                              size="sm"
                              className="text-[10px] px-1.5 py-0 leading-tight"
                            >
                              {item.badge.text}
                            </Badge>
                          )}
                          {hasChildren && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleGroup(item.id)
                              }}
                              className="p-0.5 hover:text-foreground text-muted-foreground transition-transform"
                            >
                              {isGroupExpanded ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </Button>

                    {/* Sub-items (nested component links) */}
                    {!collapsed && hasChildren && isGroupExpanded && item.children && (
                      <div className="pl-6 space-y-0.5 border-l border-border/60 ml-4 my-1">
                        {item.children.map((child) => {
                          const isSubActive =
                            activeItem === child.id ||
                            activeItem === `comp-${child.cliName}` ||
                            activeItem === child.cliName

                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => onSelectItem?.(child.id)}
                              className={cn(
                                "w-full text-left px-2 py-1 text-[11px] rounded-(--tc-radius-sm) transition-colors flex items-center justify-between cursor-pointer group",
                                isSubActive
                                  ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary -ml-[2px]"
                                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                              )}
                            >
                              <span className="truncate">{child.label}</span>
                              <span className="text-[9px] font-mono text-muted-foreground/60 group-hover:text-muted-foreground">
                                {child.cliName}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
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
