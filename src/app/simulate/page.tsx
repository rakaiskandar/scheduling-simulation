"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Play, Plus, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"

// Process type definition
type Process = {
  id: number
  name: string
  arrivalTime: number
  burstTime: number
  remainingTime: number
  startTime?: number
  finishTime?: number
  color: string
}

// Gantt chart entry type
type GanttEntry = {
  processId: number
  name: string
  startTime: number
  endTime: number
  color: string
}

// Random color generator
const getRandomColor = () => {
  const colors = [
    "bg-red-200 border-red-400",
    "bg-blue-200 border-blue-400",
    "bg-green-200 border-green-400",
    "bg-yellow-200 border-yellow-400",
    "bg-purple-200 border-purple-400",
    "bg-pink-200 border-pink-400",
    "bg-indigo-200 border-indigo-400",
    "bg-teal-200 border-teal-400",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export default function SimulatePage() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [nextId, setNextId] = useState(1)
  const [algorithm, setAlgorithm] = useState("fcfs")
  const [timeQuantum, setTimeQuantum] = useState(2)
  const [ganttChart, setGanttChart] = useState<GanttEntry[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [simulationComplete, setSimulationComplete] = useState(false)
  const [metrics, setMetrics] = useState({
    averageWaitingTime: 0,
    averageTurnaroundTime: 0,
    averageResponseTime: 0,
  })

  // Add a new process
  const addProcess = () => {
    const newProcess: Process = {
      id: nextId,
      name: `P${nextId}`,
      arrivalTime: 0,
      burstTime: 5,
      remainingTime: 5,
      color: getRandomColor(),
    }
    setProcesses([...processes, newProcess])
    setNextId(nextId + 1)
  }

  // Remove a process
  const removeProcess = (id: number) => {
    setProcesses(processes.filter((p) => p.id !== id))
  }

  // Update process properties
  const updateProcess = (id: number, field: string, value: number) => {
    setProcesses(
      processes.map((p) => {
        if (p.id === id) {
          const updatedProcess = { ...p, [field]: value }
          if (field === "burstTime") {
            updatedProcess.remainingTime = value
          }
          return updatedProcess
        }
        return p
      }),
    )
  }

  // Reset simulation
  const resetSimulation = () => {
    setCurrentTime(0)
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
    setIsSimulating(true)
  }

  // FCFS Algorithm
  const runFCFS = () => {
    const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    let time = 0
    const gantt: GanttEntry[] = []
    const completedProcesses: Process[] = []

    sortedProcesses.forEach((process) => {
      if (time < process.arrivalTime) {
        time = process.arrivalTime
      }

      const startTime = time
      const endTime = time + process.burstTime

      gantt.push({
        processId: process.id,
        name: process.name,
        startTime,
        endTime,
        color: process.color,
      })

      completedProcesses.push({
        ...process,
        startTime,
        finishTime: endTime,
        remainingTime: 0,
      })

      time = endTime
    })

    return { gantt, completedProcesses, totalTime: time }
  }

  // SJF Algorithm
  const runSJF = () => {
    const processQueue = [...processes].map((p) => ({ ...p }))
    let time = 0
    const gantt: GanttEntry[] = []
    const completedProcesses: Process[] = []

    while (processQueue.length > 0) {
      // Find available processes at current time
      const availableProcesses = processQueue.filter((p) => p.arrivalTime <= time)

      if (availableProcesses.length === 0) {
        // No processes available, jump to next arrival time
        const nextArrival = Math.min(...processQueue.map((p) => p.arrivalTime))
        time = nextArrival
        continue
      }

      // Find shortest job
      const shortestJob = availableProcesses.reduce((prev, curr) => (prev.burstTime < curr.burstTime ? prev : curr))

      // Remove from queue
      const index = processQueue.findIndex((p) => p.id === shortestJob.id)
      processQueue.splice(index, 1)

      const startTime = time
      const endTime = time + shortestJob.burstTime

      gantt.push({
        processId: shortestJob.id,
        name: shortestJob.name,
        startTime,
        endTime,
        color: shortestJob.color,
      })

      completedProcesses.push({
        ...shortestJob,
        startTime,
        finishTime: endTime,
        remainingTime: 0,
      })

      time = endTime
    }

    return { gantt, completedProcesses, totalTime: time }
  }

  // Round Robin Algorithm
  const runRoundRobin = () => {
    const processQueue = [...processes].map((p) => ({ ...p }))
    let time = 0
    const gantt: GanttEntry[] = []
    const completedProcesses: Process[] = []
    const readyQueue: Process[] = []

    // Sort by arrival time initially
    processQueue.sort((a, b) => a.arrivalTime - b.arrivalTime)

    while (processQueue.length > 0 || readyQueue.length > 0) {
      // Move arrived processes to ready queue
      while (processQueue.length > 0 && processQueue[0].arrivalTime <= time) {
        readyQueue.push(processQueue.shift()!)
      }

      if (readyQueue.length === 0) {
        // No processes in ready queue, jump to next arrival
        time = processQueue[0].arrivalTime
        continue
      }

      // Get next process from ready queue
      const currentProcess = readyQueue.shift()!

      // Process for time quantum or remaining time, whichever is smaller
      const executeTime = Math.min(timeQuantum, currentProcess.remainingTime)
      const startTime = time
      const endTime = time + executeTime

      gantt.push({
        processId: currentProcess.id,
        name: currentProcess.name,
        startTime,
        endTime,
        color: currentProcess.color,
      })

      // Update remaining time
      currentProcess.remainingTime -= executeTime
      time = endTime

      // Check if process is complete
      if (currentProcess.remainingTime > 0) {
        // Move arrived processes to ready queue before re-adding current process
        while (processQueue.length > 0 && processQueue[0].arrivalTime <= time) {
          readyQueue.push(processQueue.shift()!)
        }
        // Put back in ready queue
        readyQueue.push(currentProcess)
      } else {
        // Process is complete
        completedProcesses.push({
          ...currentProcess,
          finishTime: endTime,
        })
      }
    }

    // Find start times for each process (first appearance in Gantt chart)
    const startTimes = new Map<number, number>()
    gantt.forEach((entry) => {
      if (!startTimes.has(entry.processId)) {
        startTimes.set(entry.processId, entry.startTime)
      }
    })

    // Update completed processes with start times
    completedProcesses.forEach((process) => {
      process.startTime = startTimes.get(process.id)
    })

    return { gantt, completedProcesses, totalTime: time }
  }

  // Calculate metrics
  const calculateMetrics = (completedProcesses: Process[]) => {
    let totalWaitingTime = 0
    let totalTurnaroundTime = 0
    let totalResponseTime = 0

    completedProcesses.forEach((process) => {
      const turnaroundTime = (process.finishTime || 0) - process.arrivalTime
      const waitingTime = turnaroundTime - process.burstTime
      const responseTime = (process.startTime || 0) - process.arrivalTime

      totalWaitingTime += waitingTime
      totalTurnaroundTime += turnaroundTime
      totalResponseTime += responseTime
    })

    const n = completedProcesses.length
    return {
      averageWaitingTime: totalWaitingTime / n,
      averageTurnaroundTime: totalTurnaroundTime / n,
      averageResponseTime: totalResponseTime / n,
    }
  }

  // Run simulation based on selected algorithm
  useEffect(() => {
    if (!isSimulating) return

    let result
    switch (algorithm) {
      case "fcfs":
        result = runFCFS()
        break
      case "sjf":
        result = runSJF()
        break
      case "rr":
        result = runRoundRobin()
        break
      default:
        result = runFCFS()
    }

    setGanttChart(result.gantt)
    setProcesses(result.completedProcesses)
    setMetrics(calculateMetrics(result.completedProcesses))
    setSimulationComplete(true)
    setIsSimulating(false)
  }, [isSimulating, algorithm, processes, timeQuantum])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b py-4 flex items-center justify-center">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
          <h1 className="text-xl font-bold">CPU Scheduler Simulator</h1>
          <div className="w-32"></div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Configuration</h2>

                <div className="mb-6">
                  <Label htmlFor="algorithm">Scheduling Algorithm</Label>
                  <Select value={algorithm} onValueChange={setAlgorithm}>
                    <SelectTrigger id="algorithm" className="mt-1">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fcfs">First Come First Served (FCFS)</SelectItem>
                      <SelectItem value="sjf">Shortest Job First (SJF)</SelectItem>
                      <SelectItem value="rr">Round Robin (RR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {algorithm === "rr" && (
                  <div className="mb-6">
                    <Label htmlFor="timeQuantum">Time Quantum: {timeQuantum}</Label>
                    <Slider
                      id="timeQuantum"
                      min={1}
                      max={10}
                      step={1}
                      value={[timeQuantum]}
                      onValueChange={(value) => setTimeQuantum(value[0])}
                      className="mt-2"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <Label>Processes</Label>
                    <Button size="sm" variant="outline" onClick={addProcess}>
                      <Plus className="mr-1 h-4 w-4" />
                      Add Process
                    </Button>
                  </div>

                  <div className="mt-4 space-y-4">
                    {processes.length === 0 ? (
                      <div className="rounded-md border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">
                        No processes added. Click &quot;Add Process&quot; to start.
                      </div>
                    ) : (
                      processes.map((process) => (
                        <div key={process.id} className="rounded-md border border-gray-200 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-medium">{process.name}</span>
                            <Button size="sm" variant="ghost" onClick={() => removeProcess(process.id)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                          <div className="grid gap-3">
                            <div>
                              <Label htmlFor={`arrival-${process.id}`} className="text-xs">
                                Arrival Time
                              </Label>
                              <Input
                                id={`arrival-${process.id}`}
                                type="number"
                                min="0"
                                value={process.arrivalTime}
                                onChange={(e) =>
                                  updateProcess(process.id, "arrivalTime", Number.parseInt(e.target.value) || 0)
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`burst-${process.id}`} className="text-xs">
                                Burst Time
                              </Label>
                              <Input
                                id={`burst-${process.id}`}
                                type="number"
                                min="1"
                                value={process.burstTime}
                                onChange={(e) =>
                                  updateProcess(process.id, "burstTime", Number.parseInt(e.target.value) || 1)
                                }
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={startSimulation} disabled={processes.length === 0}>
                    <Play className="mr-2 h-4 w-4" />
                    Run Simulation
                  </Button>
                  <Button variant="outline" onClick={resetSimulation}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold">Simulation Results</h2>

                <Tabs defaultValue="gantt" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="gantt">
                    {ganttChart.length > 0 ? (
                      <div>
                        <div className="mb-6 overflow-x-auto">
                          <div className="min-w-max">
                            <div className="flex">
                              {ganttChart.map((entry, index) => (
                                <div
                                  key={index}
                                  className={`flex flex-col border ${entry.color} p-2 text-center`}
                                  style={{
                                    width: `${Math.max((entry.endTime - entry.startTime) * 30, 50)}px`,
                                  }}
                                >
                                  <span className="font-medium">{entry.name}</span>
                                  <span className="text-xs">
                                    {entry.startTime} - {entry.endTime}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="flex">
                              {ganttChart.map((entry, index) => (
                                <div
                                  key={index}
                                  className="text-center text-xs"
                                  style={{
                                    width: `${Math.max((entry.endTime - entry.startTime) * 30, 50)}px`,
                                  }}
                                >
                                  {entry.startTime}
                                  {index === ganttChart.length - 1 && <span className="absolute">{entry.endTime}</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8">
                          <h3 className="mb-3 font-semibold">Process Timeline</h3>
                          <div className="space-y-3">
                            {processes.map((process) => (
                              <div key={process.id} className="flex items-center gap-3">
                                <div
                                  className={`w-16 rounded border ${process.color} px-2 py-1 text-center font-medium`}
                                >
                                  {process.name}
                                </div>
                                <div className="flex-1">
                                  <div className="relative h-8 w-full">
                                    <div className="absolute h-1 w-full bg-gray-200 top-4"></div>

                                    {/* Arrival marker */}
                                    <div
                                      className="absolute top-0 h-8 w-0.5 bg-gray-400"
                                      style={{ left: `${process.arrivalTime * 30}px` }}
                                    >
                                      <div className="absolute -top-6 -translate-x-1/2 text-xs">
                                        Arrival: {process.arrivalTime}
                                      </div>
                                    </div>

                                    {/* Start marker */}
                                    {process.startTime !== undefined && (
                                      <div
                                        className="absolute top-0 h-8 w-0.5 bg-green-500"
                                        style={{ left: `${process.startTime * 30}px` }}
                                      >
                                        <div className="absolute -top-6 -translate-x-1/2 text-xs text-green-600">
                                          Start: {process.startTime}
                                        </div>
                                      </div>
                                    )}

                                    {/* Finish marker */}
                                    {process.finishTime !== undefined && (
                                      <div
                                        className="absolute top-0 h-8 w-0.5 bg-red-500"
                                        style={{ left: `${process.finishTime * 30}px` }}
                                      >
                                        <div className="absolute -top-6 -translate-x-1/2 text-xs text-red-600">
                                          Finish: {process.finishTime}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 p-8 text-center">
                        <div className="text-gray-500">
                          <p className="mb-2 text-lg font-medium">No simulation data yet</p>
                          <p className="text-sm">Add processes and run the simulation to see the Gantt chart</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="metrics">
                    {simulationComplete ? (
                      <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-3">
                          <div className="rounded-lg border bg-purple-50 p-4 text-center">
                            <h3 className="text-sm font-medium text-gray-500">Average Waiting Time</h3>
                            <p className="mt-2 text-2xl font-bold text-purple-700">
                              {metrics.averageWaitingTime.toFixed(2)}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-purple-50 p-4 text-center">
                            <h3 className="text-sm font-medium text-gray-500">Average Turnaround Time</h3>
                            <p className="mt-2 text-2xl font-bold text-purple-700">
                              {metrics.averageTurnaroundTime.toFixed(2)}
                            </p>
                          </div>
                          <div className="rounded-lg border bg-purple-50 p-4 text-center">
                            <h3 className="text-sm font-medium text-gray-500">Average Response Time</h3>
                            <p className="mt-2 text-2xl font-bold text-purple-700">
                              {metrics.averageResponseTime.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-3 font-semibold">Process Details</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-full border-collapse">
                              <thead>
                                <tr className="border-b bg-gray-50">
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Process</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Arrival</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Burst</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Start</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Finish</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Waiting</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Turnaround</th>
                                  <th className="px-4 py-2 text-left font-medium text-gray-500">Response</th>
                                </tr>
                              </thead>
                              <tbody>
                                {processes.map((process) => {
                                  const turnaround = (process.finishTime || 0) - process.arrivalTime
                                  const waiting = turnaround - process.burstTime
                                  const response = (process.startTime || 0) - process.arrivalTime

                                  return (
                                    <tr key={process.id} className="border-b">
                                      <td className="px-4 py-2 font-medium">{process.name}</td>
                                      <td className="px-4 py-2">{process.arrivalTime}</td>
                                      <td className="px-4 py-2">{process.burstTime}</td>
                                      <td className="px-4 py-2">{process.startTime}</td>
                                      <td className="px-4 py-2">{process.finishTime}</td>
                                      <td className="px-4 py-2">{waiting}</td>
                                      <td className="px-4 py-2">{turnaround}</td>
                                      <td className="px-4 py-2">{response}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-gray-300 p-8 text-center">
                        <div className="text-gray-500">
                          <p className="mb-2 text-lg font-medium">No metrics available</p>
                          <p className="text-sm">Run the simulation to see performance metrics</p>
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

