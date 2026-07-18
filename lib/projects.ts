import { prisma } from "@/lib/prisma"

export interface ProjectData {
  id: string
  name: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export async function getOwnedProjects(userId: string): Promise<ProjectData[]> {
  return prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })
}

export async function getSharedProjects(email: string): Promise<ProjectData[]> {
  const collaborations = await prisma.projectCollaborator.findMany({
    where: { email },
    include: { project: true },
    orderBy: { project: { createdAt: "desc" } },
  })
  return collaborations.map((c) => c.project)
}
