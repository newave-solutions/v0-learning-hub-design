"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle2 } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ReadingPassageProps {
  title: string
  content: string
  estimatedTime: number
  onComplete: () => void
  points: number
}

export function ReadingPassage({ title, content, estimatedTime, onComplete, points }: ReadingPassageProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  const handleComplete = () => {
    setIsCompleted(true)
    onComplete()
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-1/20 p-2">
              <BookOpen className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {estimatedTime} min read • {points} XP
              </p>
            </div>
          </div>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-accent" />}
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown
            className="text-foreground leading-relaxed space-y-4 text-pretty"
            components={{
              h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6">{children}</h1>,
              h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 mt-5">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg font-semibold mb-2 mt-4">{children}</h3>,
              p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {!isCompleted && (
          <div className="pt-4 border-t border-border">
            <Button onClick={handleComplete} className="w-full md:w-auto">
              Mark as Complete
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
