"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ReadingPassage } from "@/components/learning/reading-passage"
import { VocabularyDragDrop } from "@/components/learning/vocabulary-drag-drop"
import { ExpandableCard } from "@/components/learning/expandable-card"
import { VideoLesson } from "@/components/learning/video-lesson"
import { ImageVocabulary } from "@/components/learning/image-vocabulary"
import { QuizCard } from "@/components/learning/quiz-card"
import { OpenTextActivity } from "@/components/learning/open-text-activity"
import { VoiceRecordingActivity } from "@/components/learning/voice-recording-activity"
import { PointsToast } from "@/components/gamification/points-toast"
import { useProgress } from "@/lib/progress-context"
import { ArrowRight, CheckCircle2 } from "lucide-react"

interface Module {
  id: string
  title: string
  description: string
  points: number
  activities: any[]
  estimatedTime: number
}

interface ModuleClientProps {
  pathId: string
  module: Module
  nextModule?: Module
}

export function ModuleClient({ pathId, module, nextModule }: ModuleClientProps) {
  const { addPoints, completeActivity, completeModule, isActivityCompleted } = useProgress()
  const [sessionCompletedActivities, setSessionCompletedActivities] = useState<string[]>([])
  const [showPointsToast, setShowPointsToast] = useState(false)
  const [lastEarnedPoints, setLastEarnedPoints] = useState(0)
  const [moduleCompleted, setModuleCompleted] = useState(false)
  const router = useRouter()

  const completedActivities = module.activities
    .filter((a) => isActivityCompleted(a.id) || sessionCompletedActivities.includes(a.id))
    .map((a) => a.id)

  const handleActivityComplete = (activityId: string, points: number) => {
    if (!completedActivities.includes(activityId)) {
      // Update local state for immediate UI feedback
      setSessionCompletedActivities((prev) => [...prev, activityId])

      // Persist to context/localStorage
      completeActivity(activityId, module.id, pathId)
      addPoints(points)

      setLastEarnedPoints(points)
      setShowPointsToast(true)
    }
  }

  const progressPercent = (completedActivities.length / module.activities.length) * 100
  const allActivitiesComplete = completedActivities.length === module.activities.length

  useEffect(() => {
    if (allActivitiesComplete && !moduleCompleted) {
      setModuleCompleted(true)
      completeModule(module.id, pathId)

      if (nextModule) {
        const timer = setTimeout(() => {
          router.push(`/learn/${pathId}/${nextModule.id}`)
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
  }, [allActivitiesComplete, moduleCompleted, nextModule, pathId, router, module.id, completeModule])

  return (
    <>
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/learn/${pathId}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Path
            </Link>
            <div className="text-right flex items-center gap-2">
              {allActivitiesComplete && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              <p className="text-sm text-muted-foreground">
                {completedActivities.length} / {module.activities.length} activities
              </p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Module Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-balance">{module.title}</h1>
          <p className="text-lg text-muted-foreground text-pretty">{module.description}</p>
        </div>

        {/* Activities */}
        <div className="space-y-6">
          {module.activities.map((activity) => {
            const isCompleted = completedActivities.includes(activity.id)

            switch (activity.type) {
              case "reading":
                return (
                  <ReadingPassage
                    key={activity.id}
                    title={activity.title}
                    content={activity.data.content}
                    estimatedTime={activity.data.estimatedTime}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              case "vocabulary":
                return (
                  <VocabularyDragDrop
                    key={activity.id}
                    title={activity.title}
                    items={activity.data.items}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              case "expandable":
                return (
                  <div key={activity.id} className="space-y-3">
                    <h3 className="text-xl font-semibold">{activity.title}</h3>
                    {activity.data.cards.map((card: any, index: number) => (
                      <ExpandableCard key={index} title={card.title} summary={card.summary} content={card.content} />
                    ))}
                  </div>
                )

              case "video":
                return (
                  <VideoLesson
                    key={activity.id}
                    title={activity.title}
                    description={activity.data.description}
                    videoUrl={activity.data.videoUrl}
                    duration={activity.data.duration}
                    thumbnail={activity.data.thumbnail}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              case "image-vocab":
                return (
                  <ImageVocabulary
                    key={activity.id}
                    title={activity.title}
                    items={activity.data.items}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              case "quiz":
                return (
                  <QuizCard
                    key={activity.id}
                    title={activity.title}
                    questions={activity.data.questions}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              case "open-text":
                return (
                  <OpenTextActivity
                    key={activity.id}
                    title={activity.title}
                    prompt={activity.data.prompt}
                    placeholder={activity.data.placeholder}
                    minWords={activity.data.minWords}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              case "voice-recording":
                return (
                  <VoiceRecordingActivity
                    key={activity.id}
                    title={activity.title}
                    prompt={activity.data.prompt}
                    minDuration={activity.data.minDuration}
                    points={activity.points}
                    isCompleted={isCompleted}
                    onComplete={() => handleActivityComplete(activity.id, activity.points)}
                  />
                )

              default:
                return null
            }
          })}
        </div>

        {/* Module Navigation */}
        {allActivitiesComplete && (
          <div className="flex items-center justify-between py-8 border-t border-border">
            <div>
              <p className="text-lg font-semibold mb-1 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Module Complete!
              </p>
              <p className="text-sm text-muted-foreground">
                You've earned {module.points} XP
                {nextModule && " • Advancing to next module..."}
              </p>
            </div>
            {nextModule ? (
              <Button asChild size="lg">
                <Link href={`/learn/${pathId}/${nextModule.id}`}>
                  Next Module
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link href={`/learn/${pathId}`}>Complete Path</Link>
              </Button>
            )}
          </div>
        )}
      </main>

      <PointsToast
        points={lastEarnedPoints}
        message="Activity completed!"
        show={showPointsToast}
        onComplete={() => setShowPointsToast(false)}
      />
    </>
  )
}
