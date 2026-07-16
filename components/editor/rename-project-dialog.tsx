"use client"

import { useEffect, useRef } from "react"
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

interface RenameProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectName: string
  currentName: string
  onProjectNameChange: (value: string) => void
  onRename: () => void
  isSubmitting: boolean
}

function RenameProjectDialog({
  open,
  onOpenChange,
  projectName,
  currentName,
  onProjectNameChange,
  onRename,
  isSubmitting,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Rename &ldquo;{currentName}&rdquo; to something new.
          </DialogDescription>
        </DialogHeader>
        <Input
          ref={inputRef}
          placeholder="Project name"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              onRename()
            }
          }}
        />
        <DialogFooter showCloseButton>
          <Button onClick={onRename} disabled={!projectName.trim() || isSubmitting}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { RenameProjectDialog }
