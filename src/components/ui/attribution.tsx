import * as React from "react"
import { Globe, Mail, AtSign, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { BrandSymbol } from "@/components/ui/brand-symbol"
import { cn } from "@/lib/utils"

/* ========================================================
   DS ATTRIBUTION — footer credit + "Sobre" dialog
   ======================================================== */

/** Studio/developer identity behind the Joinha DS. Not meant to be
    overridden per-project — this is the attribution the DS ships with. */
const STUDIO = {
  studioName: "Tem Como",
  developerName: "Jeff Domingos",
  email: "jeffsalb@gmail.com",
  website: "https://jeffdomingos.com/to/JoinhaDS",
  websiteLabel: "jeffdomingos.com",
  instagram: "https://instagram.com/jeffdomingos.design",
  instagramHandle: "@jeffdomingos.design",
} as const

export interface DSAttributionProps {
  /** Name of the product/app built on top of the Joinha DS. Downstream projects rebrand this. */
  productName?: string
  productVersion?: string
  className?: string
}

export function DSAttribution({
  productName = "Joinha DS",
  productVersion = "v1.0",
  className,
}: DSAttributionProps) {
  const [open, setOpen] = React.useState(false)
  const year = new Date().getFullYear()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer truncate",
          className
        )}
      >
        Powered by {productName} · © {year} {STUDIO.studioName}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <BrandSymbol
                variant="raw"
                className="w-6 h-6 text-(--brand-mark) fill-(--brand-mark) shrink-0"
              />
              <DialogTitle className="leading-none">Sobre o {productName}</DialogTitle>
            </div>
            <DialogDescription>
              Construído com o <strong className="text-foreground">Joinha DS</strong> ({productVersion}), o design system oficial da{" "}
              <strong className="text-foreground">{STUDIO.studioName}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-xs pt-1">
            <div>
              <span className="text-[10px] font-sans uppercase text-muted-foreground font-semibold tracking-wider">
                Design & Desenvolvimento
              </span>
              <p className="text-foreground font-medium mt-0.5">{STUDIO.developerName}</p>
            </div>

            <div className="space-y-1.5">
              <a
                href={`mailto:${STUDIO.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{STUDIO.email}</span>
              </a>
              <a
                href={STUDIO.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>{STUDIO.websiteLabel}</span>
                <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
              </a>
              <a
                href={STUDIO.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <AtSign className="w-3.5 h-3.5 shrink-0" />
                <span>{STUDIO.instagramHandle}</span>
              </a>
            </div>

            <p className="text-[11px] text-muted-foreground/70 leading-relaxed pt-2 border-t border-border/60">
              © {year} {STUDIO.studioName}. Todos os direitos reservados.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
