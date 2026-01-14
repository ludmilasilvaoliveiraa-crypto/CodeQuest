// CodeQuest - Shared Types
// These types are used by both frontend and backend

// ========================================
// User Types
// ========================================

export interface User {
    id: string;
    googleId: string;
    email: string;
    name: string;
    avatarUrl: string | null;
    xp: number;
    level: number;
    locale: 'pt-BR' | 'en';
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPublic {
    id: string;
    name: string;
    avatarUrl: string | null;
    xp: number;
    level: number;
}

export interface Streak {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
}

// ========================================
// Content Types
// ========================================

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill' | 'code';
export type Locale = 'pt-BR' | 'en';

export interface Track {
    id: string;
    slug: string;
    title: Record<Locale, string>;
    icon: string;
    order: number;
}

export interface Lesson {
    id: string;
    trackId: string;
    slug: string;
    title: Record<Locale, string>;
    content: Record<Locale, string>;
    order: number;
    xpReward: number;
}

export interface Question {
    id: string;
    lessonId: string;
    type: QuestionType;
    question: Record<Locale, string>;
    options?: Record<Locale, string[]>;
    answer: string | boolean | string[];
    acceptedAnswers?: string[];
    explanation?: Record<Locale, string>;
    difficulty: 1 | 2 | 3 | 4 | 5;
}

// ========================================
// Progress & Gamification
// ========================================

export interface Progress {
    lessonId: string;
    score: number;
    totalQuestions: number;
    completed: boolean;
    completedAt: Date | null;
}

export interface Badge {
    id: string;
    slug: string;
    name: Record<Locale, string>;
    description: Record<Locale, string>;
    icon: string;
    category: 'completion' | 'streak' | 'performance' | 'social';
    xpBonus: number;
}

export interface UserBadge extends Badge {
    earnedAt: Date;
}

// ========================================
// Flashcard (SRS)
// ========================================

export interface Flashcard {
    id: string;
    questionId: string;
    easeFactor: number;
    interval: number;
    repetitions: number;
    nextReview: Date;
}

export type FlashcardRating = 0 | 1 | 2 | 3 | 4 | 5; // 0 = blackout, 5 = perfect

// ========================================
// Social
// ========================================

export type FriendshipStatus = 'pending' | 'accepted' | 'blocked';
export type ChallengeStatus = 'pending' | 'in_progress' | 'completed' | 'expired';

export interface Friendship {
    friendId: string;
    friend: UserPublic;
    status: FriendshipStatus;
    createdAt: Date;
}

export interface Challenge {
    id: string;
    challenger: UserPublic;
    challenged: UserPublic;
    lessonId: string;
    status: ChallengeStatus;
    isRealtime: boolean;
    challengerScore: number | null;
    challengedScore: number | null;
    winnerId: string | null;
    expiresAt: Date;
    completedAt: Date | null;
    createdAt: Date;
}

// ========================================
// API Response Types
// ========================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

// ========================================
// Leaderboard
// ========================================

export interface LeaderboardEntry {
    rank: number;
    user: UserPublic;
    xp: number;
    level: number;
}

export type LeaderboardPeriod = 'weekly' | 'monthly' | 'all_time';
