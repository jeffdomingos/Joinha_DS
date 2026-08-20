import {
  DollarSign,
  Users,
  Target,
  Activity,
  TrendingUp,
  Database,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable, type DataTableRecord } from "@/components/ui/data-table"
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
  paid: {
    label: "Mídia Paga",
    color: "var(--chart-3)",
  },
  referral: {
    label: "Indicação",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

const channelData = [
  { channel: "Direto", visitors: 6200, fill: "var(--chart-1)" },
  { channel: "Orgânico", visitors: 4800, fill: "var(--chart-2)" },
  { channel: "Mídia Paga", visitors: 3400, fill: "var(--chart-3)" },
  { channel: "Indicações", visitors: 2100, fill: "var(--chart-4)" },
]

const mockSubscriptions: DataTableRecord[] = [
  {
    id: "SUB-8941",
    customer: {
      name: "Acme Corporation",
      email: "billing@acme.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces",
    },
    plan: "Enterprise",
    status: "active",
    mrr: 4200,
    billingCycle: "Annual",
    joinedDate: "2026-03-12",
  },
  {
    id: "SUB-8942",
    customer: {
      name: "Stark Tech Labs",
      email: "tony@stark.io",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=faces",
    },
    plan: "Pro",
    status: "active",
    mrr: 1450,
    billingCycle: "Monthly",
    joinedDate: "2026-03-11",
  },
  {
    id: "SUB-8943",
    customer: {
      name: "Wayne Enterprises",
      email: "bruce@wayne.corp",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=faces",
    },
    plan: "Enterprise",
    status: "trialing",
    mrr: 5800,
    billingCycle: "Annual",
    joinedDate: "2026-03-10",
  },
  {
    id: "SUB-8944",
    customer: {
      name: "Cyberdyne Systems",
      email: "miles@cyberdyne.ai",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=64&h=64&fit=crop&crop=faces",
    },
    plan: "Starter",
    status: "past_due",
    mrr: 490,
    billingCycle: "Monthly",
    joinedDate: "2026-03-09",
  },
  {
    id: "SUB-8945",
    customer: {
      name: "Massive Dynamic",
      email: "nina@massive.com",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces",
    },
    plan: "Pro",
    status: "active",
    mrr: 1450,
    billingCycle: "Annual",
    joinedDate: "2026-03-08",
  },
  {
    id: "SUB-8946",
    customer: {
      name: "Hooli Corp",
      email: "gavin@hooli.xyz",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=64&h=64&fit=crop&crop=faces",
    },
    plan: "Starter",
    status: "canceled",
    mrr: 490,
    billingCycle: "Monthly",
    joinedDate: "2026-03-07",
  },
]

export interface DashboardViewProps {
  onNavigateToDocs?: () => void
  onNavigateToLab?: () => void
}

export function DashboardView({ onNavigateToDocs, onNavigateToLab }: DashboardViewProps) {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Template Header Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-(--tc-radius-xl) bg-surface-card border border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold font-display text-foreground">
                Template de Exemplo: SaaS Executive Dashboard
              </h2>
              <Badge variant="info" size="sm">Template Live</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Esta visualização demonstra como os componentes do <strong>Joinha DS</strong> (Metric Cards, Sparklines Bézier, Recharts e DataTable) se comportam em harmonia em uma aplicação SaaS real e reagem à matriz de densidade.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToDocs && (
            <Button variant="outline" size="sm" onClick={onNavigateToDocs} className="text-xs">
              Ver Wiki & Tokens
            </Button>
          )}
          {onNavigateToLab && (
            <Button variant="primary" size="sm" onClick={onNavigateToLab} className="text-xs font-semibold">
              Explorar 50 Componentes
            </Button>
          )}
        </div>
      </div>

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

      {/* 4. Quick Links Footer Card */}
      <div className="p-6 rounded-(--tc-radius-xl) border border-border bg-(--bg-surface-elevated)/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-bold font-display text-foreground">
              Explore o Joinha Design System
            </h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Acesse a Wiki oficial com tokens interativos ou teste os 50 componentes no Laboratório ao vivo.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigateToDocs && (
            <Button variant="outline" size="sm" onClick={onNavigateToDocs} className="gap-1 text-xs">
              <span>Abrir Wiki / Docs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          )}
          {onNavigateToLab && (
            <Button variant="primary" size="sm" onClick={onNavigateToLab} className="gap-1 text-xs font-semibold">
              <span>Explorar Component Lab</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
