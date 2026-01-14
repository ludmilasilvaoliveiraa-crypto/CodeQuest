// CodeQuest - Database Connection
// Prevents multiple instances of Prisma Client in development

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Debug: Check if DATABASE_URL is loaded
if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is missing in this environment!');
} else {
    console.log('✅ DATABASE_URL is loaded');
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
