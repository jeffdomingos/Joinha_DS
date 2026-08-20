import { useState, useMemo } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table"
import { Badge } from "./badge"
import { Tag } from "./tag"
import { Button } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  FilterX,
  FileEdit,
  Copy,
  Trash2,
} from "lucide-react"

export interface DataTableRecord {
  id: string
  customer: {
    name: string
    email: string
    avatar?: string
  }
  plan: "Starter" | "Pro" | "Enterprise" | "Custom"
  status: "active" | "trialing" | "past_due" | "canceled"
  mrr: number
  billingCycle: "Monthly" | "Annual"
  joinedDate: string
}

interface DataTableProps {
  data: DataTableRecord[]
  className?: string
}

type SortField = "customer" | "plan" | "status" | "mrr" | "joinedDate"
type SortOrder = "asc" | "desc"

export function DataTable({ data, className }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [sortField, setSortField] = useState<SortField>("mrr")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  // 1. Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter

      const matchesPlan =
        planFilter === "all" ? true : item.plan.toLowerCase() === planFilter.toLowerCase()

      return matchesSearch && matchesStatus && matchesPlan
    })
  }, [data, searchTerm, statusFilter, planFilter])

  // 2. Sorting Logic
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let comparison = 0
      if (sortField === "customer") {
        comparison = a.customer.name.localeCompare(b.customer.name)
      } else if (sortField === "plan") {
        comparison = a.plan.localeCompare(b.plan)
      } else if (sortField === "status") {
        comparison = a.status.localeCompare(b.status)
      } else if (sortField === "mrr") {
        comparison = a.mrr - b.mrr
      } else if (sortField === "joinedDate") {
        comparison = new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime()
      }

      return sortOrder === "asc" ? comparison : -comparison
    })
  }, [filteredData, sortField, sortOrder])

  // 3. Pagination Logic
  const totalRecords = sortedData.length
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPlanFilter("all")
    setCurrentPage(1)
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 opacity-50 ml-1.5" />
    return sortOrder === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-primary ml-1.5" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-primary ml-1.5" />
    )
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val)
  }

  return (
    <div className={`space-y-4 ${className || ""}`}>
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-1 items-center gap-2.5 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar cliente, email ou ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="h-9 w-[130px] text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="trialing">Em Teste</SelectItem>
              <SelectItem value="past_due">Atrasado</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          {/* Plan Filter */}
          <Select
            value={planFilter}
            onValueChange={(val) => {
              setPlanFilter(val)
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="h-9 w-[130px] text-xs">
              <SelectValue placeholder="Plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos Planos</SelectItem>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {(searchTerm || statusFilter !== "all" || planFilter !== "all") && (
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
      </div>

      {/* Main Table Surface */}
      <div className="rounded-(--tc-radius-lg) border-gradient-subtle elevation-1 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("customer")}
              >
                <div className="flex items-center">
                  Cliente {getSortIcon("customer")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("plan")}
              >
                <div className="flex items-center">
                  Plano {getSortIcon("plan")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status {getSortIcon("status")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-right"
                onClick={() => handleSort("mrr")}
              >
                <div className="flex items-center justify-end">
                  MRR {getSortIcon("mrr")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("joinedDate")}
              >
                <div className="flex items-center">
                  Data de Início {getSortIcon("joinedDate")}
                </div>
              </TableHead>
              <TableHead className="w-[50px] text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  Nenhum registro encontrado para os filtros selecionados.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {/* Customer Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-xs shrink-0 border border-border">
                        {row.customer.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-foreground truncate">
                          {row.customer.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate font-medium">
                          {row.customer.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Plan Tag */}
                  <TableCell>
                    {row.plan === "Enterprise" && (
                      <Tag variant="purple" size="sm">Enterprise</Tag>
                    )}
                    {row.plan === "Pro" && (
                      <Tag variant="teal" size="sm">Pro</Tag>
                    )}
                    {row.plan === "Starter" && (
                      <Tag variant="gray" size="sm">Starter</Tag>
                    )}
                    {row.plan === "Custom" && (
                      <Tag variant="pink" size="sm">Custom</Tag>
                    )}
                  </TableCell>

                  {/* Status Badge with accessible indicators */}
                  <TableCell>
                    {row.status === "active" && (
                      <Badge variant="success" dot size="sm">Ativo</Badge>
                    )}
                    {row.status === "trialing" && (
                      <Badge variant="info" dot size="sm">Em Teste</Badge>
                    )}
                    {row.status === "past_due" && (
                      <Badge variant="warning" dot size="sm">Atrasado</Badge>
                    )}
                    {row.status === "canceled" && (
                      <Badge variant="danger" dot size="sm">Cancelado</Badge>
                    )}
                  </TableCell>

                  {/* MRR Currency with tabular figures */}
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="type-data-mono font-medium text-foreground">
                        {formatCurrency(row.mrr)}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        /{row.billingCycle === "Monthly" ? "mês" : "ano"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Joined Date */}
                  <TableCell className="type-data-mono text-xs text-muted-foreground">
                    {new Date(row.joinedDate).toLocaleDateString("pt-BR")}
                  </TableCell>

                  {/* Row Actions Menu */}
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          aria-label="Abrir menu de ações"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileEdit className="w-4 h-4" /> Editar Assinatura
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4" /> Copiar ID ({row.id})
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash2 className="w-4 h-4" /> Cancelar Assinatura
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground pt-1">
        <div className="flex items-center gap-2">
          <span>Mostrando</span>
          <span className="font-semibold text-foreground">
            {totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>
          <span>a</span>
          <span className="font-semibold text-foreground">
            {Math.min(currentPage * pageSize, totalRecords)}
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
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-2 font-medium">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
