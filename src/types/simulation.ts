export type Process = {
  id: number
  name: string
  arrivalTime: number
  burstTime: number
  remainingTime: number
  startTime?: number
  finishTime?: number
  color: string
}

export type GanttEntry = {
  processId: number
  name: string
  startTime: number
  endTime: number
  color: string
}

export type SimulationMetrics = {
  averageWaitingTime: number
  averageTurnaroundTime: number
  averageResponseTime: number
}

export type SimulationResult = {
  gantt: GanttEntry[]
  completedProcesses: Process[]
  metrics: SimulationMetrics
  totalTime: number
}

