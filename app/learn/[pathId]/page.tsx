import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getLearningPath, getTotalPathPoints } from "@/lib/learning-content"
import { LearningPathClient } from "@/components/learning/learning-path-client"

interface PageProps {
  params: Promise<{
    pathId: string
  }>
}

export default async function LearningPathPage({ params }: PageProps) {
  const { pathId } = await params
  const path = getLearningPath(pathId)

  if (!path) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Learning Path Not Found</h1>
          <Button asChild>
            <Link href="/">Return to Learning Hub</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalPoints = getTotalPathPoints(pathId)

  return (
    <LearningPathClient
      pathId={pathId}
      pathTitle={path.title}
      pathDescription={path.description}
      modules={path.modules}
      totalPoints={totalPoints}
    />
  )
}
