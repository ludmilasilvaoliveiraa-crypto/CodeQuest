// CodeQuest - Sync Fetch API Route
// Returns user progress from database (placeholder for now)

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Replace with actual database query when Prisma is configured
    // For now, return mock data
    const mockData = {
        progress: [],
        stats: {
            xp: 0,
            level: 1,
            streak: 0,
        },
        badges: [],
    };

    return NextResponse.json(mockData);
}
