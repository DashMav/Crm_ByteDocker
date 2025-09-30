import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CRMProvider } from "@/components/crm/store"
import { CurrencyProvider } from "@/components/crm/currency"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "CRM App",
  description: "A CRM application",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <CRMProvider>
            <CurrencyProvider>{children}</CurrencyProvider>
          </CRMProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
