// CodeQuest - Challenge System Types and Service

export interface Challenge {
    id: string;
    type: 'speed_quiz' | 'accuracy' | 'streak' | 'lessons';
    title: string;
    description: string;
    goal: number;
    reward: {
        xp: number;
        badge?: string;
    };
    challenger: {
        id: string;
        name: string;
        image?: string;
        progress: number;
        completed: boolean;
        completedAt?: string;
    };
    opponent: {
        id: string;
        name: string;
        image?: string;
        progress: number;
        completed: boolean;
        completedAt?: string;
    };
    status: 'pending' | 'active' | 'completed' | 'expired';
    expiresAt: string;
    createdAt: string;
}

export interface ChallengeInvite {
    id: string;
    from: {
        id: string;
        name: string;
        image?: string;
        level: number;
    };
    type: Challenge['type'];
    goal: number;
    reward: Challenge['reward'];
    createdAt: string;
    expiresAt: string;
}

// Challenge types configuration
export const CHALLENGE_TYPES = {
    speed_quiz: {
        name: 'Quiz Rápido',
        description: 'Responda X perguntas o mais rápido possível',
        icon: '⚡',
        goals: [5, 10, 20],
        xpMultiplier: 2,
    },
    accuracy: {
        name: 'Precisão',
        description: 'Acerte X perguntas seguidas',
        icon: '🎯',
        goals: [5, 10, 15],
        xpMultiplier: 3,
    },
    streak: {
        name: 'Streak Challenge',
        description: 'Mantenha seu streak por X dias',
        icon: '🔥',
        goals: [3, 7, 14],
        xpMultiplier: 5,
    },
    lessons: {
        name: 'Maratona de Lições',
        description: 'Complete X lições',
        icon: '📚',
        goals: [3, 5, 10],
        xpMultiplier: 2,
    },
};

// Mock data removed - will be replaced with real API calls

// Service functions
export async function getChallenges(): Promise<Challenge[]> {
    // TODO: Replace with API call to fetch real challenges
    return [];
}

export async function getChallengeInvites(): Promise<ChallengeInvite[]> {
    // TODO: Replace with API call to fetch real invites
    return [];
}

export async function sendChallenge(
    opponentId: string,
    type: Challenge['type'],
    goal: number
): Promise<{ success: boolean; challengeId?: string }> {
    console.log('[Challenge] Sending challenge to:', opponentId, type, goal);
    return { success: true, challengeId: 'new-challenge-id' };
}

export async function acceptChallenge(inviteId: string): Promise<void> {
    console.log('[Challenge] Accepting:', inviteId);
}

export async function declineChallenge(inviteId: string): Promise<void> {
    console.log('[Challenge] Declining:', inviteId);
}

export async function surrenderChallenge(challengeId: string): Promise<void> {
    console.log('[Challenge] Surrendering:', challengeId);
}

// Utility functions
export function getChallengeTypeInfo(type: Challenge['type']) {
    return CHALLENGE_TYPES[type];
}

export function getChallengeStatus(challenge: Challenge): {
    text: string;
    color: string;
    isWinning: boolean;
} {
    if (challenge.status === 'completed') {
        const challengerWon = challenge.challenger.completed &&
            (!challenge.opponent.completed ||
                new Date(challenge.challenger.completedAt!) < new Date(challenge.opponent.completedAt!));

        const isChallenger = challenge.challenger.id === 'me';
        const userWon = isChallenger ? challengerWon : !challengerWon;

        return {
            text: userWon ? 'Você venceu! 🎉' : 'Você perdeu 😢',
            color: userWon ? 'text-green-600' : 'text-red-600',
            isWinning: userWon,
        };
    }

    if (challenge.status === 'expired') {
        return { text: 'Expirado', color: 'text-gray-500', isWinning: false };
    }

    const isChallenger = challenge.challenger.id === 'me';
    const myProgress = isChallenger ? challenge.challenger.progress : challenge.opponent.progress;
    const theirProgress = isChallenger ? challenge.opponent.progress : challenge.challenger.progress;

    if (myProgress > theirProgress) {
        return { text: 'Você está ganhando! 💪', color: 'text-green-600', isWinning: true };
    } else if (myProgress < theirProgress) {
        return { text: 'Você está perdendo! 😬', color: 'text-orange-600', isWinning: false };
    } else {
        return { text: 'Empate!', color: 'text-blue-600', isWinning: false };
    }
}

export function getTimeRemaining(expiresAt: string): string {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diffMs = expires.getTime() - now.getTime();

    if (diffMs <= 0) return 'Expirado';

    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);

    if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days}d restantes`;
    }

    return `${hours}h ${minutes}min restantes`;
}
