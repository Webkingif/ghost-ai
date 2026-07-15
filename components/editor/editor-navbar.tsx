"use client"

import { UserButton } from "@clerk/nextjs"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorNavbarProps {
  sidebarOpen?: boolean
  onToggleSidebar?: () => void
}

function EditorNavbar({ sidebarOpen, onToggleSidebar }: EditorNavbarProps) {
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
      <div className="flex-1" />
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
