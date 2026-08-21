import * as React from "react"
import { cn } from "@/lib/utils"

export interface BrandSymbolProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  variant?: "raw" | "badge" | "white" | "black"
}

export function BrandSymbol({ className, variant = "raw", ...props }: BrandSymbolProps) {
  const svgElement = (
    <svg
      viewBox="0 0 766.64 1122.45"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "h-5 w-auto inline-block shrink-0",
        variant === "white" && "text-white fill-white",
        variant === "black" && "text-black fill-black",
        variant === "raw" && "text-foreground fill-foreground",
        className
      )}
      aria-label="Tem Como Logo Symbol"
      {...props}
    >
      <path d="M687.14,454.22c-162.85-81.41-248.24-227.15-276.84-374.56-34.79-179.25-153.08,0-153.08,0-65.11,97.72-81.41,260.55,195.42,390.83C114.96,535.49,29.26,649.62,29.26,649.62c-77.14,64.99,14.07,172.46,91.19,227.97,10.81,97.57,119.93,130.87,119.93,130.87,48.86,97.7,120.5,81.4,120.5,81.4,0,0,31.99,33.15,71.64,32.58,83.02-1.22,66.74-104.94,66.74-104.94,0,0-10.81,6.65-75.95,55.51,81.43-114,59.67-153.22,59.67-153.22,0,0-27.09,39.22-124.79,71.78,130.27-81.42,122.82-186.1,122.82-186.1,0,0-90.26,103.81-269.38,88.39,227.97-32.56,287.64-185.76,287.64-185.76,0,0,15.62-49.5-54.07-32.91-116.58,27.79-173.91,81.75-173.91,81.75,0,0-49.88-107.33-66.17-123.62,65.13,32.56,78.17,61.87,78.17,61.87,0,0,91.2-61.87,188.9-78.15,122.83-23.26,90.25,58.15,65.13,110.73,16.29,65.15-16.29,117.25-16.29,117.25,0,0,27.09,58.48,1.61,125.67l79.83-93.11c130.27-146.54,247.51-309.38,84.68-423.37" />
    </svg>
  )

  if (variant === "badge") {
    return (
      <div className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-brand-mark text-primary-foreground shadow-lg shadow-brand-mark/25 border border-brand-mark/40">
        {React.cloneElement(svgElement, { className: cn("h-10 w-auto text-white fill-white", className) })}
      </div>
    )
  }

  return svgElement
}
