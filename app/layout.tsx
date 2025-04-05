import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ReduxProvider } from "@/lib/redux/provider"
import { NavBar } from "@/components/nav-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoWeather Nexus",
  description: "Real-time weather, crypto, and news dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReduxProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-1">{children}</main>
              <Toaster />
            </div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'