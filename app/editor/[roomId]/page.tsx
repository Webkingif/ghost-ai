import { redirect } from "next/navigation"
import { getCurrentIdentity, checkProjectAccess } from "@/lib/project-access"
import { getOwnedProjects, getSharedProjects } from "@/lib/projects"
import { AccessDenied } from "@/components/editor/access-denied"
import { WorkspaceClient } from "./workspace-client"

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ roomId: string }>
}) {
  const { userId, email } = await getCurrentIdentity()
  if (!userId) redirect("/sign-in")

  const { roomId } = await params
  const { project, hasAccess } = await checkProjectAccess(roomId, userId, email)

  if (!project || !hasAccess) return <AccessDenied />

  const [owned, shared] = await Promise.all([
    getOwnedProjects(userId),
    getSharedProjects(email),
  ])

  const projects = [
    ...owned.map((p) => ({
      id: p.id,
      name: p.name,
      ownerId: p.ownerId,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      isOwner: true,
    })),
    ...shared.map((p) => ({
      id: p.id,
      name: p.name,
      ownerId: p.ownerId,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
      isOwner: false,
    })),
  ]

  return (
    <WorkspaceClient
      project={{ id: project.id, name: project.name, ownerId: project.ownerId }}
      projects={projects}
    />
  )
}
