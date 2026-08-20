# 🗺️ Roadmap e Visão Estratégica: Tem Como - Joinha DS

**Desenvolvedor/Designer:** Jeff Domingos
**Objetivo:** Design System Base para projetos pessoais e profissionais do Jeff Domingos

Este documento registra a visão, propósito e o plano de evolução do **Tem Como: Joinha DS**, consolidando todas as decisões arquiteturais da nossa fundação.

## 1. Propósito e Visão do Design System

- **Contexto de Criação:** O "Tem Como: Joinha DS" surge da necessidade de dar consistência visual, agilidade e acabamento profissional a múltiplos experimentos construídos via *vibecoding* com agentes de IA (como Claude Code, Cursor, Antigravity, etc.).
- **Marca Guarda-Chuva:** A marca pessoal "Tem Como" funcionará como a entidade mantenedora de uma suíte de produtos/ferramentas digitais independentes.
- **Tipologia de Produtos:** O foco principal do sistema é atender ferramentas de gestão, dashboards analíticos, SaaS profissionais e ferramentas voltadas para design e produtividade.

## 2. Princípios Arquiteturais Definidos

- **Agent-Native Design System:** O sistema não é apenas um repositório de código, mas um conjunto estruturado de regras, tokens e diretrizes em arquivos agnósticos (Markdown/JSON) para que agentes de IA consumam e gerem interfaces consistentes de primeira.
- **Foco em Dark Mode e OKLCH:** Cores construídas no espaço perceptual OKLCH, com foco nativo em Dark Mode. Nossos neutros contêm um matiz levemente aquecido (alinhado ao Laranja base `#e27100`) para sofisticação, contando também com suporte integral e planejado para Light Mode.
- **Acessibilidade Estrutural (WCAG 2.2 AA):** Tokens organizados em pares casados de alto contraste (ex: fundo vs. texto). Implementação nativa de foco visível (Focus Ring) e proibição de dependência exclusiva de cor para indicar estados (suporte a daltônicos).
- **Base Headless:** Utilização do ecossistema [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) como base primária de componentes, garantindo conformidade com ARIA, navegação por teclado e semântica nativa para a web.
- **Single Source of Truth no GitHub:** Centralização de templates, documentação para IA (prompt guidelines) e demonstração visual (Kitchen Sink) em um único repositório para evitar atrito de manutenção e facilitar o *bootstrap* de novos projetos.

## 3. Roadmap de Evolução por Fases

### 🟢 Fase 1: Fundação de Tokens e Acessibilidade (Atual / Concluída)
* [x] Consolidação da paleta OKLCH (Primitivos e Semânticos).
* [x] Conformidade com WCAG 2.2 em pares de texto/fundo (Jewel Tones e Contrastes rígidos).
* [x] Criação de tokens para status, tags categóricas e séries de gráficos (Data Viz).
* [x] Página Kitchen Sink (HTML/CSS Vanilla) para validação visual rápida e dinâmica.

### 🟢 Fase 2: Tipografia, Escalas e Espaçamento (Atual / Concluída)
* [x] Validação e escolha de fontes adequadas para interfaces densas de SaaS (alta legibilidade em pequenos tamanhos).
* [x] Definição de escala modular de tipografia e espaçamentos utilitários estruturados (Sistema de Grids/Gaps).
* [x] Regras e tokens padronizados de raio de borda (*border-radius*) e elevações/sombras (depth).

### 🟢 Fase 3: Componentes Nucleares de SaaS (Base Shadcn UI) (Concluída)
* [x] Botões, Inputs, Selects e Dropdowns estilizados com a temática "Joinha".
* [x] Modais, Diálogos de Confirmação e Toasts padronizados.
* [x] Data Tables densas (tabelas de dados) com filtros, ordenação e uso inteligente dos badges de status e tags categóricas.
* [x] Cards de métricas com integração nativa das cores da série Data Viz (`--chart-*`).

### 🟢 Fase 4: Templates e Distribuição (Concluída)
* [x] Criação do layout base consolidado de SaaS (Sidebar expansível, Header global e Área principal de Conteúdo).
* [x] Configuração do repositório como um GitHub Template (`Use this template`) pronto para clonagem e início imediato de projetos.
* [x] Estruturação de um Registry JSON no padrão Shadcn, possibilitando a instalação modular de componentes diretamente via CLI (ex: `npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/button.json`).
* [x] Inclusão do Símbolo oficial da marca Tem Como (`BrandSymbol`) e Favicon nativo.
* [x] Implementação de Skeleton Screens com Shimmer Direcional (NN/g + OKLCH Model).

---

## 4. Próxima Etapa — Fase 5: Expansão do Catálogo de Componentes SaaS

Organizado em 4 lotes temáticos para implementação incremental:

### 🟢 Lote 1: Overlays, Teclado & Feedback (Concluído)
* [x] **Tooltip (`<Tooltip />`):** Balão flutuante acessível com micro-setas e delay calibrado para botões de ícone e atalhos.
* [x] **Kbd (`<Kbd />`):** Tecla física para atalhos (`⌘`, `K`, `Shift`, `Esc`) com chanfro e elevação de superfície.
* [x] **Alert / Banner (`<Alert />`):** Banners semânticos (Default, Info, Success, Warning, Danger) para mensagens in-page.
* [x] **Sheet / Drawer (`<Sheet />`):** Painel lateral deslizante (*slide-over*) para inspeção profunda de registros e edição rápida.

