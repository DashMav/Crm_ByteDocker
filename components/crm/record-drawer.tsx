"use client"

import type * as React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"

type RecordDrawerProps = {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  description?: string
  children?: React.ReactNode
  side?: "right" | "left"
}

export function RecordDrawer({ open, onOpenChange, title, description, children, side = "right" }: RecordDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>
        <div className="mt-4 space-y-4">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
