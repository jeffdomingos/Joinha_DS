import * as React from "react"
import { Sparkles, Code2, LineChart, ShieldCheck, ArrowRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export interface PersonaOption {
  id: string
  title: string
  description: string
  icon: React.ElementType
  recommendedFor?: string
}

export interface PersonaSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectPersona: (personaId: string) => void
  defaultPersonaId?: string
}

export const defaultPersonas: PersonaOption[] = [
  {
    id: "developer",
    title: "Engenharia & APIs",
    description: "Foco em integrações de API, webhooks em tempo real e tokens de acesso.",
    icon: Code2,
    recommendedFor: "Devs & DevOps",
  },
  {
    id: "finance",
    title: "Finanças & MRR",
    description: "Acompanhamento de receita recorrente, faturas pagas e churn analítico.",
    icon: LineChart,
    recommendedFor: "Gestão & CFOs",
  },
  {
    id: "ops",
    title: "Operações & Suporte",
    description: "Gestão de clientes, limites de cota e auditoria de segurança.",
    icon: ShieldCheck,
    recommendedFor: "CS & Operações",
  },
]

export function PersonaSelector({
  open,
  onOpenChange,
  onSelectPersona,
  defaultPersonaId = "developer",
}: PersonaSelectorProps) {
  const [selected, setSelected] = React.useState(defaultPersonaId)

  const handleConfirm = () => {
    onSelectPersona(selected)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-6 bg-(--bg-surface-modal) border-border text-foreground">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2.5 text-primary">
            <Sparkles className="h-5 w-5 shrink-0 translate-y-[0.5px]" />
            <DialogTitle className="text-lg font-bold font-display tracking-tight leading-none">
              Personalize sua Experiência
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Selecione seu objetivo principal para que possamos calibrar o Dashboard e os atalhos ideais para o seu fluxo de trabalho:
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 py-3">
          {defaultPersonas.map((persona) => {
            const Icon = persona.icon
            const isSelected = selected === persona.id

            return (
              <div
                key={persona.id}
                onClick={() => setSelected(persona.id)}
                className={cn(
                  "relative flex items-start gap-3.5 p-4 rounded-(--tc-radius-lg) border cursor-pointer transition-all duration-200 ease-(--tc-ease-smooth)",
                  isSelected
                    ? "border-primary/80 bg-primary/5 [box-shadow:0_0_12px_oklch(67%_0.17_53_/_0.15)]"
                    : "border-border bg-surface-elevated/40 hover:border-primary/40 hover:bg-surface-elevated/70"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-surface text-muted-foreground border-border"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-xs text-foreground">{persona.title}</span>
                    {persona.recommendedFor && (
                      <span className="text-[10px] font-sans font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                        {persona.recommendedFor}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {persona.description}
                  </p>
                </div>

                <div className="shrink-0 self-center">
                  <div
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border text-transparent"
                    )}
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between border-t border-border pt-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            Pular por enquanto
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="gap-1.5"
            onClick={handleConfirm}
          >
            <span>Confirmar & Entrar no Workspace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
