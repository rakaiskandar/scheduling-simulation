import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BackgroundGradient } from "@/components/background-gradient"

const space_grotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CPU Scheduler Visualizer",
  description: "Interactive CPU scheduling algorithm simulator",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${space_grotesk.className} min-h-screen bg-background antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BackgroundGradient>{children}</BackgroundGradient>
        </ThemeProvider>
      </body>
    </html>
  )
}
