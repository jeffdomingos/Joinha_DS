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

export interface SubComponentDefinition {
  name: string
  level: "atom" | "molecule" | "organism"
  description: string
  tokensUsed?: string[]
  props?: PropDefinition[]
  usageCode?: string
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
  subComponents?: SubComponentDefinition[]
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

  sidebar: {
    id: "sidebar",
    name: "Sidebar",
    cliName: "sidebar",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Barra lateral de navegação modular em Compound Components com suporte a colapso para 64px, seções atômicas e tokens tipográficos.",
    importStatement: `import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarBrandHeader,
  SidebarUserProfile,
} from "@/components/layout/sidebar"`,
    usageCode: `<Sidebar collapsed={false} onToggleCollapse={() => {}}>
  <SidebarGroup>
    <SidebarGroupLabel>Documentação</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton isActive icon={BookOpen}>
          Visão Geral
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</Sidebar>`,
    props: [
      { name: "collapsed", type: "boolean", defaultValue: "false", description: "Define se o menu lateral está expandido (256px) ou recolhido (64px)." },
      { name: "onToggleCollapse", type: "() => void", defaultValue: "undefined", description: "Função disparada ao clicar no botão de expandir/recolher." },
      { name: "activeItem", type: "string", defaultValue: '"dashboard"', description: "ID do item de navegação atualmente selecionado." },
      { name: "onSelectItem", type: "(id: string) => void", defaultValue: "undefined", description: "Callback disparado ao clicar em qualquer item da sidebar." },
      { name: "brandTitle", type: "string", defaultValue: '"Joinha DS"', description: "Título exibido no cabeçalho da marca." },
    ],
    accessibility: {
      role: "navigation",
      ariaAttributes: [
        { attribute: "aria-label", purpose: "Rotula a região como 'Menu Lateral Principal' para leitores de tela." },
      ],
      wcagLevel: "AA",
    },
    subComponents: [
      {
        name: "Sidebar",
        level: "organism",
        description: "Container estrutural principal com superfície elevada OKLCH, elevação e transição fluida.",
        tokensUsed: ["--bg-surface-elevated", "--border", "--tc-ease-smooth"],
      },
      {
        name: "SidebarGroupLabel",
        level: "atom",
        description: "Átomo tipográfico de título de categoria de navegação.",
        tokensUsed: [".type-label-sm", "--text-muted"],
        usageCode: `<SidebarGroupLabel>Primitivos (18)</SidebarGroupLabel>`,
      },
      {
        name: "SidebarMenuButton",
        level: "atom",
        description: "Átomo de botão interativo de navegação com suporte a seleção ativa (isActive), ícones e badges.",
        tokensUsed: ["Button variant=navItem", "--border-focus", "--tc-radius-md"],
        props: [
          { name: "isActive", type: "boolean", defaultValue: "false", description: "Aplica indicador tátil de seleção ativa em Laranja Primário." },
          { name: "icon", type: "React.ComponentType", defaultValue: "undefined", description: "Ícone temático exibido à esquerda." },
          { name: "badge", type: "{ text: string, variant?: string }", defaultValue: "undefined", description: "Pílula de contagem ou status." },
        ],
        usageCode: `<SidebarMenuButton isActive icon={Box} badge={{ text: "18" }}>
  Primitivos & Controles
</SidebarMenuButton>`,
      },
      {
        name: "SidebarMenuSubButton",
        level: "atom",
        description: "Átomo de botão de segundo nível para submenus aninhados com borda de árvore.",
        tokensUsed: [".type-body-sm", "--spacing-6", "--border"],
        usageCode: `<SidebarMenuSubButton isActive badgeText="button">
  Button
</SidebarMenuSubButton>`,
      },
      {
        name: "SidebarBrandHeader",
        level: "molecule",
        description: "Molécula do topo com logotipo BrandSymbol, título tipográfico e badge de versão.",
        tokensUsed: ["BrandSymbol", "Badge", ".type-heading-card"],
        usageCode: `<SidebarBrandHeader brandTitle="Joinha DS" brandSubtitle="Design System v1.0" />`,
      },
      {
        name: "SidebarUserProfile",
        level: "molecule",
        description: "Molécula de rodapé com avatar de usuário, dados de conta e menu dropdown.",
        tokensUsed: ["DropdownMenu", "--tc-radius-full", ".type-body-sm"],
        usageCode: `<SidebarUserProfile userName="Jefferson D." userEmail="jeff@temcomo.design" />`,
      },
    ],
    examples: [
      {
        title: "Sidebar em Modo Expandido",
        code: `<Sidebar collapsed={false} onToggleCollapse={() => {}} activeItem="comp-button" />`,
      },
    ],
  },

