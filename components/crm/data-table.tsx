"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Column<T> = {
  key: keyof T | string
  header: string
  sortable?: boolean
  width?: string
  render?: (row: T) => React.ReactNode
}

type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  search?: string
  onSearchChange?: (v: string) => void
  pageSizeOptions?: number[]
  defaultPageSize?: number
  getRowId: (row: T) => string
  className?: string
  onExportCsv?: () => void
  onBulkAction?: (ids: string, action: string) => void
}

export function DataTable<T>({
  data,
  columns,
  search,
  onSearchChange,
  pageSizeOptions = [10, 25, 50],
  defaultPageSize = 10,
  getRowId,
  className,
  onExportCsv,
  onBulkAction,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(defaultPageSize)
  const [sortBy, setSortBy] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null)
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})

  const filtered = React.useMemo(() => {
    if (!search) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      Object.values(row as any).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      ),
    )
  }, [data, search])

  const sorted = React.useMemo(() => {
    if (!sortBy) return filtered
    const { key, dir } = sortBy
    return [...filtered].sort((a: any, b: any) => {
      const av = a[key]
      const bv = b[key]
      if (av == null && bv == null) return 0
      if (av == null) return dir === "asc" ? -1 : 1
      if (bv == null) return dir === "asc" ? 1 : -1
      if (typeof av === "number" && typeof bv === "number") {
        return dir === "asc" ? av - bv : bv - av
      }
      return dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
  }, [filtered, sortBy])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  React.useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [page, totalPages])

  const pageData = React.useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize])

  const allOnPageIds = pageData.map(getRowId)
  const allOnPageSelected = allOnPageIds.every((id) => selected[id])
  const someOnPageSelected = allOnPageIds.some((id) => selected[id])

  function toggleAllOnPage(checked: boolean) {
    setSelected((prev) => {
      const next = { ...prev }
      allOnPageIds.forEach((id) => (next[id] = checked))
      return next
    })
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => ({ ...prev, [id]: checked }))
  }

  function handleHeaderClick(col: Column<T>) {
    if (!col.sortable) return
    const key = String(col.key)
    setSortBy((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" }
      return { key, dir: prev.dir === "asc" ? "desc" : "asc" }
    })
  }

  function handleBulk(action: string) {
    const ids = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([k]) => k)
      .join(",")
    onBulkAction?.(ids, action)
  }

  return (
    <div className={cn("rounded-md border border-border bg-background", className)}>
      <div className="flex items-center gap-2 p-3 border-b border-border">
        <Input
          placeholder="Search..."
          value={search ?? ""}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="max-w-xs"
        />
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleBulk("assign")}>Assign Owner</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulk("convert")}>Convert</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulk("delete")}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Rows: {pageSize} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {pageSizeOptions.map((s) => (
                <DropdownMenuItem key={s} onClick={() => setPageSize(s)}>
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={() => onExportCsv?.()}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="w-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="w-10 px-3 py-2 text-left">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={(v) => toggleAllOnPage(Boolean(v))}
                  aria-label="Select all rows on page"
                  {...(someOnPageSelected && !allOnPageSelected ? { "data-state": "indeterminate" } : {})}
                />
              </th>
              {columns.map((col) => {
                const active = sortBy?.key === String(col.key)
                return (
                  <th
                    key={String(col.key)}
                    className="px-3 py-2 text-left font-medium text-foreground/80 select-none"
                    style={col.width ? { width: col.width } : undefined}
                  >
                    <button
                      type="button"
                      className={cn(
                        "inline-flex items-center gap-1",
                        col.sortable ? "hover:underline" : "cursor-default",
                      )}
                      onClick={() => handleHeaderClick(col)}
                    >
                      {col.header}
                      {col.sortable && (
                        <span className="text-xs text-foreground/60">
                          {active ? (sortBy?.dir === "asc" ? "↑" : "↓") : ""}
                        </span>
                      )}
                    </button>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => {
              const id = getRowId(row)
              return (
                <tr key={id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-3 py-2">
                    <Checkbox
                      checked={!!selected[id]}
                      onCheckedChange={(v) => toggleRow(id, Boolean(v))}
                      aria-label={`Select row ${id}`}
                    />
                  </td>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-3 py-2 align-top">
                      {col.render ? col.render(row) : String((row as any)[col.key])}
                    </td>
                  ))}
                </tr>
              )
            })}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-8 text-center text-foreground/60">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-3">
        <div className="text-xs text-foreground/60">
          Page {page} of {totalPages} • {sorted.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
