// CodeQuest - Sync Service
// Handles synchronization between IndexedDB and PostgreSQL

import { getPendingSyncItems, markAsSynced, clearSyncedItems, type SyncQueueItem } from './storage';

interface SyncResult {
    success: boolean;
    synced: number;
    failed: number;
    errors: string[];
}

// Check if online
function isOnline(): boolean {
    if (typeof window === 'undefined') return true;
    return navigator.onLine;
}

// Sync all pending items
export async function syncToServer(): Promise<SyncResult> {
    const result: SyncResult = {
        success: true,
        synced: 0,
        failed: 0,
        errors: [],
    };

    if (!isOnline()) {
        result.success = false;
        result.errors.push('Offline - sync postponed');
        return result;
    }

    try {
        const pendingItems = await getPendingSyncItems();

        if (pendingItems.length === 0) {
            return result;
        }

        // Group items by type
        const grouped = pendingItems.reduce((acc, item) => {
            if (!acc[item.type]) acc[item.type] = [];
            acc[item.type]!.push(item);
            return acc;
        }, {} as Record<string, SyncQueueItem[]>);

        // Sync progress
        if (grouped.progress?.length) {
            try {
                const response = await fetch('/api/sync/progress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: grouped.progress.map(i => i.data) }),
                });

                if (response.ok) {
                    for (const item of grouped.progress) {
                        await markAsSynced(item.id);
                        result.synced++;
                    }
                } else {
                    result.failed += grouped.progress.length;
                    result.errors.push(`Progress sync failed: ${response.statusText}`);
                }
            } catch (e) {
                result.failed += grouped.progress.length;
                result.errors.push(`Progress sync error: ${String(e)}`);
            }
        }

        // Sync stats
        if (grouped.stats?.length) {
            try {
                // Only send the latest stats
                const latestStats = grouped.stats![grouped.stats!.length - 1]!;
                const response = await fetch('/api/sync/stats', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(latestStats.data),
                });

                if (response.ok) {
                    for (const item of grouped.stats) {
                        await markAsSynced(item.id);
                        result.synced++;
                    }
                } else {
                    result.failed += grouped.stats.length;
                    result.errors.push(`Stats sync failed: ${response.statusText}`);
                }
            } catch (e) {
                result.failed += grouped.stats.length;
                result.errors.push(`Stats sync error: ${String(e)}`);
            }
        }

        // Sync badges
        if (grouped.badge?.length) {
            try {
                const response = await fetch('/api/sync/badges', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: grouped.badge.map(i => i.data) }),
                });

                if (response.ok) {
                    for (const item of grouped.badge) {
                        await markAsSynced(item.id);
                        result.synced++;
                    }
                } else {
                    result.failed += grouped.badge.length;
                    result.errors.push(`Badges sync failed: ${response.statusText}`);
                }
            } catch (e) {
                result.failed += grouped.badge.length;
                result.errors.push(`Badges sync error: ${String(e)}`);
            }
        }

        // Clean up synced items
        await clearSyncedItems();

        result.success = result.failed === 0;
    } catch (e) {
        result.success = false;
        result.errors.push(`Sync error: ${String(e)}`);
    }

    return result;
}

// Fetch data from server
export async function fetchFromServer(): Promise<{
    success: boolean;
    data?: {
        progress: Array<{ lessonId: string; completed: boolean; score: number; completedAt: string }>;
        stats: { xp: number; level: number; streak: number };
        badges: string[];
    };
    error?: string;
}> {
    if (!isOnline()) {
        return { success: false, error: 'Offline' };
    }

    try {
        const response = await fetch('/api/sync/fetch');
        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }
        return { success: false, error: response.statusText };
    } catch (e) {
        return { success: false, error: String(e) };
    }
}

// Auto-sync on online event
export function setupAutoSync(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', async () => {
        console.log('[Sync] Online - starting sync');
        await syncToServer();
    });

    // Periodic sync every 5 minutes
    setInterval(async () => {
        if (isOnline()) {
            await syncToServer();
        }
    }, 5 * 60 * 1000);
}
