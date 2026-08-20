import * as React from "react"
import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Shield,
  Code2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Check,
  Plus,
  Sparkles,
  LogOut,
  Building2,
  FolderDot,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
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
    groupLabel: "Visão Geral",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "analytics", label: "Analytics & MRR", icon: BarChart3 },
      {
        id: "customers",
        label: "Assinantes",
        icon: Users,
        badge: { text: "1.4k", variant: "neutral" },
      },
    ],
  },
  {
    groupLabel: "Operações & SaaS",
    items: [
      {
        id: "billing",
        label: "Faturamento",
        icon: CreditCard,
        badge: { text: "Ativo", variant: "success" },
      },
      { id: "projects", label: "Projetos", icon: FolderDot },
    ],
  },
  {
    groupLabel: "Configurações",
    items: [
      { id: "settings", label: "Geral", icon: Settings },
      { id: "security", label: "Segurança", icon: Shield },
      { id: "api", label: "API & Webhooks", icon: Code2 },
    ],
  },
]

const workspaces = [
  { id: "tc-prod", name: "Tem Como Prod", plan: "Enterprise" },
  { id: "tc-labs", name: "Tem Como Labs", plan: "Pro" },
  { id: "acme-corp", name: "Acme Corporation", plan: "Starter" },
]

export interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  activeItem?: string
  onSelectItem?: (id: string) => void
  className?: string
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  activeItem = "dashboard",
  onSelectItem,
  className,
}: SidebarProps) {
  const [selectedWorkspace, setSelectedWorkspace] = React.useState(workspaces[0])

  return (
    <aside
      className={cn(
        "relative flex flex-col justify-between h-screen shrink-0 border-r border-border bg-surface-card select-none transition-all duration-300 ease-(--tc-ease-smooth) z-30",
        collapsed ? "w-[68px]" : "w-64",
        className
      )}
    >
      {/* Top Header: Brand & Workspace Switcher */}
      <div className="p-3 border-b border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "w-full flex items-center gap-3 p-2 rounded-(--tc-radius-md) hover:bg-surface-hover hover:border-gradient-subtle transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary text-left cursor-pointer",
                collapsed && "justify-center px-1"
              )}
            >
              {/* Brand Avatar with Glow */}
              <div className="w-8 h-8 rounded-(--tc-radius-md) bg-primary flex items-center justify-center text-primary-foreground font-bold font-display shadow-(--tc-shadow-glow) shrink-0">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
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
            <DropdownMenuLabel className="text-xs text-muted-foreground font-mono">
              Alternar Organização
            </DropdownMenuLabel>
            {workspaces.map((ws) => (
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
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6 scrollbar-thin">
        {defaultNavGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && group.groupLabel && (
              <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70 font-mono">
                {group.groupLabel}
              </div>
            )}

            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectItem?.(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-3 px-2.5 py-2 rounded-(--tc-radius-md) text-xs font-medium transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      collapsed ? "justify-center px-0" : "justify-between",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border-gradient-subtle shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground"
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
                  </button>
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
        <button
          type="button"
          onClick={onToggleCollapse}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-1.5 rounded-(--tc-radius-md) text-muted-foreground hover:text-foreground hover:bg-surface-hover border border-border/40 text-xs transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary",
            collapsed && "px-0"
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
        </button>
      </div>
    </aside>
  )
}
