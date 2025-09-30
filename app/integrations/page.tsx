"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Integration = {
  name: string
  description: string
  status: "connected" | "not_connected"
  action: "Configure" | "Connect"
}

const integrations: Integration[] = [
  { name: "Supabase", description: "Auth + Database for CRM data", status: "not_connected", action: "Connect" },
  {
    name: "Neon Postgres",
    description: "Serverless Postgres for analytics",
    status: "not_connected",
    action: "Connect",
  },
  { name: "Upstash Redis", description: "Caching & rate limits", status: "not_connected", action: "Connect" },
  { name: "Vercel Blob", description: "Documents & assets storage", status: "not_connected", action: "Connect" },
  { name: "Stripe", description: "Payments & invoicing", status: "connected", action: "Configure" },
  { name: "Slack", description: "Deal alerts & notifications", status: "connected", action: "Configure" },
]

export default function IntegrationsPage() {
  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Integration & API Management</h1>
        <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
          Manage Keys
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((i) => (
          <Card key={i.name} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-gray-600">{i.description}</div>
                </div>
                <span
                  className={
                    i.status === "connected"
                      ? "text-xs text-teal-700 bg-teal-50 px-2 py-1 rounded"
                      : "text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                  }
                >
                  {i.status === "connected" ? "Connected" : "Not connected"}
                </span>
              </div>
              <div className="mt-3">
                <Button
                  className={i.action === "Connect" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
                  variant={i.action === "Configure" ? "outline" : "default"}
                >
                  {i.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CRMShell>
  )
}
