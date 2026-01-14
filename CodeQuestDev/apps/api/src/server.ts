// CodeQuest API - Fastify Server

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { API_VERSION } from '@repo/shared';

// Create Fastify instance
const fastify = Fastify({
    logger: true,
});

// Register plugins
await fastify.register(cors, {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
});

// Health check
fastify.get('/health', async () => {
    return { status: 'ok', version: API_VERSION };
});

// API Routes placeholder
fastify.register(async (app) => {
    // Auth routes
    app.get('/auth/google', async () => {
        return { message: 'Google OAuth endpoint - TODO' };
    });

    // User routes
    app.get('/users/me', async () => {
        return { message: 'Get current user - TODO' };
    });

    // Tracks routes
    app.get('/tracks', async () => {
        return { message: 'Get all tracks - TODO' };
    });

    // Lessons routes
    app.get('/lessons/:id', async (request) => {
        const { id } = request.params as { id: string };
        return { message: `Get lesson ${id} - TODO` };
    });

    // Questions routes
    app.get('/lessons/:lessonId/questions', async (request) => {
        const { lessonId } = request.params as { lessonId: string };
        return { message: `Get questions for lesson ${lessonId} - TODO` };
    });

    // Progress routes
    app.post('/progress', async () => {
        return { message: 'Save progress - TODO' };
    });

    // Leaderboard routes
    app.get('/leaderboard', async () => {
        return { message: 'Get leaderboard - TODO' };
    });

    // Challenge routes
    app.post('/challenges', async () => {
        return { message: 'Create challenge - TODO' };
    });

    app.get('/challenges', async () => {
        return { message: 'Get user challenges - TODO' };
    });

    // Friends routes
    app.get('/friends', async () => {
        return { message: 'Get friends list - TODO' };
    });

    app.post('/friends/request', async () => {
        return { message: 'Send friend request - TODO' };
    });

    // Flashcards routes
    app.get('/flashcards/due', async () => {
        return { message: 'Get due flashcards - TODO' };
    });

    app.post('/flashcards/:id/review', async (request) => {
        const { id } = request.params as { id: string };
        return { message: `Review flashcard ${id} - TODO` };
    });

}, { prefix: `/api/${API_VERSION}` });

// Start server
const start = async () => {
    try {
        const port = parseInt(process.env.PORT || '3001');
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`🚀 CodeQuest API running on http://localhost:${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
