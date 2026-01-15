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
    try {
        const response = await fetch('/api/friends', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch friends');
        }

        return await response.json();
    } catch (error) {
        console.error('[Friends Service] Error fetching friends:', error);
        return [];
    }
}

export async function getFriendRequests(): Promise<FriendRequest[]> {
    try {
        const response = await fetch('/api/friends/requests', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch friend requests');
        }

        return await response.json();
    } catch (error) {
        console.error('[Friends Service] Error fetching requests:', error);
        return [];
    }
}

export async function sendFriendRequest(email: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch('/api/friends/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data.error || 'Erro ao enviar solicitação' };
        }

        return { success: true, message: data.message };
    } catch (error) {
        console.error('[Friends Service] Error sending request:', error);
        return { success: false, message: 'Erro ao enviar solicitação' };
    }
}

export async function acceptFriendRequest(requestId: string): Promise<void> {
    try {
        const response = await fetch('/api/friends/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestId }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to accept request');
        }
    } catch (error) {
        console.error('[Friends Service] Error accepting request:', error);
        throw error;
    }
}

export async function rejectFriendRequest(requestId: string): Promise<void> {
    try {
        const response = await fetch('/api/friends/reject', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestId }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to reject request');
        }
    } catch (error) {
        console.error('[Friends Service] Error rejecting request:', error);
        throw error;
    }
}

export async function removeFriend(friendId: string): Promise<void> {
    try {
        const response = await fetch('/api/friends', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendId }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to remove friend');
        }
    } catch (error) {
        console.error('[Friends Service] Error removing friend:', error);
        throw error;
    }
}

export async function getFriendActivities(): Promise<FriendActivity[]> {
    try {
        const response = await fetch('/api/friends/activities', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch friend activities');
        }

        return await response.json();
    } catch (error) {
        console.error('[Friends Service] Error fetching activities:', error);
        return [];
    }
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
