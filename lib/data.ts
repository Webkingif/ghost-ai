import type { Project } from "@/lib/types"

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const MOCK_PROJECTS: Project[] = [
  { id: "1", name: "My App", slug: "my-app", isOwner: true },
  { id: "2", name: "Design System", slug: "design-system", isOwner: true },
  { id: "3", name: "Shared Project", slug: "shared-project", isOwner: false },
]
