import * as React from "react"
import {
  Copy,
  Check,
  Terminal,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Code2,
  ShieldCheck,
  Keyboard,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Info,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Badge } from "@/components/ui/badge"
import { Tag } from "@/components/ui/tag"
import { Skeleton } from "@/components/ui/skeleton"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { BrandSymbol } from "@/components/ui/brand-symbol"
import { MetricCard } from "@/components/ui/metric-card"
import { Sparkline } from "@/components/ui/sparkline"
import { ConfidenceMeter, ReasoningTrace } from "@/components/ui/confidence-meter"
import { HITLApprovalBanner } from "@/components/ui/hitl-approval-banner"
import { AIDiffViewer } from "@/components/ui/ai-diff-viewer"
import { AgentStatusHUD } from "@/components/ui/agent-status-hud"
import { AIFeedbackWidget } from "@/components/ui/ai-feedback-widget"
import { HintBeacon } from "@/components/ui/hint-beacon"
import { BannerAnnouncement } from "@/components/ui/banner-announcement"
import { PersonaSelector } from "@/components/ui/persona-selector"
import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DataTable, type DataTableRecord } from "@/components/ui/data-table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { EmptyState } from "@/components/ui/empty-state"
import { TourSpotlight, type TourStep } from "@/components/ui/tour-spotlight"
import { FloatingToolbar, FloatingToolbarItem, FloatingToolbarSeparator } from "@/components/ui/floating-toolbar"
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandSeparator,
} from "@/components/ui/command"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts"
import {
  COMPONENT_METADATA_MAP,
  getComponentMetadata,
  type ComponentMetadata,
} from "@/data/component-metadata"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export interface ComponentDetailViewProps {
  componentId: string
  onNavigateComponent?: (id: string) => void
  onNavigateToLab?: () => void
  renderPreviewContent?: (componentId: string, density: "compact" | "default" | "comfortable") => React.ReactNode
}

