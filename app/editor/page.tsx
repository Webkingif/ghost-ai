import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getOwnedProjects, getSharedProjects } from "@/lib/projects"
import { EditorHomeClient } from "./editor-home-client"

export default async function EditorPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress ?? ""

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

  return <EditorHomeClient projects={projects} />
}
