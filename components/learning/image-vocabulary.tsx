"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, CheckCircle2 } from "lucide-react"

interface ImageVocabularyItem {
  id: string
  imageUrl: string
  correctLabel: string
  options: string[]
}

interface ImageVocabularyProps {
  title: string
  items: ImageVocabularyItem[]
  onComplete: () => void
  points: number
  isCompleted?: boolean
}

export function ImageVocabulary({ title, items, onComplete, points, isCompleted = false }: ImageVocabularyProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [localCompleted, setLocalCompleted] = useState(isCompleted)

  const currentItem = items[currentIndex]
  const isLastItem = currentIndex === items.length - 1
  const completed = isCompleted || localCompleted

  useEffect(() => {
    if (isCompleted) {
      setLocalCompleted(true)
    }
  }, [isCompleted])

  if (!currentItem || !currentItem.options || !Array.isArray(currentItem.options)) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Error: Invalid vocabulary item data</p>
      </Card>
    )
  }

  const handleSelectOption = (option: string) => {
    if (showResult || completed) return

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentItem.id]: option,
    }))
    setShowResult(true)

    const isCorrect = option === currentItem.correctLabel

    if (isCorrect) {
      setTimeout(() => {
        if (isLastItem) {
          setLocalCompleted(true)
          onComplete()
        } else {
          setCurrentIndex((prev) => prev + 1)
          setShowResult(false)
        }
      }, 1500)
    }
  }

  const handleTryAgain = () => {
    setShowResult(false)
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev }
      delete newAnswers[currentItem.id]
      return newAnswers
    })
  }

  if (completed) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-4/20 p-2">
              <ImageIcon className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {items.length} items completed • {points} XP
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
            <div className="rounded-lg bg-chart-4/20 p-2">
              <ImageIcon className="h-5 w-5 text-chart-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {items.length} • {points} XP
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={currentItem.imageUrl || "/placeholder.svg"}
              alt="Vocabulary item"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentItem.options.map((option) => {
              const isSelected = selectedAnswers[currentItem.id] === option
              const isCorrect = option === currentItem.correctLabel

              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  disabled={showResult}
                  className={`p-4 text-center rounded-lg border-2 transition-all font-medium ${
                    showResult && isSelected
                      ? isCorrect
                        ? "border-green-500 bg-green-500/10 text-green-500"
                        : "border-destructive bg-destructive/10 text-destructive"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>

          {showResult && selectedAnswers[currentItem.id] !== currentItem.correctLabel && (
            <Button onClick={handleTryAgain} variant="outline" className="w-full bg-transparent">
              Try Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
