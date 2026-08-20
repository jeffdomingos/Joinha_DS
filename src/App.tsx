import { useState } from "react"
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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              {viewMode === "dashboard" ? "Painel de Gestão & Receita" : "Laboratório de Componentes (Joinha DS)"}
            </h1>
            <Badge variant="info" size="sm">Fase 4: App Shell</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {viewMode === "dashboard"
              ? "Visão unificada de métricas, gráficos interativos e tabela densa de clientes."
              : "Primitivos de UI estilizados com Shadcn UI + Tailwind v4 e tokens OKLCH."}
          </p>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="inline-flex items-center p-1 rounded-(--tc-radius-md) bg-surface-card border border-border shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("dashboard")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-(--tc-radius-sm) text-xs font-semibold transition-all cursor-pointer",
              viewMode === "dashboard"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard SaaS
          </button>
          <button
            type="button"
            onClick={() => setViewMode("components")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-(--tc-radius-sm) text-xs font-semibold transition-all cursor-pointer",
              viewMode === "components"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            Componentes & Lab
          </button>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
              <label className="type-ui-dense font-semibold text-muted-foreground">Outline (Gradient)</label>
              <Button variant="outline">Outline</Button>
              <Button variant="outline" disabled>Disabled</Button>
              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1">Ghost</Button>
                <Button variant="outline" size="icon" aria-label="Baixar arquivo">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
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
        </div>
      )}
      <Toaster />
    </AppLayout>
  )
}

export default App

