"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExpandableCard } from "./expandable-card"
import { FileText, CheckCircle2 } from "lucide-react"

interface ExpandableCardData {
  title: string
  summary: string
  content: string
}

interface ExpandableActivityProps {
  title: string
  cards: ExpandableCardData[]
  points: number
  isCompleted?: boolean
  onComplete: () => void
}

export function ExpandableActivity({
  title,
  cards,
  points,
  isCompleted = false,
  onComplete,
}: ExpandableActivityProps) {
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const [localCompleted, setLocalCompleted] = useState(isCompleted)

  useEffect(() => {
    if (isCompleted) {
      setLocalCompleted(true)
    }
  }, [isCompleted])

  const handleCardExpand = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      newSet.add(index)
      return newSet
    })
  }

  const handleComplete = () => {
    setLocalCompleted(true)
    onComplete()
  }

  const allCardsViewed = expandedCards.size === cards.length
  const completed = isCompleted || localCompleted

  if (completed) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-3/20 p-2">
              <FileText className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                {cards.length} topics explored • {points} XP
              </p>
            </div>
          </div>
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-chart-3/20 p-2">
              <FileText className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground">
                Explore all {cards.length} topics • {points} XP
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {expandedCards.size} / {cards.length} topics explored
            </span>
            {allCardsViewed && (
              <span className="text-green-500 font-medium">All topics viewed! ✓</span>
            )}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(expandedCards.size / cards.length) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {cards.map((card, index) => (
          <ExpandableCard
            key={index}
            title={card.title}
            summary={card.summary}
            content={card.content}
            onExpand={() => handleCardExpand(index)}
            isViewed={expandedCards.has(index)}
          />
        ))}
      </div>

      {allCardsViewed && !localCompleted && (
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-green-500 mb-1">All Topics Explored!</p>
              <p className="text-sm text-muted-foreground">
                Mark this activity as complete to earn {points} XP
              </p>
            </div>
            <Button onClick={handleComplete}>Mark as Complete</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
