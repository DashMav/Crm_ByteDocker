"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useCRM } from "@/components/crm/store"

type AccountFormProps = {
  id?: string
  initial?: {
    name?: string
    industry?: "Fintech" | "E-commerce" | "Healthcare" | "Technology" | "Other"
    arr?: number
    stage?: "Prospect" | "Customer"
    owner?: string
  }
  onDone?: () => void
}

export function AccountForm({ id, initial, onDone }: AccountFormProps) {
  const { addAccount, updateAccount } = useCRM()
  const [name, setName] = React.useState(initial?.name ?? "")
  const [industry, setIndustry] = React.useState<"Fintech" | "E-commerce" | "Healthcare" | "Technology" | "Other">(
    initial?.industry ?? "Fintech",
  )
  const [arr, setArr] = React.useState<number>(initial?.arr ?? 100000)
  const [stage, setStage] = React.useState<"Prospect" | "Customer">(initial?.stage ?? "Prospect")
  const [owner, setOwner] = React.useState(initial?.owner ?? "Unassigned")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    if (id) {
      updateAccount(id, { name, industry, arr, stage, owner })
    } else {
      addAccount({ name, industry, arr, stage, owner })
    }
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label htmlFor="account-name">Account name</Label>
        <Input id="account-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label>Industry</Label>
          <Select value={industry} onValueChange={(v) => setIndustry(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fintech">Fintech</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="E-commerce">E-commerce</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="account-arr">ARR</Label>
          <Input id="account-arr" type="number" min={0} value={arr} onChange={(e) => setArr(Number(e.target.value))} />
        </div>
        <div>
          <Label>Stage</Label>
          <Select value={stage} onValueChange={(v) => setStage(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prospect">Prospect</SelectItem>
              <SelectItem value="Customer">Customer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="account-owner">Owner</Label>
        <Input id="account-owner" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
          {id ? "Save changes" : "Add account"}
        </Button>
      </div>
    </form>
  )
}
