import Link from "next/link"
import { Cpu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="border-b py-4 px-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Cpu className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold">CPU Scheduler</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/" className="font-medium hover:text-purple-600 hover:font-bold transition-all">
            Home
          </Link>
          <Link href="/simulate" className="font-medium hover:text-purple-600 hover:font-bold">
            Simulate
          </Link>
          <Link href="#about" className="font-medium hover:text-purple-600">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
