"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plus, Filter, ChevronDown } from "lucide-react"

type ListToolbarProps = {
  title: string
  search: string
  onSearchChange: (v: string) => void
  onNew?: () => void
  children?: React.ReactNode // for extra filter controls
}

export function ListToolbar({ title, search, onSearchChange, onNew, children }: ListToolbarProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-pretty">{title}</h1>
        <p className="text-sm text-foreground/60">Manage and track records</p>
      </div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-48"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filters <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {children || <DropdownMenuItem disabled>No filters</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={onNew}>
          <Plus className="h-4 w-4 mr-2" /> New
        </Button>
      </div>
    </header>
  )
}
