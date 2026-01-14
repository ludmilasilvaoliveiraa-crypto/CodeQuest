// CodeQuest - Friends System Types and Service

export interface Friend {
    id: string;
    name: string;
    email: string;
    image?: string;
    level: number;
    xp: number;
    streak: number;
    status: 'online' | 'offline' | 'away';
    lastActive: string;
}

export interface FriendRequest {
    id: string;
    from: Friend;
    to: string;
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: string;
}

export interface FriendActivity {
    id: string;
    friendId: string;
    friendName: string;
    friendImage?: string;
    type: 'lesson_completed' | 'badge_earned' | 'level_up' | 'challenge_won' | 'streak_milestone';
    data: {
        lessonName?: string;
        badgeName?: string;
        newLevel?: number;
        streakDays?: number;
    };
    createdAt: string;
}

// Mock data for development (will be replaced with API calls)
const MOCK_FRIENDS: Friend[] = [
    {
        id: '1',
        name: 'Ana Silva',
        email: 'ana@example.com',
        image: undefined,
        level: 8,
        xp: 2450,
        streak: 12,
        status: 'online',
        lastActive: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Carlos Santos',
        email: 'carlos@example.com',
        image: undefined,
        level: 5,
        xp: 1200,
        streak: 3,
        status: 'offline',
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        name: 'Maria Oliveira',
        email: 'maria@example.com',
        image: undefined,
        level: 12,
        xp: 4800,
        streak: 45,
        status: 'away',
        lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
];

const MOCK_ACTIVITIES: FriendActivity[] = [
    {
        id: '1',
        friendId: '1',
        friendName: 'Ana Silva',
        type: 'lesson_completed',
        data: { lessonName: 'Formulários HTML' },
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        friendId: '3',
        friendName: 'Maria Oliveira',
        type: 'streak_milestone',
        data: { streakDays: 45 },
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        friendId: '2',
        friendName: 'Carlos Santos',
        type: 'badge_earned',
        data: { badgeName: 'Estudante Dedicado' },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
];

// Friend Service Functions
export async function getFriends(): Promise<Friend[]> {
    // TODO: Replace with API call
    return MOCK_FRIENDS;
}

export async function getFriendRequests(): Promise<FriendRequest[]> {
    // TODO: Replace with API call
    return [];
}

export async function sendFriendRequest(email: string): Promise<{ success: boolean; message: string }> {
    // TODO: Replace with API call
    console.log('[Friends] Sending request to:', email);
    return { success: true, message: 'Solicitação enviada!' };
}

export async function acceptFriendRequest(requestId: string): Promise<void> {
    // TODO: Replace with API call
    console.log('[Friends] Accepting request:', requestId);
}

export async function rejectFriendRequest(requestId: string): Promise<void> {
    // TODO: Replace with API call
    console.log('[Friends] Rejecting request:', requestId);
}

export async function removeFriend(friendId: string): Promise<void> {
    // TODO: Replace with API call
    console.log('[Friends] Removing friend:', friendId);
}

export async function getFriendActivities(): Promise<FriendActivity[]> {
    // TODO: Replace with API call
    return MOCK_ACTIVITIES;
}

// Utility functions
export function getStatusColor(status: Friend['status']): string {
    switch (status) {
        case 'online': return 'bg-green-500';
        case 'away': return 'bg-yellow-500';
        case 'offline': return 'bg-gray-400';
    }
}

export function getActivityIcon(type: FriendActivity['type']): string {
    switch (type) {
        case 'lesson_completed': return '📚';
        case 'badge_earned': return '🏆';
        case 'level_up': return '⬆️';
        case 'challenge_won': return '🎯';
        case 'streak_milestone': return '🔥';
    }
}

export function getActivityMessage(activity: FriendActivity): string {
    switch (activity.type) {
        case 'lesson_completed':
            return `completou a lição "${activity.data.lessonName}"`;
        case 'badge_earned':
            return `conquistou o badge "${activity.data.badgeName}"`;
        case 'level_up':
            return `alcançou o nível ${activity.data.newLevel}`;
        case 'challenge_won':
            return `venceu um desafio`;
        case 'streak_milestone':
            return `atingiu ${activity.data.streakDays} dias de streak!`;
    }
}

export function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'agora';
    if (diffMins < 60) return `há ${diffMins}min`;
    if (diffHours < 24) return `há ${diffHours}h`;
    return `há ${diffDays}d`;
}
