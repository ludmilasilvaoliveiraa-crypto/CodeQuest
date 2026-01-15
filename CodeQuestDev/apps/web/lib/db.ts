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

// Use a dummy URL during build if DATABASE_URL is not set
// This prevents PrismaClientInitializationError during Vercel builds
const databaseUrl = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/dummy';

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl
        }
    }
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
