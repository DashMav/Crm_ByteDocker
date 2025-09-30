"use client"

import { CRMShell } from "@/components/crm/shell"
import { Kanban, type KanbanCard, type KanbanColumn } from "@/components/crm/kanban"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { useCRM } from "@/components/crm/store"
import { OpportunityForm } from "@/components/crm/forms/opportunity-form"
import { useCurrency } from "@/components/crm/currency"

type Card = {
  client: string
  value: string
  close: string
  probability: number
}

const COLUMNS: KanbanColumn[] = [
  { id: "Demo", title: "Demo" },
  { id: "Proposal", title: "Proposal" },
  { id: "Negotiation", title: "Negotiation" },
  { id: "Closed", title: "Closed" },
]

export default function OpportunitiesPage() {
  const { state, updateOpportunity } = useCRM()
  const { formatCurrency } = useCurrency()
  const [openCreate, setOpenCreate] = React.useState(false)

  const cards: KanbanCard[] = state.opportunities.map((o) => ({
    id: o.id,
    columnId: o.stage,
    title: o.client,
    subtitle: `Close ${new Date(o.closeDate).toLocaleDateString()}`,
    value: formatCurrency(o.value),
    meta: `Probability: ${Math.round(o.probability * 100)}%`,
  }))

  // Force Kanban to reflect store changes
  const kanbanKey = React.useMemo(
    () => state.opportunities.map((o) => `${o.id}:${o.stage}`).join("|"),
    [state.opportunities],
  )

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Opportunities</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">Create Opportunity</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Opportunity</DialogTitle>
            </DialogHeader>
            <OpportunityForm onDone={() => setOpenCreate(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Kanban
        key={kanbanKey}
        columns={COLUMNS}
        initialCards={cards}
        onChange={(updated) => {
          // Map card column changes back to store
          updated.forEach((c) => {
            const opp = state.opportunities.find((o) => o.id === c.id)
            if (opp && opp.stage !== (c.columnId as any)) {
              updateOpportunity(opp.id, { stage: c.columnId as any })
            }
          })
        }}
      />
    </CRMShell>
  )
}
