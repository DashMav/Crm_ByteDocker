"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCRM, type OpportunityStage } from "@/components/crm/store"

type OpportunityFormProps = {
  id?: string
  initial?: {
    client?: string
    value?: number
    closeDate?: string
    probability?: number // 0..1
    stage?: OpportunityStage
  }
  onDone?: () => void
}

export function OpportunityForm({ id, initial, onDone }: OpportunityFormProps) {
  const { addOpportunity, updateOpportunity } = useCRM()
  const [client, setClient] = React.useState(initial?.client ?? "")
  const [value, setValue] = React.useState<number>(initial?.value ?? 25000)
  const [closeDate, setCloseDate] = React.useState(initial?.closeDate ?? new Date().toISOString().slice(0, 10))
  const [prob, setProb] = React.useState<number>(Math.round((initial?.probability ?? 0.3) * 100))
  const [stage, setStage] = React.useState<OpportunityStage>(initial?.stage ?? "Demo")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!client.trim() || !value || value < 0) return
    const payload = { client, value, closeDate, probability: Math.max(0, Math.min(1, prob / 100)), stage }
    if (id) updateOpportunity(id, payload)
    else addOpportunity(payload)
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label htmlFor="opp-client">Client</Label>
        <Input id="opp-client" value={client} onChange={(e) => setClient(e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="opp-value">Value</Label>
          <Input
            id="opp-value"
            type="number"
            min={0}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="opp-close">Close date</Label>
          <Input id="opp-close" type="date" value={closeDate} onChange={(e) => setCloseDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="opp-prob">Probability (%)</Label>
          <Input
            id="opp-prob"
            type="number"
            min={0}
            max={100}
            value={prob}
            onChange={(e) => setProb(Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <Label>Stage</Label>
        <Select value={stage} onValueChange={(v) => setStage(v as OpportunityStage)}>
          <SelectTrigger>
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Demo">Demo</SelectItem>
            <SelectItem value="Proposal">Proposal</SelectItem>
            <SelectItem value="Negotiation">Negotiation</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
          {id ? "Save changes" : "Add opportunity"}
        </Button>
      </div>
    </form>
  )
}
