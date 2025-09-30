"use client"

import * as React from "react"
import { CRMShell } from "@/components/crm/shell"
import { useCRM } from "@/components/crm/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const partners = [
  { name: "NovaPay", category: "Reseller", tier: "Gold", accounts: 24, owner: "A. Diaz", createdAt: new Date() },
  { name: "Atlas IT", category: "SI", tier: "Silver", accounts: 12, owner: "J. Kim", createdAt: new Date() },
  {
    name: "BlueEdge",
    category: "Tech Alliance",
    tier: "Platinum",
    accounts: 8,
    owner: "S. Patel",
    createdAt: new Date(),
  },
  { name: "Quanta", category: "Referral", tier: "Bronze", accounts: 15, owner: "T. Lee", createdAt: new Date() },
]

export default function PartnersPage() {
  const { state, addPartner } = useCRM()
  const [search, setSearch] = React.useState("")
  const [newOpen, setNewOpen] = React.useState(false)
  const [viewOpen, setViewOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<{
    name: string
    category: string
    tier: string
    accounts: number
    owner: string
    createdAt: Date
  } | null>(null)

  function pickPartner(name: string) {
    return state.partners.find((p) => p.name === name) || null
  }

  const [form, setForm] = React.useState({
    name: "",
    category: "Reseller" as "Reseller" | "SI" | "Tech Alliance" | "Referral",
    tier: "Gold" as "Platinum" | "Gold" | "Silver" | "Bronze",
    accounts: 0,
    owner: "You",
  })

  function handleCreate() {
    if (!form.name.trim()) return
    addPartner({
      name: form.name.trim(),
      category: form.category,
      tier: form.tier,
      accounts: Number(form.accounts) || 0,
      owner: form.owner || "You",
      createdAt: new Date(),
    })
    setForm({ name: "", category: "Reseller", tier: "Gold", accounts: 0, owner: "You" })
    setNewOpen(false)
  }

  const onView = (name: string) => {
    const p = pickPartner(name)
    setSelected(p)
    setViewOpen(!!p)
  }

  const filtered = state.partners.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Partner Management</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setNewOpen(true)}>
            New Partner
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
            Programs
          </Button>
        </div>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Search partners..."
              aria-label="Search partners"
              className="md:col-span-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select>
              <SelectTrigger aria-label="Category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="reseller">Reseller</SelectItem>
                <SelectItem value="si">SI</SelectItem>
                <SelectItem value="alliance">Tech Alliance</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Tier">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Partner</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Tier</th>
                  <th className="py-2">Accounts</th>
                  <th className="py-2">Owner</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.name} className="border-t hover:bg-gray-50">
                    <td className="py-2">{p.name}</td>
                    <td className="py-2">{p.category}</td>
                    <td className="py-2">{p.tier}</td>
                    <td className="py-2">{p.accounts}</td>
                    <td className="py-2">{p.owner}</td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-200 bg-transparent"
                          onClick={() => onView(p.name)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => onView(p.name)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Partner</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v as typeof f.category }))}
              >
                <SelectTrigger aria-label="Category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reseller">Reseller</SelectItem>
                  <SelectItem value="SI">SI</SelectItem>
                  <SelectItem value="Tech Alliance">Tech Alliance</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.tier} onValueChange={(v) => setForm((f) => ({ ...f, tier: v as typeof f.tier }))}>
                <SelectTrigger aria-label="Tier">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                min={0}
                placeholder="Accounts"
                value={form.accounts}
                onChange={(e) => setForm((f) => ({ ...f, accounts: Number(e.target.value) }))}
              />
            </div>
            <Input
              placeholder="Owner"
              value={form.owner}
              onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreate}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Partner details</DialogTitle>
          </DialogHeader>
          {selected ? (
            <div className="grid gap-2 text-sm">
              <div>
                <span className="text-gray-500">Name:</span> {selected.name}
              </div>
              <div>
                <span className="text-gray-500">Category:</span> {selected.category}
              </div>
              <div>
                <span className="text-gray-500">Tier:</span> {selected.tier}
              </div>
              <div>
                <span className="text-gray-500">Accounts:</span> {selected.accounts}
              </div>
              <div>
                <span className="text-gray-500">Owner:</span> {selected.owner}
              </div>
              <div>
                <span className="text-gray-500">Created:</span> {new Date(selected.createdAt).toLocaleString()}
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button onClick={() => setViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CRMShell>
  )
}
