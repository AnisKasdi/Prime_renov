import { PrismaClient } from '@prisma/client';
import path from 'path';

// En SQLite, Prisma résout les chemins relatifs depuis node_modules, pas depuis
// le CWD. On force un chemin absolu si la DATABASE_URL est relative et en SQLite.
if (process.env.DATABASE_URL?.startsWith('file:./') || process.env.DATABASE_URL?.startsWith('file:../')) {
  const relPath = process.env.DATABASE_URL.replace('file:', '');
  process.env.DATABASE_URL = `file:${path.resolve(process.cwd(), relPath)}`;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
