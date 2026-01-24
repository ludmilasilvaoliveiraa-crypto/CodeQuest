// CodeQuest - User Helper Functions
// Functions to handle user management including guest users

import { prisma } from '@/lib/db';
import type { User } from '@prisma/client';

/**
 * Get or create a user in the database.
 * This handles guest users who may not exist in the database yet.
 * 
 * @param email - User's email address
 * @param name - User's display name (optional, used when creating)
 * @param image - User's avatar URL (optional, used when creating)
 * @returns The user object from the database
 */
export async function getOrCreateUser(
    email: string,
    name?: string | null,
    image?: string | null
): Promise<User> {
    // Try to find existing user
    let user = await prisma.user.findUnique({
        where: { email },
    });

    // If user doesn't exist, create them (handles guest users)
    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                name: name || email.split('@')[0],
                image: image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                level: 1,
                xp: 0,
                streak: 0,
            },
        });
    }

    return user;
}

/**
 * Check if the user is a guest user based on their email
 */
export function isGuestUser(email: string): boolean {
    return email.endsWith('@local.guest');
}
