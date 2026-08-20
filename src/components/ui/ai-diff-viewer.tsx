import * as React from "react"
import { Sparkles, Copy, Check, Columns, AlignJustify } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface DiffLine {
  type: "added" | "removed" | "unchanged"
  content: string
  lineNumberOriginal?: number
  lineNumberNew?: number
}

export interface AIDiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  originalLabel?: string
  proposedLabel?: string
  diffs: DiffLine[]
  defaultMode?: "split" | "unified"
  allowToggleMode?: boolean
}

export function AIDiffViewer({
  title = "Proposta de Alteração Gerada por IA",
  originalLabel = "Atual (Produção)",
  proposedLabel = "Sugerido (Agente IA)",
  diffs,
  defaultMode = "split",
  allowToggleMode = true,
  className,
  ...props
}: AIDiffViewerProps) {
  const [mode, setMode] = React.useState<"split" | "unified">(defaultMode)
  const [copied, setCopied] = React.useState(false)

  const addedCount = diffs.filter((d) => d.type === "added").length
  const removedCount = diffs.filter((d) => d.type === "removed").length

  const handleCopyNew = () => {
    const textToCopy = diffs
      .filter((d) => d.type !== "removed")
      .map((d) => d.content)
      .join("\n")
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "rounded-(--tc-radius-xl) border border-border bg-(--bg-surface-elevated) overflow-hidden shadow-xl text-foreground font-mono text-xs",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border-b border-border/80 bg-surface/50 font-sans">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold text-xs text-foreground tracking-tight">{title}</span>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <Badge variant="success" size="sm" className="px-1.5 py-0 h-5">
              +{addedCount}
            </Badge>
            <Badge variant="danger" size="sm" className="px-1.5 py-0 h-5">
              -{removedCount}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {allowToggleMode && (
            <div className="inline-flex rounded-md border border-border p-0.5 bg-surface">
              <button
                type="button"
                onClick={() => setMode("split")}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer",
                  mode === "split" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Columns className="h-3 w-3" />
                <span>Lado a Lado</span>
              </button>
              <button
                type="button"
                onClick={() => setMode("unified")}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer",
                  mode === "unified" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <AlignJustify className="h-3 w-3" />
                <span>Unificado</span>
              </button>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs gap-1 text-muted-foreground"
            onClick={handleCopyNew}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copiado!" : "Copiar"}</span>
          </Button>
        </div>
      </div>

      {/* Diff Content */}
      {mode === "unified" ? (
        <div className="overflow-x-auto p-2 font-mono text-[11px] leading-relaxed">
          {diffs.map((line, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-3 px-2 py-0.5 rounded-xs transition-colors",
                line.type === "added" && "bg-success/15 text-success font-semibold",
                line.type === "removed" && "bg-destructive/15 text-destructive line-through",
                line.type === "unchanged" && "text-muted-foreground"
              )}
            >
              <span className="w-4 text-center select-none font-bold">
                {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
              </span>
              <span className="flex-1 whitespace-pre-wrap">{line.content}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Original Side */}
          <div className="p-3 bg-surface/30">
            <div className="pb-2 mb-2 border-b border-border/60 text-[10px] uppercase font-sans font-bold text-muted-foreground tracking-wider">
              {originalLabel}
            </div>
            <div className="space-y-0.5 font-mono text-[11px]">
              {diffs.filter((d) => d.type !== "added").map((line, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-1.5 py-0.5 rounded-xs whitespace-pre-wrap",
                    line.type === "removed" ? "bg-destructive/15 text-destructive" : "text-muted-foreground"
                  )}
                >
                  {line.content}
                </div>
              ))}
            </div>
          </div>

          {/* Proposed Side */}
          <div className="p-3 bg-surface-elevated/20">
            <div className="pb-2 mb-2 border-b border-border/60 text-[10px] uppercase font-sans font-bold text-primary tracking-wider flex items-center justify-between">
              <span>{proposedLabel}</span>
              <Badge variant="info" size="sm" className="font-mono text-[9px]">Recomendação IA</Badge>
            </div>
            <div className="space-y-0.5 font-mono text-[11px]">
              {diffs.filter((d) => d.type !== "removed").map((line, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-1.5 py-0.5 rounded-xs whitespace-pre-wrap",
                    line.type === "added" ? "bg-success/15 text-success font-semibold" : "text-foreground"
                  )}
                >
                  {line.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
