import * as React from "react"
import {
  Sparkles,
  Search,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { ConfidenceMeter, ReasoningTrace } from "@/components/ui/confidence-meter"
import { HITLApprovalBanner } from "@/components/ui/hitl-approval-banner"
import { AIDiffViewer, type DiffLine } from "@/components/ui/ai-diff-viewer"
import { AgentStatusHUD, type AgentStatusType } from "@/components/ui/agent-status-hud"
import { AIFeedbackWidget } from "@/components/ui/ai-feedback-widget"
import { PersonaSelector } from "@/components/ui/persona-selector"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export interface ComponentLabViewProps {
  onStartTour?: () => void
  onOpenCommand?: () => void
}

export function ComponentLabView({ onStartTour, onOpenCommand }: ComponentLabViewProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")

  // Interactive Playground states
  const [hasBorder, setHasBorder] = React.useState(true)
  const [hasGradientBorder, setHasGradientBorder] = React.useState(false)
  const [hasElevation, setHasElevation] = React.useState(true)
  const [hasGlow, setHasGlow] = React.useState(false)
  const [sliderValue, setSliderValue] = React.useState([45])
  const [selectedRadio, setSelectedRadio] = React.useState("pro")
  const [isPersonaModalOpen, setIsPersonaModalOpen] = React.useState(false)
  const [agentStatus, setAgentStatus] = React.useState<AgentStatusType>("awaiting_review")
  const [hitlDecision, setHitlDecision] = React.useState<"approved" | "rejected" | null>(null)
  const [selectedRecordId, setSelectedRecordId] = React.useState("SUB-8941")

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

  const categories = [
    { id: "all", label: "Todos (50)", count: 50 },
    { id: "primitives", label: "Primitivos & Controles", count: 18 },
    { id: "nav_layout", label: "Navegação & Layout", count: 10 },
    { id: "data_viz", label: "Visualização de Dados", count: 7 },
    { id: "onboarding", label: "Onboarding UX", count: 5 },
    { id: "xai_hitl", label: "XAI & HITL", count: 5 },
    { id: "shell", label: "App Shell (SaaS)", count: 5 },
  ]

  const activeClasses = cn(
    "flex flex-col gap-(--tc-form-stack-gap) surface-card surface-panel p-(--tc-card-p) transition-all duration-200",
    !hasBorder && "!border-0 !border-transparent !bg-none",
    hasBorder && !hasGradientBorder && "border border-border",
    hasBorder && hasGradientBorder && "border-gradient-subtle",
    hasElevation && "elevation-2",
    hasGlow && "brand-glow"
  )

  const copyCliCommand = (componentName: string) => {
    const cmd = `npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/${componentName}.json`
    navigator.clipboard.writeText(cmd)
    toast.success(`Comando CLI copiado!`, { description: cmd })
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
              Laboratório Interativo de Componentes
            </h1>
            <Badge variant="info" size="sm">50 Componentes</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Explore, teste variantes em tempo real e copie o comando CLI de instalação de qualquer componente do Joinha DS.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {onOpenCommand && (
            <Button variant="outline" size="sm" onClick={onOpenCommand} className="gap-1.5 text-xs font-mono">
              <Search className="w-3.5 h-3.5" />
              <span>⌘K Buscar</span>
            </Button>
          )}
          {onStartTour && (
            <Button variant="primary" size="sm" onClick={onStartTour} className="gap-1.5 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tour Interativo</span>
            </Button>
          )}
        </div>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-card p-3 rounded-(--tc-radius-xl) border border-border">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "px-3 py-1.5 rounded-(--tc-radius-md) text-xs font-medium transition-all cursor-pointer",
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface-hover"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Filtrar componentes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs bg-surface"
          />
        </div>
      </div>

      {/* FULL INTERACTIVE LAB SUITE */}
      <div className="space-y-12">
        {/* Controls Playground */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
              Controles de Superfície e Efeitos Ópticos
            </h2>
            <Badge variant="neutral" size="sm">Live Sandbox</Badge>
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

        {/* Buttons & Inputs */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
              Botões e Entradas de Dados
            </h2>
            <Button variant="ghost" size="sm" onClick={() => copyCliCommand("button")} className="text-xs font-mono gap-1 text-muted-foreground">
              <Copy className="w-3 h-3" />
              npx shadcn add button
            </Button>
          </div>

          <div className={activeClasses}>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="default">Primary Action</Button>
              <Button variant="secondary" size="default">Secondary</Button>
              <Button variant="outline" size="default">Outline</Button>
              <Button variant="ghost" size="default">Ghost</Button>
              <Button variant="destructive" size="default">Destructive</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Input placeholder="Input de texto padrão..." />
              <Select defaultValue="brazil">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um país" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brazil">Brasil (BRL)</SelectItem>
                  <SelectItem value="us">Estados Unidos (USD)</SelectItem>
                  <SelectItem value="eu">União Europeia (EUR)</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Textarea para descrições longas..." className="min-h-[40px] h-10" />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Checkbox id="terms" defaultChecked />
                <label htmlFor="terms" className="text-xs text-muted-foreground font-medium cursor-pointer">
                  Aceitar termos de compliance
                </label>
              </div>

              <div className="flex items-center gap-2 w-48">
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                <span className="text-xs font-mono font-bold text-foreground w-8">{sliderValue}%</span>
              </div>

              <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio} className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="starter" id="r1" />
                  <label htmlFor="r1" className="text-xs font-medium cursor-pointer">Starter</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pro" id="r2" />
                  <label htmlFor="r2" className="text-xs font-medium cursor-pointer">Pro</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="r3" />
                  <label htmlFor="r3" className="text-xs font-medium cursor-pointer">Enterprise</label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </section>

        {/* Enterprise Resizable Master-Detail Split Pane */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
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
                    <Badge variant="neutral" size="sm" className="font-mono text-[10px]">ERP</Badge>
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
                          <Input defaultValue="Enterprise" />
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-muted-foreground block mb-1">Ciclo</label>
                          <Input defaultValue="Anual (12m)" />
                        </div>
                      </div>

                      <div className="p-3 rounded-md bg-surface border border-border/80">
                        <span className="text-[10px] font-mono text-primary font-bold block mb-1">@container Auto-Adaptável</span>
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

        {/* XAI & Human-in-the-Loop Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold font-display tracking-tight text-foreground">
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

          <div className="p-4 rounded-(--tc-radius-xl) border border-border bg-surface-card space-y-4">
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
