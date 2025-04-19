"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AlgorithmSelectorProps {
  algorithm: string
  setAlgorithm: (algorithm: string) => void
  timeQuantum: number
  setTimeQuantum: (timeQuantum: number) => void
}

export function AlgorithmSelector({ algorithm, setAlgorithm, timeQuantum, setTimeQuantum }: AlgorithmSelectorProps) {
  return (
    <div className="mb-6 space-y-6">
      <div>
        <Label htmlFor="algorithm">Algoritma Penjadwalan</Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger id="algorithm" className="mt-1">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fcfs">First Come First Served (FCFS)</SelectItem>
            <SelectItem value="sjfpre">Shortest Job First (SJF) Preemptive</SelectItem>
            <SelectItem value="sjfnonpre">Shortest Job First (SJF) Non Preemptive</SelectItem>
            <SelectItem value="rr">Round Robin (RR)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {algorithm === "rr" && (
        <div>
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
    </div>
  )
}

