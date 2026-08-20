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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tag } from "@/components/ui/tag"
import { Skeleton } from "@/components/ui/skeleton"
import { Kbd } from "@/components/ui/kbd"
import { Progress } from "@/components/ui/progress"
import { BrandSymbol } from "@/components/ui/brand-symbol"
import { MetricCard } from "@/components/ui/metric-card"
import { Sparkline } from "@/components/ui/sparkline"
import { ConfidenceMeter } from "@/components/ui/confidence-meter"
import { HITLApprovalBanner } from "@/components/ui/hitl-approval-banner"
import { AIDiffViewer } from "@/components/ui/ai-diff-viewer"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
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
  renderPreviewContent?: (id: string, density: "compact" | "default" | "comfortable") => React.ReactNode
}

export function ComponentDetailView({
  componentId,
  onNavigateComponent,
  onNavigateToLab,
  renderPreviewContent,
}: ComponentDetailViewProps) {
  const [copiedCli, setCopiedCli] = React.useState(false)
  const [density, setDensity] = React.useState<"compact" | "default" | "comfortable">("default")
  const [activeTab, setActiveTab] = React.useState("preview")

  const metadata: ComponentMetadata = React.useMemo(() => {
    return getComponentMetadata(componentId)
  }, [componentId])

  const cliCommand = `npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/${metadata.cliName}.json`

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopiedCli(true)
    toast.success("Comando CLI copiado para a área de transferência!")
    setTimeout(() => setCopiedCli(false), 2000)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Código copiado para a área de transferência!")
  }

  // Find next and previous component in the dictionary
  const componentKeys = Object.keys(COMPONENT_METADATA_MAP)
  const currentIndex = componentKeys.indexOf(componentId)
  const prevKey = currentIndex > 0 ? componentKeys[currentIndex - 1] : null
  const nextKey = currentIndex >= 0 && currentIndex < componentKeys.length - 1 ? componentKeys[currentIndex + 1] : null

  const renderLiveComponent = () => {
    if (renderPreviewContent) return renderPreviewContent(componentId, density)

    switch (componentId) {
      case "button":
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={() => toast.success("Primary clicado")}>Primary</Button>
            <Button variant="secondary" onClick={() => toast.info("Secondary clicado")}>Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        )
      case "input":
        return (
          <div className="w-full max-w-sm space-y-2">
            <Input placeholder="Digite seu e-mail corporativo..." />
            <p className="text-[11px] text-muted-foreground">Exemplo de input responsivo com anel de foco.</p>
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
            <label htmlFor="demo-switch" className="text-xs font-medium text-foreground cursor-pointer">
              Ativar Modo Autônomo
            </label>
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox id="demo-cb" defaultChecked />
            <label htmlFor="demo-cb" className="text-xs font-medium text-foreground cursor-pointer">
              Concordo com os Termos de Serviço
            </label>
          </div>
        )
      case "slider":
        return (
          <div className="w-full max-w-xs space-y-2">
            <Slider defaultValue={[65]} max={100} step={1} />
            <span className="text-[11px] text-muted-foreground">Limite de amostragem: 65%</span>
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
            <Tag color="purple">IA Generativa</Tag>
            <Tag color="teal">OKLCH</Tag>
            <Tag color="pink">Enterprise</Tag>
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
            <span className="text-xs text-muted-foreground">Pressione</span>
            <Kbd>⌘K</Kbd>
            <span className="text-xs text-muted-foreground">para abrir a paleta de comandos</span>
          </div>
        )
      case "progress":
        return (
          <div className="w-full max-w-sm space-y-2">
            <Progress value={78} />
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>Processamento</span>
              <span>78%</span>
            </div>
          </div>
        )
      case "confidence-meter":
        return (
          <div className="w-full max-w-md">
            <ConfidenceMeter score={94} label="Score de Certeza do Agente" sourceCount={4} />
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
      case "metric-card":
        return (
          <div className="w-full max-w-xs">
            <MetricCard
              title="Receita Mensal (MRR)"
              value="R$ 48.920"
              change={{ value: "+14.2%", trend: "up", period: "vs. mês anterior" }}
              sparklineData={[28, 31, 35, 40, 48.9]}
            />
          </div>
        )
      case "sparkline":
        return (
          <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium">Volumetria</span>
              <div className="text-lg font-bold text-foreground">1.420 ops</div>
            </div>
            <Sparkline data={[12, 18, 14, 22, 28, 35, 42]} chartVariant={1} height={36} className="w-32" />
          </div>
        )
      case "brand-symbol":
        return (
          <div className="p-6 rounded-2xl bg-surface border border-border flex items-center justify-center">
            <BrandSymbol className="h-16 w-auto text-primary" />
          </div>
        )
      default:
        return (
          <div className="text-center space-y-2">
            <div className="p-4 rounded-xl bg-surface border border-border inline-block shadow-xs">
              <span className="font-mono text-sm font-bold text-foreground">
                &lt;{metadata.name} /&gt;
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Exemplo interativo padrão do componente</p>
          </div>
        )
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Component Header & Installation Hub */}
      <div className="space-y-4 border-b border-border pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
                {metadata.name}
              </h1>
              <Badge variant="info" size="sm">{metadata.categoryLabel}</Badge>
              <Badge variant="success" size="sm">WCAG 2.2 AA</Badge>
              <Tag color="purple" size="sm">Shadcn Compatible</Tag>
            </div>
            <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
              {metadata.description}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
            {onNavigateToLab && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateToLab}
                className="gap-1.5 text-xs cursor-pointer"
                title="Ver no Laboratório de Componentes"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Ver no Lab</span>
              </Button>
            )}
          </div>
        </div>

        {/* CLI Quick Copy Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-(--tc-radius-lg) bg-surface border border-border">
          <div className="flex items-center gap-2.5 font-mono text-xs text-muted-foreground overflow-x-auto">
            <Terminal className="w-4 h-4 text-primary shrink-0" />
            <code className="text-foreground">{cliCommand}</code>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCli}
            className="h-7 px-3 text-xs gap-1.5 shrink-0 cursor-pointer font-sans"
          >
            {copiedCli ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCli ? "Copiado!" : "Copiar Comando"}</span>
          </Button>
        </div>
      </div>

      {/* Main Interactive Documentation Hub (Tabs) */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-surface-card border border-border p-1 w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
          <TabsTrigger value="preview" className="text-xs gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
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
        </TabsList>

        {/* 1. PREVIEW & PLAYGROUND */}
        <TabsContent value="preview" className="space-y-6">
          {/* Isolated Preview Canvas with Density Bar */}
          <div className="rounded-(--tc-radius-xl) border border-border bg-surface-card overflow-hidden shadow-xs">
            <div className="flex items-center justify-between p-3 border-b border-border bg-surface/50">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Preview Interativo
              </span>

              {/* Scoped Canvas Density */}
              <div className="inline-flex items-center p-0.5 rounded-(--tc-radius-md) bg-surface-card border border-border">
                <span className="text-[10px] font-mono text-muted-foreground px-2 flex items-center gap-1">
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

            {/* Canvas Stage */}
            <div
              data-density={density}
              className="p-8 sm:p-12 min-h-[220px] flex items-center justify-center bg-radial from-surface-elevated/40 to-surface-card transition-all"
            >
              {renderLiveComponent()}
            </div>
          </div>

          {/* Examples Gallery */}
          {metadata.examples && metadata.examples.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-display text-foreground">Exemplos & Casos de Uso</h3>
              <div className="grid grid-cols-1 gap-4">
                {metadata.examples.map((ex, idx) => (
                  <div key={idx} className="p-5 rounded-(--tc-radius-lg) border border-border bg-surface-card space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold font-display text-foreground">{ex.title}</h4>
                        {ex.description && <p className="text-xs text-muted-foreground">{ex.description}</p>}
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
              <h3 className="text-sm font-bold font-display text-foreground">Declaração de Importação</h3>
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
            <pre className="p-4 rounded-lg bg-surface font-mono text-xs text-primary border border-border">
              <code>{metadata.importStatement}</code>
            </pre>
          </div>

          <div className="p-6 rounded-(--tc-radius-xl) border border-border bg-surface-card space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h3 className="text-sm font-bold font-display text-foreground">Exemplo Completo de Uso</h3>
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
              <h3 className="text-sm font-bold font-display text-foreground">Tabela de Propriedades (TypeScript Props)</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 bg-surface/30 text-muted-foreground font-mono text-[11px]">
                    <th className="p-3 font-semibold">Prop</th>
                    <th className="p-3 font-semibold">Tipo TypeScript</th>
                    <th className="p-3 font-semibold">Padrão</th>
                    <th className="p-3 font-semibold">Descrição</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {metadata.props && metadata.props.length > 0 ? (
                    metadata.props.map((prop, idx) => (
                      <tr key={idx} className="hover:bg-surface-hover/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-primary">
                          {prop.name}
                          {prop.required && <span className="text-destructive ml-1">*</span>}
                        </td>
                        <td className="p-3 font-mono text-muted-foreground text-[11px]">{prop.type}</td>
                        <td className="p-3 font-mono text-muted-foreground/80">{prop.defaultValue || "—"}</td>
                        <td className="p-3 text-foreground font-sans">{prop.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        Aceita todas as props nativas de HTML element e classes do Tailwind CSS.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* 4. ACESSIBILIDADE */}
        <TabsContent value="a11y" className="space-y-6">
          <div className="p-6 rounded-(--tc-radius-xl) border border-border bg-surface-card space-y-4">
            <div className="flex items-center gap-2 text-foreground font-bold font-display text-sm border-b border-border/80 pb-3">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Conformidade WCAG 2.2 AA & Padrões WAI-ARIA</span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              O componente <strong>{metadata.name}</strong> foi auditado com leitores de tela e navegação estrita por teclado.
              {metadata.accessibility.notes && ` ${metadata.accessibility.notes}`}
            </p>

            {metadata.accessibility.keyboardShortcuts && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Keyboard className="w-3.5 h-3.5 text-primary" />
                  Navegação e Atalhos por Teclado
                </h4>
                <div className="divide-y divide-border/60 border border-border/80 rounded-lg overflow-hidden bg-surface">
                  {metadata.accessibility.keyboardShortcuts.map((kb, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <kbd className="font-mono bg-surface-card px-2 py-0.5 rounded border border-border text-foreground font-bold">
                        {kb.key}
                      </kbd>
                      <span className="text-muted-foreground font-sans">{kb.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {metadata.accessibility.ariaAttributes && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-foreground">Atributos ARIA Implementados</h4>
                <div className="divide-y divide-border/60 border border-border/80 rounded-lg overflow-hidden bg-surface">
                  {metadata.accessibility.ariaAttributes.map((aria, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <code className="font-mono text-primary font-bold">{aria.attribute}</code>
                      <span className="text-muted-foreground font-sans">{aria.purpose}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
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