### 🟢 Lote 2: Controles de Entrada & Formulários Ricos (Concluído)
* [x] **Checkbox (`<Checkbox />`):** Caixa de seleção com suporte a estado indeterminado para seleção em lote em Data Tables.
* [x] **Textarea (`<Textarea />`):** Entrada de texto multilinha para descrições, prompts de IA e anotações.
* [x] **Radio Group & Choice Cards (`<RadioGroup />`):** Seleção exclusiva com suporte a cards interativos de planos e faturamento.
* [x] **Slider (`<Slider />`):** Controle deslizante de valores/ranges numéricos e limites de planos.

### 🟢 Lote 3: Navegação, Abas & Estruturação (Concluído)
* [x] **Tabs / Segmented Control (`<Tabs />`):** Abas com transição suave e indicador de seleção ativo.
* [x] **Accordion (`<Accordion />`):** Seções colapsáveis com animação fluida para configurações e FAQs.
* [x] **Separator / Divider (`<Separator />`):** Divisórias horizontais/verticais com suporte a label central.
* [x] **Standalone Pagination (`<Pagination />`):** Controlador de paginação isolado com seletor de linhas e salto de página.

### 🟢 Lote 4: Exibição de Dados & Produtividade (Concluído)
* [x] **Avatar & AvatarGroup (`<Avatar />` + `<AvatarGroup />`):** Foto, iniciais, status dot e empilhamento com contador `+N`.
* [x] **Progress Bar (`<Progress />`):** Barra de progresso linear com cores semânticas de cota (Verde / Amarelo / Vermelho).
* [x] **Empty State (`<EmptyState />`):** Estado vazio padrão para buscas e tabelas sem dados.
* [x] **Command Palette (`<Command />` / `⌘K`):** Menu modal de busca fuzzy e ações rápidas estilo Raycast/Linear.

---

## 5. 🟢 Fase 6: Onboarding UX & Componentes de Adoção de Produto (Concluída)

Projetado para acelerar o *Time-to-Value*, guiar novos usuários com divulgação progressiva e oferecer experiências de ativação não-bloqueantes:

* [x] **Onboarding Checklist (`<OnboardingChecklist />`):** Widget acoplável e colapsável com progresso percentual, lista de tarefas gamificada e celebração de conclusão.
* [x] **Tour Spotlight & Coachmark (`<TourSpotlight />`):** Sistema de destaque focal que ilumina elementos-alvo através de máscara SVG e popover contextual com navegação por teclado (`Esc`/`Enter`).
* [x] **Hint Beacon (`<HintBeacon />`):** Ponto pulsante sutil em OKLCH Laranja acoplado a novas funcionalidades para orientação contextual sob demanda (*Progressive Disclosure*).
* [x] **Persona Selector Wizard (`<PersonaSelector />`):** Modal de personalização inicial com *Choice Cards* para bifurcar a interface conforme o objetivo do usuário.
* [x] **Banner Announcement (`<BannerAnnouncement />`):** Banner in-app de novidades e releases descartável com persistência local.

---

## 6. 🟢 Fase 7: Enterprise Layout Engine, Painéis Resizable & Densidade Paramétrica (Concluída)

Arquitetura de layout avançada para ERPs, CRMs e UIs de altíssima densidade de dados:

* [x] **Matriz de Densidade Paramétrica (`data-density`):** Alternador global no Header (`Compact` / `Default` / `Comfortable`) modulando alturas de linha, paddings e tipografia via variáveis CSS raiz.
* [x] **Container Queries & Grids Auto-Fit:** Classes utilitárias `.cq-card` e `.kpi-dashboard-grid` para componentes context-aware que se auto-reorganizam baseados no container pai.
* [x] **Painéis Redimensionáveis Master-Detail (`<ResizablePanelGroup />`):** Primitivo baseado em `react-resizable-panels` com alça tátil (*grab handle*), persistência de largura no `localStorage` e colapso responsivo.
* [x] **Floating Action HUD & Dock (`<FloatingToolbar />`):** Menu flutuante glassmorphic persistente com atalhos de densidade, tema, busca `⌘K`, onboarding e colapso ergonômico.

---

## 7. 🔮 Próximo Passo — Fase 8: XAI (Explainable AI) & Padrões Human-in-the-Loop (HITL)

Projetado para construir confiança, transparência e controle humano em aplicações SaaS orientadas por Inteligência Artificial e Agentes Autônomos:

* [ ] **Medidor de Confiança & Rastreamento de Raciocínio (`<ConfidenceMeter />` + `<ReasoningTrace />`):** Indicador visual de acurácia da IA (ex.: *98% de Confiança / Baseado em 4 fontes*) com acordeão colapsável do raciocínio lógico (*Chain-of-Thought*).
* [ ] **Banner de Aprovação HITL & Interceptação de Ações Críticas (`<HITLApprovalBanner />`):** Interface de revisão humana para ações de alto impacto propostas por agentes (ex.: pagamentos em lote, exclusão de dados, emissão fiscal) com ações explícitas de *Aprovar*, *Rejeitar* ou *Editar Parâmetros*.
* [ ] **Visualizador de Diffs e Propostas de IA (`<AIDiffViewer />`):** Comparador visual lado a lado (*side-by-side*) ou unificado destacando alterações sugeridas pelo modelo em textos, códigos ou tabelas.
* [ ] **Fluxo de Pensamento e Estado do Agente (`<AgentStatusHUD />`):** Indicador de status em tempo real com estados animados (*Pensando...*, *Consultando Banco de Dados*, *Aguardando Decisão Humana*).
* [ ] **Widget de Feedback e Correção de Alucinação (`<AIFeedbackWidget />`):** Micro-ações de feedback tátil (*Thumbs Up/Down*, *Reportar Alucinação*, *Refinar Prompt In-Place*).



