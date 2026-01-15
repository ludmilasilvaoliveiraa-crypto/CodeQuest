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

// Mock data removed - will be replaced with real API calls
// Friend Service Functions
export async function getFriends(): Promise<Friend[]> {
    // TODO: Replace with API call to fetch real friends
    // For now, return empty until real users add friends
    return [];
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
    // TODO: Replace with API call to fetch real activities
    // For now, return empty until real user activities exist
    return [];
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
