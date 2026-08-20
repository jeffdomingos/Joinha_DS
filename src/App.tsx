import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { AppLayout } from "@/components/layout/app-layout"
import { FloatingToolbar, FloatingToolbarItem, FloatingToolbarSeparator } from "@/components/ui/floating-toolbar"
import { TourSpotlight, type TourStep } from "@/components/ui/tour-spotlight"
import { OnboardingChecklist, type OnboardingStep } from "@/components/ui/onboarding-checklist"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Search,
  Sun,
  Moon,
  Compass,
  ListTodo,
  Sliders,
} from "lucide-react"

// View Components
import { DashboardView } from "@/pages/dashboard-view"
import { DocsWikiView } from "@/pages/docs-wiki-view"
import { ComponentLabView } from "@/pages/component-lab-view"

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [viewMode, setViewMode] = useState<"dashboard" | "docs" | "lab">("dashboard")
  const [activeNavItem, setActiveNavItem] = useState("dashboard")
  const [openCommand, setOpenCommand] = useState(false)
  const [densityMode, setDensityMode] = useState<"default" | "compact" | "comfortable">("default")

  // Onboarding states
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [currentTourStep, setCurrentTourStep] = useState(0)
  const [isDockedChecklistOpen, setIsDockedChecklistOpen] = useState(false)

  const checklistSteps: OnboardingStep[] = [
    {
      id: "step-1",
      title: "Explorar o Dashboard Analítico",
      description: "Visualize métricas de MRR, projeções e a tabela densa de clientes.",
      completed: true,
    },
    {
      id: "step-2",
      title: "Testar a Matriz de Densidade Paramétrica",
      description: "Alterne entre os modos Compact (32px), Default (40px) e Comfortable (48px).",
      completed: true,
    },
    {
      id: "step-3",
      title: "Consultar a Wiki Oficial do Design System",
      description: "Descubra tokens em OKLCH, elevação e acessibilidade WCAG 2.2 AA.",
      completed: false,
    },
    {
      id: "step-4",
      title: "Experimentar os Componentes XAI & HITL",
      description: "Teste o simulador de agente autônomo, medidor de confiança e aprovação humana.",
      completed: false,
    },
  ]

  const tourSteps: TourStep[] = [
    {
      title: "Bem-vindo ao Joinha Design System! 🍊",
      description: "Um Design System moderno com Tailwind CSS v4, OKLCH, 50 componentes e arquitetura Agent-Native.",
    },
    {
      title: "Matriz de Densidade Paramétrica",
      description: "Controle globalmente o espaçamento de tabelas e formulários via Compact (32px), Default (40px) e Comfortable (48px).",
    },
    {
      title: "Wiki & Documentação Oficial",
      description: "Explore tokens perceptuais, diretrizes de acessibilidade e compêndio de engenharia.",
    },
    {
      title: "Laboratório de Componentes (Live Labs)",
      description: "Teste 50 componentes ao vivo com suporte a Split Panes, XAI e instalação via CLI do Shadcn.",
    },
  ]

  useEffect(() => {
    document.documentElement.setAttribute("data-density", densityMode)
  }, [densityMode])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenCommand((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    if (nextTheme === "light") {
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
    }
  }

  const breadcrumbLabels: Record<string, string> = {
    dashboard: "Dashboard Analítico",
    docs: "Wiki & Documentação",
    lab: "Component Lab & Playground",
  }

  const breadcrumbs = [
    { label: "Tem Como" },
    { label: breadcrumbLabels[viewMode] || "Dashboard Analítico" },
  ]

  return (
    <AppLayout
      theme={theme}
      onToggleTheme={toggleTheme}
      breadcrumbs={breadcrumbs}
      activeNavItem={activeNavItem}
      onSelectNavItem={(id) => {
        setActiveNavItem(id)
        if (id === "dashboard" || id === "analytics" || id === "customers" || id === "billing") {
          setViewMode("dashboard")
        } else if (id === "docs" || id === "wiki" || id === "tokens") {
          setViewMode("docs")
        } else {
          setViewMode("lab")
        }
      }}
      onNewAction={() => {
        toast.info("Ação Global Acionada", {
          description: "Modal de novo registro ou assinatura pronto para abertura.",
        })
      }}
    >
      {/* View Switcher Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              {viewMode === "dashboard" && "Painel de Gestão & Receita"}
              {viewMode === "docs" && "Design System Wiki & Docs"}
              {viewMode === "lab" && "Laboratório de Componentes"}
            </h1>
            <Badge variant="info" size="sm">50 Componentes</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {viewMode === "dashboard" && "Visão unificada de métricas, gráficos interativos e tabela densa de clientes."}
            {viewMode === "docs" && "Diretrizes de design, tokens interativos OKLCH, elevação e compêndio de engenharia."}
            {viewMode === "lab" && "Teste interativo, visualizador de diffs, Split Panes e instalação modular via CLI."}
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
          {/* Density Switcher */}
          <div className="inline-flex items-center p-1 rounded-(--tc-radius-md) bg-surface-card border border-border gap-1">
            <span className="text-[11px] font-mono text-muted-foreground px-2 hidden md:inline">Densidade:</span>
            <Button
              variant="navItem"
              size="sm"
              isActive={densityMode === "compact"}
              onClick={() => { setDensityMode("compact"); toast.info("Densidade Compacta ativada (32px)"); }}
              className="h-7 px-2.5 text-[11px] cursor-pointer"
            >
              Compact
            </Button>
            <Button
              variant="navItem"
              size="sm"
              isActive={densityMode === "default"}
              onClick={() => { setDensityMode("default"); toast.info("Densidade Padrão ativada (40px)"); }}
              className="h-7 px-2.5 text-[11px] cursor-pointer"
            >
              Default
            </Button>
            <Button
              variant="navItem"
              size="sm"
              isActive={densityMode === "comfortable"}
              onClick={() => { setDensityMode("comfortable"); toast.info("Densidade Confortável ativada (48px)"); }}
              className="h-7 px-2.5 text-[11px] cursor-pointer"
            >
              Comfortable
            </Button>
          </div>

          {/* Primary View Toggle */}
          <div className="inline-flex items-center p-1 rounded-(--tc-radius-md) bg-surface-card border border-border gap-1">
            <Button
              variant="navItem"
              size="sm"
              isActive={viewMode === "dashboard"}
              onClick={() => setViewMode("dashboard")}
              className="h-7 px-2.5 text-xs gap-1.5 cursor-pointer font-medium"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Button>
            <Button
              variant="navItem"
              size="sm"
              isActive={viewMode === "docs"}
              onClick={() => setViewMode("docs")}
              className="h-7 px-2.5 text-xs gap-1.5 cursor-pointer font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Wiki / Docs</span>
            </Button>
            <Button
              variant="navItem"
              size="sm"
              isActive={viewMode === "lab"}
              onClick={() => setViewMode("lab")}
              className="h-7 px-2.5 text-xs gap-1.5 cursor-pointer font-medium"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Labs</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      {viewMode === "dashboard" && (
        <DashboardView
          onNavigateToDocs={() => setViewMode("docs")}
          onNavigateToLab={() => setViewMode("lab")}
        />
      )}

      {viewMode === "docs" && <DocsWikiView />}

      {viewMode === "lab" && (
        <ComponentLabView
          onStartTour={() => {
            setCurrentTourStep(0)
            setIsTourOpen(true)
          }}
          onOpenCommand={() => setOpenCommand(true)}
        />
      )}

      {/* Global Command Palette Dialog (⌘K) */}
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Digite um comando ou busque no SaaS e Design System..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Navegação Principal">
            <CommandItem onSelect={() => { setViewMode("dashboard"); setOpenCommand(false); toast.info("Navegando para o Dashboard"); }}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
              <span>Dashboard Analítico</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("docs"); setOpenCommand(false); toast.info("Abrindo Wiki do Design System"); }}>
              <BookOpen className="mr-2 h-4 w-4 text-primary" />
              <span>Wiki & Documentação Oficial</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("lab"); setOpenCommand(false); toast.info("Abrindo Component Lab"); }}>
              <Layers className="mr-2 h-4 w-4 text-primary" />
              <span>Laboratório de Componentes (Labs)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Controle de Densidade">
            <CommandItem onSelect={() => { setDensityMode("compact"); setOpenCommand(false); toast.info("Densidade Compacta (32px)"); }}>
              <Sliders className="mr-2 h-4 w-4" />
              <span>Ativar Densidade Compacta (32px)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setDensityMode("default"); setOpenCommand(false); toast.info("Densidade Padrão (40px)"); }}>
              <Sliders className="mr-2 h-4 w-4" />
              <span>Ativar Densidade Padrão (40px)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setDensityMode("comfortable"); setOpenCommand(false); toast.info("Densidade Confortável (48px)"); }}>
              <Sliders className="mr-2 h-4 w-4" />
              <span>Ativar Densidade Confortável (48px)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Ações & Ferramentas">
            <CommandItem onSelect={() => { toggleTheme(); setOpenCommand(false); }}>
              <Sun className="mr-2 h-4 w-4" />
              <span>Alternar Tema (Dark / Light)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setIsTourOpen(true); setCurrentTourStep(0); setOpenCommand(false); }}>
              <Compass className="mr-2 h-4 w-4" />
              <span>Iniciar Tour Guiado</span>
            </CommandItem>
            <CommandItem onSelect={() => { setIsDockedChecklistOpen(true); setOpenCommand(false); }}>
              <ListTodo className="mr-2 h-4 w-4" />
              <span>Abrir Checklist de Onboarding</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      {/* Guided Tour Spotlight */}
      <TourSpotlight
        isOpen={isTourOpen}
        steps={tourSteps}
        currentStepIndex={currentTourStep}
        onNext={() => setCurrentTourStep((prev) => Math.min(prev + 1, tourSteps.length - 1))}
        onPrev={() => setCurrentTourStep((prev) => Math.max(prev - 1, 0))}
        onClose={() => setIsTourOpen(false)}
        onComplete={() => {
          setIsTourOpen(false)
          toast.success("Tour concluído com sucesso! 🎉")
        }}
      />

      {/* Docked Floating Checklist */}
      {isDockedChecklistOpen && (
        <OnboardingChecklist
          docked={true}
          steps={checklistSteps}
          onDismiss={() => setIsDockedChecklistOpen(false)}
        />
      )}

      {/* Global Floating Action HUD / Dock */}
      <FloatingToolbar position="bottom-center">
        {/* Density controls */}
        <FloatingToolbarItem
          icon={<span className="text-[11px] font-bold font-mono">CPT</span>}
          label="Densidade Compacta (32px / Fiscal)"
          shortcut="1"
          active={densityMode === "compact"}
          onClick={() => {
            setDensityMode("compact")
            toast.info("Densidade Compacta ativada (32px)")
          }}
        />
        <FloatingToolbarItem
          icon={<span className="text-[11px] font-bold font-mono">DFT</span>}
          label="Densidade Padrão (40px / SaaS)"
          shortcut="2"
          active={densityMode === "default"}
          onClick={() => {
            setDensityMode("default")
            toast.info("Densidade Padrão ativada (40px)")
          }}
        />
        <FloatingToolbarItem
          icon={<span className="text-[11px] font-bold font-mono">COM</span>}
          label="Densidade Confortável (48px / Executiva)"
          shortcut="3"
          active={densityMode === "comfortable"}
          onClick={() => {
            setDensityMode("comfortable")
            toast.info("Densidade Confortável ativada (48px)")
          }}
        />

        <FloatingToolbarSeparator />

        {/* View Switchers */}
        <FloatingToolbarItem
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Ver Dashboard SaaS"
          active={viewMode === "dashboard"}
          onClick={() => setViewMode("dashboard")}
        />
        <FloatingToolbarItem
          icon={<BookOpen className="w-4 h-4" />}
          label="Ver Wiki & Docs"
          active={viewMode === "docs"}
          onClick={() => setViewMode("docs")}
        />
        <FloatingToolbarItem
          icon={<Layers className="w-4 h-4" />}
          label="Ver Component Lab"
          active={viewMode === "lab"}
          onClick={() => setViewMode("lab")}
        />

        <FloatingToolbarSeparator />

        {/* Quick Search */}
        <FloatingToolbarItem
          icon={<Search className="w-4 h-4" />}
          label="Command Palette"
          shortcut="⌘K"
          onClick={() => setOpenCommand(true)}
        />

        {/* Theme switcher */}
        <FloatingToolbarItem
          icon={theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          label={`Alternar para modo ${theme === "dark" ? "Claro" : "Escuro"}`}
          shortcut="⌘T"
          onClick={toggleTheme}
        />

        <FloatingToolbarSeparator />

        {/* Onboarding Checklist toggle */}
        <FloatingToolbarItem
          icon={<ListTodo className="w-4 h-4" />}
          label={isDockedChecklistOpen ? "Ocultar Checklist Flutuante" : "Exibir Checklist de Ativação"}
          active={isDockedChecklistOpen}
          badge="4"
          onClick={() => {
            setIsDockedChecklistOpen(!isDockedChecklistOpen)
            toast.info(isDockedChecklistOpen ? "Checklist ocultado" : "Checklist ativado no canto!")
          }}
        />

        {/* Tour trigger */}
        <FloatingToolbarItem
          icon={<Compass className="w-4 h-4" />}
          label="Iniciar Tour Guiado"
          onClick={() => {
            setCurrentTourStep(0)
            setIsTourOpen(true)
          }}
        />
      </FloatingToolbar>

      <Toaster />
    </AppLayout>
  )
}

export default App
