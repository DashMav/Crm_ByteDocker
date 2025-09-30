"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCRM } from "@/components/crm/store"

type ContactFormProps = {
  id?: string
  initial?: {
    name?: string
    title?: string
    account?: string
    email?: string
    lastActivity?: string
  }
  onDone?: () => void
}

export function ContactForm({ id, initial, onDone }: ContactFormProps) {
  const { addContact, updateContact } = useCRM()
  const [name, setName] = React.useState(initial?.name ?? "")
  const [title, setTitle] = React.useState(initial?.title ?? "")
  const [account, setAccount] = React.useState(initial?.account ?? "")
  const [email, setEmail] = React.useState(initial?.email ?? "")
  const [lastActivity, setLastActivity] = React.useState(initial?.lastActivity ?? "Today")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    const payload = { name, title, account, email, lastActivity }
    if (id) updateContact(id, payload)
    else addContact(payload)
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor="contact-title">Title</Label>
          <Input id="contact-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="contact-account">Account</Label>
          <Input id="contact-account" value={account} onChange={(e) => setAccount(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="contact-activity">Last activity</Label>
        <Input id="contact-activity" value={lastActivity} onChange={(e) => setLastActivity(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
          {id ? "Save changes" : "Add contact"}
        </Button>
      </div>
    </form>
  )
}
