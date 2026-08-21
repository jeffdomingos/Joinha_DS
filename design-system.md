# Tem Como: Joinha DS - Documentação do Design System

Bem-vindo ao **Tem Como: Joinha DS**, a arquitetura de base para nossas ferramentas de gestão e produtos SaaS. Este documento estabelece as regras estritas de uso de cores, convenções de nomenclatura e diretrizes para implementação.

O Joinha DS é o design system oficial da **Tem Como**, estúdio de design e desenvolvimento de produtos fundado por **Jeff Domingos** ([jeffdomingos.com](https://jeffdomingos.com) · [@jeffdomingos.design](https://instagram.com/jeffdomingos.design)).

### Os 3 Pilares Principais
1. **Tipografia Modular & Acessível:** `rem` para dimensionamento, entrelinhas fixas por token.
2. **Cores Semânticas OKLCH:** Contraste mínimo estrito, mapeamento 1-para-1 com intenção (ex: `--status-danger-bg`).
3. **Componentes Agentes-First:** Tags HTML previsíveis e utilitários limitados, evitando *spaghetti css* de IAs.

## 📐 Diretrizes Globais de Box Model e Espaçamento

Para manter uma densidade previsível de SaaS (como ferramentas profissionais) e evitar componentes quebrados criados por agentes de IA, todas as margens e paddings estão restritas à **Matriz Global de Espaçamento**. É obrigatório seguir as "4 Leis do Box Model":

1. **Lei da Zona de Proteção (Safe Padding):** Nenhum texto ou elemento filho pode ter menos de `10px` a `12px` de distância da borda lateral do componente pai. Utilize os tokens `--tc-control-px-*`.
2. **Lei dos Menus Flutuantes:** Dropdowns, Popovers, Context Menus e Tooltips **NUNCA** renderizam texto diretamente encostado na borda do container. O overlay pai deve sempre receber `--tc-floating-container-p` (padding interno mínimo) e os itens clicáveis filhos devem receber `--tc-floating-item-*` com raio `--radius-sm`.
3. **Lei do Alinhamento de Controles:** Inputs, Botões, Selects e Triggers adjacentes na mesma linha **DEVEM compartilhar a mesma altura semântica** (`--tc-control-h-md` na maioria das vezes) e o mesmo raio de borda (`--radius-md`).
4. **Lei dos Agrupamentos Flex:** Todo componente composto (ex: ícone + texto, input + botão) deve ser construído com `flex items-center` (ou `flex-row` no CSS base) acompanhado de um `gap` proporcional explícito. **É estritamente proibido** o uso de margens direcionais (`margin-right` ou `margin-left`) no filho para empurrar conteúdo.

## 🎨 Arquitetura de Cores (OKLCH) & Disciplina 60-30-10

Nosso sistema utiliza **OKLCH** para garantir percepção de cor uniforme. O tema primário e padrão é o **Dark Mode**, com cores neutras que contêm um leve aquecimento cromático para harmonizar com nossa marca (Laranja #e27100).

### 🏛️ Regra 60-30-10 de Superfícies & Disciplina de Uso da Cor Accent
Toda a interface do Joinha DS é governada pela proporção clássica de superfícies de produtos SaaS profissionais:

- **60% Superfícies Neutras de Fundo (Dominante):** Telas, canvas, modais, gavetas e fundos de cards (`--bg-app`, `--bg-surface`, `--bg-surface-elevated`).
- **30% Estrutura Secundária (Neutros de Apoio):** Bordas, divisores, fundos hover, textos muted, badges neutros e ícones de suporte (`--border-border`, `--bg-surface-hover`, `--text-muted-foreground`).
- **10% Accent (Laranja da Marca):** RESERVADO EXCLUSIVAMENTE para guiar a intenção e a próxima ação do usuário — mas nunca no croma de pico (`C=0.17`, o "laranjão"). Veja **Brand Mark vs. Accent de Interface** abaixo.

> **🛑 DIRETRIZ INVIOLÁVEL DA COR ACCENT:**
> A cor Laranja (Brand) existe **EXCLUSIVAMENTE** para guiar a próxima ação do usuário, **NUNCA para decorar a interface**. 
> Se o elemento não for um **gatilho de ação principal** (`<Button variant="primary">`), um **estado de seleção ativa** (`data-active="true"`, `data-[state=checked]`, tab ativa, nav item ativo) ou um **anel de foco por teclado** (`focus-visible:ring-primary`), ele **DEVE SER RESOLVIDO NA ESCALA NEUTRA**. Ícones de títulos, bordas decorativas e banners explicativos não levam cor accent.

### 🔶 Brand Mark vs. Accent de Interface (Chromatic Economy)
O croma de pico da escala de marca (`brand-500`, `oklch(67% 0.17 53)`, `#e27100` — o "laranjão") é **reservado exclusivamente ao símbolo/logo** (`--brand-mark`, usado só em `<BrandSymbol variant="badge">` e nos badges de identidade do sidebar). Nenhum elemento de interface deve usar `--brand-mark` ou `--tc-brand-500` diretamente — isso preserva o laranjão como sinal de **identidade**, não de **interação**, inspirado em referências como o IDE Antigravity (azul de marca usado com extrema parcimônia, nunca como fill genérico de UI).

Para interação, use a **hierarquia de três acentos de interface** (nenhum toca `C=0.17`):

| Token | Primitivo | Uso |
|---|---|---|
| `--accent-action` | `brand-600` (`C=0.15`, `L=58%`) | Teto de saturação da UI. CTA hero, Checkbox marcado, Switch ligado. |
| `--accent-ui` | `brand-400` (`C=0.15`, `L=74%`) | Ícone-âncora de orientação, hover de item de navegação. |
| `--accent-subtle` | `brand-300` (`C=0.12`, `L=80%`) | Focus ring, borda de sub-item ativo. |

**Regra do Single Accent Anchor:** em qualquer estado de seleção (nav ativo, sub-item, paginação, item de comando selecionado), apenas **um** elemento carrega a cor accent (tipicamente o ícone). Fundo e texto resolvem em neutro — evita que a cor "grite" em múltiplas camadas do mesmo componente.

O sistema opera em duas camadas estruturais:

1. **Tokens Primitivos (`--tc-color-*`)**: Valores brutos da escala de cor. **Não use estes tokens diretamente na UI.**
2. **Tokens Semânticos (`--bg-*`, `--text-*`, `--border-*`)**: Tokens funcionais mapeados a partir dos primitivos. **Sempre utilize as variáveis semânticas para estilisar elementos.**

---

## 🔤 Tipografia e Escalas

O Joinha DS utiliza duas famílias tipográficas altamente otimizadas para leitura densa e exibição de dados:

1. **Sans (Cabin Variable):** Fonte padrão para toda a interface (UI, títulos, botões, descrições). Acessada via `var(--font-sans)`.
2. **Mono (JetBrains Mono Variable):** Exclusiva para dados tabulares em Data Tables, numerais estritos, blocos de código e chaves de API. Acessada via `var(--font-mono)`.

### Regras de Escala Modular e Unidades
- **Obrigatoriedade do `rem`:** Todos os tamanhos de fonte (`font-size`) e espaçamentos (`margin`, `padding`, `gap`) devem ser em `rem`. Isso garante que o zoom de acessibilidade do navegador (WCAG 2.2) escale a interface fluidamente sem quebrar a proporção.
- **Exceção para Bordas e Focus:** Espessura de bordas e focus rings (`border-width`, `outline-width`, `box-shadow`) devem ser em `px` fixos (ex: `1px`, `2px`) para manter a nitidez visual e evitar falhas de subpixel rendering.
- **Numerais Tabulares (`tabular-nums`):** Sempre que exibir dados financeiros, relatórios ou contadores em tabelas ou listas, utilize a classe `.tabular-nums` (ou a propriedade `font-variant-numeric: tabular-nums`) junto da fonte Mono para garantir o alinhamento de colunas numéricas.

---

## 🌓 Engenharia do Dark Mode Escalável (OKLCH - Modelo Four Zero Three)

No Dark Mode, sombras pretas perdem contraste físico contra o fundo escuro. A profundidade (eixo Z) é obtida aumentando gradualmente a **luminância ($L$) da superfície**, aplicando **chanfro de luz física superior (`--surface-highlight`)** e reforçando **strokes delimitadores**:

### A Escala de Elevação das Superfícies (OKLCH)
```
[ Canvas Base ]   → L = 14%  (oklch(14% 0.008 53) — O mais distante e escuro, nunca #000)
       │
[ Painel / Card ] → L = 18%  (oklch(18% 0.010 53) — Cards de conteúdo, Sidebar e Tabelas)
       │
[ Menu Suspenso ] → L = 22%  (oklch(22% 0.012 53) — Dropdowns, Popovers, Tooltips)
       │
[ Janela Modal ]  → L = 26%  (oklch(26% 0.014 53) — Diálogos, Modais, Command Palette ⌘K)
       │
[ Toast / Alerta] → L = 30%  (oklch(30% 0.014 53) — O elemento mais próximo no z-index)
```

### O Segredo do "Chroma Tinting" (Neutros Aquecidos)
Superfícies pretas puras (`#000000`) ou cinzas neutros puros ($C = 0$) geram uma sensação plástica e estéril. O Joinha DS injeta uma fração sutil da cor da marca ($h \approx 53$) na escala de cinzas:
* **Fórmula do Neutro Dark Mode:** `oklch(L% 0.008..0.014 53)`
  * $L$ (Luminância): Controla a elevação (14% a 30%).
  * $C$ (Croma): Mantido fixo entre `0.008` e `0.014` para dar calor sem desviar a cor para marrom.
  * $h$ (Matiz): `53` (o mesmo ângulo do Laranja da marca).

---

## 🏗️ Convenções de Uso em SaaS

Ferramentas SaaS exigem hierarquia visual clara e controle rígido de contraste. Siga estas regras:

### Superfícies e Fundos (Backgrounds)
- `--bg-base`: Fundo principal da tela / Canvas (`L = 14%` no Dark, `97%` no Light).
- `--bg-surface`: Painéis principais, sidebars e cards de dados (`L = 18%` no Dark, `100%` no Light).
- `--bg-surface-elevated`: Dropdowns, popovers e menus suspensos (`L = 22%` no Dark).
- `--bg-surface-modal`: Janelas modais e diálogos de confirmação (`L = 26%` no Dark).
- `--bg-surface-hover`: Estados de hover e toasts flutuantes (`L = 30%` no Dark).
- `--surface-highlight`: Chanfro físico superior de 1px (`inset 0 1px 0 0 oklch(100% 0 0 / 0.07)` no Dark, `none` no Light).

### Textos e Tipografia
- `--text-heading`: Reservado a `h1`–`h4`, `.font-display` e valores de métrica hero (`MetricCardValue`). Pico de branco (`neutral-50`, `L=96%` no Dark) — o único texto que se aproxima do branco puro.
- `--text-primary`: Corpo de texto, labels de navegação e dados cruciais (`neutral-100`, `L=93%` no Dark — deliberadamente abaixo do pico para evitar *halation* em leitura prolongada; Contraste $\ge 13:1$).
- `--text-secondary`: Rótulos, descrições secundárias, subtítulos (Contraste $\ge 7:1$).
- `--text-tertiary` / `--text-muted`: Placeholders, textos auxiliares e dados desativados (Contraste $\ge 4.5:1$).
- `--text-inverse`: Texto em botões ou áreas com fundo claro contrastante.

> **Por que não usar branco puro no corpo de texto?** Em telas escuras, texto a `L=100%`/`96%` sobre fundo a `L=14%` gera *halation* (sangramento de luz na retina) em sessões de leitura longa. `--text-primary` foi deliberadamente descido para `L=93%`, reservando o pico de `L=96%` só para elementos que precisam de destaque pontual (`--text-heading`).

### Botões e Ações (Actions)
- **Primary**: Ação principal da tela (ex: "Salvar", "Criar"). Use `--action-primary-bg`.
- **Secondary**: Ações secundárias que necessitam de destaque sutil. Use `--action-secondary-bg`.
- **Outline & Ghost**: Ações secundárias/terciárias com borda sutil ou ícones de ferramentas (transparente e mostre apenas no hover).
- **NavItem (Selectable)**: Componente/variante de seleção e navegação para Menus laterais, Abas e Listas de Filtro. No hover, exibe **apenas o contorno laranja sem preenchimento** (`hover:border-primary/50 hover:text-primary`). No estado ativo (`isActive`), recebe preenchimento translúcido e borda sólida (`data-[active=true]:bg-primary/10 data-[active=true]:border-primary/30`).

### Badges e Status (Feedback Operacional)
Nunca use cores fortes de status para grandes áreas de fundo da aplicação, reserve-as para componentes de destaque (badges, toasts).
O sistema suporta duas variantes estruturais:
1. **Variante Sólida (Jewel Tones)**:
   - **Background**: Utilize `var(--status-{intent}-bg)` (uma cor base profunda).
   - **Text**: **Obrigatoriamente** pareado com `var(--status-{intent}-fg)` (texto mega luminoso tingido com a mesma cor, para aprovação WCAG 4.5:1).
2. **Variante Sutil (Lavada)**:
   - **Background**: Utilize `var(--status-{intent}-subtle)` (fundo quase transparente/lavado).
   - **Text**: Pareado com `var(--status-{intent}-text)`.
- **Border/Icon**: Utilize `var(--status-{intent}-border)` (mapeado para a cor base).
- **Intenções disponíveis**: `success`, `warning`, `danger`, `info`.

### Categorical Tags (Agrupamento e Filtros)
Utilize estas tags exclusivamente para organizar, filtrar ou rotular dados na interface (ex: setores, categorias, labels), sem qualquer conotação de alerta ou erro.
Elas também seguem a mesma estrutura estrutural de Variante Sólida (`-bg` + `-fg`) e Variante Sutil (`-subtle` + `-text`).
- **Cores disponíveis**: `purple`, `pink`, `teal`, `indigo`.
- Elas mantêm um equilíbrio de saturação para se harmonizarem com os fundos neutros.

---

## 📦 Disciplina de Caixas e Bordas (Box Fatigue)

Referência: Antigravity, Linear, Stripe Docs — sistemas de alto nível reservam borda/moldura para casos específicos, nunca como padrão default de agrupamento.

**Regra:** uma borda (`border` + `rounded-*` + `bg-surface*`) só se justifica em duas situações:
1. **Delimita um asset ou componente do DS sendo exibido** (um preview ao vivo, um token de cor/radius/elevação sendo ilustrado, uma tabela de dados real).
2. **É um elemento genuinamente interativo** (botão, swatch clicável, card de seleção, trigger de modal).

Texto puramente informativo — título de página, parágrafo de introdução, callout de "quando usar", hero de seção — **nunca** leva caixa. Use apenas tipografia, espaçamento (`space-y-*`, `gap-*`) e, no máximo, um `border-b`/`border-l` sutil como divisor. Ao agrupar 2-3 blocos de texto lado a lado, prefira `md:divide-x md:divide-border/40` com padding interno em vez de cards individuais.

**Anti-padrão "card-in-card":** nunca desenhe uma borda dentro de outra borda já visível (card de seção envolvendo grid de sub-cards). A borda externa já delimita a seção — bordas internas nesse caso são redundantes e competem visualmente com o conteúdo. Isso vale tanto para composição de página quanto para a implementação interna de um componente (ex: um `Dialog` cujo conteúdo interno também desenha sua própria borda idêntica).

**Perguntas antes de aplicar borda:** Esse elemento está exibindo um asset/dado real, ou é interativo? Se não, a borda deve sair.

## 🏷️ Disciplina de Cor em Badges & Tags

Duas perguntas antes de colorir um `Badge`/`Tag`:
1. **Essa informação precisa de tratamento de badge/pill, ou é só texto correndo?** Números de versão, contadores e labels de metadado (`v1.0`, "3 itens") geralmente não precisam — texto mudo (`text-muted-foreground`) resolve.
2. **Se precisa, a cor escolhida carrega significado real?** `variant="success/warning/danger/info"` do `Badge` é **estritamente semântico de status** — nunca use para decorar ou diferenciar visualmente opções que não têm hierarquia de severidade entre si (ex: três opções de densidade "Compact/Default/Comfortable" não são um erro, um aviso e uma info — todas devem ser `neutral`). O sinal mais forte de cor arbitrária é um grupo de irmãos (badges/tags lado a lado) com cores diferentes sem lógica categórica entre elas.

`Tag` (`purple`/`pink`/`teal`/`indigo`/`gray`) é **categórico**, não semântico — use para classificar dados reais (setor, plano, tipo), nunca como variedade visual decorativa num hero ou header.

## 🧭 Arquitetura de Navegação da Sidebar

- **Drill-down, não scroll infinito:** grupos de navegação extensos (component catalog) usam navegação em duas camadas — nível topo lista só os grupos (nome + contagem + chevron), selecionar um navega para dentro mostrando só os itens daquele grupo, com uma linha "← Voltar" no topo. Isso substitui uma lista longa de 50+ itens sempre visível.
- **Transição:** implementada com duas camadas `position: absolute; inset: 0` dentro de um container `relative overflow-hidden`, cada uma deslizando via `transform: translateX()` independente (nunca uma trilha `flex` compartilhada com math de porcentagem relativa entre painéis — isso é frágil a erro de alinhamento). Cada painel sempre ocupa exatamente a caixa do container, sem depender do tamanho do outro.
- **Sem navegação só-por-ícone:** a sidebar não tem um modo "rail" com todos os itens reduzidos a ícones. Colapsar esconde a navegação por completo (`collapsed` → painel de navegação não renderiza).
- **Colapso via `react-resizable-panels`:** a largura é controlada por quem envolve a `Sidebar` (um `ResizablePanel` com `collapsedSize={0}`), não pela própria Sidebar. Ao colapsar totalmente, o logo/toggle que ficavam no header da Sidebar precisam de um novo lar — use o componente exportado `SidebarCollapseTrigger` (não recrie essa marcação ad-hoc no portal).
- **Breadcrumb reflete o estado:** o crumb de marca ("Joinha") só aparece no breadcrumb do Header quando a Sidebar está colapsada (e portanto o logo dela saiu de tela). Quando expandida, a Sidebar já mostra a marca — repeti-la no breadcrumb é redundante.

## 🧱 Bento Grid para Galerias de Componentes

Ao exibir muitos componentes lado a lado (ex: Component Lab), não force uma grade rígida onde todo card tem a mesma proporção — `CSS Grid` com `grid-auto-flow: dense` e spans (`col-span-2`, `row-span-2`) decididos **pelo que o preview de cada componente realmente renderiza**: previews largos (splits horizontais, barras de status) ganham `col-span-2`; previews com empilhamento vertical real (métrica + sparkline) ganham `row-span-2`; o resto fica 1×1. Nunca dê mais espaço a um card cujo preview é só um placeholder de texto — o espaço extra ficaria vazio.

## 🤖 Regras Estritas para Agentes de IA

1. **Nunca use cores HEX ou RGB codificadas rigidamente (hardcoded).**
2. **Nunca** use `--tc-*` diretamente. Se você precisa de um fundo, escolha na escala `--bg-*`.
3. **Não crie novos tons de cinza.** O sistema já possui a escala de neutros aquecidos ideal. Não introduza preto (`#000`) ou branco puro sem verificar se há um token equivalente (ex: `--tc-neutral-1000` ou `--tc-neutral-0`).
4. Ao construir gráficos (Charts), use as variáveis `--chart-1` até `--chart-6` sequencialmente.
4b. **`--brand-mark` (o "laranjão", `brand-500`/`C=0.17`) é EXCLUSIVO de logo/símbolo de marca.** Nenhum botão, badge, ícone, estado ativo ou elemento de interface usa esse token ou `--tc-brand-500` diretamente — use `--accent-action` (`brand-600`), `--accent-ui` (`brand-400`) ou `--accent-subtle` (`brand-300`) conforme a hierarquia de três acentos.
5. **Uso Esporádico e Consciente do Brand Glow (`.brand-glow` / `shadow-(--tc-shadow-glow)`):** O efeito de brilho luminoso difuso deve ser reservado **exclusivamente para momentos hero de altíssimo impacto** (ex: card de upgrade para plano Pro, destaque de feature de IA ou estados celebratórios de conversão). **É proibido** aplicar glow em botões rotineiros de navegação, itens de menu/sidebar, botões do cabeçalho global ou controles cotidianos de formulário.
6. **Dois Níveis Tipográficos:** Títulos, cabeçalhos de seções e display usam `var(--tc-font-display)` (Cabin). Textos de UI, inputs, botões, tags e tabelas usam `var(--tc-font-sans)` (Plus Jakarta Sans). Dados tabulares usam `var(--tc-font-mono)` (JetBrains Mono).
7. Ao categorizar dados neutros, prefira a família `--tag-*` em vez de sobrecarregar as cores funcionais de `--status-*`.
6. **Obrigatoriedade Tipográfica:** É **ESTRITAMENTE PROIBIDO** criar classes avulsas de `font-size` isoladas da escala ou do respectivo `line-height`. Utilize sempre a arquitetura de 3 camadas através das classes utilitárias semânticas (Camada 3) como `.type-body-default`, `.type-ui-base`, `.type-heading-page`, etc.
7. **Colunas Numéricas e Relatórios:** Use SEMPRE `.type-data-mono` (ou aplique `tabular-nums` com a fonte JetBrains Mono) para alinhar valores financeiros e contadores em Dashboards.
8. **Formas e Elevações (Border Radius e Shadows):** É proibido o uso de valores relativos (`rem`, `%`) ou fluidos para `border-radius`. Use SEMPRE as classes ou variáveis utilitárias da escala fixa de `px` (ex: `--tc-radius-md`, `.radius-lg`) para evitar distorção nas curvas e problemas com sub-pixel rendering. Use as variáveis semânticas de sombra (`--tc-shadow-sm` até `lg`) para elevações em vez de gerar novas sombras isoladas, respeitando o eixo Z estruturado no CSS.
9. **Tailwind v4 e Variáveis Customizadas:** Nunca utilize mapeamentos `@theme` (em `index.css`) para injetar propriedades pontuais de espaçamento e Box Model, pois essa abstração perde especificidade para CSS legado ou ferramentas de merge. Utilize SEMPRE a sintaxe de variáveis arbitrárias nativa do Tailwind v4 (`classe-(--variavel)` ou `classe-[var(--variavel)]`) diretamente nos componentes React. Exemplo de uso correto: `h-(--tc-control-h-md) px-(--tc-control-px-md)`.
10. **Conflito de Cascade Layers (Ameaça de Especificidade):** O Tailwind v4 empacota nativamente todos os seus utilitários dentro do `@layer utilities`. Pela especificação estrita do CSS (W3C), **CSS sem camada (unlayered) tem precedência absoluta sobre CSS em camadas**. Portanto, É ESTRITAMENTE PROIBIDO importar folhas de estilo (como legados ou templates) fora de camadas se elas contiverem resets genéricos ou modificações de box model (ex: `* { padding: 0 }`). Sempre envolva estilos customizados em `@layer base` ou `@layer components` para garantir que as classes utilitárias da UI nunca sejam sobrescritas em cascata.
11. **Efeitos Cosméticos e Refinamento Visual (Modelo de 4 Linhas Ortogonais Independentes):** Para garantir o acabamento sofisticado do Joinha DS, utilize a arquitetura canônica de **Borda Gradiente Ortogonal em 4 Linhas**:
    * **Linha do Topo (Horizontal):** Gradiente contínuo de 100% da largura (`to right`) da Cor A (ponto de luz na quina esquerda) até a Cor B (sombra na quina direita).
    * **Linha da Esquerda (Vertical):** Gradiente contínuo de 100% da altura (`to bottom`) da Cor A (ponto de luz no topo) até a Cor B (sombra na base).
    * **Linha de Baixo (Base) e Linha da Direita:** 100% preenchidas pela Cor B sólida e uniforme, com **zero vazamento de luz**.
    * **Transições nas Quinas:** A transição entre luz e sombra ocorre perfeitamente no meio do raio de curvatura (`border-radius`), sem cortes abruptos.
    * **Variantes Específicas:**
      * `.border-gradient-subtle`: Para Cards, Modais e Containers neutros.
      * `.border-gradient-secondary`: Para botões secundários preenchidos.
      * `.border-gradient-outline`: Para botões vazados transparentes (usando `mask-composite: exclude`).
      * `.border-gradient-primary` e `.border-gradient-destructive`: Para botões cromáticos (Laranja e Vermelho).
      * `.border-gradient-sunken`: Para campos rebaixados (Inputs e Selects), com gradiente invertido e sombra interna de cavidade (`--tc-input-inner-shadow`).
    * É estritamente proibido o uso de chanfros internos (`inset box-shadow` claros) sobrepostos a bordas. Para foco da marca, utilize `.brand-glow` exclusivamente em botões e cards de conversão. Obedeça a regra estrita: **"Efeitos visuais nunca devem competir com a leitura de dados nem comprometer o contraste WCAG 2.2."**
12. **Micro-interações e Motion Design (Feedback Tátil):** O movimento deve existir exclusivamente para sinalizar feedback de ação ou mudança de estado. **Animações em interfaces SaaS nunca devem ultrapassar 200ms**. Utilize estritamente os tokens estruturados `--tc-duration-fast` (150ms) ou `--tc-duration-normal` (200ms). Para componentes clicáveis, aplique a classe utilitária `.micro-press` (0.98 scale no `:active`) para resposta cinestésica imediata. O sistema respeita nativamente a diretiva `@media (prefers-reduced-motion)` para zerar movimentos a pedido do usuário.

## ♿ Acessibilidade e Conformidade WCAG 2.2

Este Design System é projetado nativamente para atender aos critérios da **WCAG 2.2 (Nível AA)**. 
Para manter essa certificação, todo elemento visual deve respeitar rigorosamente as seguintes regras:

- **Contraste de Texto:** Qualquer texto deve possuir proporção mínima de contraste de 4.5:1 com seu plano de fundo.
- **Formulários e Inputs (React):** O componente `Input` e os `Button`s vizinhos devem SEMPRE compartilhar a mesma altura (h-9 ou h-10) e o mesmo raio de borda (`--tc-radius-md`) para manter o alinhamento visual de SaaS.
- **Rótulos (Labels):** É proibido instanciar o componente `Button` com apenas um ícone (variante `icon`) sem fornecer a prop nativa `aria-label` para leitores de tela.
- **Anel de Foco (Focus Ring):** Não remova o anel de foco nativo das classes utilitárias ou do CSS (`outline: 2px solid var(--focus-ring)`). O foco visível é uma exigência WCAG de navegação por teclado.
- **Gerenciamento de Erros:** Campos de input em estado de erro (prop `error={true}`) recebem `aria-invalid="true"` automaticamente, mas devem sempre ser acompanhados por um texto auxiliar (`aria-describedby`) legível.
- **Overlays e Focus Trap:** O componente `Dialog` deve ser usado para formulários, configurações e fluxos obstrutivos, aprisionando o foco do teclado internamente. O componente `AlertDialog` deve ser reservado EXCLUSIVAMENTE para ações irreversíveis ou críticas (perda de dados), e seu foco de teclado inicial DEVE OBRIGATORIAMENTE abrir no botão de cancelamento (ação não destrutiva). Ambos devem devolver o foco ao elemento que disparou a ação após fechados.

1. **Uso Obrigatório de Pares Casados (Bg/Fg)**:
   * **Nenhum token de background pode ser usado isoladamente.** Se um elemento receber `--bg-surface`, seu texto interno DEVE receber `--text-primary`, `--text-secondary` ou similar.
   * Botões devem parear `--action-primary-bg` e `--action-primary-fg`.

2. **Foco Visível (Focus Ring)**:
   * **É estritamente proibido** remover o `outline` nativo (`outline: none`) de elementos interativos (botões, inputs, links) sem prover um substituto imediato.
   * Utilize as variáveis globais `--focus-ring` (cor) e `--focus-offset` (distância) no seletor `:focus-visible` de qualquer novo componente que você criar.

3. **Status e Daltonismo**:
   * Nunca confie **exclusivamente na cor** para passar informações críticas de status.
   * Elementos como `badge-danger` ou `badge-success` devem vir acompanhados de um rótulo de texto explicativo ou um ícone inequívoco reconhecível por daltônicos.

## 🛠️ Exportação e Consumo

O arquivo `tokens/colors.json` mantém a "Single Source of Truth" das cores de forma agnóstica a framework, permitindo que scripts buildem as cores para Tailwind, CSS-in-JS ou SCSS de forma automatizada no futuro.
