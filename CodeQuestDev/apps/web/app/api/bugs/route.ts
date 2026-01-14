
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const bugs = await prisma.bug.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(bugs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bugs' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { description, location, category } = body;

        if (!description) {
            return NextResponse.json({ error: 'Description is required' }, { status: 400 });
        }

        const newBug = await prisma.bug.create({
            data: {
                description,
                location: location || 'Unknown',
                category: category || 'functional',
                status: 'pending',
            },
        });

        return NextResponse.json(newBug);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save bug' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
        }

        const updatedBug = await prisma.bug.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedBug);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update bug' }, { status: 500 });
    }
}
