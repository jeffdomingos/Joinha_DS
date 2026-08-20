import * as React from "react"
import { Sparkline } from "./sparkline"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
    period?: string
    isPositive?: boolean // If false, "up" is bad (e.g. churn or errors)
  }
  chartVariant?: 1 | 2 | 3 | 4 | 5 | 6
  sparklineData?: number[]
  icon?: React.ReactNode
  targetProgress?: number // 0 - 100 percentage
  className?: string
}

const iconTintMap: Record<number, string> = {
  1: "bg-(--chart-1)/10 text-(--chart-1) border-(--chart-1)/20",
  2: "bg-(--chart-2)/10 text-(--chart-2) border-(--chart-2)/20",
  3: "bg-(--chart-3)/10 text-(--chart-3) border-(--chart-3)/20",
  4: "bg-(--chart-4)/10 text-(--chart-4) border-(--chart-4)/20",
  5: "bg-(--chart-5)/10 text-(--chart-5) border-(--chart-5)/20",
  6: "bg-(--chart-6)/10 text-(--chart-6) border-(--chart-6)/20",
}

const progressBarMap: Record<number, string> = {
  1: "bg-(--chart-1)",
  2: "bg-(--chart-2)",
  3: "bg-(--chart-3)",
  4: "bg-(--chart-4)",
  5: "bg-(--chart-5)",
  6: "bg-(--chart-6)",
}

export function MetricCard({
  title,
  value,
  change,
  chartVariant = 1,
  sparklineData,
  icon,
  targetProgress,
  className,
}: MetricCardProps) {
  // Determine trend badge color (by default: up = good, down = bad, unless inverted via isPositive = false)
  const isUp = change?.trend === "up"
  const isDown = change?.trend === "down"
  const isPositiveTrend = change?.isPositive !== false ? isUp : isDown

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between p-5 rounded-(--tc-radius-lg) surface-card surface-elevated border-gradient-subtle elevation-1 transition-all duration-(--tc-duration-fast) hover:elevation-2 group overflow-hidden",
        className
      )}
    >
      {/* Top Header: Title & Context Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="type-ui-dense font-medium text-muted-foreground truncate">
          {title}
        </span>
        {icon && (
          <div
            className={cn(
              "w-8 h-8 rounded-(--tc-radius-md) flex items-center justify-center border shrink-0 transition-transform group-hover:scale-105",
              iconTintMap[chartVariant] || iconTintMap[1]
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Hero Metric Value */}
      <div className="my-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-foreground">
          {value}
        </span>
      </div>

      {/* Target Progress Bar (if provided) */}
      {typeof targetProgress === "number" && (
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
            <span>Meta atingida</span>
            <span className="text-foreground">{targetProgress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-secondary/80 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                progressBarMap[chartVariant] || progressBarMap[1]
              )}
              style={{ width: `${Math.min(100, Math.max(0, targetProgress))}%` }}
            />
          </div>
        </div>
      )}

      {/* Sparkline Curve */}
      {sparklineData && sparklineData.length > 1 && (
        <div className="my-1 -mx-1">
          <Sparkline
            data={sparklineData}
            chartVariant={chartVariant}
            height={36}
          />
        </div>
      )}

      {/* Bottom Row: Trend Delta Pill & Period */}
      {change && (
        <div className="flex items-center gap-2 pt-1 mt-auto text-xs">
          <div
            className={cn(
              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-(--tc-radius-sm) font-semibold text-[11px] leading-tight border",
              isPositiveTrend
                ? "bg-(--status-success-subtle) text-(--status-success-text) border-(--status-success-border)"
                : isDown || !isPositiveTrend
                ? "bg-(--status-danger-subtle) text-(--status-danger-text) border-(--status-danger-border)"
                : "bg-secondary text-secondary-foreground border-border"
            )}
          >
            {isUp && <TrendingUp className="w-3 h-3" />}
            {isDown && <TrendingDown className="w-3 h-3" />}
            {!isUp && !isDown && <Minus className="w-3 h-3" />}
            <span>{change.value}</span>
          </div>
          {change.period && (
            <span className="text-muted-foreground text-[11px] font-medium truncate">
              {change.period}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
