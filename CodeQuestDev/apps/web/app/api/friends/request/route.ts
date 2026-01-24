// CodeQuest - Friends API - Send Friend Request
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getOrCreateUser } from '@/lib/user-helpers';

// POST /api/friends/request - Send a friend request
export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // Get or create current user (handles guest users)
        const currentUser = await getOrCreateUser(
            session.user.email,
            session.user.name,
            session.user.image
        );


        // Can't send request to yourself
        if (email === currentUser.email) {
            return NextResponse.json(
                { error: 'Você não pode enviar solicitação para si mesmo' },
                { status: 400 }
            );
        }

        // Find target user
        const targetUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!targetUser) {
            return NextResponse.json(
                { error: 'Usuário não encontrado' },
                { status: 404 }
            );
        }

        // Check if already friends
        const existingFriendship = await prisma.friendship.findFirst({
            where: {
                OR: [
                    { userId: currentUser.id, friendId: targetUser.id },
                    { userId: targetUser.id, friendId: currentUser.id },
                ],
            },
        });

        if (existingFriendship) {
            return NextResponse.json(
                { error: 'Você já é amigo deste usuário' },
                { status: 400 }
            );
        }

        // Check if request already exists
        const existingRequest = await prisma.friendRequest.findFirst({
            where: {
                OR: [
                    { fromId: currentUser.id, toId: targetUser.id },
                    { fromId: targetUser.id, toId: currentUser.id },
                ],
                status: 'pending',
            },
        });

        if (existingRequest) {
            return NextResponse.json(
                { error: 'Já existe uma solicitação pendente' },
                { status: 400 }
            );
        }

        // Create friend request
        await prisma.friendRequest.create({
            data: {
                fromId: currentUser.id,
                toId: targetUser.id,
                status: 'pending',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Solicitação enviada com sucesso!',
        });
    } catch (error) {
        console.error('[Friend Request API] Error:', error);
        return NextResponse.json(
            { error: 'Erro ao enviar solicitação' },
            { status: 500 }
        );
    }
}
