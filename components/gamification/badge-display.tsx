"use client"

import type { Badge } from "@/lib/gamification"
import { Card } from "@/components/ui/card"

interface BadgeDisplayProps {
  badges: Badge[]
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {badges.map((badge) => (
        <Card
          key={badge.id}
          className={`flex flex-col items-center justify-center p-4 transition-all ${
            badge.earned ? "bg-card hover:scale-105" : "bg-muted/50 opacity-50 grayscale"
          }`}
        >
          <div className="text-4xl mb-2">{badge.icon}</div>
          <p className="text-xs font-semibold text-center leading-tight">{badge.name}</p>
          {badge.earned && <div className="mt-1 h-1 w-full rounded-full bg-accent" />}
        </Card>
      ))}
    </div>
  )
}
