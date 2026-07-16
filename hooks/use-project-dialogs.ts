"use client"

import { useState, useCallback, useMemo } from "react"
import type { Project } from "@/lib/types"
import { slugify, MOCK_PROJECTS } from "@/lib/data"

export type DialogState = "create" | "rename" | "delete" | null

export function useProjectDialogs() {
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState("")
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)
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
      name: projectName.trim(),
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
          ? { ...p, name: projectName.trim(), slug: slugify(projectName.trim()) }
          : p
      )
    )
    closeDialog()
  }, [selectedProject, projectName, closeDialog])

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
