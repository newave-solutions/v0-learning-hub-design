"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react"

interface OpenTextActivityProps {
  title: string
  prompt: string
  placeholder: string
  minWords?: number
  points: number
  isCompleted?: boolean
  onComplete: () => void
}

export function OpenTextActivity({
  title,
  prompt,
  placeholder,
  minWords = 50,
  points,
  isCompleted = false,
  onComplete,
}: OpenTextActivityProps) {
  const [response, setResponse] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [localCompleted, setLocalCompleted] = useState(isCompleted)

  const wordCount = response.trim().split(/\s+/).filter(Boolean).length
  const canSubmit = wordCount >= minWords && !isSubmitting
  const completed = isCompleted || localCompleted

  useEffect(() => {
    if (isCompleted) {
      setLocalCompleted(true)
    }
  }, [isCompleted])

  const handleSubmit = async () => {
    if (!canSubmit) return

    setIsSubmitting(true)

    // Simulate AI grading - in production, call your AI API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockFeedback = `Great work! Your response demonstrates understanding of the key concepts. You've provided ${wordCount} words of thoughtful analysis. Consider expanding on practical applications in future responses.`

    setFeedback(mockFeedback)
    setLocalCompleted(true)
    setIsSubmitting(false)
    onComplete()
  }

  if (completed && !feedback) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-2/20 p-2">
              <FileText className="h-5 w-5 text-chart-2" />
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
            <div className="rounded-lg bg-chart-2/20 p-2">
              <FileText className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Min {minWords} words • {points} XP
              </p>
            </div>
          </div>
          {localCompleted && <CheckCircle2 className="h-6 w-6 text-green-500" />}
        </div>

        <div className="p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-sm leading-relaxed text-pretty whitespace-pre-line">{prompt}</p>
        </div>

        {!localCompleted && (
          <>
            <div className="space-y-2">
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder={placeholder}
                className="min-h-[200px] resize-y"
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between text-sm">
                <span className={wordCount >= minWords ? "text-green-500" : "text-muted-foreground"}>
                  {wordCount} / {minWords} words
                </span>
                {wordCount < minWords && (
                  <span className="text-muted-foreground">{minWords - wordCount} more words needed</span>
                )}
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full md:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </>
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
