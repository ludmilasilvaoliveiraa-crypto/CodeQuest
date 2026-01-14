// CodeQuest - Push Notification Service
'use client';

interface NotificationOptions {
    title: string;
    body: string;
    icon?: string;
    tag?: string;
    data?: Record<string, unknown>;
    requireInteraction?: boolean;
}

class NotificationService {
    private registration: ServiceWorkerRegistration | null = null;

    // Check if notifications are supported
    isSupported(): boolean {
        return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
    }

    // Get current permission status
    getPermission(): NotificationPermission {
        if (!this.isSupported()) return 'denied';
        return Notification.permission;
    }

    // Request notification permission
    async requestPermission(): Promise<NotificationPermission> {
        if (!this.isSupported()) return 'denied';

        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
            await this.registerServiceWorker();
        }

        return permission;
    }

    // Register service worker for push notifications
    private async registerServiceWorker(): Promise<void> {
        try {
            this.registration = await navigator.serviceWorker.ready;
            console.log('[Notifications] Service Worker ready');
        } catch (error) {
            console.error('[Notifications] Service Worker registration failed:', error);
        }
    }

    // Show local notification
    async showNotification(options: NotificationOptions): Promise<void> {
        if (this.getPermission() !== 'granted') {
            console.warn('[Notifications] Permission not granted');
            return;
        }

        const notificationOptions: NotificationOptions = {
            icon: options.icon || '/icons/icon-192x192.png',
            tag: options.tag,
            data: options.data,
            requireInteraction: options.requireInteraction || false,
            ...options,
        };

        if (this.registration) {
            await this.registration.showNotification(options.title, notificationOptions);
        } else {
            new Notification(options.title, notificationOptions);
        }
    }

    // Subscribe to push notifications (for server-sent notifications)
    async subscribeToPush(): Promise<PushSubscription | null> {
        if (!this.registration) {
            await this.registerServiceWorker();
        }

        if (!this.registration) return null;

        try {
            const subscription = await this.registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            });

            // Send subscription to server
            await fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subscription),
            });

            return subscription;
        } catch (error) {
            console.error('[Notifications] Push subscription failed:', error);
            return null;
        }
    }
}

// Singleton instance
export const notificationService = new NotificationService();

// Notification types for the app
export const NotificationTypes = {
    CHALLENGE_RECEIVED: 'challenge_received',
    CHALLENGE_ACCEPTED: 'challenge_accepted',
    CHALLENGE_WON: 'challenge_won',
    CHALLENGE_LOST: 'challenge_lost',
    FRIEND_REQUEST: 'friend_request',
    FRIEND_ACCEPTED: 'friend_accepted',
    LEVEL_UP: 'level_up',
    BADGE_EARNED: 'badge_earned',
    STREAK_REMINDER: 'streak_reminder',
    DUEL_INVITE: 'duel_invite',
} as const;

// Helper functions for common notifications
export function showChallengeNotification(challengerName: string, challengeType: string): void {
    notificationService.showNotification({
        title: '⚔️ Novo Desafio!',
        body: `${challengerName} te desafiou para ${challengeType}`,
        tag: 'challenge',
        data: { type: NotificationTypes.CHALLENGE_RECEIVED },
    });
}

export function showFriendRequestNotification(senderName: string): void {
    notificationService.showNotification({
        title: '👋 Solicitação de Amizade',
        body: `${senderName} quer ser seu amigo`,
        tag: 'friend-request',
        data: { type: NotificationTypes.FRIEND_REQUEST },
    });
}

export function showLevelUpNotification(newLevel: number): void {
    notificationService.showNotification({
        title: '🎉 Parabéns!',
        body: `Você alcançou o nível ${newLevel}!`,
        tag: 'level-up',
        data: { type: NotificationTypes.LEVEL_UP },
    });
}

export function showBadgeNotification(badgeName: string): void {
    notificationService.showNotification({
        title: '🏆 Nova Conquista!',
        body: `Você desbloqueou "${badgeName}"`,
        tag: 'badge',
        data: { type: NotificationTypes.BADGE_EARNED },
    });
}

export function showStreakReminderNotification(currentStreak: number): void {
    notificationService.showNotification({
        title: '🔥 Não perca seu streak!',
        body: `Você tem ${currentStreak} dias de streak. Continue aprendendo hoje!`,
        tag: 'streak-reminder',
        requireInteraction: true,
        data: { type: NotificationTypes.STREAK_REMINDER },
    });
}

export function showDuelInviteNotification(opponentName: string): void {
    notificationService.showNotification({
        title: '⚔️ Convite para Duelo!',
        body: `${opponentName} quer duelar com você agora!`,
        tag: 'duel-invite',
        requireInteraction: true,
        data: { type: NotificationTypes.DUEL_INVITE },
    });
}
