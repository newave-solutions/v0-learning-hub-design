"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, CheckCircle2, XCircle } from "lucide-react"

interface VocabularyItem {
  term: string
  definition: string
}

interface VocabularyDragDropProps {
  title: string
  items: VocabularyItem[]
  onComplete: () => void
  points: number
  isCompleted?: boolean // Add isCompleted prop from parent
}

export function VocabularyDragDrop({ title, items, onComplete, points, isCompleted = false }: VocabularyDragDropProps) {
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([])
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [localCompleted, setLocalCompleted] = useState(isCompleted)
  const [showResults, setShowResults] = useState(isCompleted)

  useEffect(() => {
    const definitions = [...items.map((item) => item.definition)]
    setShuffledDefinitions(definitions.sort(() => Math.random() - 0.5))
  }, [items])

  useEffect(() => {
    if (isCompleted) {
      setLocalCompleted(true)
      setShowResults(true)
      // Pre-fill correct matches when already completed
      const correctMatches: Record<string, string> = {}
      items.forEach((item) => {
        correctMatches[item.term] = item.definition
      })
      setMatches(correctMatches)
    }
  }, [isCompleted, items])

  const handleTermClick = (term: string) => {
    if (showResults || localCompleted) return
    setSelectedTerm(term)
  }

  const handleDefinitionClick = (definition: string) => {
    if (!selectedTerm || showResults || localCompleted) return

    setMatches((prev) => ({
      ...prev,
      [selectedTerm]: definition,
    }))
    setSelectedTerm(null)
  }

  const handleSubmit = () => {
    setShowResults(true)
    const allCorrect = items.every((item) => matches[item.term] === item.definition)

    if (allCorrect) {
      setLocalCompleted(true)
      setTimeout(() => onComplete(), 1500)
    }
  }

  const isCorrectMatch = (term: string, definition: string) => {
    const correctItem = items.find((item) => item.term === term)
    return correctItem?.definition === definition
  }

  const allMatched = items.every((item) => matches[item.term])
  const completed = isCompleted || localCompleted

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-2/20 p-2">
              <Brain className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">Match terms with definitions • {points} XP</p>
            </div>
          </div>
          {completed && <CheckCircle2 className="h-6 w-6 text-green-500" />}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Terms Column */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Terms</p>
            {items.map((item) => (
              <button
                key={item.term}
                onClick={() => handleTermClick(item.term)}
                disabled={showResults || completed}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  selectedTerm === item.term
                    ? "border-primary bg-primary/10"
                    : matches[item.term]
                      ? showResults || completed
                        ? isCorrectMatch(item.term, matches[item.term])
                          ? "border-green-500 bg-green-500/10"
                          : "border-destructive bg-destructive/10"
                        : "border-border bg-muted"
                      : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.term}</span>
                  {(showResults || completed) && matches[item.term] && (
                    <>
                      {isCorrectMatch(item.term, matches[item.term]) ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive" />
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Definitions Column */}
          <div className="space-y-2">
            <p className="text-sm font-medium mb-3">Definitions</p>
            {shuffledDefinitions.map((definition) => (
              <button
                key={definition}
                onClick={() => handleDefinitionClick(definition)}
                disabled={showResults || !selectedTerm || completed}
                className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                  Object.values(matches).includes(definition)
                    ? "border-border bg-muted opacity-50"
                    : selectedTerm
                      ? "border-border hover:border-primary/50"
                      : "border-border opacity-50"
                }`}
              >
                <span className="text-sm">{definition}</span>
              </button>
            ))}
          </div>
        </div>

        {!completed && (
          <div className="pt-4 border-t border-border flex gap-3">
            <Button onClick={handleSubmit} disabled={!allMatched || showResults} className="flex-1 md:flex-none">
              Check Answers
            </Button>
            {showResults && !localCompleted && (
              <Button
                onClick={() => {
                  setMatches({})
                  setShowResults(false)
                  setShuffledDefinitions([...items.map((item) => item.definition)].sort(() => Math.random() - 0.5))
                }}
                variant="outline"
              >
                Try Again
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
