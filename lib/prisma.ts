import { PrismaClient } from "@/lib/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  __prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? ""

  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url })
  }

  const adapter = new PrismaPg({ connectionString: url })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma
}
