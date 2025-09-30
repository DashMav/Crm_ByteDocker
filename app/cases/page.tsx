"use client"

import * as React from "react"
import { CRMShell } from "@/components/crm/shell"
import { useCRM } from "@/components/crm/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const cases = [
  {
    id: "CS-1042",
    subject: "Payment declined",
    priority: "High",
    status: "Open",
    account: "Acme Corp",
    owner: "F. Hill",
    createdAt: new Date(),
  },
  {
    id: "CS-1041",
    subject: "Refund request",
    priority: "Medium",
    status: "Pending",
    account: "Globex",
    owner: "M. Chu",
    createdAt: new Date(),
  },
  {
    id: "CS-1040",
    subject: "Chargeback dispute",
    priority: "High",
    status: "New",
    account: "Umbrella Group",
    owner: "P. Nair",
    createdAt: new Date(),
  },
  {
    id: "CS-1039",
    subject: "API timeout",
    priority: "Low",
    status: "Closed",
    account: "Wayne Tech",
    owner: "T. Lee",
    createdAt: new Date(),
  },
]

export default function CasesPage() {
  const { state, addCase } = useCRM()
  const [search, setSearch] = React.useState("")
  const [newOpen, setNewOpen] = React.useState(false)
  const [viewOpen, setViewOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<{
    id: string
    subject: string
    priority: string
    status: string
    account: string
    owner: string
    createdAt: Date
  } | null>(null)

  const accounts = React.useMemo(() => state.accounts.map((a) => a.name), [state.accounts])

  const [form, setForm] = React.useState({
    subject: "",
    priority: "Medium" as "High" | "Medium" | "Low",
    status: "New" as "New" | "Open" | "Pending" | "Closed",
    account: accounts[0] || "",
    owner: "You",
  })

  function pickCase(id: string) {
    return state.cases.find((c) => c.id === id) || null
  }

  function handleCreate() {
    if (!form.subject.trim()) return
    addCase({
      subject: form.subject.trim(),
      priority: form.priority,
      status: form.status,
      account: form.account || accounts[0] || "Acme Corp",
      owner: form.owner || "You",
    })
    setForm({ subject: "", priority: "Medium", status: "New", account: accounts[0] || "", owner: "You" })
    setNewOpen(false)
  }

  const onView = (id: string) => {
    const c = pickCase(id)
    setSelected(c)
    setViewOpen(!!c)
  }

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Cases</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setNewOpen(true)}>
            New Case
          </Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
            Assign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="open" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
        <div className="max-w-md">
          <Input
            placeholder="Search cases..."
            aria-label="Search cases"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <TabsContent value="open">
          <CaseTable
            items={state.cases.filter(
              (c) => c.status === "Open" && c.subject.toLowerCase().includes(search.toLowerCase()),
            )}
            onView={onView}
          />
        </TabsContent>
        <TabsContent value="new">
          <CaseTable
            items={state.cases.filter(
              (c) => c.status === "New" && c.subject.toLowerCase().includes(search.toLowerCase()),
            )}
            onView={onView}
          />
        </TabsContent>
        <TabsContent value="pending">
          <CaseTable
            items={state.cases.filter(
              (c) => c.status === "Pending" && c.subject.toLowerCase().includes(search.toLowerCase()),
            )}
            onView={onView}
          />
        </TabsContent>
        <TabsContent value="closed">
          <CaseTable
            items={state.cases.filter(
              (c) => c.status === "Closed" && c.subject.toLowerCase().includes(search.toLowerCase()),
            )}
            onView={onView}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Case</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <Input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select
                value={form.priority}
                onValueChange={(v) => setForm((f) => ({ ...f, priority: v as typeof f.priority }))}
              >
                <SelectTrigger aria-label="Priority">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as typeof f.status }))}
              >
                <SelectTrigger aria-label="Status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={form.account} onValueChange={(v) => setForm((f) => ({ ...f, account: v }))}>
                <SelectTrigger aria-label="Account">
                  <SelectValue placeholder="Account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <DialogTitle>Case details</DialogTitle>
          </DialogHeader>
          {selected ? (
            <div className="grid gap-2 text-sm">
              <div>
                <span className="text-gray-500">Subject:</span> {selected.subject}
              </div>
              <div>
                <span className="text-gray-500">Priority:</span> {selected.priority}
              </div>
              <div>
                <span className="text-gray-500">Status:</span> {selected.status}
              </div>
              <div>
                <span className="text-gray-500">Account:</span> {selected.account}
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

function CaseTable({
  items,
  onView,
}: {
  items: Array<{
    id: string
    subject: string
    priority: string
    status: string
    account: string
    owner: string
    createdAt: Date
  }>
  onView: (id: string) => void
}) {
  return (
    <Card className="border border-gray-200">
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Case</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Priority</th>
                <th className="py-2">Status</th>
                <th className="py-2">Account</th>
                <th className="py-2">Owner</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="py-2">{c.id.slice(0, 8)}</td>
                  <td className="py-2">{c.subject}</td>
                  <td className="py-2">{c.priority}</td>
                  <td className="py-2">{c.status}</td>
                  <td className="py-2">{c.account}</td>
                  <td className="py-2">{c.owner}</td>
                  <td className="py-2 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 bg-transparent"
                      onClick={() => onView(c.id)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
