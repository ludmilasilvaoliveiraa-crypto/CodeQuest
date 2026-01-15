// CodeQuest - Friends API - Friend Activities
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/friends/activities - Get friend activities
export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get current user
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!currentUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get all friend IDs
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    { userId: currentUser.id },
                    { friendId: currentUser.id },
                ],
            },
        });

        const friendIds = friendships.map(f =>
            f.userId === currentUser.id ? f.friendId : f.userId
        );

        // Get activities from friends
        const activities = await prisma.userActivity.findMany({
            where: {
                userId: { in: friendIds },
            },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50, // Limit to 50 most recent activities
        });

        // Map to response format
        const formattedActivities = activities.map(activity => ({
            id: activity.id,
            friendId: activity.userId,
            friendName: activity.user.name || 'Unknown',
            friendImage: activity.user.image,
            type: activity.type,
            data: activity.data,
            createdAt: activity.createdAt.toISOString(),
        }));

        return NextResponse.json(formattedActivities);
    } catch (error) {
        console.error('[Friend Activities API] Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch friend activities' },
            { status: 500 }
        );
    }
}
