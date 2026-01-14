// CodeQuest - Sync Progress API Route
// Receives progress updates from client

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { items } = body;

        // TODO: Save to database when Prisma is configured
        console.log('[Sync] Progress received:', items?.length || 0, 'items for user', session.user.email);

        return NextResponse.json({ success: true, synced: items?.length || 0 });
    } catch (error) {
        console.error('[Sync] Progress error:', error);
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
