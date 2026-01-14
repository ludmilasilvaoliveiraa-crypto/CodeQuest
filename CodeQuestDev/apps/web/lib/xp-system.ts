// CodeQuest - XP System Service
// Handles XP calculation, level progression, and streak bonuses

import { LEVEL_THRESHOLDS, XP_VALUES, STREAK_MULTIPLIERS, STREAK_MILESTONES } from '@repo/shared';

export interface XPGainResult {
    baseXP: number;
    streakBonus: number;
    totalXP: number;
    newTotalXP: number;
    leveledUp: boolean;
    oldLevel: number;
    newLevel: number;
}

export interface LevelInfo {
    level: number;
    currentXP: number;
    xpInLevel: number;
    xpToNextLevel: number;
    progress: number; // 0-100
}

// Calculate level from total XP
export function calculateLevel(totalXP: number): number {
    let level = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (totalXP >= LEVEL_THRESHOLDS[i]!) {
            level = i + 2; // Levels start at 1, array at 0
        } else {
            break;
        }
    }
    return Math.min(level, LEVEL_THRESHOLDS.length + 1);
}

// Get detailed level info
export function getLevelInfo(totalXP: number): LevelInfo {
    const level = calculateLevel(totalXP);
    const currentLevelThreshold = level > 1 ? LEVEL_THRESHOLDS[level - 2] || 0 : 0;
    const nextLevelThreshold = LEVEL_THRESHOLDS[level - 1] || currentLevelThreshold + 1000;

    const xpInLevel = totalXP - currentLevelThreshold;
    const xpToNextLevel = nextLevelThreshold - currentLevelThreshold;
    const progress = Math.min((xpInLevel / xpToNextLevel) * 100, 100);

    return {
        level,
        currentXP: totalXP,
        xpInLevel,
        xpToNextLevel,
        progress
    };
}

// Calculate streak multiplier
export function getStreakMultiplier(currentStreak: number): number {
    if (currentStreak >= 30) return STREAK_MULTIPLIERS.DAYS_30;
    if (currentStreak >= 14) return STREAK_MULTIPLIERS.DAYS_14;
    if (currentStreak >= 7) return STREAK_MULTIPLIERS.DAYS_7;
    if (currentStreak >= 3) return STREAK_MULTIPLIERS.DAYS_3;
    return STREAK_MULTIPLIERS.NONE;
}

// Calculate XP gain for answering a question
export function calculateQuestionXP(
    isCorrect: boolean,
    difficulty: 1 | 2 | 3 | 4 | 5,
    currentStreak: number,
    isFirstAttempt: boolean = true
): number {
    if (!isCorrect) return 0;

    // Base XP based on difficulty
    const difficultyMultipliers: Record<number, number> = {
        1: 0.8,  // Easy: 80% of base
        2: 1.0,  // Medium: 100% of base
        3: 1.3,  // Hard: 130% of base
        4: 1.6,  // Very Hard: 160% of base
        5: 2.0   // Expert: 200% of base
    };

    let xp = XP_VALUES.CORRECT_ANSWER * (difficultyMultipliers[difficulty] || 1);

    // First attempt bonus
    if (isFirstAttempt) {
        xp += XP_VALUES.FIRST_TRY_BONUS;
    }

    // Streak multiplier
    const multiplier = getStreakMultiplier(currentStreak);
    xp = Math.round(xp * multiplier);

    return xp;
}

// Calculate XP gain for completing a lesson
export function calculateLessonXP(
    questionsCorrect: number,
    totalQuestions: number,
    currentStreak: number
): number {
    // Base lesson completion XP
    let xp: number = XP_VALUES.LESSON_COMPLETION;

    // Perfect score bonus
    if (questionsCorrect === totalQuestions) {
        xp += XP_VALUES.PERFECT_LESSON;
    }

    // Streak multiplier
    const multiplier = getStreakMultiplier(currentStreak);
    xp = Math.round(xp * multiplier);

    return xp;
}

// Process XP gain and check for level up
export function processXPGain(
    currentXP: number,
    xpGained: number,
    currentStreak: number
): XPGainResult {
    const oldLevel = calculateLevel(currentXP);
    const streakMultiplier = getStreakMultiplier(currentStreak);

    const baseXP = xpGained;
    const streakBonus = streakMultiplier > 1
        ? Math.round(xpGained * (streakMultiplier - 1))
        : 0;
    const totalXP = baseXP + streakBonus;
    const newTotalXP = currentXP + totalXP;
    const newLevel = calculateLevel(newTotalXP);

    return {
        baseXP,
        streakBonus,
        totalXP,
        newTotalXP,
        leveledUp: newLevel > oldLevel,
        oldLevel,
        newLevel
    };
}

// Check and update streak
export function checkStreak(
    lastActivityDate: Date | null,
    currentStreak: number,
    longestStreak: number
): {
    newStreak: number;
    streakBroken: boolean;
    newLongestStreak: number;
    streakMilestoneReached: number | null;
} {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!lastActivityDate) {
        // First activity ever
        return {
            newStreak: 1,
            streakBroken: false,
            newLongestStreak: Math.max(1, longestStreak),
            streakMilestoneReached: null
        };
    }

    const lastDate = new Date(lastActivityDate);
    lastDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
        (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newStreak: number;
    let streakBroken = false;

    if (daysDiff === 0) {
        // Same day - no change
        newStreak = currentStreak;
    } else if (daysDiff === 1) {
        // Consecutive day - increment
        newStreak = currentStreak + 1;
    } else {
        // Streak broken
        newStreak = 1;
        streakBroken = currentStreak > 1;
    }

    const newLongestStreak = Math.max(newStreak, longestStreak);

    // Check for milestone
    let streakMilestoneReached: number | null = null;
    for (const milestone of STREAK_MILESTONES) {
        if (newStreak === milestone && currentStreak < milestone) {
            streakMilestoneReached = milestone;
            break;
        }
    }

    return {
        newStreak,
        streakBroken,
        newLongestStreak,
        streakMilestoneReached
    };
}

// Get XP needed for specific level
export function getXPForLevel(level: number): number {
    if (level <= 1) return 0;
    return LEVEL_THRESHOLDS[level - 2] || 0;
}

// Get level title
export function getLevelTitle(level: number, locale: 'pt-BR' | 'en' = 'pt-BR'): string {
    const titles = {
        'pt-BR': {
            1: 'Iniciante',
            5: 'Aprendiz',
            10: 'Desenvolvedor',
            15: 'Programador',
            20: 'Expert',
            25: 'Mestre',
            30: 'Guru',
            50: 'Lenda'
        },
        'en': {
            1: 'Beginner',
            5: 'Apprentice',
            10: 'Developer',
            15: 'Programmer',
            20: 'Expert',
            25: 'Master',
            30: 'Guru',
            50: 'Legend'
        }
    };

    const t = titles[locale];
    const thresholds = Object.keys(t).map(Number).sort((a, b) => b - a);

    for (const threshold of thresholds) {
        if (level >= threshold) {
            return t[threshold as keyof typeof t];
        }
    }

    return t[1];
}
