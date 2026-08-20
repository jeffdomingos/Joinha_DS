import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      duration={4000}
      icons={{
        success: <CheckCircle2 className="w-5 h-5 text-(--status-success-fg)" />,
        info: <Info className="w-5 h-5 text-(--status-info-fg)" />,
        warning: <AlertTriangle className="w-5 h-5 text-(--status-warning-fg)" />,
        error: <AlertCircle className="w-5 h-5 text-(--status-danger-fg)" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:shadow-lg elevation-4 p-4 rounded-(--tc-radius-lg) type-ui-base gap-3 font-medium group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          success:
            "!bg-(--status-success-bg) !text-(--status-success-fg) !border-(--status-success-border)",
          info:
            "!bg-(--status-info-bg) !text-(--status-info-fg) !border-(--status-info-border)",
          warning:
            "!bg-(--status-warning-bg) !text-(--status-warning-fg) !border-(--status-warning-border)",
          error:
            "!bg-(--status-danger-bg) !text-(--status-danger-fg) !border-(--status-danger-border)",
          description: "!text-inherit opacity-90",
          actionButton:
            "group-[.toast]:bg-foreground group-[.toast]:text-background font-semibold",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
