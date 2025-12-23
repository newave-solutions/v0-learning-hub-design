"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { badges as defaultBadges, calculateLevel, type Badge, type UserProgress } from "./gamification"

interface ProgressContextType {
  progress: UserProgress
  addPoints: (points: number) => void
  completeActivity: (activityId: string, moduleId: string, pathId: string) => void
  completeModule: (moduleId: string, pathId: string) => void
  isActivityCompleted: (activityId: string) => boolean
  isModuleCompleted: (moduleId: string) => boolean
  getPathProgress: (pathId: string) => { completed: number; total: number }
  incrementStreak: () => void
  unlockBadge: (badgeId: string) => void
}

const ProgressContext = createContext<ProgressContextType | null>(null)

const STORAGE_KEY = "ai-learning-hub-progress"

const defaultProgress: UserProgress = {
  totalPoints: 0,
  level: 1,
  badges: defaultBadges.map((b) => ({ ...b, earned: false })),
  completedActivities: [],
  streakDays: 0,
}

const pathModuleCounts: Record<string, string[]> = {
  "bs-detector": ["code-literacy", "security-foundations", "system-design-basics"],
  "ai-orchestration": ["context-engineering", "model-routing", "vibe-coding-maturity"],
  "hybrid-workflow": ["junior-gap", "sandwich-method", "no-ai-friday"],
  "ai-tools-mastery": ["vibe-coding-platforms", "ai-code-editors", "automation-agents"],
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Merge with default badges to ensure new badges are included
        const mergedBadges = defaultBadges.map((defaultBadge) => {
          const storedBadge = parsed.badges?.find((b: Badge) => b.id === defaultBadge.id)
          return storedBadge || { ...defaultBadge, earned: false }
        })
        setProgress({ ...defaultProgress, ...parsed, badges: mergedBadges })
      } catch {
        setProgress(defaultProgress)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  }, [progress, isHydrated])

  // Check and unlock badges based on current progress
  const checkBadges = useCallback((currentProgress: UserProgress) => {
    const updatedBadges = currentProgress.badges.map((badge) => {
      if (badge.earned) return badge

      let shouldUnlock = false
      const completedCount = currentProgress.completedActivities.length

      switch (badge.id) {
        case "first-steps":
          shouldUnlock = completedCount >= 1
          break
        case "code-explorer":
          shouldUnlock = currentProgress.totalPoints >= 100
          break
        case "reading-novice":
          shouldUnlock = completedCount >= 5
          break
        case "vocabulary-master":
          shouldUnlock = completedCount >= 10
          break
        case "ai-architect":
          shouldUnlock = completedCount >= 8
          break
        case "streak-warrior":
          shouldUnlock = currentProgress.streakDays >= 7
          break
        case "low-code-builder":
          shouldUnlock = currentProgress.totalPoints >= 300
          break
        case "vibe-master":
          shouldUnlock = completedCount >= 20
          break
        case "polyglot-learner":
          shouldUnlock = currentProgress.totalPoints >= 500
          break
      }

      return shouldUnlock ? { ...badge, earned: true } : badge
    })

    return updatedBadges
  }, [])

  const addPoints = useCallback(
    (points: number) => {
      setProgress((prev) => {
        const newTotal = prev.totalPoints + points
        const newLevel = calculateLevel(newTotal)
        const updated = { ...prev, totalPoints: newTotal, level: newLevel }
        return { ...updated, badges: checkBadges(updated) }
      })
    },
    [checkBadges],
  )

  const completeActivity = useCallback(
    (activityId: string, moduleId: string, pathId: string) => {
      setProgress((prev) => {
        const fullId = `${pathId}:${moduleId}:${activityId}`
        if (prev.completedActivities.includes(fullId)) return prev

        const updated = {
          ...prev,
          completedActivities: [...prev.completedActivities, fullId],
        }
        return { ...updated, badges: checkBadges(updated) }
      })
    },
    [checkBadges],
  )

  const completeModule = useCallback(
    (moduleId: string, pathId: string) => {
      setProgress((prev) => {
        const fullId = `${pathId}:${moduleId}`
        const moduleKey = `module:${fullId}`
        if (prev.completedActivities.includes(moduleKey)) return prev

        const updated = {
          ...prev,
          completedActivities: [...prev.completedActivities, moduleKey],
        }
        return { ...updated, badges: checkBadges(updated) }
      })
    },
    [checkBadges],
  )

  const isActivityCompleted = useCallback(
    (activityId: string) => {
      return progress.completedActivities.some((id) => id.endsWith(`:${activityId}`))
    },
    [progress.completedActivities],
  )

  const isModuleCompleted = useCallback(
    (moduleId: string) => {
      return progress.completedActivities.some((id) => id === `module:${moduleId}` || id.includes(`:${moduleId}`))
    },
    [progress.completedActivities],
  )

  const getPathProgress = useCallback(
    (pathId: string) => {
      const modules = pathModuleCounts[pathId] || []
      const completed = modules.filter((moduleId) =>
        progress.completedActivities.some((id) => id.includes(`${pathId}:${moduleId}`)),
      ).length
      return { completed, total: modules.length }
    },
    [progress.completedActivities],
  )

  const incrementStreak = useCallback(() => {
    setProgress((prev) => {
      const updated = { ...prev, streakDays: prev.streakDays + 1 }
      return { ...updated, badges: checkBadges(updated) }
    })
  }, [checkBadges])

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress((prev) => ({
      ...prev,
      badges: prev.badges.map((b) => (b.id === badgeId ? { ...b, earned: true } : b)),
    }))
  }, [])

  // Prevent hydration mismatch by rendering nothing until hydrated
  if (!isHydrated) {
    return null
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        addPoints,
        completeActivity,
        completeModule,
        isActivityCompleted,
        isModuleCompleted,
        getPathProgress,
        incrementStreak,
        unlockBadge,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
