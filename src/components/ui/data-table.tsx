import { useState, useMemo } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table"
import { Button } from "./button"
import { Input } from "./input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"
import { ArrowUpDown, ArrowUp, ArrowDown, Search, FilterX } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DataTableColumn<T> {
  /** Identificador unico da coluna -- usado como key de sort e nas props de sortField/onSort. */
  id: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  /** Presente = coluna ordenavel (cabecalho clicavel, mostra icone de sort). Ausente = coluna estatica. */
  sortValue?: (row: T) => string | number
  align?: "left" | "right" | "center"
  className?: string
  headerClassName?: string
}

export interface DataTableFilter<T> {
  id: string
  label: string
  /** Primeira opcao deve ser o valor "todos" (ex: {value: "all", label: "Todas as fontes"}) --
      nao ha comportamento especial embutido pra "all", a logica de match e toda do predicate. */
  options: { value: string; label: string }[]
  predicate: (row: T, value: string) => boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  getRowId: (row: T) => string
  searchPlaceholder?: string
  /** Texto usado pela busca livre -- omitir remove a caixa de busca. */
  searchableText?: (row: T) => string
  filters?: DataTableFilter<T>[]
  defaultSort?: { columnId: string; order: "asc" | "desc" }
  pageSizeOptions?: number[]
  defaultPageSize?: number
  emptyMessage?: string
  className?: string
  /** Altura maxima do CORPO da tabela antes de rolar internamente (cabecalho fica fixo
      via sticky) -- qualquer valor CSS valido (ex: "60vh", "480px"). `null` desativa o
      scroll interno e deixa a tabela crescer livremente (pagina inteira rola por cima
      dela, como antes). Default "60vh": mesmo com paginacao limitando linhas, uma pagina
      cheia (ate 100 linhas) ainda pode nao caber numa janela pequena. */
  maxBodyHeight?: string | null
}

type SortOrder = "asc" | "desc"

/**
 * Tabela generica com busca, filtros (Select) e ordenacao client-side, parametrizada
 * por `columns` -- nao assume nenhum dominio especifico (era hardcoded pra "assinaturas
 * de cliente" antes; qualquer app que precise de tabela com sort/filtro/paginacao usa
 * esta, definindo suas proprias colunas/filtros). Filtragem e ordenacao sao O(n log n)
 * em memoria -- adequado pra datasets de ate alguns milhares de linhas; datasets maiores
 * devem paginar/filtrar no servidor em vez de usar este componente com `data` completo.
 */
