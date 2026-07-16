"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { Button } from "@/components/ui/button"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
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
  } = useProjectDialogs()

  return (
    <div className="flex h-screen flex-col bg-background">
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <main className="relative flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projects={projects}
          onNewProject={openCreateDialog}
          onRename={openRenameDialog}
          onDelete={openDeleteDialog}
        />
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <h1 className="text-lg font-heading">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-center text-sm text-muted-foreground">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </main>
      <CreateProjectDialog
        open={dialogState === "create"}
        onOpenChange={(open) => { if (!open) closeDialog() }}
        projectName={projectName}
        onProjectNameChange={setProjectName}
        slug={slug}
        onCreate={handleCreate}
        isSubmitting={isSubmitting}
      />
      <RenameProjectDialog
        open={dialogState === "rename"}
        onOpenChange={(open) => { if (!open) closeDialog() }}
        projectName={projectName}
        currentName={selectedProject?.name ?? ""}
        onProjectNameChange={setProjectName}
        onRename={handleRename}
        isSubmitting={isSubmitting}
      />
      <DeleteProjectDialog
        open={dialogState === "delete"}
        onOpenChange={(open) => { if (!open) closeDialog() }}
        projectName={selectedProject?.name ?? ""}
        onDelete={handleDelete}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
