"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, FileText } from "lucide-react"

interface ExpandableCardProps {
  title: string
  summary: string
  content: string
  color?: string
}

export function ExpandableCard({ title, summary, content, color = "text-chart-3" }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left transition-colors hover:bg-muted/50"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`rounded-lg bg-card p-2 ${color}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-balance">{title}</h3>
              <p className="text-sm text-muted-foreground text-pretty">{summary}</p>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 pt-0">
          <div className="pl-11 prose prose-sm dark:prose-invert max-w-none">
            <div
              className="text-foreground leading-relaxed text-pretty"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )}
    </Card>
  )
}
