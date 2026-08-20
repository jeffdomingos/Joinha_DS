import { useId } from "react"
import { cn } from "@/lib/utils"

export interface SparklineProps {
  data: number[]
  chartVariant?: 1 | 2 | 3 | 4 | 5 | 6
  height?: number
  className?: string
  filled?: boolean
  /** Small caption anchored to the sparkline (e.g. "Últimos 7 dias") so the curve reads as a real timeframe, not a decorative shape. */
  periodLabel?: string
}

const chartColorMap: Record<number, string> = {
  1: "var(--chart-1)",
  2: "var(--chart-2)",
  3: "var(--chart-3)",
  4: "var(--chart-4)",
  5: "var(--chart-5)",
  6: "var(--chart-6)",
}

export function Sparkline({
  data,
  chartVariant = 1,
  height = 40,
  className,
  filled = true,
  periodLabel,
}: SparklineProps) {
  const gradientId = useId()
  const strokeColor = chartColorMap[chartVariant] || chartColorMap[1]

  if (!data || data.length < 2) {
    return null
  }

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min === 0 ? 1 : max - min

  const width = 120
  const paddingY = 4
  const usableHeight = height - paddingY * 2

  // Map data to coordinate points
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width
    const y = height - paddingY - ((val - min) / range) * usableHeight
    return { x, y }
  })

  // Generate smooth cubic bezier SVG path
  let linePath = `M ${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    const controlPointX = (current.x + next.x) / 2
    linePath += ` C ${controlPointX},${current.y} ${controlPointX},${next.y} ${next.x},${next.y}`
  }

  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`
  const endPoint = points[points.length - 1]

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.32" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {filled && (
          <path
            d={areaPath}
            fill={`url(#${gradientId})`}
            className="transition-all duration-300"
          />
        )}

        <path
          d={linePath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        />

        {/* Endpoint anchor — ties the curve to "this is the value shown above", not an abstract shape */}
        <circle cx={endPoint.x} cy={endPoint.y} r="4" fill="var(--bg-surface)" stroke={strokeColor} strokeWidth="2" />
        <circle cx={endPoint.x} cy={endPoint.y} r="1.75" fill={strokeColor} />
      </svg>

      {periodLabel && (
        <span className="block mt-1 text-[9px] font-medium text-muted-foreground/80 tracking-wide">
          {periodLabel}
        </span>
      )}
    </div>
  )
}
