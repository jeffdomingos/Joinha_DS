import {
  BookOpen,
  Palette,
  Layers,
  Sparkles,
  Copy,
  Terminal,
  ShieldCheck,
  Type,
  LayoutGrid,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tag } from "@/components/ui/tag"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { toast } from "sonner"

export interface DocsWikiViewProps {
  activeSection?: string
  onNavigateSection?: (sectionId: string) => void
}

export function DocsWikiView({
  activeSection = "docs-overview",
  onNavigateSection,
}: DocsWikiViewProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`Copiado: ${label}`, { description: text })
  }

  const brandColors = [
    { name: "Brand Primary", oklch: "oklch(67% 0.17 53)", hex: "#e27100", token: "--brand-primary", class: "bg-primary text-primary-foreground" },
    { name: "Brand Hover", oklch: "oklch(62% 0.18 53)", hex: "#cb6100", token: "--brand-primary-hover", class: "bg-(--brand-primary-hover) text-white" },
    { name: "Brand Active", oklch: "oklch(57% 0.19 53)", hex: "#b45200", token: "--brand-primary-active", class: "bg-(--brand-primary-active) text-white" },
    { name: "Brand Subtle", oklch: "oklch(25% 0.05 53)", hex: "#321d0a", token: "--brand-primary-subtle", class: "bg-(--brand-primary-subtle) text-primary" },
  ]

  const semanticColors = [
    { name: "Success (Jewel)", oklch: "oklch(50% 0.14 145)", textOk: "oklch(95% 0.04 145)", token: "--status-success-solid", desc: "Aprovações, conclusões e métricas positivas" },
    { name: "Warning (Jewel)", oklch: "oklch(50% 0.105 85)", textOk: "oklch(95% 0.04 85)", token: "--status-warning-solid", desc: "Alertas operacionais e cota intermediária" },
    { name: "Danger (Jewel)", oklch: "oklch(48% 0.115 25)", textOk: "oklch(95% 0.04 25)", token: "--status-danger-solid", desc: "Erros, inadimplência e ações destrutivas" },
    { name: "Info (Jewel)", oklch: "oklch(48% 0.105 240)", textOk: "oklch(95% 0.04 240)", token: "--status-info-solid", desc: "Novidades, dicas e informações neutras" },
  ]

  const surfaceElevations = [
    { level: "Canvas (Base)", l: "14%", oklch: "oklch(14% 0.005 53)", token: "--bg-canvas", desc: "Plano de fundo global de toda a aplicação" },
    { level: "Surface 1 (Card)", l: "17%", oklch: "oklch(17% 0.006 53)", token: "--bg-surface", desc: "Cards de conteúdo padrão, tabelas e painéis" },
    { level: "Surface 2 (Elevated)", l: "20%", oklch: "oklch(20% 0.007 53)", token: "--bg-surface-elevated", desc: "Modais, popovers, dropdowns e HUDs" },
    { level: "Surface Hover", l: "24%", oklch: "oklch(24% 0.008 53)", token: "--bg-surface-hover", desc: "Feedback de foco e cursor sobre elementos" },
    { level: "Surface Active", l: "28%", oklch: "oklch(28% 0.009 53)", token: "--bg-surface-active", desc: "Pressionamento tátil de botões e itens" },
  ]

  const radiusTokens = [
    { name: "Small (xs)", size: "4px", token: "--tc-radius-xs", desc: "Badges pequenos, tags e tooltips" },
    { name: "Medium (md)", size: "8px", token: "--tc-radius-md", desc: "Botões, inputs, switches e selects" },
    { name: "Large (lg)", size: "12px", token: "--tc-radius-lg", desc: "Cards de métricas, accordions e dropdowns" },
    { name: "Extra Large (xl)", size: "16px", token: "--tc-radius-xl", desc: "Modais, painéis principais e Floating HUD" },
    { name: "2X Large (2xl)", size: "24px", token: "--tc-radius-2xl", desc: "Grandes superfícies hero e containers" },
  ]

  return (
    <div className="space-y-14 animate-in fade-in-50 duration-300">
      {/* Main Content Sections */}
      {(activeSection === "docs-overview" || !activeSection.startsWith("docs-")) && (
        <section className="space-y-12 animate-in fade-in-50 duration-200">
          {/* Header Banner — only on the wiki landing page, not repeated on every sub-section */}
          <div className="relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral" size="sm" className="gap-1 font-mono">
                  <Sparkles className="w-3 h-3" />
                  Joinha DS Wiki v1.0
                </Badge>
                <Tag variant="gray" size="sm">50 Componentes</Tag>
                <Tag variant="gray" size="sm">OKLCH Perceptual</Tag>
                <Tag variant="gray" size="sm">WCAG 2.2 AA</Tag>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-heading">
                Documentação Oficial & Compêndio de Engenharia
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Bem-vindo à fonte única de verdade (SSOT) do <strong>Joinha Design System</strong>. Esta wiki é 100% construída utilizando os próprios componentes da biblioteca (*dogfooding*), com tokens perceptuais em OKLCH, física de luz dark-first e arquitetura preparada para humanos e Agentes de IA.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-0 md:divide-x md:divide-border/40">
            <div className="space-y-2 md:pr-8">
              <div className="flex items-center gap-2 text-foreground font-bold font-display text-sm">
                <Palette className="w-4 h-4 text-muted-foreground" />
                1. Espaço de Cores OKLCH
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Diferente do sRGB/HSL tradicional, o OKLCH preserva luminosidade uniforme e elimina distorções visuais entre cores claras e escuras, garantindo contraste rigoroso em qualquer monitor.
              </p>
            </div>

            <div className="space-y-2 md:px-8">
              <div className="flex items-center gap-2 text-foreground font-bold font-display text-sm">
                <Layers className="w-4 h-4 text-muted-foreground" />
                2. Elevação Dark-First (5 Níveis)
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Inspirado no modelo <em>Four Zero Three</em>, as superfícies ganham profundidade através de gradientes sutis de luminosidade ($L=14\%$ a $L=30\%$) e reflexos especulares de borda (*highlight*).
              </p>
            </div>

            <div className="space-y-2 md:pl-8">
              <div className="flex items-center gap-2 text-foreground font-bold font-display text-sm">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                3. Acessibilidade WCAG 2.2 AA
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Todos os pares de texto e fundo possuem razão de contraste $\ge 4.5:1$, foco visível via teclado (`:focus-visible`) e suporte integral a leitores de tela via Radix UI Primitives.
              </p>
            </div>
          </div>

          {/* Typography Scale Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-base font-bold font-display text-heading">Escala Tipográfica Hierárquica</h3>
              </div>
              <Badge variant="neutral" size="sm">3 Famílias Especializadas</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-x-0 md:divide-x md:divide-border/40">
              <div className="space-y-2 md:pr-8">
                <span className="text-[10px] font-sans uppercase text-muted-foreground font-semibold tracking-wider">Display / Títulos</span>
                <p className="text-2xl font-bold font-display text-foreground tracking-tight">Cabin (Gill Sans)</p>
                <p className="text-xs text-muted-foreground">Títulos de páginas, cabeçalhos de seções e valores numéricos em destaque hero.</p>
              </div>

              <div className="space-y-2 md:px-8">
                <span className="text-[10px] font-sans uppercase text-muted-foreground font-semibold tracking-wider">Interface / Corpo</span>
                <p className="text-xl font-medium font-sans text-foreground">Plus Jakarta Sans</p>
                <p className="text-xs text-muted-foreground">Textos corridos, botões, formulários, badges, tags e células de tabelas.</p>
              </div>

              <div className="space-y-2 md:pl-8">
                <span className="text-[10px] font-sans uppercase text-muted-foreground font-semibold tracking-wider">Dados / Numérico</span>
                <p className="text-xl font-bold font-mono text-foreground">JetBrains Mono</p>
                <p className="text-xs text-muted-foreground">Colunas financeiras tabulares, identificadores (IDs), atalhos de teclado e código.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-tokens")}
              className="gap-2 cursor-pointer"
            >
              <span>Próximo: Tokens de Design</span>
              <Palette className="w-3.5 h-3.5" />
            </Button>
          </div>
        </section>
      )}

      {/* 2. TOKENS DE DESIGN */}
      {activeSection === "docs-tokens" && (
        <section className="space-y-12 animate-in fade-in-50 duration-200">
          <h1 className="text-2xl font-bold font-display tracking-tight text-heading">
            Tokens de Design & OKLCH
          </h1>

          {/* Brand Colors Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-base font-bold font-display text-heading">Cores Primárias de Marca (Laranja OKLCH)</h3>
              </div>
              <span className="text-xs text-muted-foreground font-sans">Clique para copiar o token</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {brandColors.map((color) => (
                <button
                  key={color.token}
                  type="button"
                  onClick={() => copyToClipboard(`var(${color.token})`, color.name)}
                  className="p-3.5 rounded-lg border border-border/80 bg-surface text-left hover:border-primary transition-all cursor-pointer group"
                >
                  <div className={`h-12 w-full rounded-md mb-3 flex items-center justify-center font-mono text-xs font-bold ${color.class}`}>
                    {color.hex}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">{color.name}</span>
                    <Copy className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground block mt-1">{color.oklch}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Semantic Status Colors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h3 className="text-base font-bold font-display text-heading">Cores Semânticas de Estado (Jewel Tones)</h3>
              <Badge variant="success" size="sm">WCAG 2.2 AA Garantido</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {semanticColors.map((color) => (
                <button
                  key={color.token}
                  type="button"
                  onClick={() => copyToClipboard(`var(${color.token})`, color.name)}
                  className="p-3.5 rounded-lg border border-border/80 bg-surface text-left hover:border-primary transition-all cursor-pointer group"
                >
                  <div
                    className="h-10 w-full rounded-md mb-2.5 flex items-center justify-center font-mono text-xs font-bold"
                    style={{ backgroundColor: color.oklch, color: color.textOk }}
                  >
                    Jewel Solid
                  </div>
                  <span className="text-xs font-bold text-foreground block">{color.name}</span>
                  <span className="text-[11px] text-muted-foreground block mt-0.5">{color.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Surface Elevations */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-heading border-b border-border/80 pb-3">
              Superfícies Dark-First & Elevação
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {surfaceElevations.map((surf) => (
                <div key={surf.token} className="p-3 rounded-lg border border-border/80 bg-surface space-y-1.5">
                  <div
                    className="h-12 w-full rounded border border-border/80 flex items-center justify-center text-xs font-mono font-bold text-foreground"
                    style={{ backgroundColor: surf.oklch }}
                  >
                    L = {surf.l}
                  </div>
                  <span className="text-xs font-bold text-foreground block">{surf.level}</span>
                  <span className="text-[10px] text-muted-foreground block leading-tight">{surf.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Border Radius Tokens */}
          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-heading border-b border-border/80 pb-3">
              Tokens de Raio de Borda (Corner Radius)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {radiusTokens.map((rad) => (
                <div key={rad.token} className="p-3 rounded-lg border border-border/80 bg-surface space-y-2">
                  <div
                    className="h-10 w-full bg-surface-hover border border-border flex items-center justify-center text-xs font-mono font-bold text-foreground"
                    style={{ borderRadius: rad.size }}
                  >
                    {rad.size}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-foreground block">{rad.name}</span>
                    <span className="text-[10px] text-muted-foreground block">{rad.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-overview")}
              className="gap-2 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Anterior: Visão Geral</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-layout")}
              className="gap-2 cursor-pointer"
            >
              <span>Próximo: Enterprise Layout</span>
              <LayoutGrid className="w-3.5 h-3.5" />
            </Button>
          </div>
        </section>
      )}

      {/* 3. ENTERPRISE LAYOUT */}
      {activeSection === "docs-layout" && (
        <section className="space-y-12 animate-in fade-in-50 duration-200">
          <h1 className="text-2xl font-bold font-display tracking-tight text-heading">
            Enterprise Layout & Densidade
          </h1>

          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-heading border-b border-border/80 pb-3">
              Matriz de Densidade Paramétrica (`data-density`)
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              O Joinha DS orquestra a densidade de interfaces na raiz do DOM (`&lt;html data-density="..."&gt;`), permitindo que a mesma aplicação atenda desde operadores fiscais e telemetria até gestores executivos:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-x-0 md:divide-x md:divide-border/40">
              <div className="space-y-2 md:pr-6">
                <Badge variant="neutral" size="sm">Compact (32px)</Badge>
                <p className="text-xs text-foreground font-semibold">Operacional / Fiscal / Tabelas Densas</p>
                <p className="text-[11px] text-muted-foreground">Linhas de 32px, padding reduzido de 4px e tipografia de 12px para maximizar dados visíveis por polegada.</p>
              </div>

              <div className="space-y-2 md:px-6">
                <Badge variant="neutral" size="sm">Default (40px)</Badge>
                <p className="text-xs text-foreground font-semibold">Padrão SaaS Moderno</p>
                <p className="text-[11px] text-muted-foreground">Linhas de 40px, padding de 10px e tipografia equilibrada de 13-14px para uso diário.</p>
              </div>

              <div className="space-y-2 md:pl-6">
                <Badge variant="neutral" size="sm">Comfortable (48px)</Badge>
                <p className="text-xs text-foreground font-semibold">Executivo / Apresentações / Telas Leves</p>
                <p className="text-[11px] text-muted-foreground">Linhas de 48px, padding de 14px e tipografia de 15-16px para leitura relaxada.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-heading border-b border-border/80 pb-3">
              Container Queries (`@container`) vs. Media Queries
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Componentes de ERP e SaaS moderno vivem em múltiplos contextos (sidebar de 320px, modal de 600px ou grid principal de 1400px). Classes como `.cq-card` reagem à largura do container pai (`inline-size`), garantindo que o card se auto-adapte sem depender do viewport da janela.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-tokens")}
              className="gap-2 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Anterior: Tokens de Design</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-xai")}
              className="gap-2 cursor-pointer"
            >
              <span>Próximo: Padrões XAI & HITL</span>
              <Bot className="w-3.5 h-3.5" />
            </Button>
          </div>
        </section>
      )}

      {/* 4. XAI & HITL */}
      {activeSection === "docs-xai" && (
        <section className="space-y-8 animate-in fade-in-50 duration-200">
          <h1 className="text-2xl font-bold font-display tracking-tight text-heading">
            Padrões XAI & HITL
          </h1>

          <div className="space-y-4">
            <h3 className="text-base font-bold font-display text-heading border-b border-border/80 pb-3">
              Ergonomia de Confiança & Padrões Human-in-the-Loop
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Diretrizes para construir interfaces com Agentes de IA autônomos sem o <em>Black Box Problem</em>:
            </p>

            <div className="space-y-3">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xs font-bold text-foreground">
                    1. Score de Certeza & Chain-of-Thought Auditável
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    Toda predição ou análise da IA deve ser acompanhada pelo componente <code>&lt;ConfidenceMeter /&gt;</code> e pelo acordeão <code>&lt;ReasoningTrace /&gt;</code>, detalhando o tempo de execução e as fontes de dados consultadas (*Grounding Facts*).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xs font-bold text-foreground">
                    2. Interceptação de Ações de Alto Impacto
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    Ações com efeitos colaterais financeiros ou exclusão de dados NUNCA são executadas em silêncio. O componente <code>&lt;HITLApprovalBanner /&gt;</code> intercepta a proposta e exige confirmação humana explícita (*Aprovar*, *Rejeitar* ou *Editar*).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xs font-bold text-foreground">
                    3. Visualização Estruturada de Diffs
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    Utilize <code>&lt;AIDiffViewer /&gt;</code> em modo Lado a Lado ou Unificado para que o usuário identifique instantaneamente as adições em verde e remoções em vermelho sem precisar reler o texto integral.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-layout")}
              className="gap-2 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Anterior: Enterprise Layout</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-cli")}
              className="gap-2 cursor-pointer"
            >
              <span>Próximo: Instalação via CLI</span>
              <Terminal className="w-3.5 h-3.5" />
            </Button>
          </div>
        </section>
      )}

      {/* 5. SHADCN CLI */}
      {activeSection === "docs-cli" && (
        <section className="space-y-8 animate-in fade-in-50 duration-200">
          <h1 className="text-2xl font-bold font-display tracking-tight text-heading">
            Instalação via CLI
          </h1>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-base font-bold font-display text-heading">Instalação Modular via CLI Oficial</h3>
              </div>
              <Badge variant="neutral" size="sm">Shadcn Compatible</Badge>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Todos os 50 componentes do Joinha DS estão disponíveis em manifestos JSON compatíveis com a CLI do Shadcn. Você pode instalá-los individualmente no seu projeto React/Next.js/Vite:
            </p>

            <div className="space-y-4 font-mono text-xs divide-y divide-border/60">
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans font-semibold text-foreground block">1. Configurar Tokens do Joinha DS:</span>
                <div className="flex items-center justify-between bg-surface-hover/50 rounded-(--tc-radius-md) p-2.5 text-muted-foreground">
                  <code>npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/tokens.json</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[10px]"
                    onClick={() => copyToClipboard("npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/tokens.json", "Comando Tokens CLI")}
                  >
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5 pt-4">
                <span className="text-[11px] font-sans font-semibold text-foreground block">2. Instalar Componente Individual (ex: Button):</span>
                <div className="flex items-center justify-between bg-surface-hover/50 rounded-(--tc-radius-md) p-2.5 text-muted-foreground">
                  <code>npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/button.json</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-[10px]"
                    onClick={() => copyToClipboard("npx shadcn@latest add https://raw.githubusercontent.com/jeffdomingos/Joinha_DS/master/public/r/button.json", "Comando Button CLI")}
                  >
                    Copiar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigateSection?.("docs-xai")}
              className="gap-2 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Anterior: Padrões XAI & HITL</span>
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
