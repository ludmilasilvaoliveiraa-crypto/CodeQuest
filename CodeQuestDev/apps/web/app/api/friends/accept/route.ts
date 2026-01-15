// CodeQuest - Friends API - Accept Friend Request
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

// POST /api/friends/accept - Accept a friend request
export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { requestId } = await request.json();

        if (!requestId) {
            return NextResponse.json({ error: 'Request ID required' }, { status: 400 });
        }

        // Get current user
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!currentUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Find the request
        const friendRequest = await prisma.friendRequest.findUnique({
            where: { id: requestId },
        });

        if (!friendRequest) {
            return NextResponse.json(
                { error: 'Solicitação não encontrada' },
                { status: 404 }
            );
        }

        // Verify request is for current user
        if (friendRequest.toId !== currentUser.id) {
            return NextResponse.json(
                { error: 'Você não pode aceitar esta solicitação' },
                { status: 403 }
            );
        }

        // Verify request is pending
        if (friendRequest.status !== 'pending') {
            return NextResponse.json(
                { error: 'Esta solicitação já foi processada' },
                { status: 400 }
            );
        }

        // Use transaction to update request and create friendships
        await prisma.$transaction([
            // Update request status
            prisma.friendRequest.update({
                where: { id: requestId },
                data: { status: 'accepted' },
            }),
            // Create bidirectional friendship
            prisma.friendship.create({
                data: {
                    userId: friendRequest.fromId,
                    friendId: currentUser.id,
                },
            }),
            prisma.friendship.create({
                data: {
                    userId: currentUser.id,
                    friendId: friendRequest.fromId,
                },
            }),
        ]);

        return NextResponse.json({
            success: true,
            message: 'Solicitação aceita!',
        });
    } catch (error) {
        console.error('[Accept Friend Request API] Error:', error);
        return NextResponse.json(
            { error: 'Erro ao aceitar solicitação' },
            { status: 500 }
        );
    }
}
