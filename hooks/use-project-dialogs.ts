"use client"

import { useState, useCallback, useMemo } from "react"
import { slugify } from "@/lib/data"

interface Project {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

export type DialogState = "create" | "rename" | "delete" | null

export function useProjectDialogs() {
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slug = useMemo(() => slugify(projectName), [projectName])

  const openCreateDialog = useCallback(() => {
    setProjectName("")
    setDialogState("create")
  }, [])

  const openRenameDialog = useCallback((project: Project) => {
    setSelectedProject(project)
    setProjectName(project.name)
    setDialogState("rename")
  }, [])

  const openDeleteDialog = useCallback((project: Project) => {
    setSelectedProject(project)
    setDialogState("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setDialogState(null)
    setSelectedProject(null)
    setProjectName("")
    setIsSubmitting(false)
  }, [])

  const handleCreate = useCallback(() => {
    if (!projectName.trim()) return
    setIsSubmitting(true)
    const newProject: Project = {
      id: String(Date.now()),
      name: slug,
      slug: slug,
      isOwner: true,
    }
    setProjects((prev) => [...prev, newProject])
    closeDialog()
  }, [projectName, slug, closeDialog])

  const handleRename = useCallback(() => {
    if (!selectedProject || !projectName.trim()) return
    setIsSubmitting(true)
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, name: slug, slug }
          : p
      )
    )
    closeDialog()
  }, [selectedProject, projectName, slug, closeDialog])

  const handleDelete = useCallback(() => {
    if (!selectedProject) return
    setIsSubmitting(true)
    setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id))
    closeDialog()
  }, [selectedProject, closeDialog])

  return {
    dialogState,
    selectedProject,
    projectName,
    slug,
    projects,
    isSubmitting,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    setProjectName,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
