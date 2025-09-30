"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type KanbanColumn = { id: string; title: string }
export type KanbanCard = {
  id: string
  columnId: string
  title: string
  subtitle?: string
  value?: string
  meta?: string
}

type KanbanProps = {
  columns: KanbanColumn[]
  initialCards: KanbanCard[]
  onChange?: (cards: KanbanCard[]) => void
}

export function Kanban({ columns, initialCards, onChange }: KanbanProps) {
  const [cards, setCards] = React.useState<KanbanCard[]>(initialCards)

  function moveCard(cardId: string, toColumnId: string) {
    setCards((prev) => {
      const next = prev.map((c) => (c.id === cardId ? { ...c, columnId: toColumnId } : c))
      onChange?.(next)
      return next
    })
  }

  const dragCardRef = React.useRef<string | null>(null)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {columns.map((col) => (
        <div
          key={col.id}
          className="rounded-md border border-border bg-muted/30 p-3 min-h-[220px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const id = dragCardRef.current
            if (id) moveCard(id, col.id)
          }}
        >
          <h3 className="text-sm font-medium mb-2">{col.title}</h3>
          <div className="flex flex-col gap-2">
            {cards
              .filter((c) => c.columnId === col.id)
              .map((c) => (
                <article
                  key={c.id}
                  draggable
                  onDragStart={() => (dragCardRef.current = c.id)}
                  onDragEnd={() => (dragCardRef.current = null)}
                  className={cn("rounded-md border border-border bg-background p-3 cursor-move", "hover:bg-muted/50")}
                >
                  <div className="text-sm font-medium">{c.title}</div>
                  {c.subtitle ? <div className="text-xs text-foreground/60">{c.subtitle}</div> : null}
                  {c.value ? <div className="text-xs mt-1">Value: {c.value}</div> : null}
                  {c.meta ? <div className="text-xs text-foreground/60 mt-1">{c.meta}</div> : null}
                </article>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
