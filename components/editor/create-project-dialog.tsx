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
  roomId: string
  onCreate: () => void
  isSubmitting: boolean
}

function CreateProjectDialog({
  open,
  onOpenChange,
  projectName,
  onProjectNameChange,
  roomId,
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
          {roomId && (
            <p className="text-xs text-muted-foreground">
              Room: {roomId}
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
