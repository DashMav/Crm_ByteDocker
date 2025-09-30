"use client"

import { CRMShell } from "@/components/crm/shell"
import { KPICards } from "@/components/crm/kpi-cards"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const kpis = [
  { title: "Active Campaigns", value: "8" },
  { title: "Leads Generated", value: "1,240", hint: "Last 30 days" },
  { title: "Avg CPL", value: "$18.40" },
  { title: "ROI", value: "228%", delta: "+14%" },
]

const campaigns = [
  { name: "Q4 Fintech Summit", channel: "Events", spend: "$35k", leads: 180, cpl: "$194", owner: "A. Diaz" },
  { name: "Gateway 2.0 Launch", channel: "Email", spend: "$12k", leads: 520, cpl: "$23", owner: "S. Patel" },
  { name: "Holiday Promo", channel: "Paid Social", spend: "$22k", leads: 340, cpl: "$65", owner: "J. Kim" },
  { name: "Risk & Fraud Webinar", channel: "Webinar", spend: "$8k", leads: 200, cpl: "$40", owner: "T. Lee" },
]

export default function CampaignsPage() {
  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Campaigns</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">New Campaign</Button>
          <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
            Export
          </Button>
        </div>
      </div>

      <KPICards items={kpis} />

      <Card className="border border-border mt-4">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Search campaigns..." aria-label="Search campaigns" className="md:col-span-2" />
            <Select>
              <SelectTrigger aria-label="Filter by channel">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="events">Events</SelectItem>
                <SelectItem value="paid">Paid Social</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Time range">
                <SelectValue placeholder="Last 30 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2">Name</th>
                  <th className="py-2">Channel</th>
                  <th className="py-2">Spend</th>
                  <th className="py-2">Leads</th>
                  <th className="py-2">CPL</th>
                  <th className="py-2">Owner</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.name} className="border-t border-border hover:bg-muted">
                    <td className="py-2">{c.name}</td>
                    <td className="py-2">{c.channel}</td>
                    <td className="py-2">{c.spend}</td>
                    <td className="py-2">{c.leads}</td>
                    <td className="py-2">{c.cpl}</td>
                    <td className="py-2">{c.owner}</td>
                    <td className="py-2 text-right">
                      <Button size="sm" variant="outline" className="border-border bg-transparent">
                        Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </CRMShell>
  )
}
