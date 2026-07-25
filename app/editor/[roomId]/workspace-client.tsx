"use client"

import { useState } from "react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

interface Project {
  id: string
  name: string
  ownerId: string
  createdAt: string
  updatedAt: string
  isOwner: boolean
}

interface WorkspaceClientProps {
  project: { id: string; name: string; ownerId: string }
  projects: Project[]
}

export function WorkspaceClient({ project, projects }: WorkspaceClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-background">
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        projectName={project.name}
        onShare={() => {}}
        onToggleAI={() => setAiSidebarOpen((v) => !v)}
        aiOpen={aiSidebarOpen}
      />
      <main className="relative flex flex-1 overflow-hidden">
        <ProjectSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          projects={projects}
          onNewProject={() => {}}
          onRename={() => {}}
          onDelete={() => {}}
          activeProjectId={project.id}
        />
        <div className="flex flex-1 items-center justify-center bg-background">
          <p className="text-sm text-muted-foreground">Canvas coming soon</p>
        </div>
        {aiSidebarOpen && (
          <aside className="flex w-80 flex-col border-l border-border bg-card">
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-muted-foreground">AI Chat coming soon</p>
            </div>
          </aside>
        )}
      </main>
    </div>
  )
}
