"use client"

import { XIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
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
              <p className="pt-12 text-center text-sm text-muted-foreground">
                No projects yet
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="shared" className="flex-1 overflow-hidden px-4 pb-4 pt-4">
            <ScrollArea className="h-full">
              <p className="pt-12 text-center text-sm text-muted-foreground">
                No shared projects yet
              </p>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="p-4">
          <Button className="w-full" size="sm">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}

export { ProjectSidebar }
