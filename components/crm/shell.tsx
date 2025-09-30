import type React from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

export function CRMShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gray-50 dark:bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
