import { PrismaClient } from '@prisma/client';

// Предотвращаем создание множества экземпляров PrismaClient в dev-режиме
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;