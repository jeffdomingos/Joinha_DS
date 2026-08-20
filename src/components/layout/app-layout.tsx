import * as React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { cn } from "@/lib/utils"

export interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
  theme: "dark" | "light"
  onToggleTheme: () => void
  onNewAction?: () => void
  activeNavItem?: string
  onSelectNavItem?: (id: string) => void
  showWorkspaceSwitcher?: boolean
  brandTitle?: string
  brandSubtitle?: string
  className?: string
}

export function AppLayout({
  children,
  breadcrumbs,
  theme,
  onToggleTheme,
  onNewAction,
  activeNavItem = "dashboard",
  onSelectNavItem,
  showWorkspaceSwitcher = false,
  brandTitle = "Joinha DS",
  brandSubtitle = "Design System v1.0",
  className,
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        activeItem={activeNavItem}
        onSelectItem={(id) => {
          onSelectNavItem?.(id)
          setMobileOpen(false)
        }}
        showWorkspaceSwitcher={showWorkspaceSwitcher}
        brandTitle={brandTitle}
        brandSubtitle={brandSubtitle}
        className="hidden lg:flex"
      />

      {/* Mobile Drawer Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <Sidebar
            collapsed={false}
            onToggleCollapse={() => setMobileOpen(false)}
            activeItem={activeNavItem}
            onSelectItem={(id) => {
              onSelectNavItem?.(id)
              setMobileOpen(false)
            }}
            showWorkspaceSwitcher={showWorkspaceSwitcher}
            brandTitle={brandTitle}
            brandSubtitle={brandSubtitle}
            className="relative z-50 h-full shadow-2xl"
          />
        </div>
      )}

      {/* Main Content Area with Header */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <Header
          breadcrumbs={breadcrumbs}
          onOpenMobileMenu={() => setMobileOpen(true)}
          theme={theme}
          onToggleTheme={onToggleTheme}
          onNewAction={onNewAction}
        />

        <main
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 lg:p-10 scrollbar-thin",
            className
          )}
        >
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
