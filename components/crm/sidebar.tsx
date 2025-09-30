"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Building2,
  Contact2,
  Files,
  FileText,
  Handshake,
  KanbanSquare,
  LifeBuoy,
  Megaphone,
  Plug,
  Users,
  CheckSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const items: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/accounts", label: "Accounts", icon: Building2 },
  { href: "/contacts", label: "Contacts", icon: Contact2 },
  { href: "/opportunities", label: "Opportunities", icon: KanbanSquare },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/quotes", label: "Quotes", icon: FileText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/cases", label: "Cases", icon: LifeBuoy },
  { href: "/partners", label: "Partners", icon: Handshake },
  { href: "/documents", label: "Documents", icon: Files },
  { href: "/integrations", label: "API Integrations", icon: Plug },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex md:flex-col w-64 border-r bg-white dark:bg-background" aria-label="Primary">
      <div className="h-14 flex items-center px-4 border-b">
        <Link href="/dashboard" className="font-semibold text-blue-600">
          CRM
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-2">
        <ul className="space-y-1 px-2">
          {items.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-muted",
                    active ? "bg-blue-50 text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={cn("h-5 w-5", active ? "text-blue-600" : "text-gray-500")} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-3 text-xs text-gray-500 border-t">{""}</div>
    </aside>
  )
}
