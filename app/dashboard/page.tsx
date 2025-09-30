"use client"

import { CRMShell } from "@/components/crm/shell"
import { KPICards } from "@/components/crm/kpi-cards"
import { PipelineBarChart } from "@/components/crm/charts/pipeline-bar"
import { RevenueLineChart } from "@/components/crm/charts/revenue-line"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCRM } from "@/components/crm/store"
import { useCurrency } from "@/components/crm/currency"

export default function DashboardPage() {
  const kpis = [
    { title: "Leads Converted", value: "34%", delta: "+4.2%", hint: "vs last 30 days" },
    { title: "Pipeline Revenue", value: "$770k", hint: "Weighted total" },
    { title: "Win Rate", value: "26%", delta: "+2.1%", hint: "Trailing quarter" },
    { title: "Avg Deal Size", value: "$38k", hint: "Closed won" },
  ]
  const { state } = useCRM()
  const { formatCurrency } = useCurrency()
  const totalARR = state.accounts.reduce((sum, a) => sum + a.arr, 0)

  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-balance">Executive Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-primary text-primary-foreground">Add Lead</Button>
          <Button variant="outline" className="border-border bg-transparent hover:bg-muted">
            Create Report
          </Button>
        </div>
      </div>

      <KPICards items={kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
        <PipelineBarChart />
        <RevenueLineChart />
      </div>

      <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="text-sm text-foreground/70">Total ARR</div>
            <div className="text-2xl font-semibold mt-1">{formatCurrency(totalARR)}</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="text-sm text-foreground/70">Active Accounts</div>
            <div className="text-2xl font-semibold mt-1">{state.accounts.length}</div>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="pt-4">
            <div className="text-sm text-foreground/70">Open Leads</div>
            <div className="text-2xl font-semibold mt-1">{state.leads.length}</div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-medium text-foreground/70 mb-2">Quick Shortcuts</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="border-border bg-transparent">
            Import Contacts
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            New Campaign
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            Configure Quote
          </Button>
          <Button variant="outline" className="border-border bg-transparent">
            View Forecast
          </Button>
        </div>
      </section>
    </CRMShell>
  )
}
