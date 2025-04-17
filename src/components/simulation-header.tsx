import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SimulationHeader() {
  return (
    <header className="border-b py-4 px-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
        <h1 className="text-xl font-bold">Simulator</h1>
        <div className="w-32 flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
