// CodeQuest - IndexedDB Storage Service
// Offline-first local storage for user progress

import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface UserProgress {
    lessonId: string;
    completed: boolean;
    score: number;
    completedAt: string | null;
    attempts: number;
}

interface UserStats {
    id: string;
    xp: number;
    level: number;
    streak: number;
    longestStreak: number;
    lastActivityDate: string | null;
    lessonsCompleted: number;
    questionsCorrect: number;
    perfectLessons: number;
    updatedAt: string;
}

interface BadgeEarned {
    badgeId: string;
    earnedAt: string;
}

export interface SyncQueueItem {
    id: string;
    type: 'progress' | 'stats' | 'badge';
    data: unknown;
    createdAt: string;
    synced: boolean;
}

interface CodeQuestDB extends DBSchema {
    progress: {
        key: string;
        value: UserProgress;
        indexes: { 'by-completed': number };
    };
    stats: {
        key: string;
        value: UserStats;
    };
    badges: {
        key: string;
        value: BadgeEarned;
    };
    syncQueue: {
        key: string;
        value: SyncQueueItem;
        indexes: { 'by-synced': number };
    };
}

const DB_NAME = 'codequest-db';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<CodeQuestDB> | null = null;

// Initialize database
async function getDB(): Promise<IDBPDatabase<CodeQuestDB>> {
    if (dbInstance) return dbInstance;

    dbInstance = await openDB<CodeQuestDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            // Progress store
            if (!db.objectStoreNames.contains('progress')) {
                const progressStore = db.createObjectStore('progress', { keyPath: 'lessonId' });
                progressStore.createIndex('by-completed', 'completed');
            }

            // Stats store
            if (!db.objectStoreNames.contains('stats')) {
                db.createObjectStore('stats', { keyPath: 'id' });
            }

            // Badges store
            if (!db.objectStoreNames.contains('badges')) {
                db.createObjectStore('badges', { keyPath: 'badgeId' });
            }

            // Sync queue store
            if (!db.objectStoreNames.contains('syncQueue')) {
                const syncStore = db.createObjectStore('syncQueue', { keyPath: 'id' });
                syncStore.createIndex('by-synced', 'synced');
            }
        },
    });

    return dbInstance;
}

// ==================== PROGRESS ====================

export async function saveProgress(lessonId: string, progress: Omit<UserProgress, 'lessonId'>): Promise<void> {
    const db = await getDB();
    await db.put('progress', { lessonId, ...progress });

    // Add to sync queue
    await addToSyncQueue('progress', { lessonId, ...progress });
}

export async function getProgress(lessonId: string): Promise<UserProgress | undefined> {
    const db = await getDB();
    return db.get('progress', lessonId);
}

export async function getAllProgress(): Promise<UserProgress[]> {
    const db = await getDB();
    return db.getAll('progress');
}

export async function getCompletedLessons(): Promise<UserProgress[]> {
    const db = await getDB();
    return db.getAllFromIndex('progress', 'by-completed', 1);
}

// ==================== STATS ====================

const STATS_KEY = 'user-stats';

export async function saveStats(stats: Omit<UserStats, 'id'>): Promise<void> {
    const db = await getDB();
    await db.put('stats', { id: STATS_KEY, ...stats });

    // Add to sync queue
    await addToSyncQueue('stats', stats);
}

export async function getStats(): Promise<UserStats | undefined> {
    const db = await getDB();
    return db.get('stats', STATS_KEY);
}

export async function updateXP(xpGained: number): Promise<UserStats> {
    const db = await getDB();
    const current = await getStats();

    const newStats: UserStats = {
        id: STATS_KEY,
        xp: (current?.xp || 0) + xpGained,
        level: current?.level || 1,
        streak: current?.streak || 0,
        longestStreak: current?.longestStreak || 0,
        lastActivityDate: current?.lastActivityDate || null,
        lessonsCompleted: current?.lessonsCompleted || 0,
        questionsCorrect: current?.questionsCorrect || 0,
        perfectLessons: current?.perfectLessons || 0,
        updatedAt: new Date().toISOString(),
    };

    await db.put('stats', newStats);
    await addToSyncQueue('stats', newStats);

    return newStats;
}

// ==================== BADGES ====================

export async function saveBadge(badgeId: string): Promise<void> {
    const db = await getDB();
    const badge: BadgeEarned = {
        badgeId,
        earnedAt: new Date().toISOString(),
    };

    await db.put('badges', badge);
    await addToSyncQueue('badge', badge);
}

export async function getBadge(badgeId: string): Promise<BadgeEarned | undefined> {
    const db = await getDB();
    return db.get('badges', badgeId);
}

export async function getAllBadges(): Promise<BadgeEarned[]> {
    const db = await getDB();
    return db.getAll('badges');
}

export async function hasBadge(badgeId: string): Promise<boolean> {
    const badge = await getBadge(badgeId);
    return badge !== undefined;
}

// ==================== SYNC QUEUE ====================

async function addToSyncQueue(type: SyncQueueItem['type'], data: unknown): Promise<void> {
    const db = await getDB();
    const item: SyncQueueItem = {
        id: `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        data,
        createdAt: new Date().toISOString(),
        synced: false,
    };

    await db.put('syncQueue', item);
}

export async function getPendingSyncItems(): Promise<SyncQueueItem[]> {
    const db = await getDB();
    return db.getAllFromIndex('syncQueue', 'by-synced', 0);
}

export async function markAsSynced(id: string): Promise<void> {
    const db = await getDB();
    const item = await db.get('syncQueue', id);
    if (item) {
        item.synced = true;
        await db.put('syncQueue', item);
    }
}

export async function clearSyncedItems(): Promise<void> {
    const db = await getDB();
    const tx = db.transaction('syncQueue', 'readwrite');
    const index = tx.store.index('by-synced');

    let cursor = await index.openCursor(1);
    while (cursor) {
        await cursor.delete();
        cursor = await cursor.continue();
    }

    await tx.done;
}

// ==================== UTILITIES ====================

export async function clearAllData(): Promise<void> {
    const db = await getDB();
    await db.clear('progress');
    await db.clear('stats');
    await db.clear('badges');
    await db.clear('syncQueue');
}

export async function exportData(): Promise<{
    progress: UserProgress[];
    stats: UserStats | undefined;
    badges: BadgeEarned[];
}> {
    return {
        progress: await getAllProgress(),
        stats: await getStats(),
        badges: await getAllBadges(),
    };
}
