"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

interface QuizCardProps {
  title: string
  questions: QuizQuestion[]
  onComplete: () => void
  points: number
  isCompleted?: boolean
}

export function QuizCard({ title, questions, onComplete, points, isCompleted = false }: QuizCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [localCompleted, setLocalCompleted] = useState(isCompleted)

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const completed = isCompleted || localCompleted

  useEffect(() => {
    if (isCompleted) {
      setLocalCompleted(true)
    }
  }, [isCompleted])

  if (!question || !question.options || !Array.isArray(question.options)) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Error: Invalid quiz question data</p>
      </Card>
    )
  }

  const handleSubmit = () => {
    setShowExplanation(true)
    if (selectedAnswer === question.correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setLocalCompleted(true)
      onComplete()
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  if (completed) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-5/20 p-2">
              <HelpCircle className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {questions.length} questions completed • {points} XP
              </p>
            </div>
          </div>
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-5/20 p-2">
              <HelpCircle className="h-5 w-5 text-chart-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length} • {points} XP
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-medium text-pretty">{question.question}</p>

          <div className="space-y-2">
            {question.options.map((option, index) => {
              const isCorrect = option === question.correctAnswer
              const isSelected = selectedAnswer === option

              return (
                <button
                  key={index}
                  onClick={() => !showExplanation && setSelectedAnswer(option)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    showExplanation
                      ? isCorrect
                        ? "border-green-500 bg-green-500/10"
                        : isSelected
                          ? "border-destructive bg-destructive/10"
                          : "border-border"
                      : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {showExplanation && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                  </div>
                </button>
              )
            })}
          </div>

          {showExplanation && (
            <Card className="p-4 bg-muted">
              <p className="text-sm font-medium mb-2">Explanation:</p>
              <p className="text-sm text-muted-foreground text-pretty">{question.explanation}</p>
            </Card>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          {!showExplanation ? (
            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full md:w-auto">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext} className="w-full md:w-auto">
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
