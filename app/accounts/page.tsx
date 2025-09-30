"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCRM } from "@/components/crm/store"
import { useCurrency } from "@/components/crm/currency"
import { DataTable } from "@/components/crm/data-table"
import * as React from "react"
import { AccountForm } from "@/components/crm/forms/account-form"

export default function AccountsPage() {
  const { state, deleteAccount } = useCRM()
  const { formatCurrency } = useCurrency()
  const [search, setSearch] = React.useState("")
  const [openCreate, setOpenCreate] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const editing = state.accounts.find((a) => a.id === editingId) || null

  const columns = [
    { key: "name", header: "Account", sortable: true },
    { key: "industry", header: "Industry", sortable: true },
    {
      key: "arr",
      header: "ARR",
      sortable: true,
      render: (row: (typeof state.accounts)[number]) => formatCurrency(row.arr),
      width: "120px",
    },
    { key: "stage", header: "Stage", sortable: true },
    { key: "owner", header: "Owner", sortable: true },
    {
      key: "actions",
      header: "",
      render: (row: (typeof state.accounts)[number]) => (
        <div className="flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-border bg-transparent"
            onClick={() => setEditingId(row.id)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border bg-transparent"
            onClick={() => deleteAccount(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
      width: "180px",
    },
  ]

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Accounts</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">New Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Account</DialogTitle>
            </DialogHeader>
            <AccountForm onDone={() => setOpenCreate(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-border">
        <CardContent className="pt-6">
          <DataTable
            data={state.accounts}
            columns={columns as any}
            search={search}
            onSearchChange={setSearch}
            defaultPageSize={10}
            getRowId={(r) => r.id}
          />
        </CardContent>
      </Card>

      <Dialog open={!!editingId} onOpenChange={(o) => !o && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          {editing && <AccountForm id={editing.id} initial={editing} onDone={() => setEditingId(null)} />}
        </DialogContent>
      </Dialog>
    </CRMShell>
  )
}