export function DataTable<T>({
  data,
  columns,
  getRowId,
  searchPlaceholder = "Buscar...",
  searchableText,
  filters = [],
  defaultSort,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 25,
  emptyMessage = "Nenhum registro encontrado.",
  className,
  maxBodyHeight = "60vh",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterValues, setFilterValues] = useState<Record<string, string>>(
    () => Object.fromEntries(filters.map((f) => [f.id, f.options[0]?.value ?? "all"]))
  )
  const [sortColumnId, setSortColumnId] = useState<string | undefined>(defaultSort?.columnId)
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSort?.order ?? "asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return data.filter((row) => {
      if (term && searchableText && !searchableText(row).toLowerCase().includes(term)) {
        return false
      }
      return filters.every((f) => {
        const value = filterValues[f.id] ?? f.options[0]?.value
        if (value === undefined) return true
        return f.predicate(row, value)
      })
    })
  }, [data, searchTerm, filterValues, filters, searchableText])

  const sortColumn = columns.find((c) => c.id === sortColumnId)

  const sortedData = useMemo(() => {
    if (!sortColumn?.sortValue) return filteredData
    const sorted = [...filteredData].sort((a, b) => {
      const va = sortColumn.sortValue!(a)
      const vb = sortColumn.sortValue!(b)
      const comparison = typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va).localeCompare(String(vb))
      return sortOrder === "asc" ? comparison : -comparison
    })
    return sorted
  }, [filteredData, sortColumn, sortOrder])

  const totalRecords = sortedData.length
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, safePage, pageSize])

  const handleSort = (columnId: string) => {
    if (sortColumnId === columnId) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"))
    } else {
      setSortColumnId(columnId)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setFilterValues(Object.fromEntries(filters.map((f) => [f.id, f.options[0]?.value ?? "all"])))
    setCurrentPage(1)
  }

  const hasActiveFilters =
    !!searchTerm || filters.some((f) => filterValues[f.id] !== (f.options[0]?.value ?? "all"))

  const getSortIcon = (columnId: string) => {
    if (sortColumnId !== columnId) return <ArrowUpDown className="w-3.5 h-3.5 opacity-50 ml-1.5" />
    return sortOrder === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-primary ml-1.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-primary ml-1.5" />
    )
  }

  const alignClass = (align?: "left" | "right" | "center") =>
    align === "right" ? "text-right" : align === "center" ? "text-center" : ""

  return (
    <div className={cn("space-y-4", className)}>
      {(searchableText || filters.length > 0) && (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {searchableText && (
            <div className="flex flex-1 items-center gap-2.5 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>
          )}

          {filters.length > 0 && (
            <div className="flex items-center gap-2">
              {filters.map((f) => (
                <Select
                  key={f.id}
                  value={filterValues[f.id] ?? f.options[0]?.value}
                  onValueChange={(val) => {
                    setFilterValues((prev) => ({ ...prev, [f.id]: val }))
                    setCurrentPage(1)
                  }}
                >
                  <SelectTrigger className="h-9 w-[150px] text-xs">
                    <SelectValue placeholder={f.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {f.options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="h-9 px-2 text-muted-foreground hover:text-foreground"
                  title="Limpar filtros"
                >
                  <FilterX className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <div className="rounded-(--tc-radius-lg) border-gradient-subtle elevation-1 overflow-hidden">
        <div
          className={cn(maxBodyHeight && "overflow-y-auto")}
          style={maxBodyHeight ? { maxHeight: maxBodyHeight } : undefined}
        >
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead
                    key={col.id}
                    className={cn(
                      col.sortValue && "cursor-pointer select-none",
                      alignClass(col.align),
                      // Sticky no <th> (nao no <tr>/<thead>) -- mais confiavel em
                      // layout de tabela. Fundo OPACO (nao o /40 default do
                      // TableHeader): com sticky, linhas passam por baixo ao rolar,
                      // transparencia deixaria o texto delas visivel atras dos labels.
                      maxBodyHeight && "sticky top-0 z-10 bg-surface-elevated",
                      col.headerClassName
                    )}
                    onClick={col.sortValue ? () => handleSort(col.id) : undefined}
                  >
                    <div className={cn("flex items-center", col.align === "right" && "justify-end")}>
                      {col.header}
                      {col.sortValue && getSortIcon(col.id)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row) => (
                  <TableRow key={getRowId(row)}>
                    {columns.map((col) => (
                      <TableCell key={col.id} className={cn(alignClass(col.align), col.className)}>
                        {col.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
        <div className="flex items-center gap-2">
          <span>Mostrando</span>
          <span className="font-semibold text-foreground">
            {totalRecords === 0 ? 0 : (safePage - 1) * pageSize + 1}
          </span>
          <span>a</span>
          <span className="font-semibold text-foreground">
            {Math.min(safePage * pageSize, totalRecords)}
          </span>
          <span>de</span>
          <span className="font-semibold text-foreground">{totalRecords}</span>
          <span>resultados</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Linhas por página:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(val) => {
                setPageSize(Number(val))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-[70px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Pagination className="w-auto mx-0">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (safePage > 1) setCurrentPage((p) => p - 1)
                  }}
                  className={safePage <= 1 ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={safePage === pageNum}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(pageNum)
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (safePage < totalPages) setCurrentPage((p) => p + 1)
                  }}
                  className={safePage >= totalPages ? "pointer-events-none opacity-40" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
