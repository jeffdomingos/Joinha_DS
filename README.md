<div align="center">

# 🍊 Joinha Design System (`Joinha_DS`)

**Agent-Native SaaS Design System & Starter Template**  
*Construído com React 19, Tailwind CSS v4, OKLCH Perceptual Colors e Shadcn UI.*

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Compatible_Registry-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![OKLCH](https://img.shields.io/badge/Color_Space-OKLCH_Perceptual-F97316?style=flat-square)](https://oklch.com/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-4ADE80?style=flat-square)](https://www.w3.org/WAI/WCAG22/quickref/)
[![Template](https://img.shields.io/badge/GitHub_Template-Ready-blue?style=flat-square&logo=github)](https://github.com/jeffdomingos/Joinha_DS/generate)

<br />

[✨ Usar como Template](https://github.com/jeffdomingos/Joinha_DS/generate) · [📖 Diretrizes de Design (`design-system.md`)](./design-system.md) · [💎 Compêndio de Engenharia & Breakthroughs](./docs/DESIGN_SYSTEM_INSIGHTS.md) · [🗺️ Roadmap](./docs/ROADMAP.md)

</div>

---

## ⚡ Início Rápido (Quick Start)

### 1. Criar novo projeto a partir deste Template
Clique no botão verde **"Use this template"** no topo do repositório no GitHub ou clone diretamente:

```bash
# Clonar o repositório
git clone https://github.com/jeffdomingos/Joinha_DS.git meu-saas
cd meu-saas

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento local
npm run dev
```

Abra `http://localhost:5173/` no navegador para interagir com o **Dashboard Analítico** e o **Laboratório de Componentes (Component Lab)**.

---

## 📦 Instalação Modular via Shadcn CLI (Registry)

Todos os componentes do **Joinha DS** estão estruturados no formato oficial **Shadcn Registry**. Você pode instalá-los individualmente em qualquer projeto React/Next.js/Vite usando a CLI do Shadcn:

```bash
# 1. Configurar tokens do Joinha no seu projeto (caso ainda não tenha)
npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/tokens.json

# 2. Instalar componentes individuais conforme necessário
npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/button.json
npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/metric-card.json
npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/chart.json
npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/data-table.json
npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/app-layout.json
```

O índice completo de componentes e metadados está disponível em [`public/r/index.json`](./public/r/index.json).

---

## 🎨 Pilares de Design e Arquitetura

### 1. Paleta OKLCH & Dark-First
- Construída sobre o espaço perceptual **OKLCH**, eliminando distorções de saturação e contraste entre temas.
- Neutros aquecidos sutilmente calibrados para harmonizar com o Laranja de Marca (`oklch(67% 0.17 53)` / `#e27100`).
- **WCAG 2.2 AA Rigoroso:** Pares de alto contraste (*Jewel Tones* sólidos e variantes sutis lavadas) com contraste garantido $\ge 4.5:1$.

### 2. Tipografia em 3 Níveis
| Papel | Família | Propósito |
| :--- | :--- | :--- |
| **Display / Headings** | `Cabin` | Títulos, cabeçalhos de páginas e métricas hero. |
| **UI / Body** | `Plus Jakarta Sans` | Textos de corpo, botões, formulários, badges e tabelas. |
| **Data / Numbers** | `JetBrains Mono` | Colunas financeiras, contadores, timestamps e atalhos (`⌘K`). |

### 3. Foco em Agentes de IA (*Agent-Native*)
O arquivo [`design-system.md`](./design-system.md) serve como fonte única de verdade (SSOT) para agentes LLM (Claude, ChatGPT, Gemini, Copilot), contendo regras rígidas:
- Proibição de cores HEX/RGB hardcoded.
- Proibição de novos tons de cinza fora da escala semântica.
- Uso sequencial da série de gráficos `--chart-1` a `--chart-6`.
- **Princípio de Uso do Brand Glow:** O efeito de brilho luminoso é restrito estritamente a momentos hero (ex: upgrade de plano, destaque de IA), preservando a sobriedade diária da UI.

---

## 🧩 Catálogo de Componentes e Blocos (48 Componentes)

### UI Primitives & Controles
- **`Button`**: Variantes `primary`, `secondary`, `outline`, `ghost`, `destructive` e `navItem` (contorno sem preenchimento no hover, ativação com `isActive`).
- **`Input`**: Campo de formulário com estados de foco, validação e suporte numérico tabular.
- **`Checkbox`**: Caixa de seleção acessível com suporte a estado indeterminado para Data Tables.
- **`Textarea`**: Entrada de texto multilinha para descrições, notas e prompts de IA.
- **`RadioGroup`**: Seleção exclusiva com suporte a *Choice Cards* ricos para planos e faturamento.
- **`Slider`**: Controle deslizante para ranges e limites de cota.
- **`Switch`**: Toggle acessível via Radix UI.
- **`Select`**: Dropdown customizado com navegação fluida por teclado.
- **`DropdownMenu`**: Menus de contexto e opções rápidas com animação elástica (*spring*).
- **`Dialog` & `AlertDialog`**: Modais com transições de zoom suave e desfoque de fundo (*backdrop blur*).
- **`Sheet` / `Drawer`**: Painel lateral deslizante (*slide-over*) para inspeção profunda e edição rápida.
- **`Tooltip`**: Balão flutuante acessível para ícones e atalhos.
- **`Kbd`**: Tecla física para atalhos de teclado (`⌘K`, `Esc`).
- **`Badge`**: Indicador de status operacional (*Jewel Tones* e *Subtle* para `success`, `warning`, `danger`, `info`).
- **`Tag`**: Agrupamento categórico sem conotação de alerta (`purple`, `teal`, `pink`, `indigo`).
- **`Alert`**: Banners semânticos in-page com variantes operacionais.
- **`Sonner`**: Central de Toasts opinativa com temas integrados.
- **`Skeleton`**: Efeito shimmer direcional calibrado (NN/g + OKLCH) para 0px CLS.

### Navegação & Estruturação
- **`Tabs`**: Segmented pill switcher com transição suave.
- **`Accordion`**: Seções colapsáveis com animação fluida para configurações e FAQs.
- **`Separator`**: Divisores com label central opcional.
- **`Pagination`**: Primitivo de paginação com links semânticos `<a>`.
- **`Command` (`⌘K`)**: Command palette modal estilo Linear/Raycast com busca fuzzy.

### Data Visualization, Métricas & Produtividade
- **`Avatar` & `AvatarGroup`**: Foto, iniciais, status dot e empilhamento com contador `+N`.
- **`Progress`**: Barra linear com cores semânticas de cota (`default`, `success`, `warning`, `danger`).
- **`EmptyState`**: Ilustrado com slots para CTAs primárias e secundárias.
- **`Sparkline`**: Micro-gráficos vetoriais SVG ultra-leves com curvas Bézier e gradientes `--chart-1` a `--chart-6`.
- **`MetricCard`**: Cards de KPI com valor hero, badges de tendência, barra de meta e sparkline embutido.
- **`Chart`**: Wrapper oficial Shadcn/Recharts com injeção dinâmica de variáveis CSS e tooltips flutuantes.
- **`DataTable`**: Tabela densa com ordenação de colunas, filtro por status, seleção em lote e paginação.

### Onboarding UX & Product Adoption (Diretrizes 2025)
- **`OnboardingChecklist`**: Widget acoplável e colapsável com progresso percentual, tarefas gamificadas e celebração.
- **`TourSpotlight`**: Walkthrough guiado focal com máscara de recorte e navegação por teclado (`Esc`/`Enter`).
- **`HintBeacon`**: Micro-âncora com radar pulsante em OKLCH Laranja para divulgação progressiva (*Progressive Disclosure*).
- **`PersonaSelector`**: Modal de entrada com *Choice Cards* para bifurcar a interface conforme a intenção do usuário.
- **`BannerAnnouncement`**: Banner in-app descartável para novas ferramentas e release notes.

### Enterprise Layout Engine & Painéis Densos
- **`Resizable` (`<ResizablePanelGroup />`)**: Painéis redimensionáveis Master-Detail baseados em `react-resizable-panels`.
- **`FloatingToolbar`**: Dock flutuante glassmorphic persistente com atalhos de densidade, tema, busca `⌘K` e minimizador.
- **`Sidebar`**: Barra lateral redimensionável por arrasto, navegação em drill-down (grupos → itens) e colapso total via `react-resizable-panels`.
- **`Header`**: Cabeçalho global com breadcrumbs, busca rápida `⌘K`, central de notificações, alternador de tema e densidade.
- **`AppLayout`**: Shell mestre integrando Sidebar, Header global, área responsiva com drawer mobile e o watermark de atribuição.
- **`Attribution`**: Rodapé de crédito discreto ("Powered by...") que abre um diálogo "Sobre" com produto, estúdio, desenvolvedor e contatos — embutido automaticamente no `AppLayout`.

### XAI (Explainable AI) & Padrões Human-in-the-Loop (HITL)
- **`ConfidenceMeter` & `ReasoningTrace`**: Score de certeza matemática da IA com cadeia de raciocínio (*Chain-of-Thought*) e fontes citadas.
- **`HITLApprovalBanner`**: Banner de interceptação humana para ações críticas de agentes (aprovação/rejeição com cálculo de impacto).
- **`AIDiffViewer`**: Comparador visual de diffs estruturados (lado a lado ou unificado) para sugestões de código, texto e JSON.
- **`AgentStatusHUD`**: Indicador visual do ciclo de vida de agentes autônomos (*Thinking*, *Tool Execution*, *Awaiting Decision*).
- **`AIFeedbackWidget`**: Controles de feedback in-situ, detecção/relato de alucinação e refinamento de instruções.

---

## 🛠️ Scripts Disponíveis

```bash
# Executar servidor de desenvolvimento
npm run dev

# Gerar manifestos JSON do Shadcn Registry
npm run build:registry

# Compilar para produção (gera o registry e o bundle do Vite)
npm run build

# Executar linter ultra-rápido via Oxlint
npm run lint

# Visualizar build de produção localmente
npm run preview
```

---

## 📁 Estrutura de Diretórios

```
Joinha_DS/
├── .github/                 # Configurações de Template e workflows
├── docs/                    # Roadmap e documentação histórica
│   └── ROADMAP.md
├── public/
│   └── r/                   # Shadcn Registry JSONs (gerados automaticamente)
├── scripts/
│   └── build-registry.mjs   # Gerador de manifestos do Registry
├── src/
│   ├── components/
│   │   ├── layout/          # App Shell (Sidebar, Header, AppLayout)
│   │   └── ui/              # Componentes de interface e Data Viz
│   ├── lib/
│   │   └── utils.ts         # Helper cn() (clsx + tailwind-merge)
│   ├── styles/
│   │   ├── tokens.css       # Tokens OKLCH, elevações, tipografia e raios
│   │   └── kitchen-sink.css # Utilitários e bordas gradientes
│   ├── App.tsx              # Orquestrador (Dashboard SaaS + Component Lab)
│   └── index.css            # Entrypoint Tailwind v4 + @theme
├── tokens/                  # JSONs de design tokens agnósticos
├── components.json          # Configuração canônica do Shadcn CLI
├── design-system.md         # Regras e convenções estritas para Agentes de IA
└── package.json
```

---

## 👤 Autor & Estúdio

O Joinha DS é o design system oficial da **Tem Como**, estúdio de design e desenvolvimento de produtos fundado por **Jeff Domingos**.

- **Designer & Desenvolvedor:** Jeff Domingos
- **E-mail:** [jeffsalb@gmail.com](mailto:jeffsalb@gmail.com)
- **Website:** [jeffdomingos.com/to/JoinhaDS](https://jeffdomingos.com/to/JoinhaDS)
- **Instagram:** [@jeffdomingos.design](https://instagram.com/jeffdomingos.design)

## 📄 Licença

Distribuído sob a licença **MIT**. Sinta-se livre para usar em projetos comerciais e pessoais.
