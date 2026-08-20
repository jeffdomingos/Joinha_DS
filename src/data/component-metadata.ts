export interface PropDefinition {
  name: string
  type: string
  defaultValue?: string
  description: string
  required?: boolean
}

export interface ComponentExample {
  title: string
  description?: string
  code: string
}

export interface AccessibilityGuide {
  role?: string
  keyboardShortcuts?: Array<{ key: string; action: string }>
  ariaAttributes?: Array<{ attribute: string; purpose: string }>
  wcagLevel?: "A" | "AA" | "AAA"
  notes?: string
}

export interface ComponentMetadata {
  id: string
  name: string
  cliName: string
  category: "primitives" | "nav_layout" | "data_viz" | "onboarding" | "xai_hitl"
  categoryLabel: string
  description: string
  importStatement: string
  usageCode: string
  props: PropDefinition[]
  accessibility: AccessibilityGuide
  examples: ComponentExample[]
  highlights?: string[]
}

export const COMPONENT_METADATA_MAP: Record<string, ComponentMetadata> = {
  button: {
    id: "button",
    name: "Button",
    cliName: "button",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Botão tátil interativo com suporte a 5 variantes estilísticas, 3 tamanhos, feedback de foco perceptual e estado de carregamento.",
    importStatement: `import { Button } from "@/components/ui/button"`,
    usageCode: `<Button variant="primary" size="md">
  Confirmar Operação
</Button>`,
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive" | "navItem"', defaultValue: '"primary"', description: "Estilo visual da superfície do botão." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon"', defaultValue: '"md"', description: "Dimensão tátil e padding do botão." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desativa interações de clique e aplica opacidade 50%." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Permite mesclar propriedades com elemento filho via Radix Slot." },
    ],
    accessibility: {
      role: "button",
      keyboardShortcuts: [
        { key: "Enter / Space", action: "Dispara o evento de clique do botão." },
        { key: "Tab", action: "Foca no botão com anel de foco visível em Laranja Primário." },
      ],
      ariaAttributes: [
        { attribute: "aria-disabled", purpose: "Indica estado desativado para tecnologias assistivas." },
      ],
      wcagLevel: "AA",
      notes: "Contraste de texto branco sobre Laranja Primário OKLCH garante razão ≥ 4.5:1.",
    },
    examples: [
      {
        title: "Variantes de Ação",
        description: "Hierarquia visual de ações primárias a destrutivas.",
        code: `<div className="flex gap-2">
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive">Destructive</Button>
</div>`,
      },
      {
        title: "Tamanhos de Densidade",
        description: "Compatibilidade com a matriz de densidade (32px, 40px, 48px).",
        code: `<div className="flex items-center gap-2">
  <Button size="sm">Pequeno (32px)</Button>
  <Button size="md">Padrão (40px)</Button>
  <Button size="lg">Confortável (48px)</Button>
</div>`,
      },
    ],
  },

  input: {
    id: "input",
    name: "Input",
    cliName: "input",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Campo de entrada de texto com suporte a estados de foco perceptual, validação visual, prefixos e compatibilidade com formulários controlados.",
    importStatement: `import { Input } from "@/components/ui/input"`,
    usageCode: `<Input placeholder="Digite seu e-mail corporativo..." />`,
    props: [
      { name: "type", type: "string", defaultValue: '"text"', description: "Tipo do campo HTML (text, email, password, number, search)." },
      { name: "placeholder", type: "string", defaultValue: "undefined", description: "Texto indicativo de preenchimento." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desativa digitação no campo." },
    ],
    accessibility: {
      keyboardShortcuts: [
        { key: "Tab", action: "Navega para o campo de texto." },
      ],
      ariaAttributes: [
        { attribute: "aria-invalid", purpose: "Sinaliza erros de validação a leitores de tela." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Input com Placeholder",
        code: `<Input type="email" placeholder="nome@empresa.com" />`,
      },
    ],
  },

  "data-table": {
    id: "data-table",
    name: "DataTable",
    cliName: "data-table",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Tabela de dados corporativa de alta densidade com paginação, filtros, seleção em lote, ordenação de colunas e suporte à matriz de densidade.",
    importStatement: `import { DataTable } from "@/components/ui/data-table"`,
    usageCode: `<DataTable
  records={mockTenants}
  onSearch={(q) => console.log(q)}
/>`,
    props: [
      { name: "records", type: "DataTableRecord[]", defaultValue: "[]", description: "Array de registros a serem renderizados." },
      { name: "onSearch", type: "(query: string) => void", defaultValue: "undefined", description: "Callback disparado na busca de registros." },
      { name: "onSelectRows", type: "(ids: string[]) => void", defaultValue: "undefined", description: "Callback de seleção de linhas." },
    ],
    accessibility: {
      role: "table",
      wcagLevel: "AA",
      notes: "Headers acessíveis com escopo `col`, células com alto contraste e navegação por teclado.",
    },
    examples: [
      {
        title: "Tabela com Paginação e Filtros",
        code: `<DataTable records={tenantsList} />`,
      },
    ],
  },

  "confidence-meter": {
    id: "confidence-meter",
    name: "ConfidenceMeter",
    cliName: "confidence-meter",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Indicador perceptual do score de certeza e probabilidade de predições de modelos de IA, com micro-gradiente semântico e breakdown de fatores.",
    importStatement: `import { ConfidenceMeter, ReasoningTrace } from "@/components/ui/confidence-meter"`,
    usageCode: `<ConfidenceMeter
  score={94}
  label="Score de Certeza do Modelo"
  source="FinGPT-Enterprise-v4"
/>`,
    props: [
      { name: "score", type: "number (0-100)", defaultValue: "undefined", description: "Percentual de confiança do modelo.", required: true },
      { name: "label", type: "string", defaultValue: '"Confiança do Modelo"', description: "Rótulo explicativo da métrica." },
      { name: "source", type: "string", defaultValue: "undefined", description: "Nome do modelo de Machine Learning ou agente gerador." },
    ],
    accessibility: {
      role: "meter",
      ariaAttributes: [
        { attribute: "aria-valuenow", purpose: "Valor numérico atual da certeza (0 a 100)." },
        { attribute: "aria-valuemin", purpose: "Valor mínimo do medidor (0)." },
        { attribute: "aria-valuemax", purpose: "Valor máximo do medidor (100)." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Confiança Alta vs. Moderada",
        code: `<div className="space-y-4">
  <ConfidenceMeter score={96} source="Retenção ML v3" />
  <ConfidenceMeter score={72} source="Análise Preditiva" />
</div>`,
      },
    ],
  },

  "hitl-approval-banner": {
    id: "hitl-approval-banner",
    name: "HITLApprovalBanner",
    cliName: "hitl-approval-banner",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Banner de interceptação de operações críticas por IA para confirmação explícita de operadores humanos (Human-in-the-Loop).",
    importStatement: `import { HITLApprovalBanner } from "@/components/ui/hitl-approval-banner"`,
    usageCode: `<HITLApprovalBanner
  severity="warning"
  title="Reajuste Contratual Proposto"
  description="O agente detectou risco de churn e preparou 15% de desconto."
  onApprove={() => console.log('Aprovado')}
  onReject={() => console.log('Rejeitado')}
/>`,
    props: [
      { name: "title", type: "string", defaultValue: "undefined", description: "Título da proposta gerada pela IA.", required: true },
      { name: "description", type: "string", defaultValue: "undefined", description: "Detalhamento do impacto da ação." },
      { name: "severity", type: '"warning" | "danger" | "info"', defaultValue: '"warning"', description: "Nível de criticidade da ação." },
      { name: "onApprove", type: "() => void", defaultValue: "undefined", description: "Callback de aprovação do operador humano." },
      { name: "onReject", type: "() => void", defaultValue: "undefined", description: "Callback de rejeição da proposta." },
    ],
    accessibility: {
      role: "alertdialog",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Interceptação de Alto Impacto",
        code: `<HITLApprovalBanner
  title="Exclusão de Backup Antigo"
  severity="danger"
  onApprove={handleApprove}
  onReject={handleReject}
/>`,
      },
    ],
  },

  "ai-diff-viewer": {
    id: "ai-diff-viewer",
    name: "AIDiffViewer",
    cliName: "ai-diff-viewer",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Visualizador de diferenças estruturadas (Diffs) lado a lado e unificado com sintaxe colorida em verde (adição) e vermelho (remoção).",
    importStatement: `import { AIDiffViewer } from "@/components/ui/ai-diff-viewer"`,
    usageCode: `<AIDiffViewer
  title="Configuração de Billing"
  diffs={[
    { type: "removed", content: '  tier: "standard",' },
    { type: "added", content: '  tier: "enterprise",' }
  ]}
/>`,
    props: [
      { name: "title", type: "string", defaultValue: '"Visualizador de Diff"', description: "Título do cabeçalho do arquivo." },
      { name: "diffs", type: "DiffLine[]", defaultValue: "[]", description: "Linhas com tipo (added, removed, unchanged) e conteúdo." },
      { name: "defaultMode", type: '"split" | "unified"', defaultValue: '"split"', description: "Modo inicial de exibição (Lado a Lado ou Unificado)." },
    ],
    accessibility: {
      wcagLevel: "AA",
      notes: "Cores de contraste calibradas com ícones semânticos (+) e (-) para usuários daltônicos.",
    },
    examples: [
      {
        title: "Diff de JSON",
        code: `<AIDiffViewer title="payload.json" diffs={sampleDiffs} />`,
      },
    ],
  },

  "metric-card": {
    id: "metric-card",
    name: "MetricCard",
    cliName: "metric-card",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Card executivo de métricas e KPIs com suporte a Sparklines Bézier integradas, indicadores de tendência e cálculo de metas.",
    importStatement: `import { MetricCard } from "@/components/ui/metric-card"`,
    usageCode: `<MetricCard
  title="Receita Recorrente (MRR)"
  value="R$ 48.920"
  change={{ value: "+14.2%", trend: "up" }}
  sparklineData={[28, 31, 35, 40, 48.9]}
/>`,
    props: [
      { name: "title", type: "string", defaultValue: "undefined", description: "Rótulo superior da métrica." },
      { name: "value", type: "string | number", defaultValue: "undefined", description: "Valor principal exibido em destaque hero." },
      { name: "change", type: "{ value: string, trend: 'up' | 'down', period?: string }", defaultValue: "undefined", description: "Indicador de variação percentual." },
      { name: "sparklineData", type: "number[]", defaultValue: "undefined", description: "Série temporal para renderização do gráfico de linha." },
    ],
    accessibility: {
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Card Financeiro com Gráfico",
        code: `<MetricCard title="Novos Clientes" value="1.420" sparklineData={[10, 15, 22, 29]} />`,
      },
    ],
  },

  chart: {
    id: "chart",
    name: "Chart",
    cliName: "chart",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Wrapper padronizado de visualização de dados sobre o Recharts com suporte a temas OKLCH, tooltips inteligentes e legendas interativas.",
    importStatement: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"`,
    usageCode: `<ChartContainer config={chartConfig} className="h-[250px]">
  <AreaChart data={data}>
    <Area dataKey="mrr" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.2} />
  </AreaChart>
</ChartContainer>`,
    props: [
      { name: "config", type: "ChartConfig", defaultValue: "{}", description: "Dicionário de séries, cores e rótulos do gráfico." },
      { name: "className", type: "string", defaultValue: "undefined", description: "Classes utilitárias de altura e dimensionamento." },
    ],
    accessibility: {
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Gráfico de Área com Gradiente",
        code: `<ChartContainer config={config}><AreaChart data={data} /></ChartContainer>`,
      },
    ],
  },

  "tour-spotlight": {
    id: "tour-spotlight",
    name: "TourSpotlight",
    cliName: "tour-spotlight",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Sistema de onboarding guiado e tour interativo com spotlight escurecido, micro-animações, progresso e ancoragem dinâmica em elementos da interface.",
    importStatement: `import { TourSpotlight, type TourStep } from "@/components/ui/tour-spotlight"`,
    usageCode: `<TourSpotlight
  isOpen={isTourOpen}
  onClose={() => setIsTourOpen(false)}
  steps={tourSteps}
/>`,
    props: [
      { name: "isOpen", type: "boolean", defaultValue: "false", description: "Controla a visibilidade do modal de tour." },
      { name: "steps", type: "TourStep[]", defaultValue: "[]", description: "Lista de etapas com título, descrição e alvo." },
      { name: "onClose", type: "() => void", defaultValue: "undefined", description: "Callback de encerramento do tour." },
    ],
    accessibility: {
      role: "dialog",
      keyboardShortcuts: [
        { key: "Escape", action: "Fecha o tour guiado imediatamente." },
        { key: "ArrowRight / ArrowLeft", action: "Avança ou recua os passos do tour." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Tour de Boas-Vindas",
        code: `<TourSpotlight isOpen={open} steps={steps} onClose={handleClose} />`,
      },
    ],
  },

  "onboarding-checklist": {
    id: "onboarding-checklist",
    name: "OnboardingChecklist",
    cliName: "onboarding-checklist",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Checklist persistente e dockable de ativação de produto e conclusão de etapas para novos usuários corporativos.",
    importStatement: `import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"`,
    usageCode: `<OnboardingChecklist
  steps={checklistSteps}
  onToggleStep={(id) => handleToggle(id)}
/>`,
    props: [
      { name: "steps", type: "OnboardingStep[]", defaultValue: "[]", description: "Passos da lista com status de conclusão." },
      { name: "onToggleStep", type: "(id: string) => void", defaultValue: "undefined", description: "Callback ao marcar/desmarcar item." },
    ],
    accessibility: {
      role: "region",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Checklist com Barra de Progresso",
        code: `<OnboardingChecklist steps={steps} onToggleStep={toggle} />`,
      },
    ],
  },

  tabs: {
    id: "tabs",
    name: "Tabs",
    cliName: "tabs",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Abas de alternância de conteúdo baseadas em Radix UI com suporte a navegação por teclado e animação de seleção suave.",
    importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`,
    usageCode: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Geral</TabsTrigger>
    <TabsTrigger value="tab2">Avançado</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo Geral</TabsContent>
  <TabsContent value="tab2">Configurações Avançadas</TabsContent>
</Tabs>`,
    props: [
      { name: "defaultValue", type: "string", defaultValue: "undefined", description: "Valor da aba selecionada por padrão." },
      { name: "value", type: "string", defaultValue: "undefined", description: "Valor controlado da aba ativa." },
      { name: "onValueChange", type: "(val: string) => void", defaultValue: "undefined", description: "Callback disparado na troca de aba." },
    ],
    accessibility: {
      role: "tablist",
      keyboardShortcuts: [
        { key: "ArrowLeft / ArrowRight", action: "Navega entre as abas ativas." },
        { key: "Home / End", action: "Salta para a primeira ou última aba." },
      ],
      ariaAttributes: [
        { attribute: "aria-selected", purpose: "Indica a aba selecionada no momento." },
        { attribute: "aria-controls", purpose: "Vincula o gatilho da aba ao painel de conteúdo correspondente." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Abas Simples",
        code: `<Tabs defaultValue="conta"><TabsList><TabsTrigger value="conta">Conta</TabsTrigger></TabsList></Tabs>`,
      },
    ],
  },

  dialog: {
    id: "dialog",
    name: "Dialog",
    cliName: "dialog",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Janela modal com backdrop desfocado, bloqueio de scroll de fundo e gerenciamento rigoroso de foco para fluxos de decisão.",
    importStatement: `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"`,
    usageCode: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogDescription>Esta ação é irreversível.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="primary">Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "open", type: "boolean", defaultValue: "undefined", description: "Estado de abertura controlado do modal." },
      { name: "onOpenChange", type: "(open: boolean) => void", defaultValue: "undefined", description: "Callback disparado na abertura/fechamento." },
    ],
    accessibility: {
      role: "dialog",
      keyboardShortcuts: [
        { key: "Escape", action: "Fecha o modal e restaura o foco no elemento acionador." },
        { key: "Tab", action: "Aprisiona o foco dentro do conteúdo do modal (*Focus Trap*)." },
      ],
      ariaAttributes: [
        { attribute: "aria-modal", purpose: "Informa que a janela é modal para leitores de tela." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Modal com Formulário",
        code: `<Dialog><DialogTrigger>Abrir</DialogTrigger><DialogContent><DialogHeader><DialogTitle>Editar</DialogTitle></DialogHeader></DialogContent></Dialog>`,
      },
    ],
  },
}

