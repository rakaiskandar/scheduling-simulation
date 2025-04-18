"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface BackgroundGradientProps {
  children: React.ReactNode
}

export function BackgroundGradient({ children }: BackgroundGradientProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background pattern and gradients */}
      <div className="fixed inset-0 -z-10">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundSize: "30px 30px",
            backgroundImage: `
              linear-gradient(to right, ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px)
            `,
          }}
        />

        {/* Main gradient background */}
        <div className="absolute inset-0 bg-background" />

        {/* Top-left gradient blob */}
        <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-400/20 via-purple-300/10 to-transparent blur-3xl dark:from-purple-900/20 dark:via-purple-800/10" />

        {/* Bottom-right gradient blob */}
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-blue-400/20 via-blue-300/10 to-transparent blur-3xl dark:from-blue-900/20 dark:via-blue-800/10" />

        {/* Center gradient blob */}
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-400/10 via-cyan-300/5 to-transparent blur-3xl dark:from-cyan-900/10 dark:via-cyan-800/5" />

        {/* Circuit pattern overlay */}
        <div
          className="absolute inset-0 bg-circuit-pattern opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23${theme === "dark" ? "ffffff" : "000000"}' strokeWidth='0.5'/%3E%3Cpath d='M30 10v20m0 0h20m0 0v20m0 0h20m0 0v20m0 0h20M10 30h20m0 0v20m0 0h20m-40 0v20m0 0h20' fill='none' stroke='%23${theme === "dark" ? "ffffff" : "000000"}' strokeWidth='0.5'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%23${theme === "dark" ? "ffffff" : "000000"}'/%3E%3Ccircle cx='50' cy='50' r='2' fill='%23${theme === "dark" ? "ffffff" : "000000"}'/%3E%3Ccircle cx='70' cy='70' r='2' fill='%23${theme === "dark" ? "ffffff" : "000000"}'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </div>
  )
}
