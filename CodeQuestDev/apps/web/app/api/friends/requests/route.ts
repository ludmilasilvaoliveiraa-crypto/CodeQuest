// CodeQuest - Friends API - List Friend Requests
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getOrCreateUser } from '@/lib/user-helpers';

// GET /api/friends/requests - List pending friend requests
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get or create current user (handles guest users)
        const currentUser = await getOrCreateUser(
            session.user.email,
            session.user.name,
            session.user.image
        );


        // Get pending requests received by current user
        const requests = await prisma.friendRequest.findMany({
            where: {
                toId: currentUser.id,
                status: 'pending',
            },
            include: {
                from: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Map to response format
        const formattedRequests = requests.map(req => ({
            id: req.id,
            from: {
                id: req.from.id,
                name: req.from.name,
                email: req.from.email,
                image: req.from.image,
                level: req.from.level,
                xp: req.from.xp,
                streak: req.from.streak,
                status: 'offline' as const,
                lastActive: req.from.lastActive.toISOString(),
            },
            to: currentUser.id,
            status: req.status,
            createdAt: req.createdAt.toISOString(),
        }));

        return NextResponse.json(formattedRequests);
    } catch (error) {
        console.error('[Friend Requests API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch friend requests' },
            { status: 500 }
        );
    }
}
