// CodeQuest - useLocalProgress Hook
// React hook for managing local progress with sync

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import * as storage from '@/lib/storage';
import { syncToServer, fetchFromServer, setupAutoSync } from '@/lib/sync-service';

interface LocalProgress {
    lessonsCompleted: string[];
    totalXP: number;
    currentStreak: number;
    badges: string[];
    isLoading: boolean;
    isSyncing: boolean;
}

export function useLocalProgress() {
    const { data: session } = useSession();
    const [progress, setProgress] = useState<LocalProgress>({
        lessonsCompleted: [],
        totalXP: 0,
        currentStreak: 0,
        badges: [],
        isLoading: true,
        isSyncing: false,
    });

    // Load from IndexedDB on mount
    useEffect(() => {
        async function loadLocalData() {
            try {
                const [allProgress, stats, badges] = await Promise.all([
                    storage.getAllProgress(),
                    storage.getStats(),
                    storage.getAllBadges(),
                ]);

                setProgress({
                    lessonsCompleted: allProgress.filter(p => p.completed).map(p => p.lessonId),
                    totalXP: stats?.xp || 0,
                    currentStreak: stats?.streak || 0,
                    badges: badges.map(b => b.badgeId),
                    isLoading: false,
                    isSyncing: false,
                });
            } catch (error) {
                console.error('[Progress] Failed to load local data:', error);
                setProgress(prev => ({ ...prev, isLoading: false }));
            }
        }

        loadLocalData();
        setupAutoSync();
    }, []);

    // Sync with server when session is available
    useEffect(() => {
        if (session?.user && !progress.isLoading) {
            syncWithServer();
        }
    }, [session, progress.isLoading]);

    // Sync with server
    const syncWithServer = useCallback(async () => {
        if (!session?.user) return;

        setProgress(prev => ({ ...prev, isSyncing: true }));

        try {
            // Push local changes
            await syncToServer();

            // Pull server data
            const serverData = await fetchFromServer();
            if (serverData.success && serverData.data) {
                // Merge server data with local
                const { data } = serverData;

                // Update local storage with server data
                for (const item of data.progress) {
                    const local = await storage.getProgress(item.lessonId);
                    if (!local || new Date(item.completedAt) > new Date(local.completedAt || 0)) {
                        await storage.saveProgress(item.lessonId, {
                            completed: item.completed,
                            score: item.score,
                            completedAt: item.completedAt,
                            attempts: 1,
                        });
                    }
                }

                // Update stats if server is newer
                const localStats = await storage.getStats();
                if (!localStats || data.stats.xp > localStats.xp) {
                    await storage.saveStats({
                        xp: data.stats.xp,
                        level: data.stats.level,
                        streak: data.stats.streak,
                        longestStreak: data.stats.streak,
                        lastActivityDate: new Date().toISOString(),
                        lessonsCompleted: data.progress.filter(p => p.completed).length,
                        questionsCorrect: 0,
                        perfectLessons: 0,
                        updatedAt: new Date().toISOString(),
                    });
                }

                // Update badges
                for (const badgeId of data.badges) {
                    if (!(await storage.hasBadge(badgeId))) {
                        await storage.saveBadge(badgeId);
                    }
                }

                // Reload state
                const [allProgress, stats, badges] = await Promise.all([
                    storage.getAllProgress(),
                    storage.getStats(),
                    storage.getAllBadges(),
                ]);

                setProgress({
                    lessonsCompleted: allProgress.filter(p => p.completed).map(p => p.lessonId),
                    totalXP: stats?.xp || 0,
                    currentStreak: stats?.streak || 0,
                    badges: badges.map(b => b.badgeId),
                    isLoading: false,
                    isSyncing: false,
                });
            }
        } catch (error) {
            console.error('[Progress] Sync failed:', error);
        } finally {
            setProgress(prev => ({ ...prev, isSyncing: false }));
        }
    }, [session]);

    // Complete a lesson
    const completeLesson = useCallback(async (lessonId: string, score: number, xpEarned: number) => {
        await storage.saveProgress(lessonId, {
            completed: true,
            score,
            completedAt: new Date().toISOString(),
            attempts: 1,
        });

        await storage.updateXP(xpEarned);

        // Update local state
        setProgress(prev => ({
            ...prev,
            lessonsCompleted: [...prev.lessonsCompleted, lessonId],
            totalXP: prev.totalXP + xpEarned,
        }));

        // Trigger sync if online
        if (navigator.onLine && session?.user) {
            syncToServer();
        }

        return { lessonId, score, xpEarned };
    }, [session]);

    // Earn a badge
    const earnBadge = useCallback(async (badgeId: string) => {
        const alreadyHas = await storage.hasBadge(badgeId);
        if (alreadyHas) return false;

        await storage.saveBadge(badgeId);

        setProgress(prev => ({
            ...prev,
            badges: [...prev.badges, badgeId],
        }));

        if (navigator.onLine && session?.user) {
            syncToServer();
        }

        return true;
    }, [session]);

    // Check if lesson is completed
    const isLessonCompleted = useCallback((lessonId: string) => {
        return progress.lessonsCompleted.includes(lessonId);
    }, [progress.lessonsCompleted]);

    return {
        ...progress,
        completeLesson,
        earnBadge,
        isLessonCompleted,
        syncWithServer,
    };
}
