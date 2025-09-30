"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PipelineBarChart } from "@/components/crm/charts/pipeline-bar"
import { RevenueLineChart } from "@/components/crm/charts/revenue-line"

export default function ReportsPage() {
  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Reports & Dashboards</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
            Schedule
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Report</Button>
        </div>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Select>
              <SelectTrigger aria-label="Report type">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pipeline">Pipeline</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="conversion">Lead Conversion</SelectItem>
                <SelectItem value="activity">Rep Activity</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Time range">
                <SelectValue placeholder="Last 90 days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="365d">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Group by">
                <SelectValue placeholder="Group by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
                <SelectItem value="source">Source</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Region">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
            <PipelineBarChart />
            <RevenueLineChart />
          </div>
        </CardContent>
      </Card>
    </CRMShell>
  )
}
