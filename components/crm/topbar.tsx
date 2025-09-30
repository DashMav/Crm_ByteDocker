"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, UserCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useCurrency } from "@/components/crm/currency"

export function Topbar() {
  const { currency, setCurrency } = useCurrency()
  return (
    <header className="h-14 flex items-center justify-between gap-3 border-b px-4 bg-card/80 backdrop-blur-md">
      <div className="flex items-center gap-3 flex-1">
        <div className="md:hidden font-semibold text-primary">PayGate CRM</div>
        <div className="hidden md:block w-full max-w-xl">
          <label htmlFor="global-search" className="sr-only">
            Global search
          </label>
          <Input id="global-search" placeholder="Search leads, accounts, opportunities..." className="w-full" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Select value={currency} onValueChange={(v) => setCurrency(v as any)}>
          <SelectTrigger className="w-[130px]" aria-label="Currency">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="USD">USD (US)</SelectItem>
            <SelectItem value="INR">INR (India)</SelectItem>
            <SelectItem value="BRL">BRL (Brazil)</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
        <Button variant="outline" className="border-border hover:bg-muted bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Create Opportunity
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-2">
              <UserCircle2 className="h-6 w-6" />
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
