"use client"

import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset?: unknown
}) {
  const router = useRouter()

  const onTryAgain = () => {
    if (typeof reset === "function") {
      // Next.js error boundary reset when available
      ;(reset as () => void)()
    } else if (typeof router?.refresh === "function") {
      router.refresh()
    } else if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  return (
    <div className="p-6">
      <div className="rounded-md border border-destructive/30 bg-card p-4">
        <h2 className="text-base font-semibold text-destructive">Something went wrong on Tasks</h2>
        <p className="mt-1 text-sm text-foreground/70">{error?.message || "An unexpected error occurred."}</p>
        <div className="mt-4">
          <button className="rounded bg-primary px-3 py-2 text-sm text-primary-foreground" onClick={onTryAgain}>
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
