// CodeQuest - Sync Stats API Route
// Receives stats updates from client

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // TODO: Save to database when Prisma is configured
        console.log('[Sync] Stats received for user', session.user.email, ':', body);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Sync] Stats error:', error);
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
