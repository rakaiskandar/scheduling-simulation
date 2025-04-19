import Link from "next/link"
import { ArrowRight, LucideListOrdered, LucideSplit, LucideTimer } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="py-20 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-block rounded-lg bg-purple-100/80 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-800 dark:text-purple-300 backdrop-blur-sm">
                CPU Scheduling Visualizer
              </div>
              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-purple-900 dark:text-purple-100 md:text-6xl">
                CPU Scheduling{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative font-handwriting text-purple-600 dark:text-purple-400">made simple</span>
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
                Ideate, Visualize, Learn. Understand CPU scheduling algorithms through interactive simulations.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/simulate"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Start Simulation
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white/80 dark:bg-gray-800/80 dark:border-gray-700 px-6 py-3 font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Understand CPU Scheduling Algorithms
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Visualize how different CPU scheduling algorithms work and compare their performance.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 p-6 shadow-sm transition-all hover:shadow-md backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                  <LucideListOrdered />
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">First Come First Served</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The simplest scheduling algorithm that executes processes in the order they arrive.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 p-6 shadow-sm transition-all hover:shadow-md backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                  <LucideTimer />
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">Shortest Job First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prioritizes processes with the shortest execution time to minimize average waiting time.
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 p-6 shadow-sm transition-all hover:shadow-md backdrop-blur-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                  <LucideSplit />
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">Round Robin</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Allocates a fixed time slice to each process in a circular queue for fair CPU sharing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-purple-50/50 dark:bg-purple-950/20 py-20 backdrop-blur-sm flex items-center justify-center">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Ready to visualize CPU scheduling?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Jump into our interactive simulator and see how different algorithms handle process scheduling.
              </p>
              <div className="mt-8">
                <Link
                  href="/simulate"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-700 dark:hover:bg-purple-600"
                >
                  Start Simulation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
