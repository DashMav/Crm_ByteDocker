"use client"

import { Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jan", projected: 80, actual: 72 },
  { month: "Feb", projected: 95, actual: 90 },
  { month: "Mar", projected: 110, actual: 115 },
  { month: "Apr", projected: 120, actual: 108 },
  { month: "May", projected: 140, actual: 133 },
  { month: "Jun", projected: 160, actual: 150 },
]

export function RevenueLineChart() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="text-sm text-gray-700">Revenue (Projected vs Actual)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="projected" stroke="#93c5fd" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" stroke="#0ea5a1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
