import * as React from "react"
import type { PanelImperativeHandle } from "react-resizable-panels"
import { Sidebar, SidebarCollapseTrigger } from "./sidebar"
import { Header } from "./header"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { cn } from "@/lib/utils"

export interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: Array<{ label: string; href?: string }>
  theme: "dark" | "light"
  onToggleTheme: () => void
  onOpenCommand?: () => void
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
  onOpenCommand,
  onNewAction,
  activeNavItem = "dashboard",
  onSelectNavItem,
  showWorkspaceSwitcher = false,
  brandTitle = "Joinha",
  brandSubtitle = "Design System",
  className,
}: AppLayoutProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const sidebarPanelRef = React.useRef<PanelImperativeHandle>(null)

  const toggleSidebarCollapse = () => {
    const panel = sidebarPanelRef.current
    if (!panel) return
    if (panel.isCollapsed()) {
      panel.expand()
    } else {
      panel.collapse()
    }
  }

  // The Sidebar itself already shows the brand — the breadcrumb only needs to carry
  // it once the sidebar collapses away and takes that identity off-screen with it.
  const displayBreadcrumbs = collapsed ? [{ label: brandTitle }, ...(breadcrumbs ?? [])] : breadcrumbs

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        {/* Desktop Sidebar — draggable width, collapsible to fully hidden (react-resizable-panels).
            When collapsed the logo+toggle relocate into the Header via SidebarCollapseTrigger, so
            there's still a visible handle to expand it again. Hidden below lg: mobile uses the drawer overlay instead. */}
        <ResizablePanel
          panelRef={sidebarPanelRef}
          defaultSize={256}
          minSize={200}
          maxSize={380}
          collapsedSize={0}
          collapsible
          onResize={() => setCollapsed(sidebarPanelRef.current?.isCollapsed() ?? false)}
          className="hidden lg:block"
        >
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={toggleSidebarCollapse}
            activeItem={activeNavItem}
            onSelectItem={(id) => {
              onSelectNavItem?.(id)
              setMobileOpen(false)
            }}
            showWorkspaceSwitcher={showWorkspaceSwitcher}
            showUserProfile={false}
            brandTitle={brandTitle}
            brandSubtitle={brandSubtitle}
          />
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden lg:flex" />

        {/* Main Content Area with Header — always visible, both mobile and desktop */}
        <ResizablePanel className="flex flex-col min-w-0 overflow-hidden">
          <Header
            breadcrumbs={displayBreadcrumbs}
            onOpenMobileMenu={() => setMobileOpen(true)}
            beforeBreadcrumbs={
              collapsed && (
                <SidebarCollapseTrigger collapsed={collapsed} onToggleCollapse={toggleSidebarCollapse} />
              )
            }
            theme={theme}
            onToggleTheme={onToggleTheme}
            onOpenCommand={onOpenCommand}
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
        </ResizablePanel>
      </ResizablePanelGroup>

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
            showUserProfile={false}
            brandTitle={brandTitle}
            brandSubtitle={brandSubtitle}
            className="relative z-50 h-full w-64 shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}
