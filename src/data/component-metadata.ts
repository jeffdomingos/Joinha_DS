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
  whenToUse: string
  importStatement: string
  usageCode: string
  props: PropDefinition[]
  accessibility: AccessibilityGuide
  examples: ComponentExample[]
  subComponents?: SubComponentDefinition[]
  highlights?: string[]
}

export const COMPONENT_METADATA_MAP: Record<string, ComponentMetadata> = {
  /* ========================================================
     1. PRIMITIVOS & CONTROLES (18)
     ======================================================== */
  button: {
    id: "button",
    name: "Button",
    cliName: "button",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Botão tátil interativo com suporte a 5 variantes estilísticas, 3 tamanhos, feedback de foco perceptual e estado de carregamento.",
    whenToUse: "Disparar ações primárias, secundárias, destrutivas ou navegação estrutural (navItem) em formulários, modais e toolbars.",
    importStatement: `import { Button } from "@/components/ui/button"`,
    usageCode: `<Button variant="primary" size="md">
  Confirmar Operação
</Button>`,
    props: [
      { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "destructive" | "navItem"', defaultValue: '"primary"', description: "Estilo visual da superfície do botão." },
      { name: "size", type: '"sm" | "default" | "lg" | "icon"', defaultValue: '"default"', description: "Dimensão tátil e padding do botão." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desativa interações de clique e aplica opacidade 50%." },
      { name: "asChild", type: "boolean", defaultValue: "false", description: "Permite mesclar propriedades com elemento filho via Radix Slot." },
      { name: "isLoading", type: "boolean", defaultValue: "false", description: "Exibe um spinner de carregamento e desativa cliques temporariamente." },
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
    ],
  },

  input: {
    id: "input",
    name: "Input",
    cliName: "input",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Campo de entrada de texto de linha única com profundidade tátil sunken, anel de foco OKLCH e estados de erro.",
    whenToUse: "Coletar dados breves de linha única como e-mails, buscas, senhas, chaves de API e nomes.",
    importStatement: `import { Input } from "@/components/ui/input"`,
    usageCode: `<Input placeholder="Digite seu e-mail..." />`,
    props: [
      { name: "type", type: "string", defaultValue: '"text"', description: "Tipo de entrada HTML (text, email, password, number)." },
      { name: "placeholder", type: "string", description: "Texto de instrução atenuado exibido quando vazio." },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "Desativa edição e aplica estilo atenuado." },
    ],
    accessibility: {
      role: "textbox",
      keyboardShortcuts: [
        { key: "Tab", action: "Foca no campo de entrada." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Input de E-mail Corporativo",
        code: `<Input type="email" placeholder="nome@empresa.com" />`,
      },
    ],
  },

  textarea: {
    id: "textarea",
    name: "Textarea",
    cliName: "textarea",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Área de texto expansível multilinha com suporte a redimensionamento e profundidade sunken.",
    whenToUse: "Inserir descrições longas, notas fiscais, prompts de IA, mensagens ou blocos de texto multilinha.",
    importStatement: `import { Textarea } from "@/components/ui/textarea"`,
    usageCode: `<Textarea placeholder="Descreva os requisitos..." rows={4} />`,
    props: [
      { name: "rows", type: "number", defaultValue: "3", description: "Número de linhas visíveis iniciais." },
      { name: "placeholder", type: "string", description: "Texto de instrução atenuado." },
    ],
    accessibility: {
      role: "textbox",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Área de Prompt",
        code: `<Textarea placeholder="Instruções para o agente autônomo..." />`,
      },
    ],
  },

  checkbox: {
    id: "checkbox",
    name: "Checkbox",
    cliName: "checkbox",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Caixa de marcação acessível com ícone animado de confirmação e suporte a estado indeterminado.",
    whenToUse: "Seleção múltipla em listas, aceitar termos de serviço ou alternar filtros com múltiplos estados.",
    importStatement: `import { Checkbox } from "@/components/ui/checkbox"`,
    usageCode: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <label htmlFor="terms">Aceito os termos</label>
</div>`,
    props: [
      { name: "checked", type: "boolean | 'indeterminate'", description: "Estado de marcação do checkbox." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback de alteração de estado." },
    ],
    accessibility: {
      role: "checkbox",
      keyboardShortcuts: [{ key: "Space", action: "Alterna a marcação da caixa de seleção." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Checkbox com Label",
        code: `<Checkbox id="sub" label="Receber notificações" />`,
      },
    ],
  },

  switch: {
    id: "switch",
    name: "Switch",
    cliName: "switch",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Alternador binário de alta resposta com trilho de fundo e thumb deslizante com física fluida.",
    whenToUse: "Ativar/desativar recursos de efeito imediato que não exigem submissão de formulário (ex: Modo Autônomo, Notificações).",
    importStatement: `import { Switch } from "@/components/ui/switch"`,
    usageCode: `<Switch id="airplane-mode" />`,
    props: [
      { name: "checked", type: "boolean", description: "Estado ligado/desligado." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback de disparo." },
    ],
    accessibility: {
      role: "switch",
      keyboardShortcuts: [{ key: "Space / Enter", action: "Alterna o estado do switch." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Switch Ativo",
        code: `<Switch defaultChecked />`,
      },
    ],
  },

  "radio-group": {
    id: "radio-group",
    name: "RadioGroup",
    cliName: "radio-group",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Conjunto de botões de opção mutuamente exclusivos com navegação por setas de teclado.",
    whenToUse: "Escolha obrigatória de um único item entre poucas opções mutuamente exclusivas e visíveis (ex: Planos SaaS, Níveis de Assinatura).",
    importStatement: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    usageCode: `<RadioGroup defaultValue="pro">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="pro" id="r-pro" />
    <label htmlFor="r-pro">Plano Pro</label>
  </div>
</RadioGroup>`,
    props: [
      { name: "defaultValue", type: "string", description: "Valor selecionado por padrão." },
      { name: "onValueChange", type: "(value: string) => void", description: "Callback de alteração." },
    ],
    accessibility: {
      role: "radiogroup",
      keyboardShortcuts: [{ key: "Arrow Up / Down", action: "Navega e seleciona entre opções do grupo." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Seleção de Planos",
        code: `<RadioGroup defaultValue="starter"><RadioGroupItem value="starter" /></RadioGroup>`,
      },
    ],
  },

  select: {
    id: "select",
    name: "Select",
    cliName: "select",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Menu suspenso acessível com posicionamento dinâmico e scroll automático em Radix UI.",
    whenToUse: "Seleção de um valor único entre muitas opções sem poluir o layout visual da página (ex: Moeda, País, Fuso Horário).",
    importStatement: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"`,
    usageCode: `<Select defaultValue="brl">
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Moeda" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="brl">BRL (R$)</SelectItem>
    <SelectItem value="usd">USD ($)</SelectItem>
  </SelectContent>
</Select>`,
    props: [
      { name: "defaultValue", type: "string", description: "Valor inicial selecionado." },
      { name: "onValueChange", type: "(val: string) => void", description: "Callback disparado na seleção." },
    ],
    accessibility: {
      role: "combobox",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Seletor de Moeda",
        code: `<Select defaultValue="brl"><SelectTrigger><SelectValue /></SelectTrigger></Select>`,
      },
    ],
  },

  slider: {
    id: "slider",
    name: "Slider",
    cliName: "slider",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Controle deslizante contínuo com trilho preenchido e thumb com anel de foco perceptível.",
    whenToUse: "Ajustar valores numéricos contínuos ou em passos dentro de uma faixa definida (ex: Limite de cota, Volume, Amostragem de IA).",
    importStatement: `import { Slider } from "@/components/ui/slider"`,
    usageCode: `<Slider defaultValue={[50]} max={100} step={1} />`,
    props: [
      { name: "defaultValue", type: "number[]", description: "Valor inicial numérico." },
      { name: "max", type: "number", defaultValue: "100", description: "Valor máximo do trilho." },
      { name: "step", type: "number", defaultValue: "1", description: "Passo de incremento." },
    ],
    accessibility: {
      role: "slider",
      keyboardShortcuts: [{ key: "Arrow Left / Right", action: "Incrementa ou decrementa o valor numérico." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Amostragem de IA",
        code: `<Slider defaultValue={[75]} max={100} />`,
      },
    ],
  },

  badge: {
    id: "badge",
    name: "Badge",
    cliName: "badge",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Pílula semântica de status compacta com trava arquitetural de whitespace-nowrap e 5 variantes.",
    whenToUse: "Indicar status operacional rápido ou contadores em tempo real (ex: Online, Pendente, Falha, Versão).",
    importStatement: `import { Badge } from "@/components/ui/badge"`,
    usageCode: `<Badge variant="success">Online</Badge>`,
    props: [
      { name: "variant", type: '"success" | "danger" | "warning" | "info" | "neutral"', defaultValue: '"neutral"', description: "Variante semântica de cor." },
      { name: "size", type: '"sm" | "default" | "lg"', defaultValue: '"default"', description: "Tamanho e altura da pílula." },
    ],
    accessibility: {
      role: "status",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Badges de Status",
        code: `<Badge variant="success">Ativo</Badge>`,
      },
    ],
  },

  tag: {
    id: "tag",
    name: "Tag",
    cliName: "tag",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Rótulo categórico e contextual com 6 tons de croma controlado (Chroma Budget).",
    whenToUse: "Metadados, etiquetas e categorização de registros em lote com croma controlado (ex: Enterprise, OKLCH, IA).",
    importStatement: `import { Tag } from "@/components/ui/tag"`,
    usageCode: `<Tag color="purple">IA Generativa</Tag>`,
    props: [
      { name: "color", type: '"purple" | "teal" | "pink" | "indigo" | "amber" | "slate"', defaultValue: '"slate"', description: "Cor da família cromática contida." },
    ],
    accessibility: {
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Tags de Categoria",
        code: `<Tag color="teal">OKLCH</Tag>`,
      },
    ],
  },

  skeleton: {
    id: "skeleton",
    name: "Skeleton",
    cliName: "skeleton",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Esqueleto de carregamento com shimmer contínuo de 1.8s (NN/g) e paridade dimensional exata.",
    whenToUse: "Reduzir o tempo percebido de espera (NN/g) enquanto dados assíncronos de APIs e tabelas estão sendo carregados.",
    importStatement: `import { Skeleton } from "@/components/ui/skeleton"`,
    usageCode: `<Skeleton className="h-4 w-48 rounded" />`,
    props: [
      { name: "className", type: "string", description: "Classes de largura, altura e raio." },
    ],
    accessibility: {
      ariaAttributes: [{ attribute: "aria-hidden", purpose: "Oculta o shimmer de leitores de tela." }],
      wcagLevel: "AAA",
    },
    examples: [
      {
        title: "Placeholder de Card",
        code: `<Skeleton className="h-12 w-full" />`,
      },
    ],
  },

  kbd: {
    id: "kbd",
    name: "Kbd",
    cliName: "kbd",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Indicador tátil de tecla física com borda chanfrada e fonte mono alinhada.",
    whenToUse: "Ensinar atalhos de hardware e navegação por teclado para desenvolvedores e operadores de alta produtividade.",
    importStatement: `import { Kbd } from "@/components/ui/kbd"`,
    usageCode: `<Kbd>⌘K</Kbd>`,
    props: [
      { name: "children", type: "React.ReactNode", description: "Texto ou símbolo da tecla." },
    ],
    accessibility: {
      wcagLevel: "AAA",
    },
    examples: [
      {
        title: "Atalho de Busca",
        code: `<Kbd>⌘K</Kbd>`,
      },
    ],
  },

  tooltip: {
    id: "tooltip",
    name: "Tooltip",
    cliName: "tooltip",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Micro-balão explicativo flutuante ativado por hover e foco com posicionamento anti-colisão.",
    whenToUse: "Explicar botões apenas com ícones ou fornecer dicas contextuais breves ativadas por hover sem poluir a interface.",
    importStatement: `import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"`,
    usageCode: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button size="icon">?</Button></TooltipTrigger>
    <TooltipContent>Dica útil</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
    props: [
      { name: "delayDuration", type: "number", defaultValue: "200", description: "Tempo de espera antes da abertura (ms)." },
    ],
    accessibility: {
      role: "tooltip",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Dica em Ícone",
        code: `<Tooltip><TooltipTrigger>Info</TooltipTrigger><TooltipContent>Dica</TooltipContent></Tooltip>`,
      },
    ],
  },

  "dropdown-menu": {
    id: "dropdown-menu",
    name: "DropdownMenu",
    cliName: "dropdown-menu",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Menu suspenso flutuante com suporte a itens, atalhos, divisores e grupos em superfície elevada.",
    whenToUse: "Agrupar ações secundárias ou contextuais sob um gatilho único (ex: menu de perfil, ações de linha em tabelas).",
    importStatement: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"`,
    usageCode: `<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Ações</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Editar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    props: [
      { name: "align", type: '"start" | "center" | "end"', defaultValue: '"end"', description: "Alinhamento do menu em relação ao gatilho." },
    ],
    accessibility: {
      role: "menu",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Menu de Ações",
        code: `<DropdownMenu><DropdownMenuTrigger>Opções</DropdownMenuTrigger></DropdownMenu>`,
      },
    ],
  },

  dialog: {
    id: "dialog",
    name: "Dialog",
    cliName: "dialog",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Janela modal centralizada com backdrop com desfoque e aprisionamento estrito de foco.",
    whenToUse: "Tarefas que exigem foco total e isolado do usuário, como cadastros complexos, edição de configurações ou wizards.",
    importStatement: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"`,
    usageCode: `<Dialog>
  <DialogTrigger asChild><Button>Abrir</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Título</DialogTitle></DialogHeader>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "open", type: "boolean", description: "Estado de abertura controlado." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Callback de abertura." },
    ],
    accessibility: {
      role: "dialog",
      keyboardShortcuts: [{ key: "Escape", action: "Fecha o diálogo e restaura o foco anterior." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Modal de Configuração",
        code: `<Dialog><DialogTrigger>Abrir</DialogTrigger></Dialog>`,
      },
    ],
  },

  "alert-dialog": {
    id: "alert-dialog",
    name: "AlertDialog",
    cliName: "alert-dialog",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Modal crítico de confirmação com ação destrutiva explícita e bloqueio de fechamento acidental.",
    whenToUse: "Interromper o fluxo para confirmar ações destrutivas ou irreversíveis (ex: Excluir Workspace, Revogar Token).",
    importStatement: `import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"`,
    usageCode: `<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="destructive">Excluir</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader><AlertDialogTitle>Tem certeza?</AlertDialogTitle></AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>`,
    props: [
      { name: "open", type: "boolean", description: "Estado controlado." },
    ],
    accessibility: {
      role: "alertdialog",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Exclusão Crítica",
        code: `<AlertDialog><AlertDialogTrigger>Excluir</AlertDialogTrigger></AlertDialog>`,
      },
    ],
  },

  sheet: {
    id: "sheet",
    name: "Sheet",
    cliName: "sheet",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Gaveta lateral expansível deslizante (Drawer) para formulários e detalhes profundos.",
    whenToUse: "Exibir formulários longos, logs de auditoria detalhados ou painéis de filtros sem navegar para fora da página atual.",
    importStatement: `import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"`,
    usageCode: `<Sheet>
  <SheetTrigger asChild><Button variant="outline">Filtros</Button></SheetTrigger>
  <SheetContent><SheetHeader><SheetTitle>Painel Lateral</SheetTitle></SheetHeader></SheetContent>
</Sheet>`,
    props: [
      { name: "side", type: '"top" | "right" | "bottom" | "left"', defaultValue: '"right"', description: "Lado de abertura da gaveta." },
    ],
    accessibility: {
      role: "dialog",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Painel Lateral Direito",
        code: `<Sheet><SheetTrigger>Abrir Gaveta</SheetTrigger></Sheet>`,
      },
    ],
  },

  sonner: {
    id: "sonner",
    name: "Sonner",
    cliName: "sonner",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Gerenciador de notificações toast empilháveis com física fluida e cores semânticas OKLCH.",
    whenToUse: "Fornecer feedback assíncrono não-bloqueante após ações do usuário (ex: 'Registro salvo', 'Erro na validação').",
    importStatement: `import { toast } from "sonner"`,
    usageCode: `toast.success("Operação concluída com sucesso!")`,
    props: [
      { name: "message", type: "string", description: "Mensagem principal do toast." },
    ],
    accessibility: {
      role: "status",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Toast de Sucesso",
        code: `toast.success("Dados atualizados!")`,
      },
    ],
  },

  /* ========================================================
     2. NAVEGAÇÃO & LAYOUT (10)
     ======================================================== */
  "app-layout": {
    id: "app-layout",
    name: "AppLayout",
    cliName: "app-layout",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Organismo mestre de layout com integração direta a Sidebar, Header, área de conteúdo e transições.",
    whenToUse: "Estrutura mestra para qualquer aplicação do ecossistema Joinha DS com grid responsivo e transições suaves.",
    importStatement: `import { AppLayout } from "@/components/layout/app-layout"`,
    usageCode: `<AppLayout theme="dark">
  <div>Conteúdo da Página</div>
</AppLayout>`,
    props: [
      { name: "theme", type: '"dark" | "light"', defaultValue: '"dark"', description: "Tema ativo da aplicação." },
    ],
    accessibility: {
      role: "main",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Layout Geral",
        code: `<AppLayout theme="dark"><main /></AppLayout>`,
      },
    ],
  },

  header: {
    id: "header",
    name: "Header",
    cliName: "header",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Cabeçalho superior fixo com breadcrumbs dinâmicos, atalho de paleta ⌘K e alternador de tema.",
    whenToUse: "Barra superior fixa para orientação de navegação (breadcrumbs), alternador de tema e paleta de comandos ⌘K.",
    importStatement: `import { Header, HeaderBreadcrumbs, HeaderCommandTrigger, HeaderThemeToggle } from "@/components/layout/header"`,
    usageCode: `<Header
  breadcrumbs={[{ label: "Joinha DS" }, { label: "Componentes" }]}
  theme="dark"
  onToggleTheme={() => {}}
/>`,
    props: [
      { name: "breadcrumbs", type: "Array<{ label: string; href?: string }>", description: "Trilha de navegação de páginas." },
      { name: "theme", type: '"dark" | "light"', description: "Tema ativo." },
      { name: "onToggleTheme", type: "() => void", description: "Função de alternância de tema." },
      { name: "onOpenCommand", type: "() => void", description: "Disparo da paleta de comandos ⌘K." },
    ],
    accessibility: {
      role: "banner",
      wcagLevel: "AA",
    },
    subComponents: [
      {
        name: "Header",
        level: "organism",
        description: "Barra superior com backdrop-blur e borda inferior.",
        tokensUsed: ["--border-base", "--bg-surface"],
      },
      {
        name: "HeaderBreadcrumbs",
        level: "molecule",
        description: "Trilha tipográfica navegável com divisores.",
        tokensUsed: [".type-body-sm"],
      },
      {
        name: "HeaderCommandTrigger",
        level: "molecule",
        description: "Gatilho de busca integrado com atalho <Kbd>.",
        tokensUsed: [".type-body-sm", "<Kbd>"],
      },
      {
        name: "HeaderThemeToggle",
        level: "atom",
        description: "Botão com ícone para alternar temas claro/escuro.",
        tokensUsed: ["<Button>"],
      },
    ],
    examples: [
      {
        title: "Header Padrão",
        code: `<Header breadcrumbs={[{ label: "Docs" }]} theme="dark" />`,
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
    whenToUse: "Menu lateral de navegação primária entre módulos do sistema, seleção de workspaces e atalhos globais.",
    importStatement: `import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
        description: "Container estrutural principal com superfície elevada OKLCH e transição fluida.",
        tokensUsed: ["--bg-surface-elevated", "--tc-ease-smooth"],
      },
      {
        name: "SidebarGroupLabel",
        level: "atom",
        description: "Cabeçalho tipográfico de agrupamento com tracking aumentado.",
        tokensUsed: [".type-label-sm"],
      },
      {
        name: "SidebarMenuButton",
        level: "atom",
        description: "Item de menu interativo derivado do primitivo <Button variant='navItem'>.",
        tokensUsed: ["<Button>", "--tc-radius-md"],
      },
    ],
    examples: [
      {
        title: "Sidebar Modular",
        code: `<Sidebar collapsed={false} onToggleCollapse={() => {}} />`,
      },
    ],
  },

  tabs: {
    id: "tabs",
    name: "Tabs",
    cliName: "tabs",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Conjunto de abas acessíveis para alternar visualizações de conteúdo no mesmo espaço.",
    whenToUse: "Organizar conteúdos correlatos e alternar visualizações no mesmo espaço de tela sem recarregar a página.",
    importStatement: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"`,
    usageCode: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Aba 1</TabsTrigger>
    <TabsTrigger value="tab2">Aba 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo 1</TabsContent>
</Tabs>`,
    props: [
      { name: "defaultValue", type: "string", description: "Aba ativa por padrão." },
    ],
    accessibility: {
      role: "tablist",
      keyboardShortcuts: [{ key: "Arrow Left / Right", action: "Navega entre abas ativas." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Abas de Navegação",
        code: `<Tabs defaultValue="docs"><TabsList><TabsTrigger value="docs">Docs</TabsTrigger></TabsList></Tabs>`,
      },
    ],
  },

  resizable: {
    id: "resizable",
    name: "Resizable",
    cliName: "resizable",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Painéis divididos ajustáveis com pegador tátil (Handle) e suporte a colapso.",
    whenToUse: "Layouts com múltiplos painéis ajustáveis pelo usuário (ex: editores de código, split-view de dashboards, IDEs).",
    importStatement: `import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"`,
    usageCode: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>Painel 1</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>Painel 2</ResizablePanel>
</ResizablePanelGroup>`,
    props: [
      { name: "direction", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Direção da divisão." },
    ],
    accessibility: {
      role: "separator",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Split View Horizontal",
        code: `<ResizablePanelGroup direction="horizontal"><ResizablePanel /></ResizablePanelGroup>`,
      },
    ],
  },

  separator: {
    id: "separator",
    name: "Separator",
    cliName: "separator",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Divisor geométrico com espessura de 1px e cor semântica de borda.",
    whenToUse: "Segmentar visualmente seções lógicas, blocos de formulários ou agrupamentos de itens em menus e listas.",
    importStatement: `import { Separator } from "@/components/ui/separator"`,
    usageCode: `<Separator orientation="horizontal" />`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Orientação do divisor." },
    ],
    accessibility: {
      role: "separator",
      wcagLevel: "AAA",
    },
    examples: [
      {
        title: "Divisor de Seção",
        code: `<Separator />`,
      },
    ],
  },

  pagination: {
    id: "pagination",
    name: "Pagination",
    cliName: "pagination",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Controle de paginação com links anteriores/próximos e indicador de página ativa.",
    whenToUse: "Dividir grandes volumes de registros em blocos navegáveis com salto rápido para páginas específicas.",
    importStatement: `import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"`,
    usageCode: `<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
  </PaginationContent>
</Pagination>`,
    props: [
      { name: "className", type: "string", description: "Estilos adicionais." },
    ],
    accessibility: {
      role: "navigation",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Paginação Simples",
        code: `<Pagination><PaginationContent /></Pagination>`,
      },
    ],
  },

  "empty-state": {
    id: "empty-state",
    name: "EmptyState",
    cliName: "empty-state",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Container ilustrado com chamada de ação clara para cenários sem dados.",
    whenToUse: "Orientar o usuário com ilustração e chamada de ação clara quando não houver dados ou filtros zerados.",
    importStatement: `import { EmptyState } from "@/components/ui/empty-state"`,
    usageCode: `<EmptyState
  title="Nenhum registro encontrado"
  description="Tente ajustar os termos da sua busca."
/>`,
    props: [
      { name: "title", type: "string", description: "Título principal." },
      { name: "description", type: "string", description: "Texto explicativo." },
    ],
    accessibility: {
      role: "region",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Busca Vazia",
        code: `<EmptyState title="Nenhum resultado" />`,
      },
    ],
  },

  "floating-toolbar": {
    id: "floating-toolbar",
    name: "FloatingToolbar",
    cliName: "floating-toolbar",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Barra de ferramentas flutuante ancorada na base da tela para ações em lote.",
    whenToUse: "Executar ações em lote sobre múltiplos itens selecionados em tabelas ou ferramentas de edição de conteúdo.",
    importStatement: `import { FloatingToolbar } from "@/components/ui/floating-toolbar"`,
    usageCode: `<FloatingToolbar selectedCount={3} onClearSelection={() => {}} />`,
    props: [
      { name: "selectedCount", type: "number", description: "Quantidade de itens selecionados." },
    ],
    accessibility: {
      role: "toolbar",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Toolbar em Lote",
        code: `<FloatingToolbar selectedCount={5} />`,
      },
    ],
  },

  command: {
    id: "command",
    name: "Command",
    cliName: "command",
    category: "nav_layout",
    categoryLabel: "Navegação & Layout",
    description: "Paleta de comandos rápida tipo Spotlight ativada por ⌘K com busca em tempo real.",
    whenToUse: "Navegação veloz e busca global por teclado via atalho ⌘K para desenvolvedores e usuários avançados.",
    importStatement: `import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"`,
    usageCode: `<Command>
  <CommandInput placeholder="Digite um comando..." />
  <CommandList><CommandItem>Ir para Dashboard</CommandItem></CommandList>
</Command>`,
    props: [
      { name: "placeholder", type: "string", description: "Texto do campo de busca." },
    ],
    accessibility: {
      role: "combobox",
      keyboardShortcuts: [{ key: "⌘K / Ctrl+K", action: "Abre a paleta de comandos." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Paleta de Comandos",
        code: `<Command><CommandInput /></Command>`,
      },
    ],
  },

  /* ========================================================
     3. VISUALIZAÇÃO DE DADOS (7)
     ======================================================== */
  "data-table": {
    id: "data-table",
    name: "DataTable",
    cliName: "data-table",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Tabela densa enterprise com ordenação de colunas, paginação, busca e filtros.",
    whenToUse: "Visualização tabular densa com ordenação, busca, filtros e paginação para sistemas corporativos e ERPs.",
    importStatement: `import { DataTable } from "@/components/ui/data-table"`,
    usageCode: `<DataTable columns={columns} data={data} />`,
    props: [
      { name: "columns", type: "ColumnDef<T>[]", description: "Definição de colunas." },
      { name: "data", type: "T[]", description: "Array de registros." },
    ],
    accessibility: {
      role: "table",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Tabela de Clientes",
        code: `<DataTable data={sampleData} />`,
      },
    ],
    subComponents: [
      {
        name: "DataTable",
        level: "organism",
        description: "Container mestre de dados com toolbar de busca, filtros e ordenação.",
        tokensUsed: ["--surface-card", "--border-base", ".type-ui-base"],
      },
      {
        name: "Table / TableHeader / TableRow",
        level: "atom",
        description: "Estrutura semântica de cabeçalhos e linhas com alinhamento numérico tabular.",
        tokensUsed: [".type-label-sm", "--text-muted"],
      },
      {
        name: "Pagination (Sub-componente)",
        level: "molecule",
        description: "Controle oficial de paginação integrado ao rodapé com links de página e salto rápido.",
        tokensUsed: ["<Pagination>", "<PaginationLink>", "<PaginationPrevious>", "<PaginationNext>"],
      },
    ],
  },

  "metric-card": {
    id: "metric-card",
    name: "MetricCard",
    cliName: "metric-card",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Cartão de KPI executivo com número tabular em display grande, tendência percentual e sparkline.",
    whenToUse: "Destacar KPIs e métricas vitais no topo de dashboards com formatação tabular, tendência e micro-gráfico.",
    importStatement: `import { MetricCard, MetricCardTitle, MetricCardValue, MetricCardDelta } from "@/components/ui/metric-card"`,
    usageCode: `<MetricCard
  title="Receita Mensal (MRR)"
  value="R$ 48.920"
  change={{ value: "+14.2%", trend: "up", period: "vs. mês anterior" }}
  sparklineData={[28, 31, 35, 40, 48.9]}
/>`,
    props: [
      { name: "title", type: "string", description: "Título da métrica." },
      { name: "value", type: "string", description: "Valor formatado." },
      { name: "change", type: "{ value: string; trend: 'up' | 'down' | 'neutral'; period?: string }", description: "Variação percentual." },
      { name: "sparklineData", type: "number[]", description: "Array numérico para micro-gráfico." },
    ],
    accessibility: {
      role: "region",
      wcagLevel: "AA",
    },
    subComponents: [
      {
        name: "MetricCard",
        level: "organism",
        description: "Card container com gradiente de borda e hover de elevação.",
        tokensUsed: ["--surface-card", ".border-gradient-subtle"],
      },
      {
        name: "MetricCardValue",
        level: "atom",
        description: "Valor numérico em display grande com alinhamento tabular obrigatório.",
        tokensUsed: [".type-display-metric"],
      },
    ],
    examples: [
      {
        title: "Card de MRR",
        code: `<MetricCard title="MRR" value="R$ 48k" change={{ value: "+12%", trend: "up" }} />`,
      },
    ],
  },

  chart: {
    id: "chart",
    name: "Chart",
    cliName: "chart",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Container analítico de gráficos responsivos baseado em Recharts com paleta OKLCH calibrada.",
    whenToUse: "Análise visual de séries temporais, tendências financeiras e volumetria comparativa em paleta OKLCH.",
    importStatement: `import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"`,
    usageCode: `<ChartContainer config={chartConfig}>
  <AreaChart data={data} />
</ChartContainer>`,
    props: [
      { name: "config", type: "ChartConfig", description: "Mapa de cores e rótulos das séries." },
    ],
    accessibility: {
      role: "img",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Gráfico de Área",
        code: `<ChartContainer config={{}}><div /></ChartContainer>`,
      },
    ],
  },

  sparkline: {
    id: "sparkline",
    name: "Sparkline",
    cliName: "sparkline",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Micro-gráfico de linha SVG vetorial com curvas Bézier suaves e gradiente de preenchimento.",
    whenToUse: "Dar contexto visual de tendência histórica em micro-espaços como células de tabelas ou cards de métricas.",
    importStatement: `import { Sparkline } from "@/components/ui/sparkline"`,
    usageCode: `<Sparkline data={[10, 15, 8, 22, 30]} chartVariant={1} height={36} />`,
    props: [
      { name: "data", type: "number[]", description: "Array de pontos numéricos." },
      { name: "height", type: "number", defaultValue: "36", description: "Altura em pixels." },
    ],
    accessibility: {
      ariaAttributes: [{ attribute: "aria-hidden", purpose: "Oculta o gráfico decorativo de screen readers." }],
      wcagLevel: "AAA",
    },
    examples: [
      {
        title: "Sparkline de Volumetria",
        code: `<Sparkline data={[1, 5, 3, 9]} height={32} />`,
      },
    ],
  },

  progress: {
    id: "progress",
    name: "Progress",
    cliName: "progress",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Barra de progresso contínua com trilho em superfície e preenchimento primário animado.",
    whenToUse: "Indicar percentual de conclusão de processos assíncronos, uso de cotas de armazenamento ou etapas de tarefas.",
    importStatement: `import { Progress } from "@/components/ui/progress"`,
    usageCode: `<Progress value={65} />`,
    props: [
      { name: "value", type: "number", defaultValue: "0", description: "Valor de 0 a 100." },
    ],
    accessibility: {
      role: "progressbar",
      ariaAttributes: [
        { attribute: "aria-valuenow", purpose: "Informa o valor percentual atual." },
      ],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Progresso 75%",
        code: `<Progress value={75} />`,
      },
    ],
  },

  avatar: {
    id: "avatar",
    name: "Avatar",
    cliName: "avatar",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Foto de perfil circular com carregamento inteligente de imagem e fallback de iniciais.",
    whenToUse: "Identificação visual rápida de membros da equipe, operadores humanos ou agentes autônomos de IA.",
    importStatement: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`,
    usageCode: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`,
    props: [
      { name: "className", type: "string", description: "Tamanho e borda." },
    ],
    accessibility: {
      role: "img",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Avatar com Fallback",
        code: `<Avatar><AvatarFallback>JD</AvatarFallback></Avatar>`,
      },
    ],
  },

  table: {
    id: "table",
    name: "Table",
    cliName: "table",
    category: "data_viz",
    categoryLabel: "Visualização de Dados",
    description: "Tabela estrutural HTML limpa com cabeçalhos semânticos, células com padding controlado e bordas.",
    whenToUse: "Renderização direta e semântica de dados tabulares limpos com paridade tipográfica tabular.",
    importStatement: `import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"`,
    usageCode: `<Table>
  <TableHeader><TableRow><TableHead>Nome</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>API v1</TableCell></TableRow></TableBody>
</Table>`,
    props: [
      { name: "className", type: "string", description: "Classes adicionais." },
    ],
    accessibility: {
      role: "table",
      wcagLevel: "AAA",
    },
    examples: [
      {
        title: "Tabela Básica",
        code: `<Table><TableHeader><TableRow><TableHead>Serviço</TableHead></TableRow></TableHeader></Table>`,
      },
    ],
  },

  /* ========================================================
     4. ONBOARDING & ADOÇÃO (5)
     ======================================================== */
  "brand-symbol": {
    id: "brand-symbol",
    name: "BrandSymbol",
    cliName: "brand-symbol",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Símbolo vetorial oficial da marca Joinha DS em SVG com preenchimento em Laranja Primário.",
    whenToUse: "Identidade visual oficial da marca no topo da sidebar, telas de login e cabeçalhos de documentação.",
    importStatement: `import { BrandSymbol } from "@/components/ui/brand-symbol"`,
    usageCode: `<BrandSymbol className="h-10 w-auto text-primary" />`,
    props: [
      { name: "className", type: "string", description: "Dimensão e cor de preenchimento." },
    ],
    accessibility: {
      ariaAttributes: [{ attribute: "aria-label", purpose: "Rotula o logo oficial do Joinha DS." }],
      wcagLevel: "AAA",
    },
    examples: [
      {
        title: "Logo da Marca",
        code: `<BrandSymbol className="h-12 w-auto" />`,
      },
    ],
  },

  "onboarding-checklist": {
    id: "onboarding-checklist",
    name: "OnboardingChecklist",
    cliName: "onboarding-checklist",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Checklist acoplável com barra de progresso e itens concluíveis para ativação de usuários.",
    whenToUse: "Guiar novos usuários nas etapas essenciais de ativação para atingir o momento Aha! nos primeiros minutos.",
    importStatement: `import { OnboardingChecklist } from "@/components/ui/onboarding-checklist"`,
    usageCode: `<OnboardingChecklist steps={steps} />`,
    props: [
      { name: "steps", type: "OnboardingStep[]", description: "Lista de etapas com título e status de conclusão." },
    ],
    accessibility: {
      role: "region",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Checklist de Boas-Vindas",
        code: `<OnboardingChecklist steps={[{ id: "1", title: "Passo 1", completed: true }]} />`,
      },
    ],
  },

  "hint-beacon": {
    id: "hint-beacon",
    name: "HintBeacon",
    cliName: "hint-beacon",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Ponto pulsante não-intrusivo para dicas contextuais e descoberta progressiva de recursos.",
    whenToUse: "Destacar novos recursos e dicas contextuais com pulso de luz não-intrusivo sem bloquear a navegação.",
    importStatement: `import { HintBeacon } from "@/components/ui/hint-beacon"`,
    usageCode: `<HintBeacon title="Dica" description="Alterne a densidade aqui." />`,
    props: [
      { name: "title", type: "string", description: "Título do popover de dica." },
      { name: "description", type: "string", description: "Texto explicativo da dica." },
    ],
    accessibility: {
      role: "tooltip",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Beacon de Dica",
        code: `<HintBeacon title="Novidade" description="Clique para ver o relatório" />`,
      },
    ],
  },

  "banner-announcement": {
    id: "banner-announcement",
    name: "BannerAnnouncement",
    cliName: "banner-announcement",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Faixa de anúncio superior dispensável com gradiente, badge de novidade e botão de ação.",
    whenToUse: "Comunicar comunicados globais, novas versões do design system ou avisos de manutenção na interface.",
    importStatement: `import { BannerAnnouncement } from "@/components/ui/banner-announcement"`,
    usageCode: `<BannerAnnouncement title="Nova Versão" description="Joinha DS v1.0.0 lançado." />`,
    props: [
      { name: "title", type: "string", description: "Título do anúncio." },
      { name: "description", type: "string", description: "Mensagem descritiva." },
      { name: "actionLabel", type: "string", description: "Texto do botão de ação." },
      { name: "onAction", type: "() => void", description: "Callback ao clicar na ação." },
    ],
    accessibility: {
      role: "region",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Banner de Lançamento",
        code: `<BannerAnnouncement title="Lançamento" description="Versão 1.0 ativa" />`,
      },
    ],
  },

  "tour-spotlight": {
    id: "tour-spotlight",
    name: "TourSpotlight",
    cliName: "tour-spotlight",
    category: "onboarding",
    categoryLabel: "Onboarding UX",
    description: "Holofote de foco que escurece o restante da tela para tutoriais interativos passo a passo.",
    whenToUse: "Conduzir tutoriais interativos guiados passo-a-passo sobre funcionalidades complexas do produto.",
    importStatement: `import { TourSpotlight } from "@/components/ui/tour-spotlight"`,
    usageCode: `<TourSpotlight isOpen={true} steps={tourSteps} onClose={() => {}} />`,
    props: [
      { name: "isOpen", type: "boolean", description: "Controla visibilidade do tour." },
      { name: "steps", type: "TourStep[]", description: "Passos do tour com seletores." },
      { name: "onClose", type: "() => void", description: "Callback de encerramento." },
    ],
    accessibility: {
      role: "dialog",
      keyboardShortcuts: [{ key: "Escape", action: "Encerra o tour e restaura o foco." }],
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Tour Guiado",
        code: `<TourSpotlight isOpen={false} steps={[]} onClose={() => {}} />`,
      },
    ],
  },

  /* ========================================================
     5. XAI & HITL (5)
     ======================================================== */
  "persona-selector": {
    id: "persona-selector",
    name: "PersonaSelector",
    cliName: "persona-selector",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Modal de seleção de persona para bifurcação e personalização da interface com 1 clique.",
    whenToUse: "Bifurcar e personalizar a experiência da interface com 1 clique de acordo com o perfil do usuário (Dev, CFO, Ops).",
    importStatement: `import { PersonaSelector } from "@/components/ui/persona-selector"`,
    usageCode: `<PersonaSelector
  open={isOpen}
  onOpenChange={setIsOpen}
  onSelectPersona={(id) => {}}
/>`,
    props: [
      { name: "open", type: "boolean", description: "Estado de abertura." },
      { name: "onSelectPersona", type: "(id: string) => void", description: "Callback de seleção de persona." },
    ],
    accessibility: {
      role: "dialog",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Modal de Persona",
        code: `<PersonaSelector open={false} onOpenChange={() => {}} onSelectPersona={() => {}} />`,
      },
    ],
  },

  "confidence-meter": {
    id: "confidence-meter",
    name: "ConfidenceMeter",
    cliName: "confidence-meter",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Medidor visual de score de certeza de IA com rastreamento lógico de raciocínio (Reasoning Trace).",
    whenToUse: "Explicar o grau de certeza de modelos de IA e listar os passos lógicos de raciocínio (Reasoning Trace).",
    importStatement: `import { ConfidenceMeter, ReasoningTrace } from "@/components/ui/confidence-meter"`,
    usageCode: `<ConfidenceMeter score={94} label="Score de Certeza da IA" sourceCount={4} />`,
    props: [
      { name: "score", type: "number", description: "Score de 0 a 100." },
      { name: "label", type: "string", defaultValue: '"Confiança da IA"', description: "Rótulo do indicador." },
      { name: "sourceCount", type: "number", description: "Quantidade de fontes consultadas." },
    ],
    accessibility: {
      role: "progressbar",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Confiança 94%",
        code: `<ConfidenceMeter score={94} />`,
      },
    ],
  },

  "hitl-approval-banner": {
    id: "hitl-approval-banner",
    name: "HITLApprovalBanner",
    cliName: "hitl-approval-banner",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Faixa de intervenção humana (Human-in-the-Loop) para revisão e aprovação de ações de agentes.",
    whenToUse: "Solicitar revisão e autorização de um operador humano (Human-in-the-Loop) para ações sensíveis de agentes de IA.",
    importStatement: `import { HITLApprovalBanner } from "@/components/ui/hitl-approval-banner"`,
    usageCode: `<HITLApprovalBanner
  title="Ajuste de Preço Proposto"
  description="O agente detectou oportunidade de desconto de 15%."
  onApprove={() => {}}
  onReject={() => {}}
/>`,
    props: [
      { name: "title", type: "string", description: "Título da proposta." },
      { name: "description", type: "string", description: "Detalhes da justificativa." },
      { name: "onApprove", type: "() => void", description: "Callback ao aprovar." },
      { name: "onReject", type: "() => void", description: "Callback ao rejeitar." },
    ],
    accessibility: {
      role: "alert",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Aprovação de Agente",
        code: `<HITLApprovalBanner title="Proposta" onApprove={() => {}} onReject={() => {}} />`,
      },
    ],
  },

  "ai-diff-viewer": {
    id: "ai-diff-viewer",
    name: "AIDiffViewer",
    cliName: "ai-diff-viewer",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Visualizador comparativo de alterações em código ou JSONs sugeridas por IA com modo lado a lado ou unificado.",
    whenToUse: "Visualizar alterações propostas por IA em arquivos, contratos ou payloads com destaque para adições e remoções.",
    importStatement: `import { AIDiffViewer } from "@/components/ui/ai-diff-viewer"`,
    usageCode: `<AIDiffViewer
  title="payload.json"
  diffs={[
    { type: "removed", content: '  "tier": "basic",' },
    { type: "added", content: '  "tier": "enterprise",' }
  ]}
/>`,
    props: [
      { name: "title", type: "string", description: "Título do arquivo." },
      { name: "diffs", type: "DiffLine[]", description: "Array de linhas com tipo e conteúdo." },
    ],
    accessibility: {
      wcagLevel: "AA",
      notes: "Cores acessíveis com suporte a daltonismo.",
    },
    examples: [
      {
        title: "Diff de JSON",
        code: `<AIDiffViewer title="config.json" diffs={[]} />`,
      },
    ],
  },

  "agent-status-hud": {
    id: "agent-status-hud",
    name: "AgentStatusHUD",
    cliName: "agent-status-hud",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "HUD visual de telemetria em tempo real para agentes autônomos (pensando, executando tool, aguardando revisão).",
    whenToUse: "Exibir telemetria em tempo real das atividades de agentes autônomos (pensando, executando tool, aguardando revisão).",
    importStatement: `import { AgentStatusHUD } from "@/components/ui/agent-status-hud"`,
    usageCode: `<AgentStatusHUD status="thinking" agentName="Agente Autônomo" currentTask="Analisando logs..." />`,
    props: [
      { name: "status", type: '"idle" | "thinking" | "executing_tool" | "awaiting_review" | "completed" | "failed"', description: "Estado atual do agente." },
      { name: "agentName", type: "string", description: "Nome do agente." },
      { name: "currentTask", type: "string", description: "Tarefa em execução." },
    ],
    accessibility: {
      role: "status",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Agente Pensando",
        code: `<AgentStatusHUD status="thinking" />`,
      },
    ],
  },

  "ai-feedback-widget": {
    id: "ai-feedback-widget",
    name: "AIFeedbackWidget",
    cliName: "ai-feedback-widget",
    category: "xai_hitl",
    categoryLabel: "XAI & HITL",
    description: "Widget compacto para coleta de feedback de qualidade de respostas geradas por IA (RLHF) com botões de polegar e cópia.",
    whenToUse: "Coletar avaliações de qualidade das respostas geradas por IA (RLHF) com polegar para cima/baixo e reporte.",
    importStatement: `import { AIFeedbackWidget } from "@/components/ui/ai-feedback-widget"`,
    usageCode: `<AIFeedbackWidget onThumbUp={() => {}} onThumbDown={() => {}} />`,
    props: [
      { name: "onThumbUp", type: "() => void", description: "Callback de avaliação positiva." },
      { name: "onThumbDown", type: "() => void", description: "Callback de avaliação negativa." },
    ],
    accessibility: {
      role: "group",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Widget de Feedback",
        code: `<AIFeedbackWidget />`,
      },
    ],
  },

  alert: {
    id: "alert",
    name: "Alert",
    cliName: "alert",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Bloco de aviso estático com ícone, título e descrição para alertas contextuais de sistema.",
    whenToUse: "Exibir mensagens informativas, avisos ou erros permanentes que afetam toda a página ou formulário.",
    importStatement: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`,
    usageCode: `<Alert>
  <AlertTitle>Aviso Importante</AlertTitle>
  <AlertDescription>Esta ação não pode ser desfeita.</AlertDescription>
</Alert>`,
    props: [
      { name: "variant", type: '"default" | "destructive"', defaultValue: '"default"', description: "Estilo do alerta." },
    ],
    accessibility: {
      role: "alert",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "Alerta Informativo",
        code: `<Alert><AlertTitle>Atenção</AlertTitle></Alert>`,
      },
    ],
  },

  accordion: {
    id: "accordion",
    name: "Accordion",
    cliName: "accordion",
    category: "primitives",
    categoryLabel: "Primitivos & Controles",
    description: "Conjunto de painéis colapsáveis verticais para expansão de conteúdo sob demanda.",
    whenToUse: "Organizar seções de perguntas frequentes (FAQ), detalhes técnicos avançados e logs colapsáveis.",
    importStatement: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"`,
    usageCode: `<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Pergunta 1?</AccordionTrigger>
    <AccordionContent>Resposta explicativa.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      { name: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Permite abrir um ou múltiplos itens." },
    ],
    accessibility: {
      role: "region",
      wcagLevel: "AA",
    },
    examples: [
      {
        title: "FAQ Accordion",
        code: `<Accordion type="single"><AccordionItem value="1"><AccordionTrigger>Pergunta</AccordionTrigger></AccordionItem></Accordion>`,
      },
    ],
  },
}

// Fallback generator for any unmapped component
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
    whenToUse: `Utilize o componente ${displayName} em interfaces de produtos que exigem controle preciso, acessibilidade WCAG 2.2 AA e integração com o Design System Joinha.`,
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
