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
import { cn } from "@/lib/utils"

/* ========================================================
   1. ATOMIC PREREQUISITES & SUB-COMPONENTS
   ======================================================== */

/** Átomo: Cabeçalho Tipográfico de Seção da Sidebar */
export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 pb-1 type-label-sm text-muted-foreground/80 select-none",
      className
    )}
    {...props}
  >
    {children}
  </div>
))
SidebarGroupLabel.displayName = "SidebarGroupLabel"

/** Molécula: Agrupamento de Itens da Sidebar */
export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
))
SidebarGroup.displayName = "SidebarGroup"

/** Molécula: Container de Menu da Sidebar */
export const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { collapsed?: boolean }
>(({ className, collapsed, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-1", collapsed && "flex flex-col items-center", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

/** Átomo: Item Container do Menu */
export const SidebarMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full space-y-0.5", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

/** Átomo: Botão Interativo Principal da Sidebar */
export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  icon?: React.ComponentType<{ className?: string }>
  badge?: {
    text: string
    variant?: "success" | "warning" | "danger" | "info" | "neutral"
  }
  collapsed?: boolean
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, isActive, icon: Icon, badge, collapsed, children, ...props }, ref) => (
  <Button
    ref={ref}
    variant="navItem"
    isActive={isActive}
    className={cn(
      "group text-xs font-medium cursor-pointer",
      collapsed
        ? "w-10 h-10 p-0 justify-center"
        : "w-full justify-between px-2.5 py-2 h-auto gap-3",
      className
    )}
    {...props}
  >
    <div className={cn("flex items-center min-w-0", !collapsed && "gap-3")}>
      {Icon && (
        <Icon
          className={cn(
            "w-4 h-4 shrink-0 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          )}
        />
      )}
      {!collapsed && <span className="truncate">{children}</span>}
    </div>

    {!collapsed && badge && (
      <Badge
        variant={badge.variant || "neutral"}
        size="sm"
        className="text-[10px] px-1.5 py-0 leading-tight"
      >
        {badge.text}
      </Badge>
    )}
  </Button>
))
SidebarMenuButton.displayName = "SidebarMenuButton"

/** Molécula: Container de Submenu Aninhado */
export const SidebarMenuSub = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pl-6 space-y-0.5 border-l border-border/60 ml-4 my-1", className)}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

/** Átomo: Item Container de Submenu */
export const SidebarMenuSubItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
))
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

/** Átomo: Botão Interativo de Submenu Aninhado */
export interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  badgeText?: string
}

export const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuSubButtonProps
>(({ className, isActive, badgeText, children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "w-full text-left px-2 py-1 type-body-sm text-[11px] rounded-(--tc-radius-sm) transition-colors flex items-center justify-between cursor-pointer group",
      isActive
        ? "bg-surface-hover text-foreground font-semibold border-l-2 border-primary -ml-[2px]"
        : "text-muted-foreground hover:text-foreground hover:bg-surface-hover",
      className
    )}
    {...props}
  >
    <span className="truncate">{children}</span>
    {badgeText && (
      <span className="type-label-xs text-muted-foreground/60 group-hover:text-muted-foreground">
        {badgeText}
      </span>
    )}
  </button>
))
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

/** Molécula: Cabeçalho de Marca do Topo da Sidebar */
export interface SidebarBrandHeaderProps {
  brandTitle?: string
  brandSubtitle?: string
  collapsed?: boolean
}

export function SidebarBrandHeader({
  brandTitle = "Joinha DS",
  brandSubtitle = "Design System v1.0",
  collapsed = false,
}: SidebarBrandHeaderProps) {
  return (
    <div className={cn("w-full flex items-center gap-3 p-1.5", collapsed && "justify-center px-0")}>
      <div className="w-8 h-8 rounded-(--tc-radius-md) bg-primary flex items-center justify-center text-primary-foreground font-bold font-display shrink-0 p-1 shadow-xs">
        <BrandSymbol variant="white" className="w-5.5 h-5.5" />
      </div>
      {!collapsed && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="type-heading-card font-bold text-sm tracking-tight text-foreground truncate">
              {brandTitle}
            </span>
            <Badge variant="info" size="sm" className="text-[9px] py-0 px-1 font-medium font-sans">
              v1.0
            </Badge>
          </div>
          <span className="type-body-sm text-[11px] text-muted-foreground truncate">
            {brandSubtitle}
          </span>
        </div>
      )}
    </div>
  )
}

