import * as React from "react"
import {
  Sparkles,
  Search,
  Copy,
  RotateCcw,
  Info,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Tag } from "@/components/ui/tag"
import { Skeleton } from "@/components/ui/skeleton"
import { Kbd } from "@/components/ui/kbd"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Sparkline } from "@/components/ui/sparkline"
import { MetricCard } from "@/components/ui/metric-card"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { ConfidenceMeter, ReasoningTrace } from "@/components/ui/confidence-meter"
import { HITLApprovalBanner } from "@/components/ui/hitl-approval-banner"
import { AIDiffViewer, type DiffLine } from "@/components/ui/ai-diff-viewer"
import { AgentStatusHUD, type AgentStatusType } from "@/components/ui/agent-status-hud"
import { AIFeedbackWidget } from "@/components/ui/ai-feedback-widget"
import { HintBeacon } from "@/components/ui/hint-beacon"
import { BannerAnnouncement } from "@/components/ui/banner-announcement"
import { PersonaSelector } from "@/components/ui/persona-selector"
import { BrandSymbol } from "@/components/ui/brand-symbol"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export type ComponentCategory =
  | "primitives"
  | "nav_layout"
  | "data_viz"
  | "onboarding"
  | "xai_hitl"
  | "shell"

export interface ComponentItem {
  id: string
  name: string
  cliName: string
  category: ComponentCategory
  categoryLabel: string
  description: string
  renderPreview: (helpers: LabHelpers) => React.ReactNode
}

export interface LabHelpers {
  sliderValue: number[]
  setSliderValue: (v: number[]) => void
  switchChecked: boolean
  setSwitchChecked: (v: boolean) => void
  selectedRadio: string
  setSelectedRadio: (v: string) => void
  openPersonaModal: () => void
  copyCliCommand: (name: string) => void
}

export interface ComponentLabViewProps {
  initialCategory?: string
  onStartTour?: () => void
  onOpenCommand?: () => void
  onSelectComponent?: (id: string) => void
}

