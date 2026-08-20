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
import { MoreHorizontal, Download, Trash, FileEdit, Settings, CheckCircle2, AlertTriangle, Info, AlertCircle, Sparkles, Sun, Moon, Database, Tag as TagIcon, BarChart3, DollarSign, Users, Target, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

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

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-12 lg:p-16 flex justify-center">
      <div className="w-full max-w-4xl space-y-12">
        <header className="border-b border-border pb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Joinha DS: Phase 3</h1>
            <p className="text-muted-foreground mt-2">
              React Components Implementation (Shadcn UI + Radix + Tailwind v4)
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
            className="flex items-center gap-2 cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-warning" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-primary" /> Dark Mode
              </>
            )}
          </Button>
        </header>

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

        {/* Dense Data Table Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Dense Data Table (SaaS Management)</h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              h-10 density · JetBrains Mono · WCAG Compliant
            </span>
          </div>

          <DataTable data={mockSubscriptions} />
        </section>

        {/* Analytics & Metric Cards (Data Viz Series) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Metric Cards & Data Viz Series (--chart-*)</h2>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              OKLCH Perceptual Series · Smooth SVG Sparklines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1: MRR (Chart 1 - Laranja Brand) */}
            <MetricCard
              title="Receita Recorrente (MRR)"
              value="R$ 48.920"
              chartVariant={1}
              icon={<DollarSign className="w-4 h-4" />}
              change={{ value: "+14.2%", trend: "up", period: "vs mês anterior" }}
              sparklineData={[28, 31, 35, 33, 40, 44, 48.9]}
            />

            {/* KPI 2: Clientes Ativos (Chart 2 - Ciano) */}
            <MetricCard
              title="Assinantes Ativos"
              value="1.428"
              chartVariant={2}
              icon={<Users className="w-4 h-4" />}
              change={{ value: "+8.6%", trend: "up", period: "vs mês anterior" }}
              sparklineData={[1100, 1160, 1220, 1280, 1340, 1390, 1428]}
            />

            {/* KPI 3: Meta Trimestral (Chart 3 - Magenta) */}
            <MetricCard
              title="Meta Q1 (ARR)"
              value="84.5%"
              chartVariant={3}
              icon={<Target className="w-4 h-4" />}
              change={{ value: "+5.1%", trend: "up", period: "acima da projeção" }}
              targetProgress={84.5}
            />

            {/* KPI 4: Taxa de Churn (Chart 4 - Âmbar) */}
            <MetricCard
              title="Taxa de Churn"
              value="1.2%"
              chartVariant={4}
              icon={<Activity className="w-4 h-4" />}
              change={{ value: "-0.4%", trend: "down", period: "vs mês anterior", isPositive: true }}
              sparklineData={[2.4, 2.1, 1.9, 1.8, 1.5, 1.3, 1.2]}
            />
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  )
}

export default App
