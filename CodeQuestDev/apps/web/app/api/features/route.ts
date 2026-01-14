
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const features = await prisma.featureRequest.findMany({
            orderBy: { votes: 'desc' },
        });
        return NextResponse.json(features);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { description, location, category } = body;

        if (!description) {
            return NextResponse.json({ error: 'Description is required' }, { status: 400 });
        }

        const newFeature = await prisma.featureRequest.create({
            data: {
                description,
                location: location || 'unknown',
                category: category || 'functional',
                status: 'considered',
                votes: 0,
            },
        });

        return NextResponse.json(newFeature, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create feature request' }, { status: 500 });
    }
}
