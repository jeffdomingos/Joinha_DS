import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")
const publicRDir = path.resolve(rootDir, "public", "r")

// Ensure destination directory exists
if (!fs.existsSync(publicRDir)) {
  fs.mkdirSync(publicRDir, { recursive: true })
}

function readFileSafe(relPath) {
  const fullPath = path.resolve(rootDir, relPath)
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, "utf-8")
  }
  return ""
}

// Registry component definitions
const registryItems = [
  {
    name: "utils",
    type: "registry:lib",
    title: "Joinha Utils",
    description: "Utility functions including cn() with clsx and tailwind-merge.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
        content: readFileSafe("src/lib/utils.ts"),
      },
    ],
  },
  {
    name: "tokens",
    type: "registry:style",
    title: "Joinha Tokens (OKLCH)",
    description: "Core CSS variables and design tokens in OKLCH with Dark Mode first palette.",
    dependencies: [],
    files: [
      {
        path: "styles/tokens.css",
        type: "registry:style",
        content: readFileSafe("src/styles/tokens.css"),
      },
      {
        path: "styles/kitchen-sink.css",
        type: "registry:style",
        content: readFileSafe("src/styles/kitchen-sink.css"),
      },
    ],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Primary, secondary, outline, ghost, destructive, and selectable navItem buttons with micro-press physics.",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/button.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/button.tsx"),
      },
    ],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description: "Text input with focus rings, error states, and numerical tabular-nums alignment.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/input.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/input.tsx"),
      },
    ],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Operational status badges with Jewel Tones (solid) and Subtle (washed) variants WCAG 2.2 compliant.",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/badge.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/badge.tsx"),
      },
    ],
  },
  {
    name: "tag",
    type: "registry:ui",
    title: "Tag",
    description: "Categorical organization tags (purple, teal, pink, indigo) with dot and remove handlers.",
    dependencies: ["class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/tag.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/tag.tsx"),
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description: "Accessible toggle switch primitive built on Radix UI.",
    dependencies: ["@radix-ui/react-switch"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/switch.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/switch.tsx"),
      },
    ],
  },
  {
    name: "dialog",
    type: "registry:ui",
    title: "Dialog",
    description: "Modal dialog with smooth scale zoom-in animations and backdrop blur.",
    dependencies: ["@radix-ui/react-dialog", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/dialog.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/dialog.tsx"),
      },
    ],
  },
  {
    name: "alert-dialog",
    type: "registry:ui",
    title: "Alert Dialog",
    description: "Modal confirmation and destructive alert dialog.",
    dependencies: ["@radix-ui/react-alert-dialog"],
    registryDependencies: ["utils", "button"],
    files: [
      {
        path: "components/ui/alert-dialog.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/alert-dialog.tsx"),
      },
    ],
  },
  {
    name: "dropdown-menu",
    type: "registry:ui",
    title: "Dropdown Menu",
    description: "Context menus, options menus and sub-menus with spring animation.",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/dropdown-menu.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/dropdown-menu.tsx"),
      },
    ],
  },
  {
    name: "select",
    type: "registry:ui",
    title: "Select",
    description: "Custom select dropdown with custom scroll and animations.",
    dependencies: ["@radix-ui/react-select", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/select.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/select.tsx"),
      },
    ],
  },
  {
    name: "sonner",
    type: "registry:ui",
    title: "Sonner (Toasts)",
    description: "Opinionated toast notification wrapper styled with OKLCH tokens.",
    dependencies: ["sonner", "next-themes"],
    files: [
      {
        path: "components/ui/sonner.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/sonner.tsx"),
      },
    ],
  },
  {
    name: "table",
    type: "registry:ui",
    title: "Table",
    description: "Semantic table elements styled for dense SaaS tabular data.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/table.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/table.tsx"),
      },
    ],
  },
  {
    name: "data-table",
    type: "registry:ui",
    title: "Data Table",
    description: "Dense SaaS data table with column sorting, status filtering, selection, and pagination.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "table", "badge", "tag", "button", "input", "dropdown-menu", "select"],
    files: [
      {
        path: "components/ui/data-table.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/data-table.tsx"),
      },
    ],
  },
  {
    name: "sparkline",
    type: "registry:ui",
    title: "Sparkline",
    description: "Ultra-light pure SVG sparkline micro-chart with smooth Bézier curves and chart gradients.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/sparkline.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/sparkline.tsx"),
      },
    ],
  },
  {
    name: "metric-card",
    type: "registry:ui",
    title: "Metric Card",
    description: "SaaS KPI card with hero value, trend badge, target progress bar, and embedded sparkline.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "sparkline", "badge"],
    files: [
      {
        path: "components/ui/metric-card.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/metric-card.tsx"),
      },
    ],
  },
  {
    name: "chart",
    type: "registry:ui",
    title: "Chart",
    description: "Official Shadcn Charts wrapper with dynamic CSS theme variable mapping and tooltips for Recharts.",
    dependencies: ["recharts"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/chart.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/chart.tsx"),
      },
    ],
  },
  {
    name: "sidebar",
    type: "registry:block",
    title: "SaaS Sidebar",
    description: "Collapsible SaaS navigation rail with workspaces, route groups, badges, and user profile footer.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "button", "badge", "tag", "dropdown-menu"],
    files: [
      {
        path: "components/layout/sidebar.tsx",
        type: "registry:block",
        content: readFileSafe("src/components/layout/sidebar.tsx"),
      },
    ],
  },
  {
    name: "header",
    type: "registry:block",
    title: "SaaS Header",
    description: "Global application header with breadcrumbs, quick search ⌘K, notifications, theme toggle and CTA.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "button", "input", "dropdown-menu", "badge"],
    files: [
      {
        path: "components/layout/header.tsx",
        type: "registry:block",
        content: readFileSafe("src/components/layout/header.tsx"),
      },
    ],
  },
  {
    name: "app-layout",
    type: "registry:block",
    title: "App Layout Shell",
    description: "Unified master layout connecting sidebar, global header, and scrollable content area with mobile drawer.",
    dependencies: ["lucide-react"],
    registryDependencies: ["utils", "sidebar", "header"],
    files: [
      {
        path: "components/layout/app-layout.tsx",
        type: "registry:block",
        content: readFileSafe("src/components/layout/app-layout.tsx"),
      },
    ],
  },
  {
    name: "brand-symbol",
    type: "registry:ui",
    title: "Brand Symbol",
    description: "Official Tem Como logo symbol vector primitive with responsive sizing and fill support.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/brand-symbol.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/brand-symbol.tsx"),
      },
    ],
  },
  {
    name: "skeleton",
    type: "registry:ui",
    title: "Skeleton",
    description: "Accessible directional shimmer skeleton screen component calibrated for OKLCH luminance elevation.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/skeleton.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/skeleton.tsx"),
      },
    ],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description: "Floating accessible tooltip popup anchored to trigger elements.",
    dependencies: ["@radix-ui/react-tooltip"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/tooltip.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/tooltip.tsx"),
      },
    ],
  },
  {
    name: "kbd",
    type: "registry:ui",
    title: "Kbd",
    description: "Tactile keyboard key representation with monospace font and physical surface styling.",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/kbd.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/kbd.tsx"),
      },
    ],
  },
  {
    name: "alert",
    type: "registry:ui",
    title: "Alert",
    description: "Semantic banner component for inline feedback, errors, tips, and warnings.",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/alert.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/alert.tsx"),
      },
    ],
  },
  {
    name: "sheet",
    type: "registry:ui",
    title: "Sheet",
    description: "Side slide-over drawer panel for deep inspection and off-canvas forms.",
    dependencies: ["@radix-ui/react-dialog", "class-variance-authority", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/sheet.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/sheet.tsx"),
      },
    ],
  },
  {
    name: "checkbox",
    type: "registry:ui",
    title: "Checkbox",
    description: "Accessible control allowing the user to toggle between checked and not-checked options with indeterminate support.",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/checkbox.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/checkbox.tsx"),
      },
    ],
  },
  {
    name: "textarea",
    type: "registry:ui",
    title: "Textarea",
    description: "Multiline text input component with subtle focus ring and OKLCH elevation.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/textarea.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/textarea.tsx"),
      },
    ],
  },
  {
    name: "radio-group",
    type: "registry:ui",
    title: "Radio Group",
    description: "Set of checkable buttons—known as radio buttons—where no more than one can be checked at a time.",
    dependencies: ["@radix-ui/react-radio-group", "lucide-react"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/radio-group.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/radio-group.tsx"),
      },
    ],
  },
  {
    name: "slider",
    type: "registry:ui",
    title: "Slider",
    description: "An input where the user selects a value from within a given range.",
    dependencies: ["@radix-ui/react-slider"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "components/ui/slider.tsx",
        type: "registry:ui",
        content: readFileSafe("src/components/ui/slider.tsx"),
      },
    ],
  },
]

// 1. Write individual component JSON files
let totalFiles = 0
for (const item of registryItems) {
  const filePath = path.resolve(publicRDir, `${item.name}.json`)
  const payload = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies || [],
    registryDependencies: item.registryDependencies || [],
    files: item.files,
  }

  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8")
  totalFiles++
}

// 2. Write index.json summary
const registryIndex = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "joinha-ds",
  homepage: "https://github.com/jeffdomingos/Joinha_DS",
  items: registryItems.map((item) => ({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies || [],
    registryDependencies: item.registryDependencies || [],
  })),
}

fs.writeFileSync(path.resolve(publicRDir, "index.json"), JSON.stringify(registryIndex, null, 2), "utf-8")

console.log(`[Shadcn Registry] Successfully generated ${totalFiles} components into public/r/ and created index.json`)
