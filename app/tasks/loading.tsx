export default function Loading() {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 h-6 w-40 animate-pulse rounded bg-muted" />
      <div className="rounded border border-border p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="h-9 animate-pulse rounded bg-muted" />
          <div className="h-9 animate-pulse rounded bg-muted" />
          <div className="h-9 animate-pulse rounded bg-muted" />
          <div className="h-9 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 animate-pulse rounded bg-muted" />
          <div className="h-12 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
