// CodeQuest - Friends API - Reject Friend Request
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getOrCreateUser } from '@/lib/user-helpers';

// POST /api/friends/reject - Reject a friend request
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

        // Get or create current user (handles guest users)
        const currentUser = await getOrCreateUser(
            session.user.email,
            session.user.name,
            session.user.image
        );


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
                { error: 'Você não pode rejeitar esta solicitação' },
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

        // Update request status to rejected
        await prisma.friendRequest.update({
            where: { id: requestId },
            data: { status: 'rejected' },
        });

        return NextResponse.json({
            success: true,
            message: 'Solicitação rejeitada',
        });
    } catch (error) {
        console.error('[Reject Friend Request API] Error:', error);
        return NextResponse.json(
            { error: 'Erro ao rejeitar solicitação' },
            { status: 500 }
        );
    }
}
