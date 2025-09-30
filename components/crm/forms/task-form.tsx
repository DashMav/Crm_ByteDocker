"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCRM } from "@/components/crm/store"

type TaskFormProps = {
  id?: string
  initial?: {
    title?: string
    due?: string
    owner?: string
    type?: "Call" | "Email" | "Task" | "Meeting"
    done?: boolean
  }
  onDone?: () => void
}

export function TaskForm({ id, initial, onDone }: TaskFormProps) {
  const { addTask, updateTask } = useCRM()
  const [title, setTitle] = React.useState(initial?.title ?? "")
  const [due, setDue] = React.useState(initial?.due ?? "Today")
  const [owner, setOwner] = React.useState(initial?.owner ?? "You")
  const [type, setType] = React.useState<"Call" | "Email" | "Task" | "Meeting">(initial?.type ?? "Task")

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const payload = { title, due, owner, type, done: initial?.done ?? false }
    if (id) updateTask(id, payload)
    else addTask(payload)
    onDone?.()
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <Label htmlFor="task-title">Title</Label>
        <Input id="task-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="task-due">Due</Label>
          <Input id="task-due" value={due} onChange={(e) => setDue(e.target.value)} />
        </div>
        <div>
          <Label>Owner</Label>
          <Select value={owner} onValueChange={(v) => setOwner(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="You">You</SelectItem>
              <SelectItem value="Team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Task">Task</SelectItem>
              <SelectItem value="Call">Call</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
          {id ? "Save changes" : "Add task"}
        </Button>
      </div>
    </form>
  )
}
