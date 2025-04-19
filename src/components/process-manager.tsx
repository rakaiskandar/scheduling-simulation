"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Process } from "@/types/simulation"
import { getProcessColor } from "@/lib/process-colors"

interface ProcessManagerProps {
  processes: Process[]
  setProcesses: (processes: Process[]) => void
}

export function ProcessManager({ processes, setProcesses }: ProcessManagerProps) {
  const [nextId, setNextId] = useState(1)

  // Add a new process
  const addProcess = () => {
    const newProcess: Process = {
      id: nextId,
      name: `P${nextId}`,
      arrivalTime: 0,
      burstTime: 5,
      remainingTime: 5,
      color: getProcessColor(nextId),
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

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <Label>Proses</Label>
        <Button size="sm" variant="outline" onClick={addProcess}>
          <Plus className="mr-1 h-4 w-4" />
          Tambahkan Proses
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        {processes.length === 0 ? (
          <div className="rounded-md border border-dashed border-gray-300 dark:border-gray-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
           Tidak ada proses yang ditambahkan. Klik &quot;Tambahkan Proses&quot; untuk memulai!
          </div>
        ) : (
          processes.map((process) => (
            <div key={process.id} className="rounded-md border border-gray-200 dark:border-gray-800 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-4 w-4 rounded-full ${process.color.replace("border-", "bg-")}`}></div>
                  <span className="font-medium">{process.name}</span>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeProcess(process.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="flex flex-row justify-between gap-3">
                <div>
                  <Label htmlFor={`arrival-${process.id}`} className="text-xs">
                    Waktu Kedatangan
                  </Label>
                  <Input
                    id={`arrival-${process.id}`}
                    type="number"
                    placeholder="AT"
                    onChange={(e) => updateProcess(process.id, "arrivalTime", Number.parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`burst-${process.id}`} className="text-xs">
                    Waktu Eksekusi
                  </Label>
                  <Input
                    id={`burst-${process.id}`}
                    type="number"
                    placeholder="BT"
                    onChange={(e) => updateProcess(process.id, "burstTime", Number.parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
