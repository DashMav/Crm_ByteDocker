"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useCRM } from "@/components/crm/store"

type LeadFormProps = {
  id?: string
  initial?: {
    name?: string
    source?: "Web" | "Email" | "Event" | "Referral" | "Other"
    status?: "New" | "Contacted" | "Qualified" | "Nurturing"
    score?: number
    owner?: string
  }
  onDone?: () => void
}

export function LeadForm({ id, initial, onDone }: LeadFormProps) {
  const { addLead, updateLead } = useCRM()
  const [name, setName] = React.useState(initial?.name ?? "")
  const [source, setSource] = React.useState<"Web" | "Email" | "Event" | "Referral" | "Other">(initial?.source ?? "Web")
  const [status, setStatus] = React.useState<"New" | "Contacted" | "Qualified" | "Nurturing">(initial?.status ?? "New")
  const [score, setScore] = React.useState<number>(initial?.score ?? 50)
  const [owner, setOwner] = React.useState(initial?.owner ?? "Unassigned")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    if (id) {
      updateLead(id, { name, source, status, score, owner })
    } else {
      addLead({ name, source, status, score, owner })
    }
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label htmlFor="lead-name">Name</Label>
        <Input
          id="lead-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Company - Person"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label>Source</Label>
          <Select value={source} onValueChange={(v) => setSource(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Web">Web</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Nurturing">Nurturing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="lead-score">Score</Label>
          <Input
            id="lead-score"
            type="number"
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
            min={0}
            max={100}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="lead-owner">Owner</Label>
        <Input id="lead-owner" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="e.g. S. Patel" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
          {id ? "Save changes" : "Add lead"}
        </Button>
      </div>
    </form>
  )
}
