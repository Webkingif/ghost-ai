"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { slugify } from "@/lib/data"

export interface Project {
  id: string
  name: string
  ownerId: string
  createdAt: string
  updatedAt: string
  isOwner: boolean
}

export type DialogState = "create" | "rename" | "delete" | null

function generateSuffix(): string {
  return Math.random().toString(36).slice(2, 6)
}

export function useProjectActions(initialProjects: Project[]) {
  const router = useRouter()
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectName, setProjectName] = useState("")
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [suffix, setSuffix] = useState("")

  const slug = useMemo(() => slugify(projectName), [projectName])
  const roomId = useMemo(() => (suffix ? `${slug}-${suffix}` : ""), [slug, suffix])

  const openCreateDialog = useCallback(() => {
    setProjectName("")
    setSuffix(generateSuffix())
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
    setSuffix("")
    setIsSubmitting(false)
  }, [])

  const handleCreate = useCallback(async () => {
    if (!projectName.trim()) return
    setIsSubmitting(true)

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: projectName.trim(), id: roomId }),
    })

    if (!res.ok) {
      setIsSubmitting(false)
      return
    }

    const project = await res.json()
    closeDialog()
    router.push(`/editor/${project.id}`)
  }, [projectName, roomId, closeDialog, router])

  const handleRename = useCallback(async () => {
    if (!selectedProject || !projectName.trim()) return
    setIsSubmitting(true)

    const res = await fetch(`/api/projects/${selectedProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: projectName.trim() }),
    })

    if (!res.ok) {
      setIsSubmitting(false)
      return
    }

    closeDialog()
    router.refresh()
  }, [selectedProject, projectName, closeDialog, router])

  const handleDelete = useCallback(async () => {
    if (!selectedProject) return
    setIsSubmitting(true)

    const res = await fetch(`/api/projects/${selectedProject.id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      setIsSubmitting(false)
      return
    }

    closeDialog()
    if (window.location.pathname === `/editor/${selectedProject.id}`) {
      router.push("/editor")
    } else {
      router.refresh()
    }
  }, [selectedProject, closeDialog, router])

  return {
    dialogState,
    selectedProject,
    projectName,
    slug,
    roomId,
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
