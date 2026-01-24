// CodeQuest - Friends API - List and Remove Friends
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getOrCreateUser } from '@/lib/user-helpers';

// GET /api/friends - List all friends
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


        // Get all friendships where user is either the initiator or receiver
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { userId: currentUser.id },
                    { friendId: currentUser.id },
                ],
            },
            include: {
                user: true,
                friend: true,
            },
        });

        // Map to friend objects (excluding current user)
        const friends = friendships.map(friendship => {
            const friend = friendship.userId === currentUser.id
                ? friendship.friend
                : friendship.user;

            return {
                id: friend.id,
                name: friend.name,
                email: friend.email,
                image: friend.image,
                level: friend.level,
                xp: friend.xp,
                streak: friend.streak,
                status: getOnlineStatus(friend.lastActive),
                lastActive: friend.lastActive.toISOString(),
            };
        });

        return NextResponse.json(friends);
    } catch (error) {
        console.error('[Friends API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch friends' },
            { status: 500 }
        );
    }
}

// DELETE /api/friends - Remove a friend
export async function DELETE(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { friendId } = await request.json();

        if (!friendId) {
            return NextResponse.json({ error: 'Friend ID required' }, { status: 400 });
        }

        // Get or create current user (handles guest users)
        const currentUser = await getOrCreateUser(
            session.user.email,
            session.user.name,
            session.user.image
        );


        // Delete both directions of friendship
        await prisma.friendship.deleteMany({
            where: {
                OR: [
                    { userId: currentUser.id, friendId },
                    { userId: friendId, friendId: currentUser.id },
                ],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Friends API] Error removing friend:', error);
        return NextResponse.json(
            { error: 'Failed to remove friend' },
            { status: 500 }
        );
    }
}

// Helper function to determine online status
function getOnlineStatus(lastActive: Date): 'online' | 'away' | 'offline' {
    const now = new Date();
    const diffMinutes = (now.getTime() - lastActive.getTime()) / 60000;

    if (diffMinutes < 5) return 'online';
    if (diffMinutes < 60) return 'away';
    return 'offline';
}
