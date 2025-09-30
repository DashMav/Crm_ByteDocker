"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import * as React from "react"
import { useCRM } from "@/components/crm/store"
import { TaskForm } from "@/components/crm/forms/task-form"

export default function TasksPage() {
  const { state, updateTask, deleteTask } = useCRM()
  const [openCreate, setOpenCreate] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const tasks = Array.isArray(state.tasks) ? state.tasks : []
  const editing = tasks.find((t) => t.id === editingId) || null

  console.log("[v0] TasksPage render: tasks count =", tasks.length)

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Tasks & Activities</h1>
        <div className="flex items-center gap-2">
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">New Task</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Task</DialogTitle>
              </DialogHeader>
              <TaskForm onDone={() => setOpenCreate(false)} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
            Log
          </Button>
        </div>
      </div>

      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Search tasks..." aria-label="Search tasks" className="md:col-span-2" />
            <Select>
              <SelectTrigger aria-label="Filter by owner">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="me">Me</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Due date">
                <SelectValue placeholder="Due" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
                <div className="text-sm text-foreground/70">No tasks yet</div>
                <div className="mt-2 text-xs text-foreground/60">
                  Create your first task to start tracking activities.
                </div>
                <div className="mt-4">
                  <Button className="bg-primary text-primary-foreground" onClick={() => setOpenCreate(true)}>
                    New Task
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y">
                {tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={t.done}
                        aria-label={`Task ${t.title}`}
                        onCheckedChange={(checked) => updateTask(t.id, { done: Boolean(checked) })}
                      />
                      <div>
                        <div className="font-medium">{t.title}</div>
                        <div className="text-xs text-foreground/60">
                          {t.type} • {t.owner}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-foreground/60">{t.due}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border bg-transparent"
                        onClick={() => setEditingId(t.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border bg-transparent"
                        onClick={() => deleteTask(t.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!editingId} onOpenChange={(o) => !o && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editing && <TaskForm id={editing.id} initial={editing} onDone={() => setEditingId(null)} />}
        </DialogContent>
      </Dialog>
    </CRMShell>
  )
}