  header: {
    id: "header",
    name: "Header",
    cliName: "header",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Cabeçalho global fixo com suporte a breadcrumbs dinâmicos, gatilho de busca com atalho ⌘K, alternador de tema e ações de contexto.",
    importStatement: `import {
  Header,
  HeaderBreadcrumbs,
  HeaderCommandTrigger,
  HeaderThemeToggle,
} from "@/components/layout/header"`,
    usageCode: `<Header
  breadcrumbs={[{ label: "Joinha DS" }, { label: "Componentes" }]}
  theme="dark"
  onToggleTheme={() => {}}
  onOpenCommand={() => {}}
/>`,
    props: [
      { name: "breadcrumbs", type: "Array<{ label: string, href?: string }>", defaultValue: "[]", description: "Trilha de navegação exibida no canto esquerdo." },
      { name: "theme", type: '"dark" | "light"', defaultValue: '"dark"', description: "Tema ativo na interface." },
      { name: "onToggleTheme", type: "() => void", defaultValue: "undefined", description: "Função de alternância Dark/Light." },
      { name: "onOpenCommand", type: "() => void", defaultValue: "undefined", description: "Callback de abertura da Command Palette (⌘K)." },
    ],
    accessibility: {
      role: "banner",
      wcagLevel: "AA",
    },
    subComponents: [
      {
        name: "Header",
        level: "organism",
        description: "Barra superior com blur backdrop, sticky navigation e z-index 20.",
        tokensUsed: ["--bg-surface", "--border", "backdrop-blur-md"],
      },
      {
        name: "HeaderBreadcrumbs",
        level: "molecule",
        description: "Trilha de navegação hierárquica conectada por chevrons sutis.",
        tokensUsed: [".type-body-sm", "--text-muted"],
        usageCode: `<HeaderBreadcrumbs breadcrumbs={[{ label: "Home" }, { label: "Componentes" }]} />`,
      },
      {
        name: "HeaderCommandTrigger",
        level: "atom",
        description: "Gatilho de busca rápida integrado ao átomo Kbd (⌘K) oficial do DS.",
        tokensUsed: ["Kbd", "Input", "--border-focus"],
        usageCode: `<HeaderCommandTrigger onClick={handleOpenSearch} />`,
      },
      {
        name: "HeaderThemeToggle",
        level: "atom",
        description: "Alternador tátil de tema Dark/Light com ícones semânticos de sol e lua.",
        tokensUsed: ["Button variant=outline", "--status-warning"],
        usageCode: `<HeaderThemeToggle theme="dark" onToggleTheme={toggleTheme} />`,
      },
    ],
    examples: [
      {
        title: "Header com Breadcrumbs",
        code: `<Header breadcrumbs={[{ label: "Painel" }, { label: "Métricas" }]} theme="dark" onToggleTheme={() => {}} />`,
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
    importStatement: `import {
  MetricCard,
  MetricCardTitle,
  MetricCardValue,
  MetricCardDelta,
} from "@/components/ui/metric-card"`,
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
    subComponents: [
      {
        name: "MetricCard",
        level: "molecule",
        description: "Card container executivo de KPI com elevação e gradientes sutis.",
        tokensUsed: ["--surface-card", "--border-gradient-subtle", "--tc-radius-lg"],
      },
      {
        name: "MetricCardTitle",
        level: "atom",
        description: "Rótulo semântico da métrica com token de corpo reduzido.",
        tokensUsed: [".type-body-sm", "--text-muted"],
        usageCode: `<MetricCardTitle>Taxa de Conversão</MetricCardTitle>`,
      },
      {
        name: "MetricCardValue",
        level: "atom",
        description: "Átomo tipográfico numérico em destaque com números tabulares.",
        tokensUsed: [".type-display-metric", "--tc-font-display"],
        usageCode: `<MetricCardValue>98.4%</MetricCardValue>`,
      },
      {
        name: "MetricCardDelta",
        level: "atom",
        description: "Átomo indicador de variação percentual positiva, negativa ou neutra com ícones semânticos.",
        tokensUsed: ["--status-success-subtle", "--status-danger-subtle"],
        usageCode: `<MetricCardDelta value="+12.4%" trend="up" period="vs. mês anterior" />`,
      },
    ],
    examples: [
      {
        title: "Card Financeiro com Gráfico",
        code: `<MetricCard title="Novos Clientes" value="1.420" sparklineData={[10, 15, 22, 29]} />`,
      },
    ],
  },

  "confidence-meter": {
    id: "confidence-meter",
    name: "ConfidenceMeter",
    cliName: "confidence-meter",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Componente XAI para calibragem de confiança probabilística de agentes inteligentes com rastreamento de raciocínio (Chain-of-Thought).",
    importStatement: `import { ConfidenceMeter, ReasoningTrace } from "@/components/ui/confidence-meter"`,
    usageCode: `<ConfidenceMeter
  score={94}
  label="Confiança do Agente"
  sourceCount={5}
/>`,
    props: [
      { name: "score", type: "number (0-100)", defaultValue: "undefined", description: "Score percentual de confiança da inferência.", required: true },
      { name: "label", type: "string", defaultValue: '"Confiança da IA"', description: "Rótulo textual do medidor." },
      { name: "showBar", type: "boolean", defaultValue: "true", description: "Renderiza a barra de progresso colorida." },
      { name: "sourceCount", type: "number", defaultValue: "undefined", description: "Quantidade de documentos/fontes de Grounding." },
      { name: "compact", type: "boolean", defaultValue: "false", description: "Modo condensado para tabelas ou listas densas." },
    ],
    accessibility: {
      role: "meter",
      ariaAttributes: [
        { attribute: "aria-valuenow", purpose: "Comunica o valor percentual atual da confiança." },
        { attribute: "aria-valuemin", purpose: "Define o valor mínimo (0)." },
        { attribute: "aria-valuemax", purpose: "Define o valor máximo (100)." },
      ],
      wcagLevel: "AA",
      notes: "Classificação automática em 3 faixas OKLCH: Alta (≥90%), Média (70-89%) e Baixa (<70%).",
    },
    subComponents: [
      {
        name: "ConfidenceMeter",
        level: "molecule",
        description: "Widget calibrador de confiança de IA com cálculo automático de severidade.",
        tokensUsed: ["Badge", "--status-success", "--status-warning", "--status-danger"],
      },
      {
        name: "ReasoningTrace",
        level: "molecule",
        description: "Visualizador de Chain-of-Thought expansível com etapas de raciocínio, latência e fontes.",
        tokensUsed: [".type-code-inline", "Badge", "--border"],
        usageCode: `<ReasoningTrace steps={[{ title: "Análise de Sentimento", status: "done", durationMs: 120 }]} />`,
      },
    ],
    examples: [
      {
        title: "Alta Confiança com Fontes",
        code: `<ConfidenceMeter score={96} sourceCount={8} />`,
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
