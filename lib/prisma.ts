import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from '@prisma/client';


const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Neon adapter with connection string
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

// Create Prisma client with Neon adapter
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