// Fallback generator for all 50 components
export function getComponentMetadata(id: string, name?: string, category?: string, description?: string): ComponentMetadata {
  if (COMPONENT_METADATA_MAP[id]) {
    return COMPONENT_METADATA_MAP[id]
  }

  const cliName = id
  const displayName = name || id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")
  const cat = (category as ComponentMetadata["category"]) || "primitives"

  return {
    id,
    name: displayName,
    cliName,
    category: cat,
    categoryLabel: cat === "primitives" ? "Primitivos & Controles" : cat === "nav_layout" ? "Navegação & Layout" : cat === "data_viz" ? "Visualização de Dados" : cat === "onboarding" ? "Onboarding UX" : "XAI & HITL",
    description: description || `Componente oficial ${displayName} do Joinha Design System. Totalmente acessível, compatível com modo escuro e responsivo.`,
    importStatement: `import { ${displayName} } from "@/components/ui/${cliName}"`,
    usageCode: `<${displayName} />`,
    props: [
      { name: "className", type: "string", description: "Classes utilitárias adicionais do Tailwind CSS." },
    ],
    accessibility: {
      wcagLevel: "AA",
      notes: "Construído em conformidade com as diretrizes WAI-ARIA e Radix UI Primitives.",
    },
    examples: [
      {
        title: `Uso Básico de ${displayName}`,
        code: `<${displayName} />`,
      },
    ],
  }
}
