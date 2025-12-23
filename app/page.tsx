"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProgressBar } from "@/components/gamification/progress-bar"
import { BadgeDisplay } from "@/components/gamification/badge-display"
import { useProgress } from "@/lib/progress-context"
import { useAuth } from "@/lib/auth-context"
import { Sparkles, Trophy, Target, BookOpen, Shield, Workflow, Wrench, LogOut, User } from "lucide-react"

export default function HomePage() {
  const { progress, getPathProgress } = useProgress()
  const { user, signOut } = useAuth()

  const learningPaths = [
    {
      id: "bs-detector",
      title: "Phase 1: The BS Detector",
      description:
        "Learn to detect when AI is lying, hallucinating, or writing insecure code. Master the new fundamentals.",
      icon: Shield,
      modules: 3,
      points: 280,
      color: "text-red-400",
    },
    {
      id: "ai-orchestration",
      title: "Phase 2: AI Orchestration",
      description: "Master context engineering, model routing, and develop vibe coding maturity.",
      icon: Workflow,
      modules: 3,
      points: 270,
      color: "text-blue-400",
    },
    {
      id: "hybrid-workflow",
      title: "Phase 3: Hybrid Workflow",
      description: "Bridge the junior gap, learn the sandwich method, and practice building without AI assistance.",
      icon: Sparkles,
      modules: 3,
      points: 260,
      color: "text-green-400",
    },
    {
      id: "ai-tools-mastery",
      title: "AI Tools Mastery",
      description: "Hands-on with v0, Lovable, bolt.new, Cursor, GitHub Copilot, Firebase Studio, n8n, and more.",
      icon: Wrench,
      modules: 3,
      points: 270,
      color: "text-purple-400",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AI Learning Hub</h1>
                <p className="text-xs text-muted-foreground">AI-Augmented Architect Path</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-accent/20 px-3 py-1.5">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">{progress.streakDays} Day Streak</span>
              </div>
              {user && (
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL || "/placeholder.svg"}
                      alt={user.name || "User"}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Message */}
        {user && (
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold">Welcome back, {user.name?.split(" ")[0] || "Learner"}!</h2>
            <p className="text-muted-foreground">Continue your journey to becoming an AI-Augmented Architect</p>
          </div>
        )}

        {/* Progress Section */}
        <section>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Your Progress
            </h2>
            <ProgressBar points={progress.totalPoints} />
          </Card>
        </section>

        {/* Badges Section */}
        <section>
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              Badges Earned
            </h2>
            <BadgeDisplay badges={progress.badges} />
          </Card>
        </section>

        {/* Learning Paths */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-balance">AI-Augmented Architect Learning Path</h2>
            <p className="text-muted-foreground text-pretty">
              From "Vibe Coding" speed to "Senior Engineer" depth. Treat AI as a junior assistant you are training.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {learningPaths.map((path) => {
              const pathProgress = getPathProgress(path.id)
              const progressPercent =
                pathProgress.total > 0 ? Math.round((pathProgress.completed / pathProgress.total) * 100) : 0

              return (
                <Card key={path.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`rounded-lg bg-card border border-border p-3 ${path.color}`}>
                        <path.icon className="h-8 w-8" />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Earn up to</p>
                        <p className="text-lg font-bold text-primary">{path.points} XP</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-balance">{path.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{path.description}</p>
                    </div>

                    {pathProgress.completed > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium flex items-center gap-1">
                            {pathProgress.completed}/{pathProgress.total} modules
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{path.modules} modules</span>
                      </div>
                      <Button asChild size="sm">
                        <Link href={`/learn/${path.id}`}>
                          {pathProgress.completed > 0 ? "Continue" : "Start Learning"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
