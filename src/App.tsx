import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
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
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Tag } from "@/components/ui/tag"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Kbd } from "@/components/ui/kbd"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { EmptyState } from "@/components/ui/empty-state"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command"
import { DataTable, type DataTableRecord } from "@/components/ui/data-table"
import { MetricCard } from "@/components/ui/metric-card"
import { AppLayout } from "@/components/layout/app-layout"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { MoreHorizontal, Download, Trash, FileEdit, Settings, CheckCircle2, AlertTriangle, Info, AlertCircle, Sparkles, Database, Tag as TagIcon, DollarSign, Users, Target, Activity, TrendingUp, LayoutDashboard, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

const revenueChartConfig = {
  revenue: {
    label: "Receita Real (MRR)",
    color: "var(--chart-1)",
  },
  projected: {
    label: "Projeção / Meta",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const revenueData = [
  { month: "Jan", revenue: 28400, projected: 26000 },
  { month: "Fev", revenue: 31200, projected: 30000 },
  { month: "Mar", revenue: 35800, projected: 34000 },
  { month: "Abr", revenue: 39400, projected: 38500 },
  { month: "Mai", revenue: 44100, projected: 42000 },
  { month: "Jun", revenue: 48920, projected: 46000 },
]

const channelChartConfig = {
  direct: {
    label: "Direto",
    color: "var(--chart-1)",
  },
  organic: {
    label: "Orgânico (SEO)",
    color: "var(--chart-2)",
  },
  referral: {
    label: "Indicação",
    color: "var(--chart-3)",
  },
  social: {
    label: "Social / Ads",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const channelData = [
  { channel: "Direto", visitors: 4200, fill: "var(--chart-1)" },
  { channel: "Orgânico", visitors: 6800, fill: "var(--chart-2)" },
  { channel: "Indicação", visitors: 3100, fill: "var(--chart-3)" },
  { channel: "Social", visitors: 2400, fill: "var(--chart-5)" },
]

const mockSubscriptions: DataTableRecord[] = [
  {
    id: "SUB-8942",
    customer: { name: "Jefferson Domingos", email: "jefferson@temcomo.design" },
    plan: "Enterprise",
    status: "active",
    mrr: 4890.0,
    billingCycle: "Annual",
    joinedDate: "2024-01-15",
  },
  {
    id: "SUB-8943",
    customer: { name: "TechCorp Labs", email: "finance@techcorp.io" },
    plan: "Pro",
    status: "active",
    mrr: 1250.0,
    billingCycle: "Monthly",
    joinedDate: "2024-02-01",
  },
  {
    id: "SUB-8944",
    customer: { name: "DevFlow Inc.", email: "billing@devflow.co" },
    plan: "Enterprise",
    status: "trialing",
    mrr: 3500.0,
    billingCycle: "Monthly",
    joinedDate: "2024-03-10",
  },
  {
    id: "SUB-8945",
    customer: { name: "Studio Aurora", email: "contato@studioaurora.br" },
    plan: "Starter",
    status: "active",
    mrr: 450.0,
    billingCycle: "Monthly",
    joinedDate: "2024-03-14",
  },
  {
    id: "SUB-8946",
    customer: { name: "HyperScale Soluções", email: "admin@hyperscale.com" },
    plan: "Custom",
    status: "past_due",
    mrr: 8200.0,
    billingCycle: "Annual",
    joinedDate: "2023-11-20",
  },
  {
    id: "SUB-8947",
    customer: { name: "Norte Digital", email: "financeiro@nortedigital.pt" },
    plan: "Pro",
    status: "canceled",
    mrr: 990.0,
    billingCycle: "Monthly",
    joinedDate: "2023-09-05",
  },
  {
    id: "SUB-8948",
    customer: { name: "Vortex Analytics", email: "ops@vortex.ai" },
    plan: "Enterprise",
    status: "active",
    mrr: 6400.0,
    billingCycle: "Annual",
    joinedDate: "2024-02-18",
  },
  {
    id: "SUB-8949",
    customer: { name: "Nexus Fintech", email: "pagamentos@nexuspay.com" },
    plan: "Pro",
    status: "trialing",
    mrr: 1890.0,
    billingCycle: "Monthly",
    joinedDate: "2024-03-22",
  },
]

function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [activeNavItem, setActiveNavItem] = useState("dashboard")
  const [viewMode, setViewMode] = useState<"dashboard" | "components">("dashboard")
  const [hasBorder, setHasBorder] = useState(true)
  const [hasGradientBorder, setHasGradientBorder] = useState(true)
  const [hasElevation, setHasElevation] = useState(true)
  const [hasGlow, setHasGlow] = useState(false)
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true)
  const [sliderValue, setSliderValue] = useState([65])
  const [selectedPlan, setSelectedPlan] = useState("pro")
  const [termsAccepted, setTermsAccepted] = useState(true)
  const [openCommand, setOpenCommand] = useState(false)

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

  const activeClasses = cn(
    "flex flex-col gap-(--tc-form-stack-gap) surface-card surface-panel p-(--tc-card-p) transition-all duration-200",
    !hasBorder && "!border-0 !border-transparent !bg-none",
    hasBorder && !hasGradientBorder && "border border-border",
    hasBorder && hasGradientBorder && "border-gradient-subtle",
    hasElevation && "elevation-2",
    hasGlow && "brand-glow"
  )

  const breadcrumbs = [
    { label: "Tem Como" },
    { label: viewMode === "dashboard" ? "Dashboard Analítico" : "Laboratório de Componentes" },
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
        } else {
          setViewMode("components")
        }
      }}
      onNewAction={() => {
        toast.info("Ação Global Acionada", {
          description: "Modal de novo registro ou assinatura pronto para abertura.",
        })
      }}
    >
      {/* Top Banner / Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              {viewMode === "dashboard" ? "Painel de Gestão & Receita" : "Laboratório de Componentes (Joinha DS)"}
            </h1>
            <Badge variant="info" size="sm">Fase 4: Concluída</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {viewMode === "dashboard"
              ? "Visão unificada de métricas, gráficos interativos e tabela densa de clientes."
              : "Primitivos de UI estilizados com Shadcn UI + Tailwind v4 e tokens OKLCH."}
          </p>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="inline-flex items-center p-1 rounded-(--tc-radius-md) bg-surface-card border border-border shrink-0 self-start sm:self-auto gap-1">
          <Button
            variant="navItem"
            size="sm"
            isActive={viewMode === "dashboard"}
            onClick={() => setViewMode("dashboard")}
            className="h-8 px-3 text-xs gap-1.5 cursor-pointer font-medium"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard SaaS
          </Button>
          <Button
            variant="navItem"
            size="sm"
            isActive={viewMode === "components"}
            onClick={() => setViewMode("components")}
            className="h-8 px-3 text-xs gap-1.5 cursor-pointer font-medium"
          >
            <Layers className="w-3.5 h-3.5" />
            Componentes & Lab
          </Button>
        </div>
      </div>

      {viewMode === "dashboard" ? (
        <div className="space-y-10">
          {/* 1. Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <MetricCard
              title="Receita Recorrente (MRR)"
              value="R$ 48.920"
              chartVariant={1}
              icon={<DollarSign className="w-4 h-4" />}
              change={{ value: "+14.2%", trend: "up", period: "vs mês anterior" }}
              sparklineData={[28, 31, 35, 33, 40, 44, 48.9]}
            />
            <MetricCard
              title="Assinantes Ativos"
              value="1.428"
              chartVariant={2}
              icon={<Users className="w-4 h-4" />}
              change={{ value: "+8.6%", trend: "up", period: "vs mês anterior" }}
              sparklineData={[1100, 1160, 1220, 1280, 1340, 1390, 1428]}
            />
            <MetricCard
              title="Meta Q1 (ARR)"
              value="84.5%"
              chartVariant={3}
              icon={<Target className="w-4 h-4" />}
              change={{ value: "+5.1%", trend: "up", period: "acima da projeção" }}
              targetProgress={84.5}
            />
            <MetricCard
              title="Taxa de Churn"
              value="1.2%"
              chartVariant={4}
              icon={<Activity className="w-4 h-4" />}
              change={{ value: "-0.4%", trend: "down", period: "vs mês anterior", isPositive: true }}
              sparklineData={[2.4, 2.1, 1.9, 1.8, 1.5, 1.3, 1.2]}
            />
          </div>

          {/* 2. Interactive Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interactive Area Chart */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border-gradient-subtle elevation-1 flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <h3 className="type-heading-item font-semibold text-foreground">
                    Evolução da Receita (MRR vs. Projeção)
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Valores acumulados nos últimos 6 meses
                  </span>
                </div>
                <Badge variant="success" size="sm" className="whitespace-nowrap shrink-0 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +72.2% H1
                </Badge>
              </div>

              <ChartContainer config={revenueChartConfig} className="h-[240px] w-full">
                <AreaChart data={revenueData} margin={{ left: 6, right: 12, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.42} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    width={60}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `R$ ${val / 1000}k`}
                    tickMargin={4}
                  />
                  <ChartTooltip
                    cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    type="monotone"
                    dataKey="projected"
                    stroke="var(--chart-2)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--chart-1)"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#fillRevenue)"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </div>

            {/* Interactive Bar Chart */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border-gradient-subtle elevation-1 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <h3 className="type-heading-item font-semibold text-foreground">
                    Aquisição de Assinantes por Canal
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Distribuição por origem de tráfego
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-muted-foreground">
                  Total: 16.5k
                </span>
              </div>

              <ChartContainer config={channelChartConfig} className="h-[240px] w-full">
                <BarChart data={channelData} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="channel"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    width={40}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `${val / 1000}k`}
                    tickMargin={4}
                  />
                  <ChartTooltip
                    cursor={{ fill: "var(--bg-surface-hover)" }}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="visitors"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </div>

          {/* 3. Dense Data Table Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display">Tabela de Gestão de Clientes</h2>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                Ordenação, filtros e paginação nativa
              </span>
            </div>

            <DataTable data={mockSubscriptions} />
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Controls Playground */}
          <section className="p-4 rounded-xl border border-border bg-surface-card space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Playground de Customização
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBorder}
                  onChange={(e) => setHasBorder(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Exibir Bordas
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasGradientBorder}
                  onChange={(e) => setHasGradientBorder(e.target.checked)}
                  disabled={!hasBorder}
                  className="rounded border-border text-primary disabled:opacity-50"
                />
                Bordas com Gradiente Sutil (.border-gradient-subtle)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasElevation}
                  onChange={(e) => setHasElevation(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Elevação 2 (.elevation-2)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasGlow}
                  onChange={(e) => setHasGlow(e.target.checked)}
                  className="rounded border-border text-primary"
                />
                Brand Glow (.brand-glow)
              </label>
            </div>
          </section>

          {/* Interactive Elevation & Surface Architecture Showcase (@fourzerothree model) */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
                    Engenharia de Elevação & Superfícies (OKLCH Dark Mode)
                  </h2>
                  <Badge variant="info" size="sm">Modelo @fourzerothree</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Demonstração física de profundidade no eixo Z por elevação uniforme de luminância (ΔL ≈ +4%) e chanfro especular superior (<code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-foreground">--surface-highlight</code>).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* 1. Visual Nested Box Model (Exactly like @fourzerothree diagram) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-10 rounded-(--tc-radius-2xl) border border-border bg-(--bg-base) shadow-2xl relative overflow-hidden">
                
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(oklch(67%_0.17_53_/_0.04)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Layer 0: Base Bg Container */}
                <div className="w-full max-w-[500px] p-6 sm:p-7 rounded-(--tc-radius-xl) bg-(--bg-base) border border-border/80 shadow-sm flex flex-col gap-5 relative transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Base Bg (Canvas)
                    </span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-surface border border-border text-foreground">
                      L = 14% · C = 0.008
                    </span>
                  </div>

                  {/* Layer 1: Surface 1 (Cards / Sidebar) */}
                  <div className="w-full p-5 sm:p-6 rounded-(--tc-radius-lg) bg-(--bg-surface) border border-border/70 shadow-md [box-shadow:var(--surface-highlight)] flex flex-col gap-4 transition-all duration-200 hover:border-primary/40">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                        Surface 1 (Cards / Panels)
                      </span>
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-(--bg-surface-elevated) border border-border text-primary font-semibold">
                        L = 18% (ΔL +4%)
                      </span>
                    </div>

                    {/* Layer 2: Surface 2 (Dropdowns / Menus) */}
                    <div className="w-full p-4 sm:p-5 rounded-(--tc-radius-md) bg-(--bg-surface-elevated) border border-border/80 shadow-lg [box-shadow:var(--surface-highlight)] flex flex-col gap-3.5 transition-all duration-200 hover:border-primary/40">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                          Surface 2 (Dropdowns / Menus)
                        </span>
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-(--bg-surface-modal) border border-border text-foreground">
                          L = 22% (ΔL +4%)
                        </span>
                      </div>

                      {/* Layer 3: Surface 3 (Modals / Overlays) */}
                      <div className="w-full p-4 rounded-(--tc-radius-sm) bg-(--bg-surface-modal) border border-border shadow-xl [box-shadow:var(--surface-highlight)] flex flex-col gap-3 transition-all duration-200 hover:border-primary/40">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                            Surface 3 (Modals & Overlays)
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-(--bg-surface-hover) border border-border text-foreground">
                            L = 26% (ΔL +4%)
                          </span>
                        </div>

                        {/* Layer 4: Surface 4 (Toast / Alerta Flutuante) */}
                        <div className="w-full p-3 rounded bg-(--bg-surface-hover) border border-border/90 shadow-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="font-mono text-[11px] font-bold text-foreground">
                              Surface 4 (Toasts / Alertas)
                            </span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-(--bg-surface) text-primary font-bold">
                            L = 30% (Topo Z)
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Estrutura de Profundidade Perceptual · @fourzerothree Architecture
                  </span>
                </div>
              </div>

              {/* 2. Side Inspector Card (Especificação Técnica dos Níveis) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-(--tc-radius-xl) border border-border bg-(--bg-surface) [box-shadow:var(--surface-highlight)] space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <h3 className="type-ui-dense font-semibold text-foreground">
                      Matriz de Elevação Semântica
                    </h3>
                    <Badge variant="success" size="sm">OKLCH Warm Tinting</Badge>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        level: "Level 0",
                        name: "--bg-base",
                        oklch: "oklch(14% 0.008 53)",
                        role: "Canvas / Viewport de Fundo",
                        delta: "Base (Nunca #000)",
                        color: "bg-(--bg-base)",
                      },
                      {
                        level: "Level 1",
                        name: "--bg-surface",
                        oklch: "oklch(18% 0.010 53)",
                        role: "Cards, Sidebar & Tabelas",
                        delta: "ΔL = +4%",
                        color: "bg-(--bg-surface)",
                      },
                      {
                        level: "Level 2",
                        name: "--bg-surface-elevated",
                        oklch: "oklch(22% 0.012 53)",
                        role: "Menus, Popovers & Dropdowns",
                        delta: "ΔL = +4%",
                        color: "bg-(--bg-surface-elevated)",
                      },
                      {
                        level: "Level 3",
                        name: "--bg-surface-modal",
                        oklch: "oklch(26% 0.014 53)",
                        role: "Diálogos & Modais (⌘K)",
                        delta: "ΔL = +4%",
                        color: "bg-(--bg-surface-modal)",
                      },
                      {
                        level: "Level 4",
                        name: "--bg-surface-hover",
                        oklch: "oklch(30% 0.014 53)",
                        role: "Toasts, Tooltips & Estados Ativos",
                        delta: "ΔL = +4%",
                        color: "bg-(--bg-surface-hover)",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-(--tc-radius-md) border border-border bg-surface-elevated/60 flex items-center justify-between gap-3 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-(--tc-radius-sm) border border-border shrink-0 shadow-inner",
                              item.color
                            )}
                          />
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-xs text-foreground truncate">
                                {item.name}
                              </span>
                              <span className="text-[10px] font-mono text-muted-foreground">
                                ({item.level})
                              </span>
                            </div>
                            <span className="text-[11px] text-muted-foreground truncate">
                              {item.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end shrink-0">
                          <span className="font-mono text-xs font-semibold text-primary">
                            {item.delta}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {item.oklch.split(" ")[0].replace("oklch(", "")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-(--tc-radius-md) bg-primary/10 border border-primary/20 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground leading-relaxed">
                      <strong className="text-primary font-semibold">Chroma Tinting Ativo:</strong> Todos os neutros contêm fração cromática de <code className="font-mono text-primary">h=53</code>, eliminando o cinza estéril e conferindo calor aveludado sem desviar para marrom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* Surface & Lighting Lab / Playground */}
        <section className="space-y-4 p-6 rounded-(--tc-radius-xl) border border-border bg-surface-elevated/40">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground m-0">Surface & Lighting Lab (Comparador de Efeitos)</h2>
          </div>
          <p className="type-ui-base text-muted-foreground">
            Ligue e desligue cada camada de acabamento para testar a combinação ideal de bordas e elevações:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <Switch checked={hasBorder} onCheckedChange={setHasBorder} />
              <div className="flex flex-col">
                <span className="type-ui-dense font-semibold">Exibir Borda</span>
                <span className="text-xs text-muted-foreground">{hasBorder ? "Ativa" : "Sem borda (0px)"}</span>
              </div>
            </label>

            <label className={`flex items-center gap-3 select-none ${!hasBorder ? "opacity-40 pointer-events-none" : "cursor-pointer"}`}>
              <Switch checked={hasGradientBorder} onCheckedChange={setHasGradientBorder} disabled={!hasBorder} />
              <div className="flex flex-col">
                <span className="type-ui-dense font-semibold">Borda Gradiente</span>
                <span className="text-xs text-muted-foreground">.border-gradient-subtle</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <Switch checked={hasElevation} onCheckedChange={setHasElevation} />
              <div className="flex flex-col">
                <span className="type-ui-dense font-semibold">Sombra / Elevação</span>
                <span className="text-xs text-muted-foreground">.elevation-2</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <Switch checked={hasGlow} onCheckedChange={setHasGlow} />
              <div className="flex flex-col">
                <span className="type-ui-dense font-semibold">Brand Glow</span>
                <span className="text-xs text-muted-foreground">.brand-glow</span>
              </div>
            </label>
          </div>
        </section>

        {/* Buttons Grid */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Buttons & States</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex flex-col gap-2.5">
              <label className="type-ui-dense font-semibold text-muted-foreground">Primary (CTA)</label>
              <Button variant="primary">Primary</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="type-ui-dense font-semibold text-muted-foreground">Secondary (Filled)</label>
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" disabled>Disabled</Button>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1">Small</Button>
                <Button variant="secondary" size="lg" className="flex-1">Large</Button>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="type-ui-dense font-semibold text-muted-foreground">Outline & Ghost</label>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline" size="icon" aria-label="Baixar arquivo" className="mx-auto">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="type-ui-dense font-semibold text-muted-foreground">NavItem (Selectable)</label>
              <Button variant="navItem">Default (Hover me)</Button>
              <Button variant="navItem" isActive>Active State</Button>
              <Button variant="navItem" disabled>Disabled</Button>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="type-ui-dense font-semibold text-muted-foreground">Destructive</label>
              <Button variant="destructive">Destructive</Button>
              <Button variant="destructive" disabled>Disabled</Button>
            </div>
          </div>
        </section>

        {/* Forms Row with Dynamic Card */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Forms & Interactive Surface Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-(--tc-form-stack-gap) surface-card surface-base shadow-sm p-(--tc-card-p) border border-border">
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Standard Input (Card Base Neutro)</label>
                <Input placeholder="Enter your text here..." />
              </div>
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Error State</label>
                <Input placeholder="Invalid input" error />
                <p className="text-xs text-destructive">This field is required.</p>
              </div>
              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Numeric (tabular-nums)</label>
                <Input type="number" placeholder="0.00" className="type-data-mono" />
              </div>
            </div>

            {/* Test Card Controlled by the Switches */}
            <div className={activeClasses}>
              <div className="flex items-center justify-between">
                <label className="type-ui-dense font-semibold">Card com Efeitos Ativos (Live Test)</label>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  Custom
                </span>
              </div>

              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Select</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-(--tc-form-label-gap)">
                <label className="type-ui-dense font-semibold">Inline Form Action</label>
                <div className="flex items-center gap-(--tc-floating-item-gap)">
                  <Input placeholder="Email address" />
                  <Button variant="primary">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dropdown Menu */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Dropdown Menu (Actions)</h2>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Options <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileEdit className="w-4 h-4" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4" /> Download Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                  <Trash className="w-4 h-4" /> Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>

        {/* Overlays & Notifications */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold border-b border-border pb-2">Overlays & Notifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="type-ui-dense font-semibold text-muted-foreground">Modals & Dialogs</h3>
              <div className="flex gap-4">
                {/* Standard Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <Settings className="w-4 h-4" /> Configurações
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Configurações do Perfil</DialogTitle>
                      <DialogDescription>
                        Atualize suas informações. Clique em salvar quando terminar.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-(--tc-form-stack-gap) py-4">
                      <div className="flex flex-col gap-(--tc-form-label-gap)">
                        <label className="type-ui-dense font-semibold">Nome de exibição</label>
                        <Input defaultValue="Jefferson Domingos" />
                      </div>
                      <div className="flex flex-col gap-(--tc-form-label-gap)">
                        <label className="type-ui-dense font-semibold">Email</label>
                        <Input defaultValue="jefferson@example.com" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="primary">Salvar alterações</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Alert Dialog */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash className="w-4 h-4" /> Excluir Projeto
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o seu
                        projeto e removerá os dados de nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Excluir permanentemente</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="type-ui-dense font-semibold text-muted-foreground">Toasts (Sonner)</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => toast.success("Projeto salvo com sucesso!")}
                  className="justify-start"
                >
                  <CheckCircle2 className="w-4 h-4 text-success" /> Success
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.error("Falha ao conectar com o servidor.")}
                  className="justify-start"
                >
                  <AlertCircle className="w-4 h-4 text-destructive" /> Error
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.warning("Sua assinatura expira em 3 dias.")}
                  className="justify-start"
                >
                  <AlertTriangle className="w-4 h-4 text-warning" /> Warning
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => toast.info("Nova atualização disponível.")}
                  className="justify-start"
                >
                  <Info className="w-4 h-4 text-info" /> Info
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges & Tags Showcase */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <TagIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Badges & Categorical Tags</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Badges */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border flex flex-col gap-4">
              <span className="type-ui-dense font-semibold text-muted-foreground">Status Badges (com Accessible Dots)</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="success" dot>Ativo</Badge>
                <Badge variant="info" dot>Em Teste</Badge>
                <Badge variant="warning" dot>Pendente</Badge>
                <Badge variant="danger" dot>Falha / Erro</Badge>
                <Badge variant="neutral" dot>Neutro</Badge>
              </div>
              <span className="type-ui-dense font-semibold text-muted-foreground pt-2">Solid Variant (Alto Impacto)</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Badge variant="success-solid">Pago</Badge>
                <Badge variant="info-solid">Novo</Badge>
                <Badge variant="warning-solid">Atenção</Badge>
                <Badge variant="danger-solid">Crítico</Badge>
              </div>
            </div>

            {/* Categorical Tags */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border flex flex-col gap-4">
              <span className="type-ui-dense font-semibold text-muted-foreground">Categorical Tags (Tokens --tag-*)</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Tag variant="purple">Enterprise</Tag>
                <Tag variant="teal">Developer</Tag>
                <Tag variant="pink">Designer</Tag>
                <Tag variant="indigo">Marketing</Tag>
                <Tag variant="gray">General</Tag>
              </div>
              <span className="type-ui-dense font-semibold text-muted-foreground pt-2">Sizes (sm / default / lg)</span>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Tag variant="purple" size="sm">Small Tag</Tag>
                <Tag variant="teal" size="default">Default Tag</Tag>
                <Tag variant="pink" size="lg">Large Tag</Tag>
              </div>
            </div>
          </div>
        </section>

        {/* Skeleton Screens & Loading Performance (NN/g + OKLCH Model) */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
                  Skeleton Screens & Percepção de Performance
                </h2>
                <Badge variant="info" size="sm">NN/g + Shimmer Direcional</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Transição suave de carregamento no sentido de leitura da esquerda para a direita (1.8s) com paridade geométrica rigorosa (0px CLS).
              </p>
            </div>

            <div className="flex items-center gap-3 p-1.5 px-3 rounded-(--tc-radius-md) bg-surface-card border border-border shrink-0 self-start sm:self-auto">
              <span className="text-xs font-semibold text-foreground">Simular Carregamento</span>
              <Switch
                checked={isSkeletonLoading}
                onCheckedChange={setIsSkeletonLoading}
                aria-label="Alternar estado de carregamento"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* 1. Metric Card Skeleton vs Real */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border flex flex-col justify-between gap-5 h-full">
              <div className="flex items-center justify-between">
                <span className="type-ui-dense font-semibold text-muted-foreground">Card de Métrica (KPI)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">h-4 / h-8 / rounded-full</span>
              </div>

              {isSkeletonLoading ? (
                <div aria-busy="true" aria-live="polite" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                  <Skeleton className="h-9 w-36" />
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Receita Recorrente</span>
                    <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-3xl font-bold font-display text-foreground tracking-tight">R$ 48.920</span>
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="success" size="sm">+14.2%</Badge>
                    <span className="text-xs text-muted-foreground font-mono">vs mês anterior</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. User Profile Card Skeleton vs Real */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border flex flex-col justify-between gap-5 h-full">
              <div className="flex items-center justify-between">
                <span className="type-ui-dense font-semibold text-muted-foreground">Card de Usuário / Equipe</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">rounded-full / w-12</span>
              </div>

              {isSkeletonLoading ? (
                <div aria-busy="true" aria-live="polite" className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1 min-w-0">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold font-display flex items-center justify-center text-sm shrink-0">
                      JD
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-foreground truncate">Jefferson Domingos</span>
                      <span className="text-xs text-muted-foreground truncate">Product Engineer · Admin</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Gerenciar Permissões
                  </Button>
                </div>
              )}
            </div>

            {/* 3. Form Input Skeleton vs Real */}
            <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border flex flex-col justify-between gap-5 h-full">
              <div className="flex items-center justify-between">
                <span className="type-ui-dense font-semibold text-muted-foreground">Formulário / Ação</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">h-10 input / CTA</span>
              </div>

              {isSkeletonLoading ? (
                <div aria-busy="true" aria-live="polite" className="space-y-3.5">
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-md" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 animate-in fade-in duration-300">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Nome do Projeto</label>
                    <Input defaultValue="Joinha Design System" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Cancelar</Button>
                    <Button variant="primary" size="sm">Salvar Alterações</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Table Rows Skeleton */}
          <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="type-ui-dense font-semibold text-muted-foreground">Linhas de Tabela Orgânicas (Simulação com Larguras Naturais)</span>
              <Badge variant="neutral" size="sm">3 Linhas de Dados</Badge>
            </div>

            {isSkeletonLoading ? (
              <div aria-busy="true" aria-live="polite" className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between gap-4 p-3 rounded-md bg-surface-elevated/40 border border-border/40">
                    <div className="flex items-center gap-3 flex-1">
                      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
                      <div className="space-y-1.5 flex-1 max-w-[200px]">
                        <Skeleton className="h-3.5 w-full" />
                        <Skeleton className="h-2.5 w-2/3" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-20 rounded-sm hidden sm:block" />
                    <Skeleton className="h-5 w-16 rounded-full hidden sm:block" />
                    <Skeleton className="h-4 w-24 font-mono hidden md:block" />
                    <Skeleton className="h-8 w-8 rounded-md shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-300">
                {[
                  { name: "Acme Corp", email: "contact@acme.com", plan: "Enterprise", status: "Ativo", mrr: "R$ 4.200,00" },
                  { name: "Fintech Horizon", email: "billing@horizon.io", plan: "Pro", status: "Em Teste", mrr: "R$ 1.890,00" },
                  { name: "Nexus Lab", email: "ops@nexus.dev", plan: "Starter", status: "Ativo", mrr: "R$ 490,00" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-md bg-surface-elevated/40 border border-border/40">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground font-bold text-xs flex items-center justify-center shrink-0 border border-border">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs text-foreground truncate">{item.name}</span>
                        <span className="text-[11px] text-muted-foreground truncate">{item.email}</span>
                      </div>
                    </div>
                    <Tag variant="purple" size="sm" className="hidden sm:inline-flex">{item.plan}</Tag>
                    <Badge variant={item.status === "Ativo" ? "success" : "info"} size="sm" className="hidden sm:inline-flex">{item.status}</Badge>
                    <span className="text-xs font-mono font-medium text-foreground hidden md:block">{item.mrr}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Overlays, Teclado & Feedback (Lote 1) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
                  Overlays, Teclado & Feedback
                </h2>
                <Badge variant="info" size="sm">Fase 5 · Lote 1</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Primitivos essenciais de interação física: Tooltips com micro-setas, teclas Kbd, banners semânticos de Alert e gaveta lateral Sheet.
              </p>
            </div>
          </div>

          <TooltipProvider delayDuration={150}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* 1. Alerts & Banners */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Banners Semânticos (Alert)</span>
                  <Badge variant="neutral" size="sm">5 Variantes</Badge>
                </div>

                <div className="space-y-3">
                  <Alert variant="default">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Atualização de Sistema</AlertTitle>
                    <AlertDescription>
                      Novos tokens de OKLCH e componentes da Fase 5 foram carregados com sucesso.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="info">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dica de Produtividade</AlertTitle>
                    <AlertDescription>
                      Você pode usar atalhos como <Kbd size="sm">⌘</Kbd> + <Kbd size="sm">K</Kbd> para abrir a busca global a qualquer momento.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="success">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Fatura Paga com Sucesso</AlertTitle>
                    <AlertDescription>
                      O pagamento do plano Enterprise foi processado via webhook da Stripe.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Limite de Requisições Próximo</AlertTitle>
                    <AlertDescription>
                      Seu workspace atingiu 85% da cota mensal de chamadas da API.
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Falha de Autenticação</AlertTitle>
                    <AlertDescription>
                      A chave de API informada expirou ou foi revogada pelo administrador.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* 2. Tooltips, Kbd & Sheet Drawer */}
              <div className="space-y-6">
                {/* Tooltips & Kbd Shortcuts */}
                <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="type-ui-dense font-semibold text-foreground">Tooltips & Teclas Kbd</span>
                    <Badge variant="info" size="sm">Atalhos Físicos</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Passe o mouse sobre os botões para visualizar os tooltips com elevação Surface 3 e teclas Kbd embutidas.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          Salvar Registro
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex items-center gap-2">
                        <span>Salvar alterações</span>
                        <div className="flex items-center gap-0.5">
                          <Kbd size="sm">⌘</Kbd>
                          <Kbd size="sm">S</Kbd>
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon" className="h-9 w-9">
                          <Download className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex items-center gap-1.5">
                        <span>Exportar CSV</span>
                        <Kbd size="sm">⇧E</Kbd>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex items-center gap-1.5">
                        <span className="text-destructive font-medium">Excluir Registro</span>
                        <Kbd size="sm">⌫</Kbd>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="primary" size="sm">
                          Novo Workspace
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="flex items-center gap-1.5">
                        <span>Criar espaço</span>
                        <div className="flex items-center gap-0.5">
                          <Kbd size="sm">⌥</Kbd>
                          <Kbd size="sm">N</Kbd>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Tamanhos de Tecla Kbd:</span>
                    <div className="flex items-center gap-2">
                      <Kbd size="sm">sm</Kbd>
                      <Kbd size="default">default</Kbd>
                      <Kbd size="lg">lg</Kbd>
                    </div>
                  </div>
                </div>

                {/* Sheet / Drawer Interactive Trigger */}
                <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="type-ui-dense font-semibold text-foreground">Painel Lateral (Sheet / Drawer)</span>
                    <Badge variant="success" size="sm">Slide-over</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Painel deslizante no eixo Z com elevação Surface 3 para inspeção profunda e edição rápida sem troca de página.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="gap-2">
                          <FileEdit className="w-4 h-4 text-primary" />
                          Inspecionar Cliente (Gaveta Direita)
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
                        <SheetHeader>
                          <div className="flex items-center gap-2">
                            <Tag variant="purple" size="sm">Enterprise</Tag>
                            <Badge variant="success" size="sm">Ativo</Badge>
                          </div>
                          <SheetTitle className="pt-2">Acme Corporation</SheetTitle>
                          <SheetDescription>
                            Detalhes cadastrais, histórico de faturamento e chaves de integração do cliente.
                          </SheetDescription>
                        </SheetHeader>

                        <div className="py-6 space-y-4 flex-1 overflow-y-auto">
                          <div className="p-3.5 rounded-(--tc-radius-md) bg-surface border border-border space-y-2">
                            <span className="text-xs font-semibold text-foreground">Informações de Contato</span>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p><strong>Email:</strong> financeiro@acme.com</p>
                              <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                              <p><strong>MRR:</strong> R$ 4.200,00 / mês</p>
                            </div>
                          </div>

                          <div className="p-3.5 rounded-(--tc-radius-md) bg-surface border border-border space-y-2">
                            <span className="text-xs font-semibold text-foreground">Uso da Cota de API</span>
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Requisições gastas</span>
                                <span className="font-mono text-foreground font-semibold">84.200 / 100.000</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-surface-elevated overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: "84.2%" }} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-foreground">Anotações Internas</label>
                            <Input defaultValue="Cliente prioritário. Contrato anual renovado em Março." />
                          </div>
                        </div>

                        <SheetFooter>
                          <Button variant="outline" size="sm">Fechar</Button>
                          <Button variant="primary" size="sm" onClick={() => toast.success("Dados do cliente atualizados com sucesso!")}>
                            Salvar Alterações
                          </Button>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </section>

        {/* Controles de Entrada & Formulários Ricos (Lote 2) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
                  Controles de Entrada & Formulários Ricos
                </h2>
                <Badge variant="info" size="sm">Fase 5 · Lote 2</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Controles táteis para fluxos de checkout, configurações de workspace, filtros quantitativos e campos de texto multilinha.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 1. Choice Cards / Radio Group (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="type-ui-dense font-semibold text-foreground">Choice Cards (Radio Group)</span>
                <Badge variant="neutral" size="sm">Seleção de Plano</Badge>
              </div>

              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="gap-3">
                {[
                  {
                    id: "starter",
                    title: "Starter",
                    price: "R$ 99/mês",
                    desc: "Até 3 membros, suporte básico e 10k requisições/mês.",
                    badge: "Básico",
                  },
                  {
                    id: "pro",
                    title: "Pro Business",
                    price: "R$ 299/mês",
                    desc: "Membros ilimitados, webhooks em tempo real e 100k requisições.",
                    badge: "Mais Popular",
                  },
                  {
                    id: "enterprise",
                    title: "Enterprise Custom",
                    price: "R$ 899/mês",
                    desc: "SLA garantido de 99.99%, SSO SAML e IP dedicado exclusivo.",
                    badge: "Escala",
                  },
                ].map((plan) => (
                  <label
                    key={plan.id}
                    className={cn(
                      "flex items-start gap-3 p-4 rounded-(--tc-radius-md) border bg-surface-elevated/40 cursor-pointer transition-all duration-200 ease-(--tc-ease-smooth) hover:border-primary/50",
                      selectedPlan === plan.id
                        ? "border-primary/70 bg-primary/5 [box-shadow:0_0_12px_oklch(67%_0.17_53_/_0.15)]"
                        : "border-border"
                    )}
                  >
                    <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-foreground">{plan.title}</span>
                        <span className="font-mono text-xs font-bold text-primary">{plan.price}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{plan.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* 2. Textarea, Slider & Checkboxes (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Textarea */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Entrada Multilinha (Textarea)</span>
                  <span className="text-[11px] font-mono text-muted-foreground">min-h-[80px]</span>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Prompt de IA / Descrição da Automação</label>
                  <Textarea
                    placeholder="Escreva as instruções ou parâmetros para execução do agente..."
                    defaultValue="Você é um assistente sênior de infraestrutura. Analise os logs do cluster Kubernetes e gere alertas para consumo de memória acima de 85%."
                    rows={3}
                  />
                </div>
              </div>

              {/* Slider & Range Control */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Controle Deslizante (Slider)</span>
                  <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                    {sliderValue[0]}% de Cota
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Limite de Alerta Mínimo (0%)</span>
                    <span>Capacidade Total (100%)</span>
                  </div>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Quando o consumo ultrapassar <strong className="text-foreground">{sliderValue[0]}%</strong>, a equipe de engenharia receberá um webhook automático no Slack.
                  </p>
                </div>
              </div>

              {/* Checkbox Group */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Caixas de Seleção (Checkbox)</span>
                  <Badge variant="neutral" size="sm">Acessibilidade Radix</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <Checkbox checked={termsAccepted} onCheckedChange={(val) => setTermsAccepted(!!val)} className="mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">Notificações por Email</span>
                      <span className="text-[11px] text-muted-foreground">Receba relatórios diários de MRR</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <Checkbox defaultChecked className="mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">Autenticação 2FA Obrigatória</span>
                      <span className="text-[11px] text-muted-foreground">Exigir chave TOTP de todos os membros</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <Checkbox checked="indeterminate" className="mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">Seleção em Lote (Indeterminada)</span>
                      <span className="text-[11px] text-muted-foreground">12 de 35 registros selecionados</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-not-allowed opacity-50 select-none">
                    <Checkbox disabled className="mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">Backup em Nuvem Privada</span>
                      <span className="text-[11px] text-muted-foreground">Exclusivo para plano Enterprise</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navegação, Abas & Estruturação (Lote 3) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
                  Navegação, Abas & Estruturação
                </h2>
                <Badge variant="info" size="sm">Fase 5 · Lote 3</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Segmented controls por abas, seções sanfonadas expansíveis, divisores com label central e paginação numérica.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 1. Tabs & Segmented Control (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="type-ui-dense font-semibold text-foreground">Abas de Navegação (Tabs)</span>
                <Badge variant="neutral" size="sm">Segmented Pill</Badge>
              </div>

              <Tabs defaultValue="api" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Geral</TabsTrigger>
                  <TabsTrigger value="api">Chaves API</TabsTrigger>
                  <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="p-4 rounded-(--tc-radius-md) bg-surface border border-border space-y-3">
                  <span className="text-xs font-semibold text-foreground">Configurações Gerais do Workspace</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Altere o nome da organização, o domínio customizado e o fuso horário padrão para relatórios.
                  </p>
                  <div className="flex gap-2">
                    <Input defaultValue="Tem Como Prod" />
                    <Button variant="primary" size="sm">Salvar</Button>
                  </div>
                </TabsContent>

                <TabsContent value="api" className="p-4 rounded-(--tc-radius-md) bg-surface border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground">Chave Secreta de Produção</span>
                    <Badge variant="success" size="sm">Ativa</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="tc_live_98a7df89a7sdf987as9df" readOnly className="font-mono text-xs" />
                    <Button variant="secondary" size="sm" onClick={() => toast.info("Chave copiada para a área de transferência!")}>
                      Copiar
                    </Button>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Nunca compartilhe suas chaves secretas em repositórios públicos ou scripts de cliente.
                  </p>
                </TabsContent>

                <TabsContent value="webhooks" className="p-4 rounded-(--tc-radius-md) bg-surface border border-border space-y-3">
                  <span className="text-xs font-semibold text-foreground">Endpoints de Eventos</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Cadastre URLs HTTP para receber eventos em tempo real de faturas pagas e novos assinantes.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    + Adicionar Novo Endpoint
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Separators with Labels */}
              <div className="pt-2">
                <Separator label="OU ACESSE PELO TERMINAL" />
                <div className="p-3 rounded-md bg-(--bg-base) border border-border text-center">
                  <code className="font-mono text-xs text-primary">npx @temcomo/cli login --token=tc_live_...</code>
                </div>
              </div>
            </div>

            {/* 2. Accordion & Standalone Pagination (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Accordion */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Perguntas Frequentes (Accordion)</span>
                  <Badge variant="neutral" size="sm">Colapsável</Badge>
                </div>

                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Como funciona o croma no Dark Mode?</AccordionTrigger>
                    <AccordionContent>
                      Adotamos um Chroma Budget rigoroso: os neutros contêm fração cromática de h=53 (Warm Dark) e os status operam em Muted Jewels (C ≈ 0.10) para evitar poluição neon.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Como instalar componentes via CLI?</AccordionTrigger>
                    <AccordionContent>
                      Nosso Registry JSON expõe todos os manifestos em public/r/. Basta rodar: npx shadcn@latest add https://.../component.json.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Qual o critério de acessibilidade?</AccordionTrigger>
                    <AccordionContent>
                      Todos os pares de cores seguem contraste estrito WCAG 2.2 AA (mínimo de 4.5:1 para texto normal e 3:1 para controles gráficos).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Standalone Pagination Card */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Paginação Standalone</span>
                  <span className="text-[11px] font-mono text-muted-foreground">Página 2 de 12</span>
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); toast.info("Página Anterior"); }} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); }}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive onClick={(e) => { e.preventDefault(); }}>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); }}>3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => { e.preventDefault(); }}>12</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => { e.preventDefault(); toast.info("Próxima Página"); }} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </section>

        {/* Exibição de Dados & Produtividade (Lote 4) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
                  Exibição de Dados & Produtividade
                </h2>
                <Badge variant="info" size="sm">Fase 5 · Lote 4</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Avatares individuais e empilhados, medidores de progresso por cota, telas de Empty State e Command Palette (⌘K).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 1. Avatars & Progress Bars (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Avatars */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Avatares & Grupos Empilhados</span>
                  <Badge variant="neutral" size="sm">AvatarGroup</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Equipe de Engenharia</span>
                    <AvatarGroup max={4} total={7}>
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-success/10 text-success">MC</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-info/10 text-info">AL</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-warning/10 text-warning">TS</AvatarFallback>
                      </Avatar>
                    </AvatarGroup>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">TC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-foreground">Tem Como Enterprise</span>
                      <span className="text-[11px] text-muted-foreground">workspace@temcomo.com.br</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Medidores de Cota (Progress)</span>
                  <Badge variant="neutral" size="sm">Semântico</Badge>
                </div>

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Armazenamento em Nuvem</span>
                      <span className="font-mono text-foreground font-semibold">32% (3.2 GB / 10 GB)</span>
                    </div>
                    <Progress value={32} variant="default" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Taxa de Sucesso dos Webhooks</span>
                      <span className="font-mono text-success font-semibold">99.4% (Operação Normal)</span>
                    </div>
                    <Progress value={99.4} variant="success" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Consumo de Créditos de IA</span>
                      <span className="font-mono text-warning font-semibold">82% (Limite Próximo)</span>
                    </div>
                    <Progress value={82} variant="warning" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Uso de Memória do Cluster</span>
                      <span className="font-mono text-destructive font-semibold">94% (Alerta Crítico)</span>
                    </div>
                    <Progress value={94} variant="danger" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Empty State & Command Palette Card (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Command Palette Interactive Box */}
              <div className="p-6 rounded-(--tc-radius-lg) surface-card border border-border space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="type-ui-dense font-semibold text-foreground">Command Palette (⌘K / Ctrl+K)</span>
                  <Badge variant="info" size="sm" className="hidden sm:inline-flex">Raycast / Linear Style</Badge>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Menu de busca global e execução de comandos rápidos acionado via teclado ou pelo botão abaixo:
                </p>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="gap-2 flex-1 justify-between text-muted-foreground border-border hover:border-primary/50"
                    onClick={() => setOpenCommand(true)}
                  >
                    <span className="text-xs">Buscar comandos, telas ou clientes...</span>
                    <div className="flex items-center gap-1">
                      <Kbd size="sm">⌘</Kbd>
                      <Kbd size="sm">K</Kbd>
                    </div>
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setOpenCommand(true)}>
                    Abrir Menu
                  </Button>
                </div>
              </div>

              {/* Empty State */}
              <EmptyState
                title="Nenhum Registro Encontrado"
                description="Não encontramos nenhuma fatura com os filtros selecionados. Tente ajustar o período ou limpar a busca."
                action={
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Limpar Filtros</Button>
                    <Button variant="primary" size="sm">+ Criar Nova Fatura</Button>
                  </div>
                }
              />
            </div>
          </div>
        </section>
        </div>
      )}

      {/* Global Command Palette Dialog (⌘K) */}
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Digite um comando ou busque no SaaS..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Navegação Rápida">
            <CommandItem onSelect={() => { setViewMode("dashboard"); setOpenCommand(false); toast.info("Navegando para o Dashboard"); }}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
              <span>Dashboard Analítico</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { setViewMode("components"); setOpenCommand(false); toast.info("Navegando para o Component Lab"); }}>
              <Layers className="mr-2 h-4 w-4 text-primary" />
              <span>Laboratório de Componentes (Kitchen Sink)</span>
              <CommandShortcut>⌘L</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { toggleTheme(); setOpenCommand(false); }}>
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span>Alternar Tema (Dark / Light)</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Ações de Workspace">
            <CommandItem onSelect={() => { setOpenCommand(false); toast.success("Novo Workspace pronto para criação!"); }}>
              <Users className="mr-2 h-4 w-4 text-success" />
              <span>Criar Novo Workspace</span>
              <CommandShortcut>⌥N</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { setOpenCommand(false); toast.info("Exportando dados em CSV..."); }}>
              <Download className="mr-2 h-4 w-4 text-info" />
              <span>Exportar Faturamento (CSV)</span>
              <CommandShortcut>⇧E</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Clientes Recentes">
            <CommandItem onSelect={() => { setOpenCommand(false); toast.info("Abrindo Acme Corp"); }}>
              <Target className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Acme Corporation (Enterprise)</span>
            </CommandItem>
            <CommandItem onSelect={() => { setOpenCommand(false); toast.info("Abrindo Nexus Fintech"); }}>
              <Target className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Nexus Fintech (Pro)</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Toaster />
    </AppLayout>
  )
}

export default App

