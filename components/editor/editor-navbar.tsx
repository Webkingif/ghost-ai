"use client"

import { UserButton } from "@clerk/nextjs"
import { PanelLeftOpen, PanelLeftClose, Share2, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
  projectName?: string
  onShare?: () => void
  onToggleAI?: () => void
  aiOpen?: boolean
}

function EditorNavbar({
  sidebarOpen,
  onToggleSidebar,
  projectName,
  onShare,
  onToggleAI,
  aiOpen,
}: EditorNavbarProps) {
  return (
    <nav className="flex h-12 items-center gap-4 border-b border-border bg-card px-4">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
      </Button>
      {projectName && (
        <span className="truncate text-sm font-medium text-text-primary">
          {projectName}
        </span>
      )}
      <div className="flex-1" />
      {onShare && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onShare}
          aria-label="Share project"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
      {onToggleAI && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleAI}
          aria-label="Toggle AI sidebar"
          data-active={aiOpen || undefined}
        >
          <Bot className="h-4 w-4" />
        </Button>
      )}
      <UserButton
        appearance={{
          variables: {
            colorBackground: "var(--bg-surface)",
            colorPrimary: "var(--accent-primary)",
            colorForeground: "var(--text-primary)",
            colorPrimaryForeground: "var(--primary-foreground)",
            colorMuted: "var(--bg-subtle)",
            colorMutedForeground: "var(--text-secondary)",
            colorNeutral: "var(--text-muted)",
            borderRadius: "var(--radius)",
          },
        }}
      />
    </nav>
  )
}

export { EditorNavbar }
