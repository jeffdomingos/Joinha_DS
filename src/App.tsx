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
  Palette,
  LayoutGrid,
  Bot,
  Terminal,
  Box,
  BarChart3,
  Sparkles,
} from "lucide-react"

// View Components
import { DashboardView } from "@/pages/dashboard-view"
import { DocsWikiView } from "@/pages/docs-wiki-view"
import { ComponentLabView } from "@/pages/component-lab-view"

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [viewMode, setViewMode] = useState<"docs" | "lab" | "templates-dashboard">("docs")
  const [activeNavItem, setActiveNavItem] = useState("docs-overview")
  const [labCategory, setLabCategory] = useState<string>("all")
  const [openCommand, setOpenCommand] = useState(false)
  const [densityMode, setDensityMode] = useState<"default" | "compact" | "comfortable">("default")

  // Onboarding states
  const [isTourOpen, setIsTourOpen] = useState(false)
  const [currentTourStep, setCurrentTourStep] = useState(0)
  const [isDockedChecklistOpen, setIsDockedChecklistOpen] = useState(false)

  const checklistSteps: OnboardingStep[] = [
    {
      id: "step-1",
      title: "Explorar a Wiki do Design System",
      description: "Descubra tokens em OKLCH, elevação e acessibilidade WCAG 2.2 AA.",
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
      title: "Explorar os 50 Componentes no Lab",
      description: "Teste primitivos, painéis resizable e copie comandos de instalação via CLI.",
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
      description: "Plataforma de documentação oficial, tokens perceptuais em OKLCH, 50 componentes e arquitetura Agent-Native.",
    },
    {
      title: "Wiki & Documentação Oficial",
      description: "Explore tokens de cores, elevação, tipografia e os compêndios de engenharia moderna.",
    },
    {
      title: "Laboratório de Componentes (Live Labs)",
      description: "Teste os 50 componentes ao vivo, simule variantes e instale diretamente via CLI do Shadcn.",
    },
    {
      title: "Matriz de Densidade Paramétrica",
      description: "Controle globalmente o espaçamento de tabelas e formulários via Compact (32px), Default (40px) e Comfortable (48px).",
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

  const handleSelectNav = (id: string) => {
    setActiveNavItem(id)
    if (id.startsWith("docs-") || id === "docs") {
      setViewMode("docs")
    } else if (id.startsWith("lab-") || id === "lab") {
      setViewMode("lab")
      if (id === "lab-primitives") setLabCategory("primitives")
      else if (id === "lab-layout") setLabCategory("nav_layout")
      else if (id === "lab-data") setLabCategory("data_viz")
      else if (id === "lab-onboarding") setLabCategory("onboarding")
      else if (id === "lab-xai") setLabCategory("xai_hitl")
      else setLabCategory("all")
    } else if (id === "template-dashboard" || id === "dashboard" || id === "analytics") {
      setViewMode("templates-dashboard")
    }
  }

  const breadcrumbMap = {
    docs: [
      { label: "Joinha DS" },
      { label: "Documentação Oficial" },
      { label: "Tokens & Diretrizes" },
    ],
    lab: [
      { label: "Joinha DS" },
      { label: "Component Lab" },
      { label: "50 Componentes" },
    ],
    "templates-dashboard": [
      { label: "Joinha DS" },
      { label: "Templates de Exemplo" },
      { label: "SaaS Executive Dashboard" },
    ],
  }

  return (
    <AppLayout
      theme={theme}
      onToggleTheme={toggleTheme}
      breadcrumbs={breadcrumbMap[viewMode]}
      activeNavItem={activeNavItem}
      onSelectNavItem={handleSelectNav}
      onNewAction={() => {
        const cmd = "npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/index.json"
        navigator.clipboard.writeText(cmd)
        toast.success("Comando CLI do Registro copiado!", { description: cmd })
      }}
    >
      {/* Top Hero / Header Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              {viewMode === "docs" && "Joinha Design System — Wiki & Docs"}
              {viewMode === "lab" && "Laboratório de Componentes"}
              {viewMode === "templates-dashboard" && "Template: SaaS Executive Dashboard"}
            </h1>
            {viewMode === "docs" && <Badge variant="info" size="sm">v1.0.0 Oficial</Badge>}
            {viewMode === "lab" && <Badge variant="info" size="sm">50 Componentes</Badge>}
            {viewMode === "templates-dashboard" && <Badge variant="success" size="sm">Template Live</Badge>}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {viewMode === "docs" && "Fundamentos de design, tokens em OKLCH, 5 níveis de elevação, acessibilidade e compêndio de engenharia."}
            {viewMode === "lab" && "Explore os 50 componentes modulares, teste variantes interativamente e copie comandos CLI."}
            {viewMode === "templates-dashboard" && "Aplicação SaaS de referência 100% construída com componentes do Joinha DS para validação de composição e densidade."}
          </p>
        </div>

        {/* Top Controls & Navigation Switcher */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
          {/* Density Matrix Switcher */}
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
              isActive={viewMode === "docs"}
              onClick={() => { setViewMode("docs"); setActiveNavItem("docs-overview"); }}
              className="h-7 px-2.5 text-xs gap-1.5 cursor-pointer font-medium"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Documentação</span>
            </Button>
            <Button
              variant="navItem"
              size="sm"
              isActive={viewMode === "lab"}
              onClick={() => { setViewMode("lab"); setActiveNavItem("lab-all"); }}
              className="h-7 px-2.5 text-xs gap-1.5 cursor-pointer font-medium"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Component Lab</span>
            </Button>
            <Button
              variant="navItem"
              size="sm"
              isActive={viewMode === "templates-dashboard"}
              onClick={() => { setViewMode("templates-dashboard"); setActiveNavItem("template-dashboard"); }}
              className="h-7 px-2.5 text-xs gap-1.5 cursor-pointer font-medium"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Exemplo SaaS</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      {viewMode === "docs" && <DocsWikiView />}

      {viewMode === "lab" && (
        <ComponentLabView
          initialCategory={labCategory}
          onStartTour={() => {
            setCurrentTourStep(0)
            setIsTourOpen(true)
          }}
          onOpenCommand={() => setOpenCommand(true)}
        />
      )}

      {viewMode === "templates-dashboard" && (
        <DashboardView
          onNavigateToDocs={() => { setViewMode("docs"); setActiveNavItem("docs-overview"); }}
          onNavigateToLab={() => { setViewMode("lab"); setActiveNavItem("lab-all"); }}
        />
      )}

      {/* Global Command Palette Dialog (⌘K) */}
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Digite um comando ou busque tokens e componentes..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          
          <CommandGroup heading="Documentação & Guias">
            <CommandItem onSelect={() => { setViewMode("docs"); setActiveNavItem("docs-overview"); setOpenCommand(false); toast.info("Abrindo Wiki do Design System"); }}>
              <BookOpen className="mr-2 h-4 w-4 text-primary" />
              <span>Visão Geral & Filosofia de Design</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("docs"); setActiveNavItem("docs-tokens"); setOpenCommand(false); toast.info("Tokens OKLCH"); }}>
              <Palette className="mr-2 h-4 w-4 text-primary" />
              <span>Tokens de Design & Cores OKLCH</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("docs"); setActiveNavItem("docs-layout"); setOpenCommand(false); toast.info("Enterprise Layout"); }}>
              <LayoutGrid className="mr-2 h-4 w-4 text-primary" />
              <span>Enterprise Layout & Densidade Paramétrica</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("docs"); setActiveNavItem("docs-xai"); setOpenCommand(false); toast.info("Padrões XAI & HITL"); }}>
              <Bot className="mr-2 h-4 w-4 text-primary" />
              <span>Padrões de XAI & Human-in-the-Loop</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("docs"); setActiveNavItem("docs-cli"); setOpenCommand(false); toast.info("Guia de CLI"); }}>
              <Terminal className="mr-2 h-4 w-4 text-primary" />
              <span>Instalação via Shadcn CLI (npx shadcn add)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Laboratório de Componentes">
            <CommandItem onSelect={() => { setViewMode("lab"); setLabCategory("all"); setActiveNavItem("lab-all"); setOpenCommand(false); }}>
              <Layers className="mr-2 h-4 w-4 text-primary" />
              <span>Explorador Geral (Todos os 50 Componentes)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("lab"); setLabCategory("primitives"); setActiveNavItem("lab-primitives"); setOpenCommand(false); }}>
              <Box className="mr-2 h-4 w-4" />
              <span>Primitivos & Controles de Formulário (18)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("lab"); setLabCategory("nav_layout"); setActiveNavItem("lab-layout"); setOpenCommand(false); }}>
              <LayoutGrid className="mr-2 h-4 w-4" />
              <span>Navegação, Sheets & Resizable Split Panes (10)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("lab"); setLabCategory("data_viz"); setActiveNavItem("lab-data"); setOpenCommand(false); }}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Visualização de Dados & Recharts (7)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("lab"); setLabCategory("xai_hitl"); setActiveNavItem("lab-xai"); setOpenCommand(false); }}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>XAI (Confidence, Trace, HITL Banner, Diff Viewer) (5)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Templates de Referência">
            <CommandItem onSelect={() => { setViewMode("templates-dashboard"); setActiveNavItem("template-dashboard"); setOpenCommand(false); toast.info("Template SaaS Aberto"); }}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-success" />
              <span>Template: SaaS Executive Dashboard</span>
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
          icon={<BookOpen className="w-4 h-4" />}
          label="Ver Documentação & Wiki"
          active={viewMode === "docs"}
          onClick={() => { setViewMode("docs"); setActiveNavItem("docs-overview"); }}
        />
        <FloatingToolbarItem
          icon={<Layers className="w-4 h-4" />}
          label="Ver Component Lab (50)"
          active={viewMode === "lab"}
          onClick={() => { setViewMode("lab"); setActiveNavItem("lab-all"); }}
        />
        <FloatingToolbarItem
          icon={<LayoutDashboard className="w-4 h-4" />}
          label="Ver Template SaaS de Exemplo"
          active={viewMode === "templates-dashboard"}
          onClick={() => { setViewMode("templates-dashboard"); setActiveNavItem("template-dashboard"); }}
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
