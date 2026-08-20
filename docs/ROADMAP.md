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

### 🟢 Fase 3: Componentes Nucleares de SaaS (Base Shadcn UI)
* [x] Botões, Inputs, Selects e Dropdowns estilizados com a temática "Joinha".
* [x] Modais, Diálogos de Confirmação e Toasts padronizados.
* [ ] Data Tables densas (tabelas de dados) com filtros, ordenação e uso inteligente dos badges de status e tags categóricas.
* [ ] Cards de métricas com integração nativa das cores da série Data Viz (`--chart-*`).

### ⚪ Fase 4: Templates e Distribuição
* [ ] Criação do layout base consolidado de SaaS (Sidebar expansível, Header global e Área principal de Conteúdo).
* [ ] Configuração do repositório como um GitHub Template (`Use this template`) pronto para clonagem e início imediato de projetos.
* [ ] Estruturação de um Registry JSON no padrão Shadcn, possibilitando a instalação modular de componentes diretamente via CLI (ex: `npx shadcn-ui@latest add https://.../button.json`).
