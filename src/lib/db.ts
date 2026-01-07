import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma Client configuration
import type { Prisma } from "@prisma/client";

const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === "development" 
    ? ["error", "warn"]
    : ["error"],
  errorFormat: "pretty",
};

// Create Prisma Client with Accelerate extension
function createPrismaClient(): PrismaClient {
  const client = new PrismaClient(prismaClientOptions);
  
  // Use Accelerate extension if DATABASE_URL is a Prisma Accelerate URL
  // The extension is applied at runtime, but we maintain PrismaClient type
  // for TypeScript compatibility. Accelerate methods work transparently.
  if (process.env.DATABASE_URL?.startsWith('prisma+postgres://')) {
    // Cast to PrismaClient to maintain type compatibility
    // Accelerate extension works at runtime regardless of TypeScript types
    return client.$extends(withAccelerate()) as unknown as PrismaClient;
  }
  
  return client;
}

// Use singleton pattern in all environments to prevent multiple instances
if (!globalForPrisma.prisma) {
  try {
    globalForPrisma.prisma = createPrismaClient();
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    // In production, we want to continue even if Prisma fails to initialize
    // This prevents build-time crashes
    if (process.env.NODE_ENV === 'production') {
      console.warn('Prisma Client initialization failed, but continuing in production mode');
    } else {
      throw error;
    }
  }
}

const prisma = globalForPrisma.prisma;

// Graceful shutdown
if (typeof window === "undefined" && prisma) {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });
  
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

export { prisma };
