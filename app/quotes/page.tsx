"use client"

import { CRMShell } from "@/components/crm/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const quotes = [
  { id: "Q-8842", account: "Acme Corp", amount: "$48,200", status: "Draft", owner: "S. Patel" },
  { id: "Q-8841", account: "Globex", amount: "$22,600", status: "Sent", owner: "A. Diaz" },
  { id: "Q-8839", account: "Umbrella Group", amount: "$72,900", status: "Accepted", owner: "J. Kim" },
  { id: "Q-8838", account: "Wayne Tech", amount: "$19,500", status: "Rejected", owner: "T. Lee" },
]

export default function QuotesPage() {
  return (
    <CRMShell>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Quotes & Proposals</h1>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Create Quote</Button>
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
            Templates
          </Button>
        </div>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input placeholder="Search quotes..." aria-label="Search quotes" className="md:col-span-2" />
            <Select>
              <SelectTrigger aria-label="Filter by status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger aria-label="Filter by owner">
                <SelectValue placeholder="Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="spatel">S. Patel</SelectItem>
                <SelectItem value="adiaz">A. Diaz</SelectItem>
                <SelectItem value="jkim">J. Kim</SelectItem>
                <SelectItem value="tlee">T. Lee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2">Quote</th>
                  <th className="py-2">Account</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Owner</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.id} className="border-t hover:bg-gray-50">
                    <td className="py-2">{q.id}</td>
                    <td className="py-2">{q.account}</td>
                    <td className="py-2">{q.amount}</td>
                    <td className="py-2">{q.status}</td>
                    <td className="py-2">{q.owner}</td>
                    <td className="py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="border-gray-200 bg-transparent">
                          Preview
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Send
                        </Button>
                      </div>
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
