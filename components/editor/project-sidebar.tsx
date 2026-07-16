"use client"

import { XIcon, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/types"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: Project[]
  onNewProject: () => void
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}

function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: Project
  onRename: (project: Project) => void
  onDelete: (project: Project) => void
}) {
  return (
    <div className="group flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-muted">
      <span className="flex-1 truncate text-sm">{project.name}</span>
      {project.isOwner && (
        <div className="flex shrink-0 gap-0.5 opacity-0 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRename(project)}
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onDelete(project)}
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}

function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.isOwner)
  const sharedProjects = projects.filter((p) => !p.isOwner)

  return (
    <>
      {isOpen && (
        <div
          inert={!isOpen}
          aria-hidden={!isOpen}
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}
      <aside
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <h2 className="text-sm font-medium">Projects</h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <XIcon />
          </Button>
        </div>
        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-4 w-auto shrink-0">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my-projects" className="flex-1 overflow-hidden px-4 pb-4 pt-4">
            <ScrollArea className="h-full">
              {ownedProjects.length === 0 ? (
                <p className="pt-12 text-center text-sm text-muted-foreground">
                  No projects yet
                </p>
              ) : (
                <div className="space-y-0.5">
                  {ownedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRename}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="shared" className="flex-1 overflow-hidden px-4 pb-4 pt-4">
            <ScrollArea className="h-full">
              {sharedProjects.length === 0 ? (
                <p className="pt-12 text-center text-sm text-muted-foreground">
                  No shared projects yet
                </p>
              ) : (
                <div className="space-y-0.5">
                  {sharedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={onRename}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="p-4">
          <Button className="w-full" size="sm" onClick={onNewProject}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

export { ProjectSidebar }
