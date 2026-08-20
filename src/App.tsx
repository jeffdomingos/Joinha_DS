import { useState, useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { AppLayout } from "@/components/layout/app-layout"
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
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Sun,
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
import { ComponentDetailView } from "@/pages/component-detail-view"
import { getComponentMetadata } from "@/data/component-metadata"

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [viewMode, setViewMode] = useState<"docs" | "lab" | "component" | "templates-dashboard">("docs")
  const [activeNavItem, setActiveNavItem] = useState("docs-overview")
  const [selectedComponentId, setSelectedComponentId] = useState("button")
  const [labCategory, setLabCategory] = useState<string>("all")
  const [openCommand, setOpenCommand] = useState(false)

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
      description: "Alterne entre os modos Compact (32px), Default (40px) e Comfortable (48px) no Lab.",
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
      description: "Controle o espaçamento de tabelas e formulários no Lab e Templates via Compact, Default e Comfortable.",
    },
  ]

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
    if (id.startsWith("comp-")) {
      const cleanId = id.replace("comp-", "")
      setSelectedComponentId(cleanId)
      setViewMode("component")
    } else if (id.startsWith("docs-") || id === "docs") {
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

  // AppLayout prepends the brand crumb itself (only when the sidebar is collapsed
  // and its own logo goes off-screen with it) — this trail stays page-focused.
  const getBreadcrumbs = () => {
    if (viewMode === "component") {
      const meta = getComponentMetadata(selectedComponentId)
      return [
        { label: "Componentes" },
        { label: meta.categoryLabel },
        { label: meta.name },
      ]
    }
    switch (activeNavItem) {
      case "docs-overview":
        return [{ label: "Documentação" }, { label: "Visão Geral & Filosofia" }]
      case "docs-tokens":
        return [{ label: "Documentação" }, { label: "Tokens de Design & OKLCH" }]
      case "docs-layout":
        return [{ label: "Documentação" }, { label: "Enterprise Layout & Densidade" }]
      case "docs-xai":
        return [{ label: "Documentação" }, { label: "Padrões XAI & HITL" }]
      case "docs-cli":
        return [{ label: "Documentação" }, { label: "Instalação via Shadcn CLI" }]
      case "lab-primitives":
        return [{ label: "Component Lab" }, { label: "Primitivos & Controles (18)" }]
      case "lab-layout":
        return [{ label: "Component Lab" }, { label: "Navegação & Layout (10)" }]
      case "lab-data":
        return [{ label: "Component Lab" }, { label: "Visualização de Dados (7)" }]
      case "lab-onboarding":
        return [{ label: "Component Lab" }, { label: "Onboarding & Adoção (5)" }]
      case "lab-xai":
        return [{ label: "Component Lab" }, { label: "XAI & HITL (5)" }]
      case "template-dashboard":
        return [{ label: "Templates" }, { label: "SaaS Executive Dashboard" }]
      default:
        return [{ label: "Component Lab" }, { label: "Galeria Geral (50)" }]
    }
  }

  return (
    <AppLayout
      theme={theme}
      onToggleTheme={toggleTheme}
      onOpenCommand={() => setOpenCommand(true)}
      breadcrumbs={getBreadcrumbs()}
      activeNavItem={activeNavItem}
      onSelectNavItem={handleSelectNav}
    >
      {/* Main View Router */}
      {viewMode === "docs" && (
        <DocsWikiView
          activeSection={activeNavItem}
          onNavigateSection={handleSelectNav}
        />
      )}

      {viewMode === "lab" && (
        <ComponentLabView
          initialCategory={labCategory}
          onStartTour={() => {
            setCurrentTourStep(0)
            setIsTourOpen(true)
          }}
          onOpenCommand={() => setOpenCommand(true)}
          onSelectComponent={handleSelectNav}
        />
      )}

      {viewMode === "component" && (
        <ComponentDetailView
          componentId={selectedComponentId}
          onNavigateComponent={(newId) => handleSelectNav(`comp-${newId}`)}
          onNavigateToLab={() => handleSelectNav("lab-all")}
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

          <CommandGroup heading="Páginas Dedicadas de Componentes (Populares)">
            <CommandItem onSelect={() => { handleSelectNav("comp-button"); setOpenCommand(false); }}>
              <Box className="mr-2 h-4 w-4 text-primary" />
              <span>Button (Botão Tátil & Variantes)</span>
            </CommandItem>
            <CommandItem onSelect={() => { handleSelectNav("comp-data-table"); setOpenCommand(false); }}>
              <BarChart3 className="mr-2 h-4 w-4 text-primary" />
              <span>DataTable (Tabela Corporativa com Densidade)</span>
            </CommandItem>
            <CommandItem onSelect={() => { handleSelectNav("comp-confidence-meter"); setOpenCommand(false); }}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>ConfidenceMeter (Score Perceptual de IA)</span>
            </CommandItem>
            <CommandItem onSelect={() => { handleSelectNav("comp-hitl-approval-banner"); setOpenCommand(false); }}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>HITLApprovalBanner (Confirmação Humana)</span>
            </CommandItem>
            <CommandItem onSelect={() => { handleSelectNav("comp-ai-diff-viewer"); setOpenCommand(false); }}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>AIDiffViewer (Visualizador de Diffs)</span>
            </CommandItem>
            <CommandItem onSelect={() => { handleSelectNav("comp-tour-spotlight"); setOpenCommand(false); }}>
              <Compass className="mr-2 h-4 w-4 text-primary" />
              <span>TourSpotlight (Onboarding Guiado)</span>
            </CommandItem>
            <CommandItem onSelect={() => { handleSelectNav("comp-dialog"); setOpenCommand(false); }}>
              <Box className="mr-2 h-4 w-4 text-primary" />
              <span>Dialog (Modal Acessível Radix)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Laboratório & Galeria">
            <CommandItem onSelect={() => { setViewMode("lab"); setLabCategory("all"); setActiveNavItem("lab-all"); setOpenCommand(false); }}>
              <Layers className="mr-2 h-4 w-4 text-primary" />
              <span>Galeria Geral (Todos os 50 Componentes)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Templates de Referência">
            <CommandItem onSelect={() => { setViewMode("templates-dashboard"); setActiveNavItem("template-dashboard"); setOpenCommand(false); toast.info("Template SaaS Aberto"); }}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-success" />
              <span>SaaS Executive Dashboard (Template Live)</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Diretrizes de Densidade">
            <CommandItem onSelect={() => { setViewMode("docs"); setActiveNavItem("docs-layout"); setOpenCommand(false); toast.info("Abrindo Guia de Densidade & Layout"); }}>
              <Sliders className="mr-2 h-4 w-4 text-primary" />
              <span>Documentação: Matriz de Densidade Paramétrica (32px, 40px, 48px)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("lab"); setActiveNavItem("lab-all"); setOpenCommand(false); toast.info("Abrindo Component Lab"); }}>
              <Layers className="mr-2 h-4 w-4 text-primary" />
              <span>Testar Densidade ao Vivo no Component Lab</span>
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

      <Toaster />
    </AppLayout>
  )
}

export default App
