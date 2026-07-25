import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function getCurrentIdentity() {
  const { userId } = await auth()
  if (!userId) return { userId: null, email: null }

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress ?? ""

  return { userId, email }
}

export async function checkProjectAccess(
  projectId: string,
  userId: string,
  email: string
) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { collaborators: true },
  })

  if (!project) return { project: null, hasAccess: false }

  const isOwner = project.ownerId === userId
  const isCollaborator = project.collaborators.some((c) => c.email === email)

  return { project, hasAccess: isOwner || isCollaborator }
}
