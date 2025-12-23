"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle2 } from "lucide-react"

interface VideoLessonProps {
  title: string
  description: string
  videoUrl: string
  duration: number
  onComplete: () => void
  points: number
  thumbnail?: string
}

export function VideoLesson({
  title,
  description,
  videoUrl,
  duration,
  onComplete,
  points,
  thumbnail,
}: VideoLessonProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleComplete = () => {
    setIsCompleted(true)
    onComplete()
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-muted">
        {!isPlaying ? (
          <>
            <img
              src={thumbnail || `/placeholder.svg?height=360&width=640&query=${encodeURIComponent(title)}`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
              <button
                onClick={() => setIsPlaying(true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
              >
                <Play className="h-8 w-8 ml-1" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <p className="text-sm text-muted-foreground">Video player: {videoUrl}</p>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1 text-balance">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {duration} min • {points} XP
            </p>
          </div>
          {isCompleted && <CheckCircle2 className="h-6 w-6 text-accent" />}
        </div>

        <p className="text-sm text-muted-foreground text-pretty">{description}</p>

        {!isCompleted && isPlaying && (
          <div className="pt-4 border-t border-border">
            <Button onClick={handleComplete} className="w-full md:w-auto">
              Mark as Watched
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
