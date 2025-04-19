"use client"

import { useState } from "react"
import { Play, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProcessManager } from "@/components/process-manager"
import { GanttChart } from "@/components/gantt-chart"
import { MetricsDisplay } from "@/components/metrics-display"
import { ProcessTimeline } from "@/components/process-timeline"
import { AlgorithmSelector } from "@/components/algorithm-selector"
import { SimulationHeader } from "@/components/simulation-header"
import { runSimulation } from "@/lib/simulation"
import type { Process, GanttEntry, SimulationMetrics } from "@/types/simulation"
import { Footer } from "@/components/footer"
import { SimulationAnimated } from "@/components/simulation-animated"

export default function SimulatePage() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [algorithm, setAlgorithm] = useState("fcfs")
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [ganttChart, setGanttChart] = useState<GanttEntry[]>([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [metrics, setMetrics] = useState<SimulationMetrics>({
    averageWaitingTime: 0,
    averageTurnaroundTime: 0,
    averageResponseTime: 0,
  })

  // Reset simulation
  const resetSimulation = () => {
    setGanttChart([])
    setIsSimulating(false)
    setSimulationComplete(false)
    setProcesses(
      processes.map((p) => ({
        ...p,
        remainingTime: p.burstTime,
        startTime: undefined,
        finishTime: undefined,
      })),
    )
  }

  // Start simulation
  const startSimulation = () => {
    if (processes.length === 0) return
    resetSimulation()

    const result = runSimulation(processes, algorithm, timeQuantum)
    setGanttChart(result.gantt)
    setProcesses(result.completedProcesses)
    setMetrics(result.metrics)
    setSimulationComplete(true)
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <SimulationHeader />

      <main className="flex items-center justify-center py-8">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-3">
              <div className="rounded-lg border bg-card/80 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-bold">Konfigurasi</h2>

                <AlgorithmSelector
                  algorithm={algorithm}
                  setAlgorithm={setAlgorithm}
                  timeQuantum={timeQuantum}
                  setTimeQuantum={setTimeQuantum}
                />

                <ProcessManager processes={processes} setProcesses={setProcesses} />

                <div className="flex gap-2">
                  <Button onClick={startSimulation} disabled={processes.length === 0}>
                    <Play className="mr-2 h-4 w-4" />
                    Jalankan simulasi
                  </Button>
                  <Button variant="outline" onClick={resetSimulation}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-lg border bg-card/80 p-6 shadow-sm backdrop-blur-sm">
                <h2 className="mb-6 text-xl font-bold">Hasil Simulasi</h2>

                <Tabs defaultValue="gantt" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="simulation">Simulation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="gantt">
                    {ganttChart.length > 0 ? (
                      <div>
                        <GanttChart ganttChart={ganttChart} />
                        <ProcessTimeline processes={processes} />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <p className="mb-2 text-lg font-medium">Belum ada data yang bisa dianalisis</p>
                          <p className="text-sm">CPU-nya masih santai.
                          Tambahkan proses, lalu klik "Jalankan Simulasi" supaya bisa bekerja!</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="metrics">
                    {simulationComplete ? (
                      <MetricsDisplay metrics={metrics} processes={processes} />
                    ) : (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <p className="mb-2 text-lg font-medium">Tidak ada metrik tersedia</p>
                          <p className="text-sm">Jalankan simulasi untuk melihat metrik performa</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="simulation">
                    {simulationComplete ? (
                      <div>
                        <SimulationAnimated processes={processes} ganttChart={ganttChart} />
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center">
                        <div className="text-gray-500 dark:text-gray-400">
                          <p className="mb-2 text-lg font-medium">Tidak ada simulasi yang tersedia</p>
                          <p className="text-sm">Jalankan simulasi untuk melihat metrik performa</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
