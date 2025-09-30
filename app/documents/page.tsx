"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const docs = [
  { name: "MSA_Acme.pdf", size: "1.2MB", updated: "2d ago" },
  { name: "SOW_Globex_v3.docx", size: "240KB", updated: "5h ago" },
  { name: "Pricing_2025.xlsx", size: "320KB", updated: "1w ago" },
  { name: "Security_Overview.pdf", size: "980KB", updated: "3d ago" },
  { name: "Case_Study_Umbrella.pdf", size: "1.8MB", updated: "1d ago" },
  { name: "Quote_WayneTech_Q8839.pdf", size: "260KB", updated: "Today" },
]

export default function DocumentsPage() {
  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Documents</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Upload</Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {docs.map((d) => (
          <Card key={d.name} className="hover:shadow-sm transition">
            <CardContent className="p-4">
              <div className="h-28 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                {d.name.split(".").pop()?.toUpperCase()}
              </div>
              <div className="mt-3 font-medium">{d.name}</div>
              <div className="text-xs text-gray-500">
                {d.size} • Updated {d.updated}
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-200 bg-transparent">
                  Preview
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CRMShell>
  )
}
