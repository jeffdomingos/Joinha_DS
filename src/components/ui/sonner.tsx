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
        success: <CheckCircle2 className="w-5 h-5 text-success" />,
        info: <Info className="w-5 h-5 text-info" />,
        warning: <AlertTriangle className="w-5 h-5 text-warning" />,
        error: <AlertCircle className="w-5 h-5 text-destructive" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg elevation-4 p-4 rounded-(--tc-radius-lg) surface-highlight type-ui-base gap-3",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
