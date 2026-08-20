import * as React from "react"
import { Sparkles, Loader2, Database, ShieldAlert, CheckCircle2, XCircle, PauseCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type AgentStatusType = "idle" | "thinking" | "executing_tool" | "awaiting_review" | "completed" | "failed"

export interface AgentStatusHUDProps extends React.HTMLAttributes<HTMLDivElement> {
  status: AgentStatusType
  agentName?: string
  currentTask?: string
  toolName?: string
  latencyMs?: number
  compact?: boolean
}

export function AgentStatusHUD({
  status = "idle",
  agentName = "Agente Autônomo",
  currentTask,
  toolName,
  latencyMs,
  compact = false,
  className,
  ...props
}: AgentStatusHUDProps) {
  const config = {
    idle: {
      text: "Em Repouso",
      color: "text-muted-foreground",
      badgeBg: "bg-surface-elevated text-muted-foreground border-border",
      icon: PauseCircle,
      animate: false,
    },
    thinking: {
      text: "Raciocinando & Analisando...",
      color: "text-primary",
      badgeBg: "bg-primary/10 text-primary border-primary/30",
      icon: Sparkles,
      animate: true,
    },
    executing_tool: {
      text: toolName ? `Executando: ${toolName}` : "Executando Ação no Banco...",
      color: "text-info",
      badgeBg: "bg-info/10 text-info border-info/30",
      icon: Database,
      animate: true,
    },
    awaiting_review: {
      text: "Aguardando Aprovação Humana",
      color: "text-warning",
      badgeBg: "bg-warning/15 text-warning border-warning/40",
      icon: ShieldAlert,
      animate: true,
    },
    completed: {
      text: "Tarefa Concluída",
      color: "text-success",
      badgeBg: "bg-success/15 text-success border-success/30",
      icon: CheckCircle2,
      animate: false,
    },
    failed: {
      text: "Erro na Execução",
      color: "text-destructive",
      badgeBg: "bg-destructive/15 text-destructive border-destructive/30",
      icon: XCircle,
      animate: false,
    },
  }[status]

  const Icon = config.icon

  if (compact) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-mono transition-all",
          config.badgeBg,
          className
        )}
        {...props}
      >
        <Icon className={cn("h-3.5 w-3.5 shrink-0", config.animate && "animate-spin duration-3000")} />
        <span className="font-semibold">{config.text}</span>
        {latencyMs !== undefined && (
          <span className="text-[10px] opacity-70">({latencyMs}ms)</span>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-(--tc-radius-lg) border bg-surface-elevated/70 backdrop-blur-xs text-foreground text-xs shadow-md transition-all",
        config.badgeBg,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-surface border border-border">
          {config.animate && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-md bg-primary/20 opacity-75" />
          )}
          {status === "thinking" ? (
            <Loader2 className="h-4 w-4 text-primary animate-spin" />
          ) : (
            <Icon className={cn("h-4 w-4", config.color)} />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold font-display text-foreground">{agentName}</span>
            <span className="text-[11px] font-mono font-medium px-1.5 py-0.2 rounded bg-surface border border-border/80">
              {config.text}
            </span>
          </div>
          {currentTask && (
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
              {currentTask}
            </p>
          )}
        </div>
      </div>

      {latencyMs !== undefined && (
        <div className="text-right font-mono text-[11px] text-muted-foreground shrink-0">
          <span>Latência: <strong className="text-foreground">{latencyMs}ms</strong></span>
        </div>
      )}
    </div>
  )
}