/** Molécula: Perfil de Usuário do Rodapé da Sidebar */
export interface SidebarUserProfileProps {
  collapsed?: boolean
  userName?: string
  userEmail?: string
  initials?: string
}

export function SidebarUserProfile({
  collapsed = false,
  userName = "Jefferson D.",
  userEmail = "jeff@temcomo.design",
  initials = "JD",
}: SidebarUserProfileProps) {
  return (
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
            {initials}
          </div>

          {!collapsed && (
            <div className="flex flex-1 items-center justify-between min-w-0">
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-foreground truncate leading-tight">
                  {userName}
                </span>
                <span className="type-body-sm text-[10px] text-muted-foreground truncate leading-tight">
                  {userEmail}
                </span>
              </div>
              <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0 ml-1" />
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1 bg-(--bg-surface-elevated)">
        <DropdownMenuLabel className="type-label-xs px-2 py-1 text-muted-foreground">
          Minha Conta
        </DropdownMenuLabel>
        <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
          <Settings className="w-4 h-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
          <Shield className="w-4 h-4" />
          <span>Permissões & Tokens</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-xs cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="w-4 h-4" />
          <span>Sair da Sessão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ========================================================
   2. COMPLETE NAVIGATION DATA STRUCTURE
   ======================================================== */

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

/* ========================================================
   3. ROOT ORGANISM: SIDEBAR
   ======================================================== */

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
  children?: React.ReactNode
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
  children,
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
      {/* Top Header Molecule */}
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
                      <span className="type-label-xs text-muted-foreground truncate font-mono">
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
              <DropdownMenuLabel className="type-label-xs text-muted-foreground px-2 py-1">
                Workspaces & Registries
              </DropdownMenuLabel>
              {workspacesList.map((ws) => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => setSelectedWorkspace(ws)}
                  className="flex items-center justify-between gap-2 p-2 rounded-(--tc-radius-sm) cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="font-medium text-xs">{ws.name}</span>
                      <span className="type-body-sm text-[10px] text-muted-foreground">{ws.plan}</span>
                    </div>
                  </div>
                  {selectedWorkspace.id === ws.id && <Check className="w-3.5 h-3.5 text-primary" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer text-foreground">
                <Plus className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold">Novo Workspace</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SidebarBrandHeader
            brandTitle={brandTitle}
            brandSubtitle={brandSubtitle}
            collapsed={collapsed}
          />
        )}
      </div>

      {/* Navigation Content: Built 100% from Compound Atoms and Molecules */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6 scrollbar-thin">
        {children ||
          defaultNavGroups.map((group, groupIdx) => (
            <SidebarGroup key={groupIdx}>
              {!collapsed && group.groupLabel && (
                <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
              )}

              <SidebarMenu collapsed={collapsed}>
                {group.items.map((item) => {
                  const isActive =
                    activeItem === item.id ||
                    activeItem === `comp-${item.id}`

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        isActive={isActive}
                        icon={item.icon}
                        badge={item.badge}
                        collapsed={collapsed}
                        onClick={() => onSelectItem?.(item.id)}
                        title={collapsed ? item.label : undefined}
                      >
                        {item.label}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
          ))}
      </div>

      {/* Bottom Footer Molecule */}
      <div className="p-3 border-t border-border space-y-2">
        <SidebarUserProfile collapsed={collapsed} />

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={cn(
            "w-full h-8 text-xs text-muted-foreground hover:text-foreground flex items-center cursor-pointer font-sans",
            collapsed ? "justify-center px-0" : "justify-between px-2"
          )}
          title={collapsed ? "Expandir menu lateral" : "Recolher menu lateral"}
        >
          {!collapsed && <span className="type-body-sm font-medium">Recolher</span>}
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-primary" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </aside>
  )
}
