"use client"

import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AccessDenied() {
  const router = useRouter()

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <Lock className="h-8 w-8 text-muted-foreground" />
        <h1 className="text-lg font-medium">Access Denied</h1>
        <p className="text-sm text-muted-foreground">
          You don&apos;t have access to this project.
        </p>
        <Button variant="outline" onClick={() => router.push("/editor")}>
          Back to Editor
        </Button>
      </div>
    </div>
  )
}
