"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, Square, CheckCircle2, Loader2, Sparkles, Play, Pause } from "lucide-react"

interface VoiceRecordingActivityProps {
  title: string
  prompt: string
  minDuration?: number // in seconds
  points: number
  isCompleted?: boolean
  onComplete: () => void
}

export function VoiceRecordingActivity({
  title,
  prompt,
  minDuration = 30,
  points,
  isCompleted = false,
  onComplete,
}: VoiceRecordingActivityProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [localCompleted, setLocalCompleted] = useState(isCompleted)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const completed = isCompleted || localCompleted

  useEffect(() => {
    if (isCompleted) {
      setLocalCompleted(true)
    }
  }, [isCompleted])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl!)
      audioRef.current.onended = () => setIsPlaying(false)
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSubmit = async () => {
    if (!audioBlob || recordingTime < minDuration) return

    setIsSubmitting(true)

    // Simulate AI grading - in production, transcribe and analyze audio
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const mockFeedback = `Excellent speaking exercise! Your response was clear and well-structured. Duration: ${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, "0")}. Your pronunciation and pacing were good. Consider adding more specific examples in future responses.`

    setFeedback(mockFeedback)
    setLocalCompleted(true)
    setIsSubmitting(false)
    onComplete()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const canSubmit = audioBlob && recordingTime >= minDuration && !isSubmitting

  if (completed && !feedback) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-3/20 p-2">
              <Mic className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">Completed • {points} XP</p>
            </div>
          </div>
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-3/20 p-2">
              <Mic className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Min {minDuration}s • {points} XP
              </p>
            </div>
          </div>
          {localCompleted && <CheckCircle2 className="h-6 w-6 text-green-500" />}
        </div>

        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm leading-relaxed text-pretty">{prompt}</p>
        </div>

        {!localCompleted && (
          <div className="space-y-4">
            {/* Recording Controls */}
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold mb-2">{formatTime(recordingTime)}</div>
                <div className="text-sm text-muted-foreground">
                  {recordingTime < minDuration ? `${minDuration - recordingTime}s remaining` : "Ready to submit"}
                </div>
              </div>

              <div className="flex gap-3">
                {!isRecording && !audioBlob && (
                  <Button onClick={startRecording} size="lg" className="gap-2">
                    <Mic className="h-5 w-5" />
                    Start Recording
                  </Button>
                )}

                {isRecording && (
                  <Button onClick={stopRecording} size="lg" variant="destructive" className="gap-2">
                    <Square className="h-5 w-5" />
                    Stop Recording
                  </Button>
                )}

                {audioBlob && !isRecording && (
                  <>
                    <Button onClick={togglePlayback} size="lg" variant="outline" className="gap-2 bg-transparent">
                      {isPlaying ? (
                        <>
                          <Pause className="h-5 w-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-5 w-5" />
                          Play
                        </>
                      )}
                    </Button>
                    <Button onClick={startRecording} size="lg" variant="outline">
                      Re-record
                    </Button>
                  </>
                )}
              </div>

              {isRecording && (
                <div className="flex items-center gap-2 text-destructive">
                  <div className="h-3 w-3 rounded-full bg-destructive animate-pulse" />
                  <span className="text-sm font-medium">Recording...</span>
                </div>
              )}
            </div>

            {audioBlob && (
              <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Audio...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Submit for Review
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {feedback && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Sparkles className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-2 text-sm">AI Feedback</p>
                <p className="text-sm leading-relaxed text-pretty">{feedback}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
