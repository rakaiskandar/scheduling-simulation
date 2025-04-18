"use client"

import type { Process } from "@/types/simulation"

interface ProcessTimelineProps {
  processes: Process[]
}

export function ProcessTimeline({ processes }: ProcessTimelineProps) {
  return (
    <div className="mt-8 overflow-x-auto">
      <h3 className="mb-3 font-semibold">Process Timeline</h3>
      <div className="space-y-3">
        {processes.map((process) => {
          const isSame = process.arrivalTime === process.startTime

          return (
            <div key={process.id} className="flex items-center gap-8 pt-4">
              <div className={`w-16 rounded border ${process.color} px-2 py-1 text-center font-medium`}>
                {process.name}
              </div>

              <div className="flex-1">
                <div className="relative h-10 w-full">
                  {/* Base line */}
                  <div className="absolute top-4 h-1 w-full bg-gray-200" />

                  {/* Merged Arrival + Start */}
                  {isSame && (
                    <div
                      className="absolute top-0 h-10 w-0.5 bg-blue-500"
                      style={{ left: `${process.arrivalTime * 30}px` }}
                    >
                      <div className="absolute -top-6 -translate-x-1/2 text-xs text-blue-600">
                        Arrived & Started: {process.arrivalTime}
                      </div>
                    </div>
                  )}

                  {/* Separate Arrival */}
                  {!isSame && (
                    <div
                      className="absolute top-0 h-10 w-0.5 bg-gray-400"
                      style={{ left: `${process.arrivalTime * 30}px` }}
                    >
                      <div className="absolute -top-6 -translate-x-1/2 text-xs text-gray-600">
                        Arrival: {process.arrivalTime}
                      </div>
                    </div>
                  )}

                  {/* Separate Start */}
                  {!isSame && process.startTime !== undefined && (
                    <div
                      className="absolute top-0 h-10 w-0.5 bg-green-500"
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
                      className="absolute top-0 h-10 w-0.5 bg-red-500"
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
          )
        })}
      </div>
    </div>
  )
}
