"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, StopCircle, CheckCircle2 } from "lucide-react"

interface SpeakingPracticeProps {
  title: string
  prompt: string
  targetDuration: number
  onComplete: () => void
  points: number
}

export function SpeakingPractice({ title, prompt, targetDuration, onComplete, points }: SpeakingPracticeProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const handleStartRecording = () => {
    setIsRecording(true)
    // In a real implementation, this would use Web Audio API
    const timer = setInterval(() => {
      setRecordingTime((prev) => {
        if (prev >= targetDuration) {
          clearInterval(timer)
          setIsRecording(false)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  const handleComplete = () => {
    setIsCompleted(true)
    onComplete()
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-3/20 p-2">
              <Mic className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Speak for at least {targetDuration} seconds • {points} XP
              </p>
            </div>
          </div>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-accent" />}
        </div>

        <div className="p-6 rounded-lg bg-muted">
          <p className="text-lg font-medium mb-2">Speaking Prompt:</p>
          <p className="text-foreground leading-relaxed text-pretty">{prompt}</p>
        </div>

        <div className="flex flex-col items-center gap-4 py-4">
          {isRecording ? (
            <>
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
                  <Mic className="h-12 w-12 text-destructive" />
                </div>
              </div>
              <p className="text-2xl font-bold">{recordingTime}s</p>
              <Button onClick={handleStopRecording} variant="destructive" size="lg">
                <StopCircle className="h-4 w-4 mr-2" />
                Stop Recording
              </Button>
            </>
          ) : recordingTime > 0 ? (
            <>
              <CheckCircle2 className="h-16 w-16 text-accent" />
              <p className="text-lg text-muted-foreground">Recording complete: {recordingTime}s</p>
              {!isCompleted && (
                <Button onClick={handleComplete} size="lg">
                  Submit Response
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                <Mic className="h-12 w-12 text-primary" />
              </div>
              <Button onClick={handleStartRecording} size="lg">
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            </>
          )}
        </div>

        <div className="text-sm text-muted-foreground text-center">
          <p>
            Speak your response clearly and naturally. This exercise helps practice explaining technical concepts
            verbally.
          </p>
        </div>
      </div>
    </Card>
  )
}
