// ─────────────────────────────────────────────────────────────────────────
// lib/prisma.ts — singleton instance Prisma Client. Trzymamy go na
// globalThis żeby w trybie deweloperskim (hot-reload) nie tworzyć
// niepotrzebnie wielu połączeń do PostgreSQL.
// ─────────────────────────────────────────────────────────────────────────
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
