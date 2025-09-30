"use client"

import * as React from "react"

type CurrencyCode = "USD" | "INR" | "BRL"

type CurrencyContextType = {
  currency: CurrencyCode
  setCurrency: (c: CurrencyCode) => void
  formatCurrency: (value: number) => string
}

const CurrencyContext = React.createContext<CurrencyContextType | null>(null)

function getLocaleAndSymbol(c: CurrencyCode) {
  switch (c) {
    case "INR":
      return { locale: "en-IN", currency: "INR" as const }
    case "BRL":
      return { locale: "pt-BR", currency: "BRL" as const }
    default:
      return { locale: "en-US", currency: "USD" as const }
  }
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = React.useState<CurrencyCode>(() => {
    if (typeof window === "undefined") return "USD"
    return (localStorage.getItem("crm-currency") as CurrencyCode) || "USD"
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("crm-currency", currency)
  }, [currency])

  const formatCurrency = React.useCallback(
    (value: number) => {
      const cfg = getLocaleAndSymbol(currency)
      try {
        return new Intl.NumberFormat(cfg.locale, {
          style: "currency",
          currency: cfg.currency,
          maximumFractionDigits: 0,
        }).format(value)
      } catch {
        return `${currency} ${value.toLocaleString()}`
      }
    },
    [currency],
  )

  const value: CurrencyContextType = { currency, setCurrency, formatCurrency }

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency() {
  const ctx = React.useContext(CurrencyContext)
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider")
  return ctx
}
