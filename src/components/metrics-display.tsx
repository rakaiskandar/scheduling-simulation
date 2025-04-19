"use client"

import type { Process, SimulationMetrics } from "@/types/simulation"

interface MetricsDisplayProps {
  metrics: SimulationMetrics
  processes: Process[]
}

export function MetricsDisplay({ metrics, processes }: MetricsDisplayProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border bg-purple-50 dark:bg-purple-900/20 p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rata rata waktu tunggu</h3>
          <p className="mt-2 text-2xl font-bold text-purple-700 dark:text-purple-300">
            {metrics.averageWaitingTime.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border bg-purple-50 dark:bg-purple-900/20 p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rata-rata waktu penyelesaian </h3>
          <p className="mt-2 text-2xl font-bold text-purple-700 dark:text-purple-300">
            {metrics.averageTurnaroundTime.toFixed(2)}
          </p>
        </div>
        <div className="rounded-lg border bg-purple-50 dark:bg-purple-900/20 p-4 text-center">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Rata-rata waktu respon </h3>
          <p className="mt-2 text-2xl font-bold text-purple-700 dark:text-purple-300">
            {metrics.averageResponseTime.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">Detail proses</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Proses</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Kedatangan</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Eksekusi</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Mulai</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Selesai</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Menunggu</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Penyelesaian</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400">Respons</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => {
                const turnaround = (process.finishTime || 0) - process.arrivalTime
                const waiting = turnaround - process.burstTime
                const response = (process.startTime || 0) - process.arrivalTime

                return (
                  <tr key={process.id} className="border-b dark:border-gray-700">
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
  )
}
