# Tem Como: Joinha DS - Documentação do Design System

Bem-vindo ao **Tem Como: Joinha DS**, a arquitetura de base para nossas ferramentas de gestão e produtos SaaS. Este documento estabelece as regras estritas de uso de cores, convenções de nomenclatura e diretrizes para implementação.

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

## 🎨 Arquitetura de Cores (OKLCH)

Nosso sistema utiliza **OKLCH** para garantir percepção de cor uniforme. O tema primário e padrão é o **Dark Mode**, com cores neutras que contêm um leve aquecimento cromático para harmonizar com nossa marca (Laranja #e27100).

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

## 🏗️ Convenções de Uso em SaaS

Ferramentas SaaS exigem hierarquia visual clara e controle rígido de contraste. Siga estas regras:

### Superfícies e Fundos (Backgrounds)
- `--bg-base`: Use para o fundo principal da aplicação (ex: `body` ou container root). Em Dark Mode, é a cor mais escura.
- `--bg-surface`: Use para painéis principais, sidebars ou grandes áreas de conteúdo.
- `--bg-surface-elevated`: Use para cards, dropdowns, modais e elementos sobrepostos (`z-index` maior).
- `--bg-surface-hover`: Use para estados de hover em linhas de tabelas ou blocos clicáveis.

### Textos e Tipografia
- `--text-primary`: Textos principais, títulos e dados cruciais.
- `--text-secondary`: Rótulos, descrições secundárias, subtítulos.
- `--text-tertiary` / `--text-muted`: Placeholders, textos auxiliares e dados desativados.
- `--text-inverse`: Texto em botões ou áreas com fundo claro contrastante.

### Botões e Ações (Actions)
- **Primary**: Ação principal da tela (ex: "Salvar", "Criar"). Use `--action-primary-bg`.
- **Secondary**: Ações secundárias que necessitam de destaque sutil. Use `--action-secondary-bg`.
- **Subtle/Ghost**: Ações terciárias ou ícones de ferramentas. Use `--action-subtle-bg` (transparente) e mostre apenas no hover/active.

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

## 🤖 Regras Estritas para Agentes de IA

1. **Nunca use cores HEX ou RGB codificadas rigidamente (hardcoded).**
2. **Nunca** use `--tc-*` diretamente. Se você precisa de um fundo, escolha na escala `--bg-*`.
3. **Não crie novos tons de cinza.** O sistema já possui a escala de neutros aquecidos ideal. Não introduza preto (`#000`) ou branco puro sem verificar se há um token equivalente (ex: `--tc-neutral-1000` ou `--tc-neutral-0`).
4. Ao construir gráficos (Charts), use as variáveis `--chart-1` até `--chart-6` sequencialmente.
5. Ao categorizar dados neutros, prefira a família `--tag-*` em vez de sobrecarregar as cores funcionais de `--status-*`.
6. **Obrigatoriedade Tipográfica:** É **ESTRITAMENTE PROIBIDO** criar classes avulsas de `font-size` isoladas da escala ou do respectivo `line-height`. Utilize sempre a arquitetura de 3 camadas através das classes utilitárias semânticas (Camada 3) como `.type-body-default`, `.type-ui-base`, `.type-heading-page`, etc.
7. **Colunas Numéricas e Relatórios:** Use SEMPRE `.type-data-mono` (ou aplique `tabular-nums` com a fonte JetBrains Mono) para alinhar valores financeiros e contadores em Dashboards.
8. **Formas e Elevações (Border Radius e Shadows):** É proibido o uso de valores relativos (`rem`, `%`) ou fluidos para `border-radius`. Use SEMPRE as classes ou variáveis utilitárias da escala fixa de `px` (ex: `--tc-radius-md`, `.radius-lg`) para evitar distorção nas curvas e problemas com sub-pixel rendering. Use as variáveis semânticas de sombra (`--tc-shadow-sm` até `lg`) para elevações em vez de gerar novas sombras isoladas, respeitando o eixo Z estruturado no CSS.
9. **Tailwind v4 e Variáveis Customizadas:** Nunca utilize mapeamentos `@theme` (em `index.css`) para injetar propriedades pontuais de espaçamento e Box Model, pois essa abstração perde especificidade para CSS legado ou ferramentas de merge. Utilize SEMPRE a sintaxe de variáveis arbitrárias nativa do Tailwind v4 (`classe-(--variavel)` ou `classe-[var(--variavel)]`) diretamente nos componentes React. Exemplo de uso correto: `h-(--tc-control-h-md) px-(--tc-control-px-md)`.
10. **Conflito de Cascade Layers (Ameaça de Especificidade):** O Tailwind v4 empacota nativamente todos os seus utilitários dentro do `@layer utilities`. Pela especificação estrita do CSS (W3C), **CSS sem camada (unlayered) tem precedência absoluta sobre CSS em camadas**. Portanto, É ESTRITAMENTE PROIBIDO importar folhas de estilo (como legados ou templates) fora de camadas se elas contiverem resets genéricos ou modificações de box model (ex: `* { padding: 0 }`). Sempre envolva estilos customizados em `@layer base` ou `@layer components` para garantir que as classes utilitárias da UI nunca sejam sobrescritas em cascata.

## ♿ Acessibilidade e Conformidade WCAG 2.2

Este Design System é projetado nativamente para atender aos critérios da **WCAG 2.2 (Nível AA)**. 
Para manter essa certificação, todo elemento visual deve respeitar rigorosamente as seguintes regras:

- **Contraste de Texto:** Qualquer texto deve possuir proporção mínima de contraste de 4.5:1 com seu plano de fundo.
- **Formulários e Inputs (React):** O componente `Input` e os `Button`s vizinhos devem SEMPRE compartilhar a mesma altura (h-9 ou h-10) e o mesmo raio de borda (`--tc-radius-md`) para manter o alinhamento visual de SaaS.
- **Rótulos (Labels):** É proibido instanciar o componente `Button` com apenas um ícone (variante `icon`) sem fornecer a prop nativa `aria-label` para leitores de tela.
- **Anel de Foco (Focus Ring):** Não remova o anel de foco nativo das classes utilitárias ou do CSS (`outline: 2px solid var(--focus-ring)`). O foco visível é uma exigência WCAG de navegação por teclado.
- **Gerenciamento de Erros:** Campos de input em estado de erro (prop `error={true}`) recebem `aria-invalid="true"` automaticamente, mas devem sempre ser acompanhados por um texto auxiliar (`aria-describedby`) legível.

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
