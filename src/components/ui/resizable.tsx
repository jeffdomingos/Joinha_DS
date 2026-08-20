import * as React from "react"
import { GripVertical } from "lucide-react"
import { Group, Panel, Separator } from "react-resizable-panels"
import { cn } from "@/lib/utils"

export type ResizablePanelGroupProps = React.ComponentProps<typeof Group> & {
  direction?: "horizontal" | "vertical"
}

const ResizablePanelGroup = ({
  className,
  direction = "horizontal",
  orientation,
  ...props
}: ResizablePanelGroupProps) => (
  <Group
    orientation={orientation || direction}
    className={cn(
      "flex h-full w-full",
      className
    )}
    {...props}
  />
)

const ResizablePanel = Panel

export type ResizableHandleProps = React.ComponentProps<typeof Separator> & {
  withHandle?: boolean
}

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border transition-colors duration-150 after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary hover:bg-primary/60 cursor-col-resize",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-6 w-3.5 items-center justify-center rounded-xs border border-border bg-(--bg-surface-elevated) shadow-xs transition-transform duration-150 group-hover:scale-110">
        <GripVertical className="h-3 w-3 text-muted-foreground" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
