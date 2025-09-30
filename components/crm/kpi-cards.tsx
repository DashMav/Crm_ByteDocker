import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type KPI = {
  title: string
  value: string
  delta?: string
  hint?: string
}

export function KPICards({ items }: { items: KPI[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((kpi) => (
        <Card key={kpi.title} className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{kpi.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">{kpi.value}</span>
              {kpi.delta && <span className="text-sm text-foreground/70">{kpi.delta}</span>}
            </div>
            {kpi.hint && <div className="text-xs text-muted-foreground mt-1">{kpi.hint}</div>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
