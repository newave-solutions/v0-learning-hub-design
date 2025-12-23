import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getModule, getNextModule } from "@/lib/learning-content"
import { ModuleClient } from "@/components/learning/module-client"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{
    pathId: string
    moduleId: string
  }>
}

export default async function ModulePage({ params }: PageProps) {
  const { pathId, moduleId } = await params
  const module = getModule(pathId, moduleId)

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Module Not Found</h1>
          <Button asChild>
            <Link href="/">Return to Learning Hub</Link>
          </Button>
        </div>
      </div>
    )
  }

  const nextModule = getNextModule(pathId, moduleId)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/learn/${pathId}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Path
            </Link>
          </Button>
        </div>
      </header>

      <ModuleClient pathId={pathId} module={module} nextModule={nextModule} />
    </div>
  )
}
