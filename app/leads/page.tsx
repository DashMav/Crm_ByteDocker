"use client"

import { CRMShell } from "@/components/crm/shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCRM } from "@/components/crm/store"
import { DataTable } from "@/components/crm/data-table"
import * as React from "react"
import { LeadForm } from "@/components/crm/forms/lead-form"

export default function LeadsPage() {
  const { state, deleteLead } = useCRM()
  const [search, setSearch] = React.useState("")
  const [openCreate, setOpenCreate] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const editing = state.leads.find((l) => l.id === editingId) || null

  const columns = [
    { key: "name", header: "Name", sortable: true },
    { key: "source", header: "Source", sortable: true },
    { key: "status", header: "Status", sortable: true },
    { key: "score", header: "Score", sortable: true, width: "90px" },
    { key: "owner", header: "Owner", sortable: true },
    {
      key: "actions",
      header: "",
      render: (row: (typeof state.leads)[number]) => (
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
            onClick={() => deleteLead(row.id)}
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
        <h1 className="text-xl font-semibold">Leads</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">Add Lead</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Lead</DialogTitle>
            </DialogHeader>
            <LeadForm onDone={() => setOpenCreate(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border border-border">
        <CardContent className="pt-6">
          <DataTable
            data={state.leads}
            columns={columns as any}
            search={search}
            onSearchChange={setSearch}
            defaultPageSize={10}
            getRowId={(r) => r.id}
            onBulkAction={(ids, action) => {
              // optional: implement future bulk actions
              console.log("[v0] leads bulk action:", action, ids)
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={!!editingId} onOpenChange={(o) => !o && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
          </DialogHeader>
          {editing && <LeadForm id={editing.id} initial={editing} onDone={() => setEditingId(null)} />}
        </DialogContent>
      </Dialog>
    </CRMShell>
  )
}
