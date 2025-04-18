import type { Process, GanttEntry, SimulationResult, SimulationMetrics } from "@/types/simulation"

// Calculate metrics
export function calculateMetrics(completedProcesses: Process[]): SimulationMetrics {
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

// FCFS Algorithm
export function runFCFS(processes: Process[]): SimulationResult {
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

  return {
    gantt,
    completedProcesses,
    totalTime: time,
    metrics: calculateMetrics(completedProcesses),
  }
}

// SJF Algorithm
export function runSJFNonPreemptive(processes: Process[]): SimulationResult {
  const processQueue = [...processes].map((p) => ({ ...p }))
  let time = 0
  const gantt: GanttEntry[] = []
  const completedProcesses: Process[] = []

  while (processQueue.length > 0) {
    const availableProcesses = processQueue.filter((p) => p.arrivalTime <= time)

    if (availableProcesses.length === 0) {
      const nextArrival = Math.min(...processQueue.map((p) => p.arrivalTime))
      time = nextArrival
      continue
    }

    const shortestJob = availableProcesses.reduce((prev, curr) =>
      prev.burstTime < curr.burstTime ? prev : curr
    )

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

  return {
    gantt,
    completedProcesses,
    totalTime: time,
    metrics: calculateMetrics(completedProcesses),
  }
}

export function runSJFPreemptive(processes: Process[]): SimulationResult {
  const processQueue = [...processes].map(p => ({
    ...p,
    remainingTime: p.burstTime,
  }))

  let time = 0
  const gantt: GanttEntry[] = []
  const completedProcesses: Process[] = []

  let currentProcess: Process | null = null
  let lastProcessId: string | null = null

  while (processQueue.some(p => p.remainingTime > 0)) {
    const availableProcesses = processQueue.filter(
      p => p.arrivalTime <= time && p.remainingTime > 0
    )

    if (availableProcesses.length === 0) {
      time++
      continue
    }

    // Pick process with shortest remaining time
    const shortestJob = availableProcesses.reduce((prev, curr) =>
      prev.remainingTime < curr.remainingTime ? prev : curr
    )

    if (currentProcess?.id !== shortestJob.id) {
      // Close previous gantt entry
      if (gantt.length > 0 && gantt[gantt.length - 1].endTime === undefined) {
        gantt[gantt.length - 1].endTime = time
      }

      // Start new gantt entry
      gantt.push({
        processId: shortestJob.id,
        name: shortestJob.name,
        startTime: time,
        endTime: 0, // temporarily unknown
        color: shortestJob.color,
      })

      currentProcess = shortestJob
    }

    // Execute 1 time unit
    shortestJob.remainingTime--
    time++

    // If process finishes
    if (shortestJob.remainingTime === 0) {
      const startTime = gantt.find(g => g.processId === shortestJob.id)?.startTime ?? 0
      const endTime = time

      gantt[gantt.length - 1].endTime = endTime

      completedProcesses.push({
        ...shortestJob,
        startTime,
        finishTime: endTime,
        remainingTime: 0,
      })
    }
  }

  return {
    gantt,
    completedProcesses,
    totalTime: time,
    metrics: calculateMetrics(completedProcesses),
  }
}


// Round Robin Algorithm
export function runRoundRobin(processes: Process[], timeQuantum: number): SimulationResult {
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

  return {
    gantt,
    completedProcesses,
    totalTime: time,
    metrics: calculateMetrics(completedProcesses),
  }
}

// Main simulation function
export function runSimulation(processes: Process[], algorithm: string, timeQuantum: number): SimulationResult {
  switch (algorithm) {
    case "fcfs":
      return runFCFS(processes)
    case "sjfpre":
      return runSJFPreemptive(processes)
    case "sjfnonpre":
      return runSJFNonPreemptive(processes)
    case "rr":
      return runRoundRobin(processes, timeQuantum)
    default:
      return runFCFS(processes)
  }
}

