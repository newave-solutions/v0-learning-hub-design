"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useProgress } from "@/lib/progress-context"
import { CheckCircle2, Lock, Play, Clock, Layers } from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  points: number
  activities: any[]
  estimatedTime: number
}

interface LearningPathClientProps {
  pathId: string
  pathTitle: string
  pathDescription: string
  modules: Module[]
  totalPoints: number
}

export function LearningPathClient({
  pathId,
  pathTitle,
  pathDescription,
  modules,
  totalPoints,
}: LearningPathClientProps) {
  const { progress, isModuleCompleted, isActivityCompleted } = useProgress()

  const completedModules = modules.filter((m) => isModuleCompleted(m.id)).map((m) => m.id)

  // Calculate module progress (activities completed within each module)
  const getModuleProgress = (module: Module) => {
    const completedActivities = module.activities.filter((a) => isActivityCompleted(a.id)).length
    return { completed: completedActivities, total: module.activities.length }
  }

  const earnedPoints = modules
    .filter((m) => completedModules.includes(m.id))
    .reduce((sum, module) => sum + module.points, 0)
  const progressPercent = modules.length > 0 ? (completedModules.length / modules.length) * 100 : 0

  // Find the first incomplete module to show as "Continue"
  const currentModuleIndex = modules.findIndex((m) => !completedModules.includes(m.id))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 inline-block"
          >
            ← Back to Learning Paths
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-balance">{pathTitle}</h1>
          <p className="text-muted-foreground text-pretty">{pathDescription}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Progress Overview */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Learning Path Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedModules.length} / {modules.length} modules
              </p>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{earnedPoints} XP earned</span>
              <span className="font-semibold text-primary">{totalPoints} XP total</span>
            </div>
          </div>
        </Card>

        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Modules</h2>

          <div className="space-y-4">
            {modules.map((module, index) => {
              const isCompleted = completedModules.includes(module.id)
              const isLocked =
                index > 0 && !completedModules.includes(modules[index - 1].id) && currentModuleIndex !== index
              const isCurrent = currentModuleIndex === index
              const moduleProgress = getModuleProgress(module)
              const hasStarted = moduleProgress.completed > 0

              return (
                <Card
                  key={module.id}
                  className={`p-6 ${isLocked ? "opacity-50" : ""} ${isCurrent ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    {/* Module Icon */}
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${
                        isCompleted ? "bg-green-500/20" : isLocked ? "bg-muted" : "bg-primary"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      ) : isLocked ? (
                        <Lock className="h-8 w-8 text-muted-foreground" />
                      ) : (
                        <Play className="h-8 w-8 text-primary-foreground" />
                      )}
                    </div>

                    {/* Module Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-balance">{module.title}</h3>
                            {isCurrent && !isCompleted && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground text-pretty">{module.description}</p>
                        </div>
                        <div className="text-left md:text-right shrink-0">
                          <p className="text-2xl font-bold text-primary">{module.points}</p>
                          <p className="text-xs text-muted-foreground">XP</p>
                        </div>
                      </div>

                      {/* Progress bar for started but incomplete modules */}
                      {hasStarted && !isCompleted && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress</span>
                            <span>
                              {moduleProgress.completed}/{moduleProgress.total} activities
                            </span>
                          </div>
                          <Progress value={(moduleProgress.completed / moduleProgress.total) * 100} className="h-1.5" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Layers className="h-4 w-4" />
                          {module.activities.length} activities
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.estimatedTime} min
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0">
                      {isCompleted ? (
                        <Button variant="outline" asChild>
                          <Link href={`/learn/${pathId}/${module.id}`}>Review</Link>
                        </Button>
                      ) : isLocked ? (
                        <Button disabled>Locked</Button>
                      ) : (
                        <Button asChild>
                          <Link href={`/learn/${pathId}/${module.id}`}>{hasStarted ? "Continue" : "Start"}</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Path Completion */}
        {completedModules.length === modules.length && modules.length > 0 && (
          <Card className="p-6 bg-green-500/10 border-green-500/20">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <div>
                <h3 className="text-xl font-bold">Path Completed!</h3>
                <p className="text-muted-foreground">
                  You've mastered {pathTitle} and earned {totalPoints} XP
                </p>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
