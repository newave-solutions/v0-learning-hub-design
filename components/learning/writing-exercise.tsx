"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PenLine, CheckCircle2 } from "lucide-react"

interface WritingExerciseProps {
  title: string
  prompt: string
  minWords: number
  onComplete: () => void
  points: number
}

export function WritingExercise({ title, prompt, minWords, onComplete, points }: WritingExerciseProps) {
  const [response, setResponse] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)

  const wordCount = response.trim().split(/\s+/).filter(Boolean).length
  const canSubmit = wordCount >= minWords

  const handleSubmit = () => {
    if (canSubmit) {
      setIsCompleted(true)
      onComplete()
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-4/20 p-2">
              <PenLine className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Write at least {minWords} words • {points} XP
              </p>
            </div>
          </div>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-accent" />}
        </div>

        <div className="p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium mb-2">Writing Prompt:</p>
          <p className="text-foreground leading-relaxed text-pretty">{prompt}</p>
        </div>

        {!isCompleted ? (
          <>
            <div className="space-y-2">
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                className="min-h-[200px] resize-none"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {wordCount} / {minWords} words
                </span>
                <span className={wordCount >= minWords ? "text-accent font-medium" : "text-muted-foreground"}>
                  {wordCount >= minWords ? "Ready to submit" : `${minWords - wordCount} more needed`}
                </span>
              </div>
            </div>

            <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full md:w-auto">
              Submit Response
            </Button>
          </>
        ) : (
          <div className="p-4 rounded-lg bg-accent/10 border border-accent">
            <p className="text-sm font-medium mb-2">Your Response ({wordCount} words):</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </Card>
  )
}
