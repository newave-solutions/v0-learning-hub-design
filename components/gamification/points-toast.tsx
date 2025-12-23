"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface PointsToastProps {
  points: number
  message: string
  show: boolean
  onComplete?: () => void
}

export function PointsToast({ points, message, show, onComplete }: PointsToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    if (show) {
      toast({
        title: `+${points} XP`,
        description: message,
        duration: 3000,
      })
      onComplete?.()
    }
  }, [show, points, message, toast, onComplete])

  return null
}
