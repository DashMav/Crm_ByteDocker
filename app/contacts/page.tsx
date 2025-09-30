"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCRM } from "@/components/crm/store"
import * as React from "react"
import { ContactForm } from "@/components/crm/forms/contact-form"

export default function ContactsPage() {
  const { state, deleteContact } = useCRM()
  const [openCreate, setOpenCreate] = React.useState(false)
  const [editingEmail, setEditingEmail] = React.useState<string | null>(null)
  const editing = state.contacts.find((c) => c.email === editingEmail) || null

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <div className="flex items-center gap-2">
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">New Contact</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Contact</DialogTitle>
              </DialogHeader>
              <ContactForm onDone={() => setOpenCreate(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
            Import
          </Button>
        </div>
      </div>

      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Search contacts..." aria-label="Search contacts" className="md:col-span-2" />
            <Select>
              <SelectTrigger aria-label="Filter by account">
                <SelectValue placeholder="Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="acme">Acme Corp</SelectItem>
                <SelectItem value="globex">Globex</SelectItem>
                <SelectItem value="umbrella">Umbrella Group</SelectItem>
                <SelectItem value="wayne">Wayne Tech</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Filter by activity">
                <SelectValue placeholder="Last Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7d</SelectItem>
                <SelectItem value="30d">Last 30d</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-foreground/60">
                  <th className="py-2">Name</th>
                  <th className="py-2">Title</th>
                  <th className="py-2">Account</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Last Activity</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {state.contacts.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-muted/30">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2">{c.title}</td>
                    <td className="py-2">{c.account}</td>
                    <td className="py-2">{c.email}</td>
                    <td className="py-2">{c.lastActivity}</td>
                    <td className="py-2">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="border-border bg-transparent">
                          Email
                        </Button>
                        <Button size="sm" className="bg-primary text-primary-foreground">
                          Log Call
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border bg-transparent"
                          onClick={() => setEditingEmail(c.email)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border bg-transparent"
                          onClick={() => deleteContact(c.id)}
                        >
                          Delete
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

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditingEmail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
          </DialogHeader>
          {editing && <ContactForm id={editing.id} initial={editing} onDone={() => setEditingEmail(null)} />}
        </DialogContent>
      </Dialog>
    </CRMShell>
  )
}
