"use client"

import { Progress } from "@/components/ui/progress"
import { calculateLevel, getPointsForNextLevel } from "@/lib/gamification"

interface ProgressBarProps {
  points: number
}

export function ProgressBar({ points }: ProgressBarProps) {
  const level = calculateLevel(points)
  const nextLevelPoints = getPointsForNextLevel(points)
  const currentLevelStart = (level - 1) * 50
  const progressPercent = ((points - currentLevelStart) / 50) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg font-bold">{level}</span>
          </div>
          <div>
            <p className="text-sm font-medium">Level {level}</p>
            <p className="text-xs text-muted-foreground">
              {points} / {nextLevelPoints} XP
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{points}</p>
          <p className="text-xs text-muted-foreground">Total Points</p>
        </div>
      </div>
      <Progress value={progressPercent} className="h-2" />
    </div>
  )
}
