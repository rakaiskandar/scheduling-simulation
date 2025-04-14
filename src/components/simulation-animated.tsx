"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { Process, GanttEntry } from "@/types/simulation"

interface SimulationAnimatedProps {
  processes: Process[]
  ganttChart: GanttEntry[]
}

export function SimulationAnimated({ processes, ganttChart }: SimulationAnimatedProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [maxTime, setMaxTime] = useState(0)
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  // Characters for processes and CPU
  const characters = [
    { name: "robot", color: "text-blue-500" },
    { name: "ghost", color: "text-purple-500" },
    { name: "alien", color: "text-green-500" },
    { name: "ninja", color: "text-red-500" },
    { name: "zombie", color: "text-yellow-500" },
    { name: "pirate", color: "text-pink-500" },
    { name: "knight", color: "text-indigo-500" },
    { name: "wizard", color: "text-teal-500" },
  ]

  // Assign characters to processes
  const processCharacters = processes.map((process, index) => ({
    ...process,
    character: characters[index % characters.length],
  }))

  // Calculate max time from gantt chart
  useEffect(() => {
    if (ganttChart.length > 0) {
      const lastEntry = ganttChart[ganttChart.length - 1]
      setMaxTime(lastEntry.endTime)
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }, [ganttChart])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp

      const deltaTime = timestamp - lastTimeRef.current

      if (deltaTime > 1000 / (speed * 2)) {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 0.5
          if (newTime >= maxTime) {
            setIsPlaying(false)
            return maxTime
          }
          return newTime
        })
        lastTimeRef.current = timestamp
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, maxTime, speed])

  // Play/pause the animation
  const togglePlay = () => {
    if (currentTime >= maxTime) {
      setCurrentTime(0)
    }
    setIsPlaying(!isPlaying)
  }

  // Reset the animation
  const resetAnimation = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }

  // Step forward
  const stepForward = () => {
    setCurrentTime((prevTime) => {
      const newTime = prevTime + 0.5
      return newTime > maxTime ? maxTime : newTime
    })
    setIsPlaying(false)
  }

  // Find current running process
  const getCurrentProcess = () => {
    return ganttChart.find((entry) => currentTime >= entry.startTime && currentTime < entry.endTime)
  }

  // Get processes in ready queue
  const getReadyQueueProcesses = () => {
    return processCharacters.filter(
      (process) =>
        (process.arrivalTime <= currentTime &&
          (process.startTime === undefined || process.startTime > currentTime) &&
          !getCurrentProcess()) ||
        (getCurrentProcess() && process.id !== getCurrentProcess()?.processId),
    )
  }

  // Get completed processes
  const getCompletedProcesses = () => {
    return processCharacters.filter((process) => process.finishTime !== undefined && process.finishTime <= currentTime)
  }

  // Get waiting processes (not yet arrived)
  const getWaitingProcesses = () => {
    return processCharacters.filter((process) => process.arrivalTime > currentTime)
  }

  // Current running process
  const currentRunningProcess = getCurrentProcess()
  const readyQueueProcesses = getReadyQueueProcesses()
  const completedProcesses = getCompletedProcesses()
  const waitingProcesses = getWaitingProcesses()

  // Find the character for the current process
  const currentProcessCharacter = currentRunningProcess
    ? processCharacters.find((p) => p.id === currentRunningProcess.processId)?.character
    : null

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 w-full max-w-3xl">
          <div className="grid grid-cols-3 gap-4">
            {/* Waiting Area */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="mb-2 text-center font-medium">Waiting</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {waitingProcesses.map((process) => (
                  <div key={`waiting-${process.id}`} className="flex flex-col items-center">
                    <div className={`text-2xl ${process.character.color}`}>
                      {renderCharacter(process.character.name)}
                    </div>
                    <span className="text-xs font-medium">{process.name}</span>
                    <span className="text-xs">Arrives: {process.arrivalTime}</span>
                  </div>
                ))}
                {waitingProcesses.length === 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 py-4">No waiting processes</div>
                )}
              </div>
            </div>

            {/* CPU */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="mb-2 text-center font-medium">CPU</h3>
              <div className="flex flex-col items-center justify-center h-24 bg-gray-100 dark:bg-gray-800 rounded-md">
                {currentRunningProcess ? (
                  <div className="flex flex-col items-center">
                    <div className={`text-4xl animate-pulse ${currentProcessCharacter?.color}`}>
                      {renderCharacter(currentProcessCharacter?.name || "")}
                    </div>
                    <div className="mt-1 text-sm font-medium">
                      {processCharacters.find((p) => p.id === currentRunningProcess.processId)?.name}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">CPU Idle</div>
                )}
              </div>
            </div>

            {/* Ready Queue */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <h3 className="mb-2 text-center font-medium">Ready Queue</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {readyQueueProcesses.map((process) => (
                  <div key={`ready-${process.id}`} className="flex flex-col items-center">
                    <div className={`text-2xl ${process.character.color}`}>
                      {renderCharacter(process.character.name)}
                    </div>
                    <span className="text-xs font-medium">{process.name}</span>
                  </div>
                ))}
                {readyQueueProcesses.length === 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 py-4">Queue empty</div>
                )}
              </div>
            </div>
          </div>

          {/* Completed Processes */}
          <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <h3 className="mb-2 text-center font-medium">Completed</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {completedProcesses.map((process) => (
                <div key={`completed-${process.id}`} className="flex flex-col items-center">
                  <div className={`text-2xl ${process.character.color}`}>{renderCharacter(process.character.name)}</div>
                  <span className="text-xs font-medium">{process.name}</span>
                  <span className="text-xs">Finished: {process.finishTime}</span>
                </div>
              ))}
              {completedProcesses.length === 0 && (
                <div className="text-sm text-gray-500 dark:text-gray-400 py-4">No completed processes</div>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-3xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Time: {currentTime.toFixed(1)}</span>
            <span className="text-sm">Speed: {speed}x</span>
          </div>
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              min={0}
              max={maxTime}
              step={0.5}
              onValueChange={(value) => {
                setCurrentTime(value[0])
                setIsPlaying(false)
              }}
            />
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={resetAnimation}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button variant={isPlaying ? "secondary" : "default"} size="sm" onClick={togglePlay}>
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Play
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={stepForward} disabled={currentTime >= maxTime}>
              <SkipForward className="h-4 w-4 mr-1" />
              Step
            </Button>
            <div className="ml-4">
              <Slider
                value={[speed]}
                min={0.5}
                max={3}
                step={0.5}
                className="w-24"
                onValueChange={(value) => setSpeed(value[0])}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Current time indicator on gantt chart */}
      <div className="mt-8">
        <h3 className="mb-3 font-semibold">Gantt Chart Progress</h3>
        <div className="relative">
          <div className="flex">
            {ganttChart.map((entry, index) => (
              <div
                key={index}
                className={`flex flex-col border ${processCharacters.find((p) => p.id === entry.processId)?.color} p-2 text-center relative`}
                style={{
                  width: `${Math.max((entry.endTime - entry.startTime) * 30, 50)}px`,
                  backgroundColor:
                    currentTime >= entry.startTime && currentTime < entry.endTime
                      ? "rgba(255, 255, 255, 0.2)"
                      : currentTime >= entry.endTime
                        ? "rgba(0, 0, 0, 0.1)"
                        : "transparent",
                }}
              >
                <span className="font-medium">{entry.name}</span>
                <span className="text-xs">
                  {entry.startTime} - {entry.endTime}
                </span>
              </div>
            ))}
          </div>
          {/* Current time indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
            style={{
              left: `${currentTime * 30}px`,
              height: "100%",
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Helper function to render pixel art characters
function renderCharacter(characterName: string) {
  switch (characterName) {
    case "robot":
      return "🤖"
    case "ghost":
      return "👻"
    case "alien":
      return "👽"
    case "ninja":
      return "🥷"
    case "zombie":
      return "🧟"
    case "pirate":
      return "🏴‍☠️"
    case "knight":
      return "🛡️"
    case "wizard":
      return "🧙"
    default:
      return "👤"
  }
}