export function ComponentDetailView({
  componentId,
  onNavigateComponent,
  onNavigateToLab,
  renderPreviewContent,
}: ComponentDetailViewProps) {
  const [activeTab, setActiveTab] = React.useState("preview")
  const [copiedCli, setCopiedCli] = React.useState(false)
  const [density, setDensity] = React.useState<"compact" | "default" | "comfortable">("default")
  const [isPersonaModalOpen, setIsPersonaModalOpen] = React.useState(false)
  const [activePersona, setActivePersona] = React.useState("developer")
  const [isTourOpen, setIsTourOpen] = React.useState(false)
  const [tourStepIdx, setTourStepIdx] = React.useState(0)
  const [paginationPage, setPaginationPage] = React.useState(2)

  const metadata: ComponentMetadata = getComponentMetadata(componentId)

  // Compute next/prev keys in catalog
  const keys = Object.keys(COMPONENT_METADATA_MAP)
  const currentIndex = keys.indexOf(componentId)
  const prevKey = currentIndex > 0 ? keys[currentIndex - 1] : null
  const nextKey = currentIndex >= 0 && currentIndex < keys.length - 1 ? keys[currentIndex + 1] : null

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Código copiado para a área de transferência!")
  }

  const handleCopyCli = () => {
    const cliCommand = `npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/${metadata.cliName}.json`
    navigator.clipboard.writeText(cliCommand)
    setCopiedCli(true)
    toast.success("Comando CLI copiado com sucesso!")
    setTimeout(() => setCopiedCli(false), 2000)
  }

  const renderLiveComponent = () => {
    if (renderPreviewContent) return renderPreviewContent(componentId, density)

    switch (componentId) {
      /* --- 1. PRIMITIVOS & CONTROLES --- */
      case "button":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={() => toast.success("Primary clicado")}>Primary</Button>
            <Button variant="secondary" onClick={() => toast.info("Secondary clicado")}>Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        )
      case "input":
        return (
          <div className="w-full max-w-sm space-y-2">
            <Input placeholder="Digite seu e-mail corporativo..." />
            <p className="type-body-sm text-[11px] text-muted-foreground">Exemplo de input responsivo com anel de foco.</p>
          </div>
        )
      case "textarea":
        return (
          <div className="w-full max-w-sm space-y-2">
            <Textarea placeholder="Descreva os detalhes da solicitação..." rows={3} />
          </div>
        )
      case "switch":
        return (
          <div className="flex items-center gap-3">
            <Switch defaultChecked id="demo-switch" />
            <label htmlFor="demo-switch" className="type-body-sm text-xs font-medium text-foreground cursor-pointer">
              Ativar Modo Autônomo
            </label>
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox id="demo-cb" defaultChecked />
            <label htmlFor="demo-cb" className="type-body-sm text-xs font-medium text-foreground cursor-pointer">
              Concordo com os Termos de Serviço
            </label>
          </div>
        )
      case "radio-group":
        return (
          <RadioGroup defaultValue="pro" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="r1" />
              <label htmlFor="r1" className="type-body-sm text-xs cursor-pointer">Plano Free</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pro" id="r2" />
              <label htmlFor="r2" className="type-body-sm text-xs cursor-pointer">Plano Pro (Recomendado)</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enterprise" id="r3" />
              <label htmlFor="r3" className="type-body-sm text-xs cursor-pointer">Plano Enterprise</label>
            </div>
          </RadioGroup>
        )
      case "select":
        return (
          <Select defaultValue="brl">
            <SelectTrigger className="w-60">
              <SelectValue placeholder="Selecione a moeda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brl">Real Brasileiro (BRL)</SelectItem>
              <SelectItem value="usd">Dólar Americano (USD)</SelectItem>
              <SelectItem value="eur">Euro (EUR)</SelectItem>
            </SelectContent>
          </Select>
        )
      case "slider":
        return (
          <div className="w-full max-w-xs space-y-2">
            <Slider defaultValue={[65]} max={100} step={1} />
            <span className="type-body-sm text-[11px] text-muted-foreground">Limite de amostragem: 65%</span>
          </div>
        )
      case "badge":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
        )
      case "tag":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="purple">IA Generativa</Tag>
            <Tag variant="teal">OKLCH</Tag>
            <Tag variant="pink">Enterprise</Tag>
            <Tag variant="indigo">Design System</Tag>
          </div>
        )
      case "skeleton":
        return (
          <div className="space-y-2 w-full max-w-sm">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        )
      case "kbd":
        return (
          <div className="flex items-center gap-2">
            <span className="type-body-sm text-xs text-muted-foreground">Pressione</span>
            <Kbd>⌘K</Kbd>
            <span className="type-body-sm text-xs text-muted-foreground">para abrir a paleta de comandos</span>
          </div>
        )
      case "tooltip":
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Passe o mouse aqui</Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Tooltip com posicionamento dinâmico e animação suave.</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      case "dropdown-menu":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Menu de Opções</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel className="type-label-xs text-muted-foreground">Ações Rápidas</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">Visualizar Detalhes</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Exportar Relatório</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">Excluir Item</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      case "dialog":
        return (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Abrir Modal de Diálogo</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirmar Operação</DialogTitle>
                <DialogDescription>
                  Tem certeza que deseja atualizar as permissões do usuário corporativo?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="primary" onClick={() => toast.success("Operação confirmada")}>
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      case "alert-dialog":
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Abrir Confirmação Crítica</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir Workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação é irreversível e excluirá permanentemente todos os registros de telemetria.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => toast.error("Workspace excluído")}>
                  Sim, Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      case "sheet":
        return (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Abrir Gaveta Lateral (Sheet)</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Painel Lateral de Configurações</SheetTitle>
                <SheetDescription>
                  Ajuste preferências de densidade, temas e chaves de API.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <Input placeholder="Nome do ambiente..." />
                <Button variant="primary" className="w-full">Salvar Alterações</Button>
              </div>
            </SheetContent>
          </Sheet>
        )
      case "sonner":
        return (
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="sm" onClick={() => toast.success("Operação realizada com sucesso!")}>
              Toast de Sucesso
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.error("Erro na validação do token.")}>
              Toast de Erro
            </Button>
          </div>
        )
      case "alert":
        return (
          <div className="w-full max-w-md space-y-3">
            <Alert>
              <Info className="h-4 w-4 text-info" />
              <AlertTitle>Ambiente de Homologação</AlertTitle>
              <AlertDescription>
                As alterações realizadas aqui não afetarão o cluster de produção.
              </AlertDescription>
            </Alert>
          </div>
        )
      case "accordion":
        return (
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>O que é o Joinha Design System?</AccordionTrigger>
                <AccordionContent>
                  Um design system corporativo desenvolvido em OKLCH com suporte a modo escuro nativo e componentes acessíveis.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Como instalar via Shadcn CLI?</AccordionTrigger>
                <AccordionContent>
                  Execute o comando npx shadcn add com o link do componente desejado em public/r/.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )

      /* --- 2. NAVEGAÇÃO & LAYOUT --- */
      case "header":
        return (
          <div className="w-full rounded-lg border border-border overflow-hidden bg-background shadow-xs">
            <Header
              breadcrumbs={[{ label: "Joinha DS" }, { label: "Componentes" }, { label: "Header" }]}
              theme="dark"
              onToggleTheme={() => toast.info("Alternador de tema clicado")}
              onOpenCommand={() => toast.info("Gatilho ⌘K clicado")}
            />
          </div>
        )
      case "sidebar":
        return (
          <div className="w-full max-w-xs h-80 rounded-xl border border-border overflow-hidden shadow-md bg-surface">
            <Sidebar
              collapsed={false}
              onToggleCollapse={() => toast.info("Recolher clicado")}
              activeItem="comp-sidebar"
              className="h-full w-full border-r-0 shadow-none bg-transparent"
            />
          </div>
        )
      case "tabs":
        return (
          <div className="w-full max-w-md">
            <Tabs defaultValue="geral">
              <TabsList>
                <TabsTrigger value="geral">Visão Geral</TabsTrigger>
                <TabsTrigger value="permissoes">Permissões</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="p-3 bg-surface rounded-md border border-border mt-2">
                <p className="type-body-sm text-xs text-muted-foreground">Conteúdo da aba Visão Geral.</p>
              </TabsContent>
              <TabsContent value="permissoes" className="p-3 bg-surface rounded-md border border-border mt-2">
                <p className="type-body-sm text-xs text-muted-foreground">Conteúdo da aba Permissões.</p>
              </TabsContent>
              <TabsContent value="logs" className="p-3 bg-surface rounded-md border border-border mt-2">
                <p className="type-body-sm text-xs text-muted-foreground">Conteúdo da aba Logs de Auditoria.</p>
              </TabsContent>
            </Tabs>
          </div>
        )
      case "resizable":
        return (
          <div className="w-full max-w-md h-32 rounded-lg border border-border overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50} className="flex items-center justify-center p-4 bg-surface/40">
                <span className="type-body-sm text-xs font-semibold">Painel 1 (50%)</span>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} className="flex items-center justify-center p-4 bg-surface/20">
                <span className="type-body-sm text-xs font-semibold">Painel 2 (50%)</span>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )
      case "separator":
        return (
          <div className="w-full max-w-xs space-y-3 p-4 rounded-lg bg-surface border border-border">
            <span className="type-body-sm text-xs font-medium">Seção Superior</span>
            <Separator />
            <span className="type-body-sm text-xs font-medium text-muted-foreground">Seção Inferior</span>
          </div>
        )
      case "app-layout":
        return (
          <div className="w-full max-w-2xl rounded-xl border border-border overflow-hidden bg-background shadow-lg text-xs">
            <div className="flex h-60 w-full">
              {/* Mini Sidebar */}
              <div className="w-44 border-r border-border bg-surface p-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <BrandSymbol className="h-5 w-auto text-primary" />
                    <span className="font-bold text-[11px] font-display text-foreground">Joinha DS</span>
                  </div>
                  <div className="space-y-1">
                    <div className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Dashboard</span>
                    </div>
                    <div className="px-2 py-1 rounded-md text-muted-foreground hover:bg-surface-hover flex items-center gap-2 cursor-pointer">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Componentes</span>
                    </div>
                  </div>
                </div>
                <div className="p-1.5 rounded-md bg-surface-elevated flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center font-bold text-[9px] text-primary">JD</div>
                  <div className="truncate text-[10px] text-muted-foreground">jeff@joinha.ds</div>
                </div>
              </div>
              {/* Mini Main Area */}
              <div className="flex-1 flex flex-col bg-base">
                {/* Mini Header */}
                <div className="h-10 border-b border-border px-4 flex items-center justify-between bg-surface/50">
                  <span className="text-muted-foreground text-[10px]">AppLayout &gt; Overview</span>
                  <Badge variant="success" size="sm" className="text-[9px]">Produção</Badge>
                </div>
                {/* Mini Content */}
                <div className="p-4 flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-surface border border-border space-y-1">
                      <span className="text-[10px] text-muted-foreground">MRR Total</span>
                      <div className="font-mono font-bold text-foreground">R$ 48.920</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface border border-border space-y-1">
                      <span className="text-[10px] text-muted-foreground">Agentes Ativos</span>
                      <div className="font-mono font-bold text-success">14 Online</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "pagination":
        return (
          <div className="w-full max-w-md p-4 rounded-xl bg-surface border border-border flex flex-col items-center gap-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPaginationPage(p => Math.max(1, p - 1))
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={paginationPage === 1}
                    onClick={(e) => {
                      e.preventDefault()
                      setPaginationPage(1)
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={paginationPage === 2}
                    onClick={(e) => {
                      e.preventDefault()
                      setPaginationPage(2)
                    }}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={paginationPage === 3}
                    onClick={(e) => {
                      e.preventDefault()
                      setPaginationPage(3)
                    }}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPaginationPage(p => Math.min(10, p + 1))
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <span className="type-body-sm text-[11px] text-muted-foreground font-mono">
              Página ativa: <strong className="text-primary">{paginationPage}</strong> de 10
            </span>
          </div>
        )
      case "empty-state":
        return (
          <div className="w-full max-w-md">
            <EmptyState
              title="Nenhum Registro Encontrado"
              description="Não encontramos nenhum item correspondente aos filtros atuais. Tente ajustar os parâmetros."
              action={
                <Button variant="primary" size="sm" onClick={() => toast.success("Ação disparada")}>
                  Criar Primeiro Registro
                </Button>
              }
            />
          </div>
        )
      case "floating-toolbar":
        return (
          <div className="relative w-full h-32 flex items-center justify-center p-4 rounded-xl bg-surface border border-border overflow-hidden">
            <FloatingToolbar position="bottom-center">
              <FloatingToolbarItem
                icon={<Copy className="w-3.5 h-3.5" />}
                label="Copiar Itens"
                shortcut="⌘C"
                onClick={() => toast.info("Itens copiados")}
              />
              <FloatingToolbarSeparator />
              <FloatingToolbarItem
                icon={<Sparkles className="w-3.5 h-3.5 text-primary" />}
                label="Aplicar IA"
                shortcut="⌘I"
                onClick={() => toast.success("Processamento IA iniciado")}
              />
            </FloatingToolbar>
          </div>
        )
      case "command":
        return (
          <div className="w-full max-w-md rounded-xl border border-border overflow-hidden shadow-lg bg-surface-modal">
            <Command className="border-0">
              <CommandInput placeholder="Digite um comando ou busque..." />
              <CommandList>
                <CommandGroup heading="Ações Rápidas">
                  <CommandItem onSelect={() => toast.info("Criar Projeto")}>
                    <Sparkles className="w-3.5 h-3.5 mr-2 text-primary" />
                    <span>Criar Novo Projeto</span>
                  </CommandItem>
                  <CommandItem onSelect={() => toast.info("Ver Documentação")}>
                    <BookOpen className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                    <span>Consultar Tokens OKLCH</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Configurações">
                  <CommandItem onSelect={() => toast.info("Alternar Tema")}>
                    <span>Alternar Tema de Cor</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )

      /* --- 3. VISUALIZAÇÃO DE DADOS --- */
      case "data-table": {
        const sampleDataTableData: DataTableRecord[] = [
          {
            id: "CUST-001",
            customer: { name: "Jefferson Domingos", email: "jeff@joinha.ds" },
            plan: "Enterprise",
            status: "active",
            mrr: 12400,
            billingCycle: "Annual",
            joinedDate: "2024-01-15",
          },
          {
            id: "CUST-002",
            customer: { name: "Beatriz Silveira", email: "beatriz@acme.ai" },
            plan: "Pro",
            status: "active",
            mrr: 4800,
            billingCycle: "Monthly",
            joinedDate: "2024-03-22",
          },
          {
            id: "CUST-003",
            customer: { name: "Carlos Eduardo", email: "carlos@fintech.io" },
            plan: "Starter",
            status: "trialing",
            mrr: 1200,
            billingCycle: "Monthly",
            joinedDate: "2024-08-10",
          },
          {
            id: "CUST-004",
            customer: { name: "Mariana Costa", email: "mariana@corp.com" },
            plan: "Enterprise",
            status: "past_due",
            mrr: 8900,
            billingCycle: "Annual",
            joinedDate: "2023-11-05",
          },
        ]
        return (
          <div className="w-full">
            <DataTable data={sampleDataTableData} />
          </div>
        )
      }
      case "chart": {
        const sampleChartData = [
          { month: "Jan", ops: 120, latencia: 45 },
          { month: "Fev", ops: 180, latencia: 42 },
          { month: "Mar", ops: 240, latencia: 38 },
          { month: "Abr", ops: 310, latencia: 35 },
          { month: "Mai", ops: 450, latencia: 30 },
          { month: "Jun", ops: 580, latencia: 28 },
        ]
        const chartConfig: ChartConfig = {
          ops: {
            label: "Operações / min",
            color: "oklch(67% 0.17 53)",
          },
          latencia: {
            label: "Latência (ms)",
            color: "oklch(75% 0.10 180)",
          },
        }
        return (
          <div className="w-full max-w-lg p-4 rounded-xl bg-surface border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="type-heading-card text-xs font-bold text-foreground">Taxa de Execução & Latência</span>
              <Badge variant="success" size="sm">Tempo Real</Badge>
            </div>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <AreaChart data={sampleChartData}>
                <defs>
                  <linearGradient id="fillOps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(67% 0.17 53)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(67% 0.17 53)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="ops" stroke="oklch(67% 0.17 53)" strokeWidth={2} fill="url(#fillOps)" />
              </AreaChart>
            </ChartContainer>
          </div>
        )
      }

      /* --- 3. VISUALIZAÇÃO DE DADOS --- */
      case "metric-card":
        return (
          <div className="w-full max-w-xs">
            <MetricCard
              title="Receita Mensal (MRR)"
              value="R$ 48.920"
              change={{ value: "+14.2%", trend: "up", period: "vs. mês anterior" }}
              sparklineData={[28, 31, 35, 40, 48.9]}
              sparklinePeriod="Últimos 5 dias"
            />
          </div>
        )
      case "sparkline":
        return (
          <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-4">
            <div className="space-y-1">
              <span className="type-body-sm text-xs text-muted-foreground font-medium">Volumetria</span>
              <div className="type-heading-card text-lg font-bold text-foreground">1.420 ops</div>
            </div>
            <Sparkline data={[12, 18, 14, 22, 28, 35, 42]} chartVariant={1} height={36} className="w-32" />
          </div>
        )
      case "progress":
        return (
          <div className="w-full max-w-sm space-y-2">
            <Progress value={78} />
            <div className="flex justify-between type-body-sm text-[11px] text-muted-foreground font-mono">
              <span>Processamento</span>
              <span>78%</span>
            </div>
          </div>
        )
      case "avatar":
        return (
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="w-10 h-10 border border-border bg-primary text-primary-foreground font-bold text-xs">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          </div>
        )
      case "table":
        return (
          <div className="w-full max-w-md rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Microsserviço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Latência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-xs font-bold text-primary">auth-service</TableCell>
                  <TableCell><Badge variant="success" size="sm">Online</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">18ms</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-xs font-bold text-primary">billing-api</TableCell>
                  <TableCell><Badge variant="warning" size="sm">Degradado</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">142ms</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )

      /* --- 4. ONBOARDING & ADOÇÃO --- */
      case "brand-symbol":
        return (
          <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl bg-surface border border-border">
            {/* 1. Símbolo Branco sobre Fundo Laranja Padrão */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl bg-primary shadow-lg shadow-primary/25 border border-primary/40 flex items-center justify-center">
                <BrandSymbol variant="white" className="h-12 w-auto" />
              </div>
              <span className="type-body-sm text-[11px] text-muted-foreground font-mono">Branco em Fundo Laranja</span>
            </div>

            {/* 2. Símbolo Branco em Fundo Escuro Preto */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center">
                <BrandSymbol variant="white" className="h-12 w-auto" />
              </div>
              <span className="type-body-sm text-[11px] text-muted-foreground font-mono">Branco em Fundo Escuro</span>
            </div>

            {/* 3. Símbolo Preto em Fundo Muito Claro */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center">
                <BrandSymbol variant="black" className="h-12 w-auto" />
              </div>
              <span className="type-body-sm text-[11px] text-muted-foreground font-mono">Preto em Fundo Muito Claro</span>
            </div>
          </div>
        )
      case "onboarding-checklist":
        return (
          <div className="w-full max-w-md">
            <OnboardingChecklist
              steps={[
                { id: "1", title: "Definir paleta de cores OKLCH", completed: true },
                { id: "2", title: "Configurar tipografia Cabin & Plus Jakarta", completed: true },
                { id: "3", title: "Publicar componentes no Shadcn Registry", completed: false },
              ]}
            />
          </div>
        )
      case "hint-beacon":
        return (
          <div className="p-6 rounded-xl bg-surface border border-border flex items-center justify-center">
            <HintBeacon
              title="Recurso Avançado"
              description="Você pode alternar as densidades da interface em 1 clique."
            />
          </div>
        )
      case "banner-announcement":
        return (
          <div className="w-full max-w-lg">
            <BannerAnnouncement
              title="Nova Versão Disponível"
              description="Joinha DS v1.0.0 foi lançado com suporte nativo a tokens OKLCH e 50 componentes."
              actionLabel="Ver Notas"
              onAction={() => toast.info("Ver notas clicado")}
            />
          </div>
        )
      case "tour-spotlight": {
        const sampleTourSteps: TourStep[] = [
          {
            title: "Bem-vindo ao Joinha DS",
            description: "Explore os 50 componentes com modo escuro nativo e design tokens OKLCH.",
            position: "center",
          },
          {
            title: "Troca de Densidade",
            description: "Alterne entre os modos Compacto, Padrão e Confortável em 1 clique.",
            position: "bottom",
          },
          {
            title: "Copiar CLI",
            description: "Adicione qualquer componente ao seu projeto usando npx shadcn add.",
            position: "top",
          },
        ]
        return (
          <div className="flex flex-col items-center gap-3">
            <Button variant="primary" onClick={() => { setIsTourOpen(true); setTourStepIdx(0); }}>
              <Sparkles className="w-4 h-4 mr-1.5" />
              Iniciar Tour Guiado (Spotlight)
            </Button>
            <TourSpotlight
              steps={sampleTourSteps}
              currentStepIndex={tourStepIdx}
              isOpen={isTourOpen}
              onNext={() => setTourStepIdx(idx => Math.min(sampleTourSteps.length - 1, idx + 1))}
              onPrev={() => setTourStepIdx(idx => Math.max(0, idx - 1))}
              onClose={() => setIsTourOpen(false)}
              onComplete={() => {
                setIsTourOpen(false)
                toast.success("Tour concluído com sucesso!")
              }}
            />
          </div>
        )
      }
      case "persona-selector":
        return (
          <div className="flex flex-col items-center gap-3">
            <Button variant="outline" onClick={() => setIsPersonaModalOpen(true)}>
              Selecionar Perfil de Persona ({activePersona})
            </Button>
            <PersonaSelector
              open={isPersonaModalOpen}
              onOpenChange={setIsPersonaModalOpen}
              onSelectPersona={(pId: string) => {
                setActivePersona(pId)
                toast.success(`Persona alterada para: ${pId}`)
              }}
              defaultPersonaId={activePersona}
            />
          </div>
        )

      /* --- 5. XAI & HITL --- */
      case "confidence-meter":
        return (
          <div className="w-full max-w-md space-y-3">
            <ConfidenceMeter score={94} label="Score de Certeza do Agente" sourceCount={4} />
            <ReasoningTrace
              steps={[
                { title: "Análise de Histórico de Consumo", durationMs: 42, status: "done" },
                { title: "Validação de Políticas de Compliance", durationMs: 24, status: "done" },
              ]}
            />
          </div>
        )
      case "hitl-approval-banner":
        return (
          <div className="w-full max-w-lg">
            <HITLApprovalBanner
              title="Ajuste Proposto de Desconto (15%)"
              description="A IA detectou probabilidade de renovação contratual com este ajuste."
              severity="warning"
              onApprove={() => toast.success("Aprovado com sucesso")}
              onReject={() => toast.info("Proposta rejeitada")}
            />
          </div>
        )
      case "ai-diff-viewer":
        return (
          <div className="w-full max-w-lg">
            <AIDiffViewer
              title="payload_config.json"
              diffs={[
                { type: "removed", content: '  "tier": "basic_legacy",' },
                { type: "added", content: '  "tier": "enterprise_oklch",' },
                { type: "unchanged", content: '  "sla": "99.99%"' },
              ]}
            />
          </div>
        )
      case "agent-status-hud":
        return (
          <div className="w-full max-w-md space-y-3">
            <AgentStatusHUD status="thinking" agentName="Agente de Análise" currentTask="Analisando dependências do projeto..." />
            <AgentStatusHUD status="awaiting_review" agentName="Agente Financeiro" currentTask="Aguardando aprovação humana (HITL)..." />
          </div>
        )
      case "ai-feedback-widget":
        return (
          <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-4">
            <span className="type-body-sm text-xs text-muted-foreground">Esta resposta foi útil?</span>
            <AIFeedbackWidget
              onThumbUp={() => toast.success("Feedback positivo registrado!")}
              onThumbDown={() => toast.info("Feedback negativo registrado.")}
            />
          </div>
        )

      default:
        return (
          <div className="text-center space-y-3 p-6 rounded-xl bg-surface border border-border">
            <div className="p-3 rounded-lg bg-surface-elevated border border-border inline-block shadow-xs">
              <span className="font-mono text-sm font-bold text-primary">
                &lt;{metadata.name} /&gt;
              </span>
            </div>
            <p className="type-body-sm text-xs text-muted-foreground">
              {metadata.description}
            </p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Component Header & Installation Hub */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="type-heading-page text-2xl font-bold tracking-tight text-heading font-display">
                {metadata.name}
              </h1>
              <Badge variant="info" size="sm" className="font-mono text-[10px]">
                {metadata.cliName}
              </Badge>
              <Badge variant="success" size="sm" className="text-[10px]">
                WCAG 2.2 AA
              </Badge>
            </div>
            <p className="type-body-sm text-xs text-muted-foreground max-w-3xl leading-relaxed">
              {metadata.description}
            </p>
          </div>

          {/* Quick CLI Copy Box & Back button */}
          <div className="flex items-center gap-3">
            {onNavigateToLab && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToLab}
                className="h-8 px-2.5 text-xs gap-1 cursor-pointer font-sans"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voltar à Galeria</span>
              </Button>
            )}

            <div className="flex items-center gap-2 bg-surface p-1.5 pl-3 rounded-(--tc-radius-md) border border-border shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <code className="type-code-inline text-[11px] text-muted-foreground truncate max-w-[220px] sm:max-w-xs select-all">
                npx shadcn@latest add {metadata.cliName}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCli}
                className="h-7 px-2.5 text-xs gap-1 cursor-pointer font-sans"
                title="Copiar comando de instalação via Shadcn CLI"
              >
                {copiedCli ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-success" />
                    <span className="text-success text-[11px]">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[11px]">Copiar</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Component When to Use & Usage Recommendation Hub */}
        {metadata.whenToUse && (
          <div className="flex items-start gap-3 pt-3 border-t border-border/60">
            <Compass className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="type-label-xs text-muted-foreground uppercase font-bold tracking-wider text-[10px]">
                Quando Utilizar (Uso Recomendado)
              </span>
              <p className="type-body-sm text-xs text-foreground font-medium leading-relaxed">
                {metadata.whenToUse}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Documentation Hub (Tabs) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface-card p-1 w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
          <TabsTrigger value="preview" className="text-xs gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Preview & Playground</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>Código & Importação</span>
          </TabsTrigger>
          <TabsTrigger value="props" className="text-xs gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Referência de API (Props)</span>
          </TabsTrigger>
          <TabsTrigger value="a11y" className="text-xs gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>Acessibilidade</span>
          </TabsTrigger>
          {metadata.subComponents && metadata.subComponents.length > 0 && (
            <TabsTrigger value="anatomy" className="text-xs gap-1.5">
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Anatomia & Sub-componentes</span>
              <Badge variant="neutral" size="sm" className="text-[9px] px-1 py-0 h-4 font-mono">
                {metadata.subComponents.length}
              </Badge>
            </TabsTrigger>
          )}
        </TabsList>

        {/* 1. PREVIEW & PLAYGROUND */}
        <TabsContent value="preview" className="space-y-6">
          {/* Isolated Preview Canvas with Density Bar */}
          <div className="rounded-(--tc-radius-xl) border border-border bg-surface-card overflow-hidden shadow-xs">
            <div className="flex items-center justify-between p-3 border-b border-border bg-surface/50">
              <span className="type-heading-card text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
                Preview Interativo
              </span>

              {/* Scoped Canvas Density */}
              <div className="inline-flex items-center p-0.5 rounded-(--tc-radius-md) bg-surface-card border border-border">
                <span className="type-label-xs text-[10px] text-muted-foreground px-2 flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-muted-foreground" />
                  <span className="hidden sm:inline">Densidade:</span>
                </span>
                <button
                  type="button"
                  onClick={() => setDensity("compact")}
                  className={cn(
                    "px-2 py-0.5 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
                    density === "compact"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Compact
                </button>
                <button
                  type="button"
                  onClick={() => setDensity("default")}
                  className={cn(
                    "px-2 py-0.5 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
                    density === "default"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Default
                </button>
                <button
                  type="button"
                  onClick={() => setDensity("comfortable")}
                  className={cn(
                    "px-2 py-0.5 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
                    density === "comfortable"
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Comfortable
                </button>
              </div>
            </div>

            {/* Canvas Stage with density wrapper */}
            <div
              data-density={density}
              className="p-8 sm:p-12 min-h-[260px] flex items-center justify-center bg-base bg-(--bg-base) border-t border-border/40"
            >
              {renderLiveComponent()}
            </div>
          </div>

          {/* Use Cases / Variations Gallery */}
          {metadata.examples && metadata.examples.length > 0 && (
            <div className="space-y-4">
              <h3 className="type-heading-section text-sm font-bold text-heading">Exemplos & Casos de Uso</h3>
              <div className="grid grid-cols-1 gap-4">
                {metadata.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-(--tc-radius-lg) border border-border bg-surface-card space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="type-heading-card text-xs font-semibold text-heading">{ex.title}</h4>
                        {ex.description && (
                          <p className="type-body-sm text-[11px] text-muted-foreground">{ex.description}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(ex.code)}
                        className="h-7 px-2.5 text-xs gap-1 cursor-pointer font-sans"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copiar JSX</span>
                      </Button>
                    </div>
                    <pre className="p-3 rounded-md bg-surface font-mono text-xs text-foreground overflow-x-auto border border-border/60">
                      <code>{ex.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* 2. CÓDIGO & IMPORTAÇÃO */}
        <TabsContent value="code" className="space-y-6">
          <div className="p-6 rounded-(--tc-radius-xl) border border-border bg-surface-card space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h3 className="type-heading-card text-sm font-bold text-heading">Declaração de Importação</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyCode(metadata.importStatement)}
                className="h-7 px-2.5 text-xs gap-1 cursor-pointer font-sans"
              >
                <Copy className="w-3 h-3" />
                <span>Copiar</span>
              </Button>
            </div>
            <pre className="p-4 rounded-lg bg-surface font-mono text-xs text-primary border border-border overflow-x-auto">
              <code>{metadata.importStatement}</code>
            </pre>
          </div>

          <div className="p-6 rounded-(--tc-radius-xl) border border-border bg-surface-card space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h3 className="type-heading-card text-sm font-bold text-heading">Exemplo Completo de Uso</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyCode(metadata.usageCode)}
                className="h-7 px-2.5 text-xs gap-1 cursor-pointer font-sans"
              >
                <Copy className="w-3 h-3" />
                <span>Copiar</span>
              </Button>
            </div>
            <pre className="p-4 rounded-lg bg-surface font-mono text-xs text-foreground border border-border overflow-x-auto">
              <code>{metadata.usageCode}</code>
            </pre>
          </div>
        </TabsContent>

        {/* 3. PROPS & API REFERENCE */}
        <TabsContent value="props" className="space-y-6">
          <div className="rounded-(--tc-radius-xl) border border-border bg-surface-card overflow-hidden">
            <div className="p-4 border-b border-border bg-surface/50">
              <h3 className="type-heading-card text-sm font-bold text-heading">Tabela de Propriedades (TypeScript Props)</h3>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Prop</TableHead>
                  <TableHead className="w-[200px]">Tipo TypeScript</TableHead>
                  <TableHead className="w-[120px]">Padrão</TableHead>
                  <TableHead>Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metadata.props && metadata.props.length > 0 ? (
                  metadata.props.map((prop, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-mono font-bold text-primary">
                        {prop.name}
                        {prop.required && <span className="text-destructive ml-1">*</span>}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground text-[11px]">{prop.type}</TableCell>
                      <TableCell className="font-mono text-muted-foreground/80">{prop.defaultValue || "—"}</TableCell>
                      <TableCell className="text-foreground font-sans text-xs">{prop.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="p-4 text-center text-muted-foreground">
                      Aceita todas as props nativas de HTML element e classes do Tailwind CSS.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* 4. ACESSIBILIDADE */}
        <TabsContent value="a11y" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold text-sm border-b border-border/80 pb-3">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="type-heading-card">Conformidade WCAG 2.2 AA & Padrões WAI-ARIA</span>
            </div>

            <p className="type-body-sm text-xs text-muted-foreground leading-relaxed">
              O componente <strong>{metadata.name}</strong> foi auditado com leitores de tela e navegação estrita por teclado.
              {metadata.accessibility.notes && ` ${metadata.accessibility.notes}`}
            </p>

            {metadata.accessibility.keyboardShortcuts && (
              <div className="space-y-2">
                <h4 className="type-heading-card text-xs font-bold text-heading flex items-center gap-1.5">
                  <Keyboard className="w-3.5 h-3.5 text-primary" />
                  Navegação e Atalhos por Teclado
                </h4>
                <div className="divide-y divide-border/60 border border-border/80 rounded-lg overflow-hidden bg-surface">
                  {metadata.accessibility.keyboardShortcuts.map((kb, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <Kbd>{kb.key}</Kbd>
                      <span className="type-body-sm text-muted-foreground">{kb.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {metadata.accessibility.ariaAttributes && (
              <div className="space-y-2">
                <h4 className="type-heading-card text-xs font-bold text-heading">Atributos ARIA Implementados</h4>
                <div className="divide-y divide-border/60 border border-border/80 rounded-lg overflow-hidden bg-surface">
                  {metadata.accessibility.ariaAttributes.map((aria, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <code className="font-mono text-primary font-bold">{aria.attribute}</code>
                      <span className="type-body-sm text-muted-foreground">{aria.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* 5. ANATOMIA ATÔMICA & SUB-COMPONENTES */}
        {metadata.subComponents && metadata.subComponents.length > 0 && (
          <TabsContent value="anatomy" className="space-y-6">
            <div className="space-y-1 pb-3 border-b border-border/60">
              <h3 className="type-heading-card text-sm font-bold text-heading flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <span>Hierarquia Atômica & Compound Components</span>
              </h3>
              <p className="type-body-sm text-xs text-muted-foreground">
                O componente <strong>{metadata.name}</strong> é estruturado a partir de átomos e moléculas modulares, permitindo composição flexível e vinculação estrita a tokens de design.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {metadata.subComponents.map((sub, idx) => (
                <div
                  key={idx}
                  className="rounded-(--tc-radius-lg) border border-border bg-surface-card p-5 space-y-3 hover:border-primary/40 transition-colors shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-primary">
                        &lt;{sub.name} /&gt;
                      </span>
                      <Badge
                        variant={
                          sub.level === "atom"
                            ? "info"
                            : sub.level === "molecule"
                            ? "warning"
                            : "success"
                        }
                        size="sm"
                        className="text-[10px] uppercase font-semibold font-sans"
                      >
                        {sub.level === "atom" ? "Átomo" : sub.level === "molecule" ? "Molécula" : "Organismo"}
                      </Badge>
                    </div>

                    {sub.tokensUsed && sub.tokensUsed.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="type-label-xs text-muted-foreground text-[10px]">Tokens:</span>
                        {sub.tokensUsed.map((tok, tIdx) => (
                          <code
                            key={tIdx}
                            className="font-mono text-[10px] bg-surface px-1.5 py-0.5 rounded border border-border text-foreground font-semibold"
                          >
                            {tok}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="type-body-sm text-xs text-muted-foreground">
                    {sub.description}
                  </p>

                  {sub.usageCode && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="type-label-xs text-[10px] text-muted-foreground">Exemplo de Composição:</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(sub.usageCode!)}
                          className="h-6 px-2 text-[11px] gap-1 cursor-pointer font-sans"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </Button>
                      </div>
                      <pre className="p-3 rounded-md bg-surface font-mono text-xs text-foreground border border-border/80 overflow-x-auto">
                        <code>{sub.usageCode}</code>
                      </pre>
                    </div>
                  )}

                  {sub.props && sub.props.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="type-label-xs text-[10px] text-muted-foreground">Props do Sub-componente:</span>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[140px]">Prop</TableHead>
                            <TableHead className="w-[180px]">Tipo</TableHead>
                            <TableHead>Descrição</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sub.props.map((p, pIdx) => (
                            <TableRow key={pIdx}>
                              <TableCell className="font-mono font-bold text-primary text-xs">
                                {p.name}
                              </TableCell>
                              <TableCell className="font-mono text-muted-foreground text-[11px]">
                                {p.type}
                              </TableCell>
                              <TableCell className="text-foreground text-xs font-sans">
                                {p.description}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Footer Navigation (Previous / Next Component) */}
      <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
        {prevKey ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateComponent?.(prevKey)}
            className="gap-1.5 text-xs cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{COMPONENT_METADATA_MAP[prevKey]?.name || prevKey}</span>
          </Button>
        ) : <div />}

        {nextKey && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateComponent?.(nextKey)}
            className="gap-1.5 text-xs cursor-pointer"
          >
            <span>{COMPONENT_METADATA_MAP[nextKey]?.name || nextKey}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  )
}
