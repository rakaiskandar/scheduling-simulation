"use client"

import type { GanttEntry } from "@/types/simulation"

interface GanttChartProps {
  ganttChart: GanttEntry[]
}

export function GanttChart({ ganttChart }: GanttChartProps) {
  // Merge consecutive entries with same name
  const mergedChart: GanttEntry[] = []
  ganttChart.forEach((entry) => {
    const last = mergedChart[mergedChart.length - 1]
    if (last && last.name === entry.name) {
      last.endTime = entry.endTime // merge duration
    } else {
      mergedChart.push({ ...entry })
    }
  })

  return (
    <div className="pl-4 h-20 overflow-x-auto">
      <div className="min-w-max">
        {/* Gantt bars */}
        <div className="flex items-center">
          {mergedChart.map((entry, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center border ${entry.color} p-2 text-center`}
              style={{
                width: `${Math.max((entry.endTime - entry.startTime) * 40, 60)}px`,
                height: '60px'
              }}
            >
              <span className="font-medium">{entry.name}</span>
            </div>
          ))}
        </div>

        {/* Time labels */}
        <div className="relative flex">
          {mergedChart.map((entry, index) => (
            <div
              key={index}
              className="relative text-center text-xs text-gray-600"
              style={{
                width: `${Math.max((entry.endTime - entry.startTime) * 40, 60)}px`,
              }}
            >
              <span className="absolute left-0 -translate-x-1/2">{entry.startTime}</span>
              {index === mergedChart.length - 1 && (
                <span className="absolute right-0 translate-x-1/2">{entry.endTime}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