export function ComponentLabView({
  initialCategory = "all",
  onStartTour,
  onOpenCommand,
  onSelectComponent,
}: ComponentLabViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>(initialCategory)
  const [labDensity, setLabDensity] = React.useState<"compact" | "default" | "comfortable">("default")

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  // Interactive Playground states
  const [hasBorder, setHasBorder] = React.useState(true)
  const [hasGradientBorder, setHasGradientBorder] = React.useState(false)
  const [hasElevation, setHasElevation] = React.useState(true)
  const [hasGlow, setHasGlow] = React.useState(false)
  const [sliderValue, setSliderValue] = React.useState([45])
  const [switchChecked, setSwitchChecked] = React.useState(true)
  const [selectedRadio, setSelectedRadio] = React.useState("pro")
  const [isPersonaModalOpen, setIsPersonaModalOpen] = React.useState(false)
  const [agentStatus, setAgentStatus] = React.useState<AgentStatusType>("awaiting_review")
  const [hitlDecision, setHitlDecision] = React.useState<"approved" | "rejected" | null>(null)
  const [selectedRecordId, setSelectedRecordId] = React.useState("SUB-8941")

  const copyCliCommand = (componentName: string) => {
    const cmd = `npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/${componentName}.json`
    navigator.clipboard.writeText(cmd)
    toast.success(`Comando CLI copiado!`, { description: cmd })
  }

  const helpers: LabHelpers = {
    sliderValue,
    setSliderValue,
    switchChecked,
    setSwitchChecked,
    selectedRadio,
    setSelectedRadio,
    openPersonaModal: () => setIsPersonaModalOpen(true),
    copyCliCommand,
  }

  const sampleDiffs: DiffLine[] = [
    { type: "unchanged", content: "export const tenantBillingConfig = {" },
    { type: "removed", content: '  discountTier: "STANDARD_5_PERCENT",' },
    { type: "added", content: '  discountTier: "ENTERPRISE_CUSTOM_15_PERCENT",' },
    { type: "unchanged", content: '  quotaLimitRequests: 100000,' },
    { type: "removed", content: "  autoRenewal: false," },
    { type: "added", content: "  autoRenewal: true," },
    { type: "added", content: '  slaGuaranteedUptime: "99.95%",' },
    { type: "unchanged", content: "}" },
  ]

  const sampleReasoningSteps = [
    {
      title: "Análise de Histórico de Consumo",
      detail: "SELECT avg(requests_per_day), max_burst FROM telemetry_metrics WHERE tenant_id = 'SUB-8941' AND created_at > NOW() - INTERVAL '90 days';",
      status: "done" as const,
      durationMs: 42,
      source: "Postgres Analytics",
    },
    {
      title: "Cálculo de Projeção de Churn",
      detail: "O cliente atingiu 92% do limite de quota 4 vezes no último trimestre. Probabilidade de churn reduz em 68% com tier de 15% de desconto e SLA dedicado.",
      status: "done" as const,
      durationMs: 118,
      source: "ML Churn Model v2.4",
    },
    {
      title: "Validação de Políticas de Compliance",
      detail: "Verificação de autorização de margem comercial. Desconto de 15% está dentro do limite aprovado para contas Enterprise com MRR > R$ 4.000.",
      status: "done" as const,
      durationMs: 24,
      source: "Policy Engine",
    },
  ]

  // Complete Catalog of 50 Components
  const componentCatalog: ComponentItem[] = [
    // --- 1. PRIMITIVES & CONTROLS (18) ---
    {
      id: "button",
      name: "Button",
      cliName: "button",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Botão interativo com variantes Primary, Secondary, Outline, Ghost e Destructive.",
      renderPreview: () => (
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="outline" size="sm">Outline</Button>
          <Button variant="destructive" size="sm">Destructive</Button>
        </div>
      ),
    },
    {
      id: "input",
      name: "Input",
      cliName: "input",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Campo de entrada de texto com suporte a foco perceptível e estados de validação.",
      renderPreview: () => (
        <Input placeholder="Digite seu e-mail corporativo..." className="h-8 text-xs w-full max-w-[240px]" />
      ),
    },
    {
      id: "select",
      name: "Select",
      cliName: "select",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Menu suspenso acessível com busca e posicionamento dinâmico.",
      renderPreview: () => (
        <Select defaultValue="brl">
          <SelectTrigger className="h-8 text-xs w-full max-w-[220px]">
            <SelectValue placeholder="Moeda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brl">Real Brasileiro (BRL)</SelectItem>
            <SelectItem value="usd">Dólar Americano (USD)</SelectItem>
            <SelectItem value="eur">Euro (EUR)</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      id: "switch",
      name: "Switch",
      cliName: "switch",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Interruptor toggle acessível para alternância de configurações imediatas.",
      renderPreview: (h) => (
        <div className="flex items-center gap-3">
          <Switch checked={h.switchChecked} onCheckedChange={h.setSwitchChecked} />
          <span className="text-xs text-muted-foreground font-medium">
            {h.switchChecked ? "Ativado" : "Desativado"}
          </span>
        </div>
      ),
    },
    {
      id: "checkbox",
      name: "Checkbox",
      cliName: "checkbox",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Caixa de seleção com suporte a indeterminate e estados de foco WCAG.",
      renderPreview: () => (
        <div className="flex items-center gap-2">
          <Checkbox id="c1" defaultChecked />
          <label htmlFor="c1" className="text-xs text-muted-foreground font-medium cursor-pointer">
            Aceitar termos de SLA Enterprise
          </label>
        </div>
      ),
    },
    {
      id: "radio-group",
      name: "RadioGroup",
      cliName: "radio-group",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Seleção mutuamente exclusiva de opções com navegação por setas do teclado.",
      renderPreview: (h) => (
        <RadioGroup value={h.selectedRadio} onValueChange={h.setSelectedRadio} className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="starter" id="cr1" />
            <label htmlFor="cr1" className="text-xs font-medium cursor-pointer">Starter</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pro" id="cr2" />
            <label htmlFor="cr2" className="text-xs font-medium cursor-pointer">Pro</label>
          </div>
        </RadioGroup>
      ),
    },
    {
      id: "slider",
      name: "Slider",
      cliName: "slider",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Controle deslizante de intervalos e valores numéricos contínuos.",
      renderPreview: (h) => (
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <Slider value={h.sliderValue} onValueChange={h.setSliderValue} max={100} step={1} />
          <span className="text-xs font-mono font-bold text-foreground w-8">{h.sliderValue}%</span>
        </div>
      ),
    },
    {
      id: "textarea",
      name: "Textarea",
      cliName: "textarea",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Área de texto com redimensionamento vertical suave e padding proporcional.",
      renderPreview: () => (
        <Textarea placeholder="Instruções de provisionamento..." className="min-h-[44px] h-11 text-xs w-full" />
      ),
    },
    {
      id: "badge",
      name: "Badge",
      cliName: "badge",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Distintivos de status semânticos (Success, Warning, Danger, Info, Neutral).",
      renderPreview: () => (
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="success" size="sm" dot>Ativo</Badge>
          <Badge variant="warning" size="sm">Pendente</Badge>
          <Badge variant="danger" size="sm">Erro</Badge>
          <Badge variant="info" size="sm">v1.0</Badge>
        </div>
      ),
    },
    {
      id: "tag",
      name: "Tag",
      cliName: "tag",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Etiquetas com cores temáticas (Purple, Teal, Pink, Indigo, Orange).",
      renderPreview: () => (
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag variant="purple" size="sm">Engenharia</Tag>
          <Tag variant="teal" size="sm">Finanças</Tag>
          <Tag variant="pink" size="sm">Design</Tag>
        </div>
      ),
    },
    {
      id: "alert",
      name: "Alert",
      cliName: "alert",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Caixas de alerta e avisos contextuais com ícones de severidade.",
      renderPreview: () => (
        <Alert variant="info" className="py-2 px-3 text-xs w-full">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-xs font-semibold">Atualização Disponível</AlertTitle>
          <AlertDescription className="text-[11px]">Novo patch de segurança aplicado.</AlertDescription>
        </Alert>
      ),
    },
    {
      id: "tooltip",
      name: "Tooltip",
      cliName: "tooltip",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Dicas de contexto flutuantes com temporização otimizada e micro-animação.",
      renderPreview: () => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">Passe o cursor</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-medium">Informação contextual de ajuda</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
    },
    {
      id: "kbd",
      name: "Kbd",
      cliName: "kbd",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Exibição semântica de teclas de atalho de teclado.",
      renderPreview: () => (
        <div className="flex items-center gap-2">
          <Kbd>⌘K</Kbd>
          <Kbd>⇧P</Kbd>
          <Kbd>Esc</Kbd>
        </div>
      ),
    },
    {
      id: "skeleton",
      name: "Skeleton",
      cliName: "skeleton",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Placeholders pulsantes para estados de carregamento assíncrono.",
      renderPreview: () => (
        <div className="space-y-1.5 w-full max-w-[200px]">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ),
    },
    {
      id: "dialog",
      name: "Dialog",
      cliName: "dialog",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Modais acessíveis com trap de foco, backdrop blur e animação de escala.",
      renderPreview: () => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">Abrir Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmação de Ação</DialogTitle>
              <DialogDescription>Deseja aplicar as novas configurações ao tenant?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="primary" size="sm" onClick={() => toast.success("Ação confirmada!")}>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      id: "alert-dialog",
      name: "AlertDialog",
      cliName: "alert-dialog",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Diálogo de alerta de confirmação destrutiva ou de alto risco.",
      renderPreview: () => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="text-xs">Excluir Chave</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
              <AlertDialogDescription>Esta ação revogará a chave de API imediatamente.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast.error("Chave revogada.")}>Revogar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      id: "dropdown-menu",
      name: "DropdownMenu",
      cliName: "dropdown-menu",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Menu suspenso com suporte a grupos, separadores e atalhos.",
      renderPreview: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">Opções ▾</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Ações Rápidas</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => toast.info("Exportando...")}>Exportar CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Duplicando...")}>Duplicar Tenant</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-danger" onClick={() => toast.error("Excluído")}>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      id: "brand-symbol",
      name: "BrandSymbol",
      cliName: "brand-symbol",
      category: "primitives",
      categoryLabel: "Primitivos",
      description: "Símbolo visual e marca oficial do Joinha Design System em SVG vetorial.",
      renderPreview: () => (
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <BrandSymbol className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xs text-foreground">Joinha DS</span>
        </div>
      ),
    },

    // --- 2. NAVIGATION & LAYOUT (10) ---
    {
      id: "tabs",
      name: "Tabs",
      cliName: "tabs",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Abas de alternância de visualizações com suporte a teclado.",
      renderPreview: () => (
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="h-8">
            <TabsTrigger value="geral" className="text-xs">Geral</TabsTrigger>
            <TabsTrigger value="seguranca" className="text-xs">Segurança</TabsTrigger>
          </TabsList>
        </Tabs>
      ),
    },
    {
      id: "accordion",
      name: "Accordion",
      cliName: "accordion",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Paineis colapsáveis para revelação progressiva de conteúdo.",
      renderPreview: () => (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xs py-2">Detalhes de Conexão</AccordionTrigger>
            <AccordionContent className="text-[11px] text-muted-foreground">
              Host: db.prod.joinha.internal (Porta 5432)
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ),
    },
    {
      id: "sheet",
      name: "Sheet",
      cliName: "sheet",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Gavetas deslizantes laterais (Drawers) para edição contextual.",
      renderPreview: () => (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs">Abrir Gaveta (Sheet)</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Painel Lateral</SheetTitle>
              <SheetDescription>Edição contextual sem perda de foco.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ),
    },
    {
      id: "separator",
      name: "Separator",
      cliName: "separator",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Divisores semânticos horizontais ou verticais com cor adaptável.",
      renderPreview: () => (
        <div className="flex items-center gap-3 w-full text-xs text-muted-foreground">
          <span>Início</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Fim</span>
        </div>
      ),
    },
    {
      id: "resizable",
      name: "Resizable",
      cliName: "resizable",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Split panes redimensionáveis por arrasto ou teclado baseados em react-resizable-panels.",
      renderPreview: () => (
        <div className="h-16 w-full rounded border border-border overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40} className="p-2 bg-surface/50 text-[10px] flex items-center justify-center font-mono">
              Painel 1 (40%)
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60} className="p-2 bg-surface-elevated/40 text-[10px] flex items-center justify-center font-mono">
              Painel 2 (60%)
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ),
    },
    {
      id: "floating-toolbar",
      name: "FloatingToolbar",
      cliName: "floating-toolbar",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "HUD flutuante e dock glassmorphic persistente para ações de alta frequência.",
      renderPreview: () => (
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-surface-elevated border border-border shadow-md">
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">⌘</Button>
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">⚙</Button>
          <Button variant="primary" size="sm" className="h-7 px-2.5 rounded-full text-[10px]">Ação</Button>
        </div>
      ),
    },
    {
      id: "command",
      name: "Command",
      cliName: "command",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Paleta de comandos modal (⌘K) com busca fuzzy ultra-rápida.",
      renderPreview: () => (
        <Button variant="outline" size="sm" className="text-xs font-mono gap-2" onClick={onOpenCommand}>
          <Search className="w-3.5 h-3.5" />
          <span>⌘K Command Palette</span>
        </Button>
      ),
    },
    {
      id: "app-layout",
      name: "AppLayout",
      cliName: "app-layout",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Estrutura shell completa para aplicações SaaS com suporte a sidebar e header.",
      renderPreview: () => (
        <Badge variant="info" size="sm">Container Shell Ativo</Badge>
      ),
    },
    {
      id: "sidebar",
      name: "Sidebar",
      cliName: "sidebar",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Barra lateral de navegação colapsável com workspace switcher e badges.",
      renderPreview: () => (
        <Badge variant="neutral" size="sm">Sidebar Integrada</Badge>
      ),
    },
    {
      id: "header",
      name: "Header",
      cliName: "header",
      category: "nav_layout",
      categoryLabel: "Layout & Nav",
      description: "Cabeçalho com breadcrumbs, busca rápida, notificações e alternador de tema.",
      renderPreview: () => (
        <Badge variant="neutral" size="sm">Header com Breadcrumbs</Badge>
      ),
    },

    // --- 3. DATA VISUALIZATION (7) ---
    {
      id: "metric-card",
      name: "MetricCard",
      cliName: "metric-card",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Card de métricas KPI com sparkline Bézier, indicador de tendência e meta.",
      renderPreview: () => (
        <MetricCard
          title="Receita MRR"
          value="R$ 48.920"
          chartVariant={1}
          change={{ value: "+14.2%", trend: "up" }}
          sparklineData={[28, 31, 35, 40, 48.9]}
          className="p-3 text-xs w-full"
        />
      ),
    },
    {
      id: "sparkline",
      name: "Sparkline",
      cliName: "sparkline",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Mini-gráfico vetorial suave em SVG para renderização em tabelas ou cards.",
      renderPreview: () => (
        <div className="h-8 w-32">
          <Sparkline data={[10, 25, 18, 42, 35, 60, 54]} chartVariant={1} />
        </div>
      ),
    },
    {
      id: "progress",
      name: "Progress",
      cliName: "progress",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Barra de progresso com variantes semânticas e animação suave de preenchimento.",
      renderPreview: () => (
        <div className="w-full max-w-[180px] space-y-1">
          <Progress value={78} variant="default" className="h-2" />
        </div>
      ),
    },
    {
      id: "avatar",
      name: "Avatar",
      cliName: "avatar",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Avatares de usuário com suporte a fallback de iniciais e grupos empilhados.",
      renderPreview: () => (
        <AvatarGroup max={3}>
          <Avatar className="h-7 w-7">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7">
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7">
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      ),
    },
    {
      id: "empty-state",
      name: "EmptyState",
      cliName: "empty-state",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Placeholder ilustrativo para coleções vazias ou resultados não encontrados.",
      renderPreview: () => (
        <div className="p-3 rounded bg-surface border border-border text-center w-full">
          <p className="text-xs font-medium text-foreground">Nenhum registro encontrado</p>
        </div>
      ),
    },
    {
      id: "chart",
      name: "Chart",
      cliName: "chart",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Container e componentes de gráficos Recharts integrados com tokens CSS de cor.",
      renderPreview: () => (
        <Badge variant="info" size="sm">Recharts CSS Tokens</Badge>
      ),
    },
    {
      id: "data-table",
      name: "DataTable",
      cliName: "data-table",
      category: "data_viz",
      categoryLabel: "Visualização",
      description: "Tabela densa empresarial com ordenação, paginação e suporte a densidade paramétrica.",
      renderPreview: () => (
        <Badge variant="success" size="sm">DataTable Paramétrica</Badge>
      ),
    },

    // --- 4. ONBOARDING & ADOPTION (5) ---
    {
      id: "tour-spotlight",
      name: "TourSpotlight",
      cliName: "tour-spotlight",
      category: "onboarding",
      categoryLabel: "Onboarding",
      description: "Tour interativo passo a passo com máscara escura de foco e navegação guiada.",
      renderPreview: () => (
        <Button variant="primary" size="sm" onClick={onStartTour} className="text-xs gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Iniciar Tour</span>
        </Button>
      ),
    },
    {
      id: "onboarding-checklist",
      name: "OnboardingChecklist",
      cliName: "onboarding-checklist",
      category: "onboarding",
      categoryLabel: "Onboarding",
      description: "Checklist de ativação e onboarding com progresso visual e estados completados.",
      renderPreview: () => (
        <Badge variant="info" size="sm">Checklist com Progresso</Badge>
      ),
    },
    {
      id: "hint-beacon",
      name: "HintBeacon",
      cliName: "hint-beacon",
      category: "onboarding",
      categoryLabel: "Onboarding",
      description: "Farol pulsante de novidades e destaques de novas funcionalidades.",
      renderPreview: () => (
        <div className="flex items-center gap-2">
          <HintBeacon title="Novidade: XAI" description="Descubra a nova suíte de IA explicável." />
          <span className="text-xs text-muted-foreground">Beacon interativo</span>
        </div>
      ),
    },
    {
      id: "persona-selector",
      name: "PersonaSelector",
      cliName: "persona-selector",
      category: "onboarding",
      categoryLabel: "Onboarding",
      description: "Modal de seleção de persona/perfil (Dev, Finanças, Executivo) na primeira ativação.",
      renderPreview: (h) => (
        <Button variant="outline" size="sm" onClick={h.openPersonaModal} className="text-xs">
          Selecionar Perfil
        </Button>
      ),
    },
    {
      id: "banner-announcement",
      name: "BannerAnnouncement",
      cliName: "banner-announcement",
      category: "onboarding",
      categoryLabel: "Onboarding",
      description: "Faixa de comunicação de release e avisos importantes de topo.",
      renderPreview: () => (
        <BannerAnnouncement title="Joinha DS v1.0.0 lançado com 50 componentes e OKLCH!" />
      ),
    },

    // --- 5. XAI & HUMAN-IN-THE-LOOP (5) ---
    {
      id: "confidence-meter",
      name: "ConfidenceMeter",
      cliName: "confidence-meter",
      category: "xai_hitl",
      categoryLabel: "XAI & HITL",
      description: "Medidor visual de certeza matemática da IA com número de fontes citadas.",
      renderPreview: () => (
        <ConfidenceMeter score={94} sourceCount={3} label="Confiança" className="p-2 w-full" />
      ),
    },
    {
      id: "reasoning-trace",
      name: "ReasoningTrace",
      cliName: "reasoning-trace",
      category: "xai_hitl",
      categoryLabel: "XAI & HITL",
      description: "Acordeão de rastreamento do raciocínio lógico (Chain-of-Thought) passo a passo.",
      renderPreview: () => (
        <div className="w-full">
          <ReasoningTrace steps={sampleReasoningSteps.slice(0, 1)} executionTimeMs={42} />
        </div>
      ),
    },
    {
      id: "hitl-approval-banner",
      name: "HITLApprovalBanner",
      cliName: "hitl-approval-banner",
      category: "xai_hitl",
      categoryLabel: "XAI & HITL",
      description: "Banner de interceptação humana para ações críticas com Aprovar, Rejeitar e Editar.",
      renderPreview: () => (
        <Badge variant="warning" size="sm">Interceptação Humana Ativa</Badge>
      ),
    },
    {
      id: "ai-diff-viewer",
      name: "AIDiffViewer",
      cliName: "ai-diff-viewer",
      category: "xai_hitl",
      categoryLabel: "XAI & HITL",
      description: "Comparador visual de diffs estruturados (Split ou Unificado) para propostas de IA.",
      renderPreview: () => (
        <div className="w-full">
          <AIDiffViewer title="Diff de Configuração" diffs={sampleDiffs.slice(0, 3)} defaultMode="unified" />
        </div>
      ),
    },
    {
      id: "agent-status-hud",
      name: "AgentStatusHUD",
      cliName: "agent-status-hud",
      category: "xai_hitl",
      categoryLabel: "XAI & HITL",
      description: "Status em tempo real de agentes autônomos (Thinking, Executing, Awaiting, Done).",
      renderPreview: () => (
        <div className="w-full">
          <AgentStatusHUD status="thinking" agentName="Copiloto de Receita" currentTask="Analisando quotas..." />
        </div>
      ),
    },
    {
      id: "ai-feedback-widget",
      name: "AIFeedbackWidget",
      cliName: "ai-feedback-widget",
      category: "xai_hitl",
      categoryLabel: "XAI & HITL",
      description: "Controles de feedback in-situ com Thumbs Up/Down, cópia e reporte de alucinação.",
      renderPreview: () => (
        <AIFeedbackWidget
          contentToCopy="Resultado gerado por IA"
          onThumbUp={() => toast.success("Feedback positivo!")}
          onThumbDown={() => toast.info("Feedback registrado.")}
        />
      ),
    },
  ]

  const categories = [
    { id: "all", label: "Todos (50)", count: componentCatalog.length },
    { id: "primitives", label: "Primitivos & Controles", count: 18 },
    { id: "nav_layout", label: "Navegação & Layout", count: 10 },
    { id: "data_viz", label: "Visualização de Dados", count: 7 },
    { id: "onboarding", label: "Onboarding UX", count: 5 },
    { id: "xai_hitl", label: "XAI & HITL", count: 5 },
  ]

  // REACTIVE FILTERING LOGIC
  const filteredComponents = React.useMemo(() => {
    return componentCatalog.filter((comp) => {
      const matchesCategory = selectedCategory === "all" || comp.category === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        comp.name.toLowerCase().includes(q) ||
        comp.description.toLowerCase().includes(q) ||
        comp.cliName.toLowerCase().includes(q) ||
        comp.categoryLabel.toLowerCase().includes(q)

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              Laboratório Interativo de Componentes
            </h1>
            <Badge variant="info" size="sm">{componentCatalog.length} Componentes</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Explore, teste variantes em tempo real e copie o comando CLI de instalação de qualquer componente do Joinha DS.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onStartTour && (
            <Button variant="primary" size="sm" onClick={onStartTour} className="gap-1.5 text-xs font-semibold cursor-pointer">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tour Interativo</span>
            </Button>
          )}
        </div>
      </div>

      {/* Unified Filter & Density Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-card p-3.5 rounded-(--tc-radius-xl) border border-border shadow-xs">
        {/* Active Category Context & Counter */}
        <div className="flex items-center gap-2.5">
          <Badge variant="info" size="sm" className="font-semibold px-2.5 py-0.5">
            {categories.find((c) => c.id === selectedCategory)?.label || "Todos os Componentes"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Mostrando <strong className="text-foreground">{filteredComponents.length}</strong> de{" "}
            <strong className="text-foreground">{componentCatalog.length}</strong> componentes
            {searchQuery && (
              <span> para &quot;<span className="text-primary font-mono">{searchQuery}</span>&quot;</span>
            )}
          </span>
        </div>

        {/* Right Controls: Search + Density + Reset */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Filtrar por nome ou tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-7 h-8 text-xs bg-surface border-border"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs cursor-pointer p-0.5"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>

          {/* Scoped Lab Density Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-(--tc-radius-md) bg-surface border border-border">
            <span className="text-[10px] font-mono text-muted-foreground px-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-muted-foreground" />
              <span className="hidden sm:inline">Densidade:</span>
            </span>
            <button
              type="button"
              onClick={() => { setLabDensity("compact"); toast.info("Densidade do Lab: Compact (32px)"); }}
              className={cn(
                "px-2 py-0.5 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
                labDensity === "compact"
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Compact (32px)"
            >
              Compact
            </button>
            <button
              type="button"
              onClick={() => { setLabDensity("default"); toast.info("Densidade do Lab: Default (40px)"); }}
              className={cn(
                "px-2 py-0.5 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
                labDensity === "default"
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Default (40px)"
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => { setLabDensity("comfortable"); toast.info("Densidade do Lab: Comfortable (48px)"); }}
              className={cn(
                "px-2 py-0.5 text-[11px] font-medium rounded-(--tc-radius-sm) transition-colors cursor-pointer",
                labDensity === "comfortable"
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title="Comfortable (48px)"
            >
              Comfortable
            </button>
          </div>
        </div>
      </div>

      {/* Scoped Density Wrapper for Component Sandbox */}
      <div data-density={labDensity} className="space-y-12">
      {/* DYNAMIC FILTERED COMPONENT CARDS GRID */}
      {filteredComponents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredComponents.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-(--tc-radius-xl) surface-card border border-border hover:border-primary/40 transition-all duration-200 flex flex-col justify-between gap-3 group shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold font-display text-foreground">{item.name}</h3>
                    <Badge variant="neutral" size="sm" className="text-[10px] py-0 px-1.5">
                      {item.categoryLabel}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCliCommand(item.cliName)}
                    className="h-7 px-2 text-[11px] font-sans font-medium gap-1 text-muted-foreground hover:text-foreground"
                    title={`Copiar comando npx shadcn add ${item.cliName}`}
                  >
                    <Copy className="w-3 h-3" />
                    <span>CLI</span>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Interactive Mini-Preview */}
              <div className="p-3 rounded-(--tc-radius-lg) bg-surface/70 border border-border/80 min-h-[56px] flex items-center justify-center overflow-hidden">
                {item.renderPreview(helpers)}
              </div>

              {/* CLI Command Line & Doc Link Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                <button
                  type="button"
                  onClick={() => onSelectComponent?.(`comp-${item.cliName}`)}
                  className="text-primary hover:underline font-semibold cursor-pointer text-xs flex items-center gap-1 group/link"
                >
                  <span>Ver Documentação & API</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => copyCliCommand(item.cliName)}
                  className="text-muted-foreground hover:text-foreground font-mono text-[10px] px-1.5 py-0.5 rounded border border-border/70 hover:border-border cursor-pointer transition-colors"
                  title={`Copiar npx shadcn add ${item.cliName}`}
                >
                  CLI
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-(--tc-radius-xl) bg-surface-card border border-dashed border-border space-y-4">
          <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mx-auto text-muted-foreground">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold font-display text-foreground">
              Nenhum componente encontrado
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Não encontramos nenhum componente correspondente ao termo &quot;{searchQuery}&quot; na categoria selecionada.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
            }}
            className="text-xs gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpar Filtros e Ver Todos</span>
          </Button>
        </div>
      )}

      {/* ADVANCED INTERACTIVE SHOWCASE SUITES (Rendered when category matches or 'all') */}
      {(selectedCategory === "all" || selectedCategory === "primitives") && (
        <section className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h2 className="text-lg font-bold font-display tracking-tight text-foreground">
                Sandbox: Controles de Superfície e Efeitos Ópticos
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Experimente a interação entre bordas, gradientes de luz e elevação dark-first.
              </p>
            </div>
            <Badge variant="neutral" size="sm">Live Matrix</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
              <span className="text-sm font-medium">Borda Base</span>
              <Switch checked={hasBorder} onCheckedChange={setHasBorder} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
              <span className="text-sm font-medium">Gradiente de Borda</span>
              <Switch checked={hasGradientBorder} onCheckedChange={setHasGradientBorder} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
              <span className="text-sm font-medium">Elevação (Sombra)</span>
              <Switch checked={hasElevation} onCheckedChange={setHasElevation} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border">
              <span className="text-sm font-medium">Brand Glow (Hero)</span>
              <Switch checked={hasGlow} onCheckedChange={setHasGlow} />
            </div>
          </div>
        </section>
      )}

      {/* Enterprise Resizable Master-Detail Split Pane */}
      {(selectedCategory === "all" || selectedCategory === "nav_layout") && (
        <section className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h2 className="text-lg font-bold font-display tracking-tight text-foreground">
                Painéis Redimensionáveis Master-Detail (Split Panes)
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Arraste a alça central (*grab handle*) ou use as setas do teclado para redimensionar os painéis em tempo real.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => copyCliCommand("resizable")} className="text-xs font-mono gap-1 text-muted-foreground">
              <Copy className="w-3 h-3" />
              npx shadcn add resizable
            </Button>
          </div>

          <div className="rounded-(--tc-radius-xl) border border-border bg-surface-card overflow-hidden shadow-lg">
            <div className="h-[360px] w-full">
              <ResizablePanelGroup direction="horizontal" className="h-full w-full rounded-(--tc-radius-xl)">
                {/* Left Panel: Master List */}
                <ResizablePanel defaultSize={40} minSize={25} maxSize={60} className="p-4 bg-surface/40 flex flex-col">
                  <div className="flex items-center justify-between pb-3 border-b border-border/80">
                    <span className="text-xs font-bold font-display uppercase tracking-wider text-muted-foreground">
                      Lista Mestre (4 Registros)
                    </span>
                    <Badge variant="neutral" size="sm" className="font-sans font-medium text-[10px]">ERP</Badge>
                  </div>

                  <div className="mt-3 space-y-1.5 overflow-y-auto flex-1 pr-1">
                    {[
                      { id: "SUB-8941", name: "Acme Corporation", plan: "Enterprise", val: "R$ 4.200", status: "active" as const },
                      { id: "SUB-8942", name: "Stark Tech Labs", plan: "Pro", val: "R$ 1.450", status: "active" as const },
                      { id: "SUB-8943", name: "Wayne Enterprises", plan: "Enterprise", val: "R$ 5.800", status: "pending" as const },
                      { id: "SUB-8944", name: "Cyberdyne AI", plan: "Starter", val: "R$ 490", status: "danger" as const },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedRecordId(item.id)}
                        className={cn(
                          "p-2.5 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between",
                          selectedRecordId === item.id
                            ? "bg-primary/10 border-primary/40 text-foreground font-semibold shadow-xs"
                            : "bg-surface/70 border-border/60 text-muted-foreground hover:text-foreground hover:bg-surface-hover"
                        )}
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <span className="text-[10px] font-mono text-muted-foreground">{item.id} · {item.plan}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-foreground block">{item.val}</span>
                          <Badge variant={item.status === "active" ? "success" : item.status === "pending" ? "warning" : "danger"} size="sm" className="text-[9px] py-0 px-1">
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* Right Panel: Detail Editor */}
                <ResizablePanel defaultSize={60} minSize={35} className="p-5 bg-surface-elevated/20 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-border/80 pb-3">
                      <div>
                        <h4 className="text-sm font-bold font-display text-foreground">
                          Editor de Assinatura: {selectedRecordId}
                        </h4>
                        <span className="text-xs text-muted-foreground">Painel detalhado com suporte a Container Queries</span>
                      </div>
                      <Badge variant="info" size="sm">Live Binding</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground block mb-1">Plano</label>
                          <Input defaultValue="Enterprise" className="h-8 text-xs" />
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground block mb-1">Ciclo</label>
                          <Input defaultValue="Anual (12m)" className="h-8 text-xs" />
                        </div>
                      </div>

                      <div className="p-3 rounded-md bg-surface border border-border/80">
                        <span className="text-[10px] font-sans font-bold text-primary block mb-1">@container Auto-Adaptável</span>
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="text-muted-foreground">Consumo de Cotas de API</span>
                          <span className="font-bold text-foreground font-mono">84.200 / 100k reqs</span>
                        </div>
                        <Progress value={84} variant="warning" className="h-1.5 mt-2" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-border/80">
                    <Button variant="ghost" size="sm" onClick={() => toast.info("Edição cancelada")}>
                      Descartar
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => toast.success(`Registro ${selectedRecordId} salvo com sucesso!`)}>
                      Salvar Alterações
                    </Button>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </section>
      )}

      {/* XAI & Human-in-the-Loop Section */}
      {(selectedCategory === "all" || selectedCategory === "xai_hitl") && (
        <section className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between pb-2">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold font-display tracking-tight text-foreground">
                  XAI (Explainable AI) & Human-in-the-Loop (HITL)
                </h2>
                {hitlDecision && (
                  <Badge variant={hitlDecision === "approved" ? "success" : "danger"} size="sm">
                    {hitlDecision === "approved" ? "Aprovado" : "Rejeitado"}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Transparência de raciocínio, score de confiança e interceptação de ações críticas.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => copyCliCommand("confidence-meter")} className="text-xs font-mono gap-1 text-muted-foreground">
              <Copy className="w-3 h-3" />
              npx shadcn add confidence-meter
            </Button>
          </div>

          <div className="p-4 rounded-(--tc-radius-xl) border border-border bg-surface-card space-y-4 shadow-sm">
            <AgentStatusHUD
              status={agentStatus}
              agentName="Copiloto de Retenção & Receita"
              currentTask="Analisando histórico de consumo e propondo desconto estratégico para retenção."
              toolName="analytics_db.query_burst_quota()"
              latencyMs={184}
            />

            <HITLApprovalBanner
              severity="warning"
              title="Reajuste Contratual Proposto: Acme Corporation (SUB-8941)"
              description="O agente detectou risco iminente de churn e preparou a aplicação de 15% de desconto vitalício com renovação anual automática."
              actionType="Modificação de Faturamento & SLA"
              impactSummary="Redução de R$ 630/mês na fatura, garantia de permanência por 12 meses (LTV estimado: +R$ 42.840)."
              resourceCount={1}
              onApprove={() => {
                setHitlDecision("approved")
                setAgentStatus("completed")
                toast.success("Ação Aprovada! Contrato da Acme Corp reajustado.")
              }}
              onReject={() => {
                setHitlDecision("rejected")
                setAgentStatus("idle")
                toast.error("Ação Rejeitada. Nenhuma alteração aplicada ao cliente.")
              }}
              onEdit={() => toast.info("Abrindo formulário de edição de parâmetros...")}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-4">
                <ConfidenceMeter score={94} label="Índice de Certeza do Modelo" sourceCount={3} />
                <ReasoningTrace steps={sampleReasoningSteps} executionTimeMs={184} defaultOpen={true} />
                <div className="flex items-center justify-between p-3 rounded-(--tc-radius-lg) bg-surface border border-border">
                  <span className="text-xs text-muted-foreground font-medium">Feedback:</span>
                  <AIFeedbackWidget
                    contentToCopy="Desconto de 15% aprovado com base no histórico de 90 dias."
                    onThumbUp={() => toast.success("Feedback positivo registrado!")}
                    onThumbDown={() => toast.info("Feedback registrado para retreinamento.")}
                    onReportHallucination={() => toast.warning("Alucinação reportada à engenharia.")}
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <AIDiffViewer
                  title="Visualizador de Diff: tenantBillingConfig.json"
                  originalLabel="Configuração Atual"
                  proposedLabel="Proposta do Agente"
                  diffs={sampleDiffs}
                  defaultMode="split"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      </div>

      {/* Persona Selector Modal */}
      <PersonaSelector
        open={isPersonaModalOpen}
        onOpenChange={setIsPersonaModalOpen}
        onSelectPersona={(personaId) => {
          setIsPersonaModalOpen(false)
          toast.success(`Perfil selecionado: ${personaId}! 🎉`)
        }}
      />
    </div>
  )
}
