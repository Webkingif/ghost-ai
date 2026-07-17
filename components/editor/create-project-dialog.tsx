"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectName: string
  onProjectNameChange: (value: string) => void
  slug: string
  onCreate: () => void
  isSubmitting: boolean
}

function CreateProjectDialog({
  open,
  onOpenChange,
  projectName,
  onProjectNameChange,
  slug,
  onCreate,
  isSubmitting,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Give your project a name to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                onCreate()
              }
            }}
          />
          {projectName && (
            <p className="text-xs text-muted-foreground">
              slug: {slug}
            </p>
          )}
        </div>
        <DialogFooter showCloseButton>
          <Button onClick={onCreate} disabled={!projectName.trim() || isSubmitting}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CreateProjectDialog }
