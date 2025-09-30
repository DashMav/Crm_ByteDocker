"use client"

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { stage: "Prospect", value: 240000 },
  { stage: "Demo", value: 180000 },
  { stage: "Proposal", value: 120000 },
  { stage: "Negotiation", value: 80000 },
  { stage: "Closed", value: 150000 },
]

export function PipelineBarChart() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-sm text-gray-700">Pipeline by Stage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="stage" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
