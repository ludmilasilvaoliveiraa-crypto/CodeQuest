// CodeQuest - Shared Constants

// ========================================
// XP & Level System
// ========================================

export const XP_PER_QUESTION = 10;
export const XP_BONUS_PERFECT_LESSON = 50;
export const XP_BONUS_STREAK_MULTIPLIER = 0.1; // +10% per streak day, max 100%
export const MAX_STREAK_MULTIPLIER = 2.0;

// Level thresholds (cumulative XP required)
export const LEVEL_THRESHOLDS = [
    0,      // Level 1
    100,    // Level 2
    300,    // Level 3
    600,    // Level 4
    1000,   // Level 5
    1500,   // Level 6
    2100,   // Level 7
    2800,   // Level 8
    3600,   // Level 9
    4500,   // Level 10
    5500,   // Level 11
    6600,   // Level 12
    7800,   // Level 13
    9100,   // Level 14
    10500,  // Level 15
    12000,  // Level 16
    13600,  // Level 17
    15300,  // Level 18
    17100,  // Level 19
    19000,  // Level 20
] as const;

export const MAX_LEVEL = LEVEL_THRESHOLDS.length;

// ========================================
// Streak System
// ========================================

export const STREAK_FREEZE_COST = 50; // XP cost to freeze streak
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 365] as const;

// ========================================
// Challenge System
// ========================================

export const CHALLENGE_EXPIRY_HOURS = 48;
export const CHALLENGE_QUESTIONS_COUNT = 5;
export const REALTIME_CHALLENGE_TIMEOUT_SECONDS = 300; // 5 minutes

// ========================================
// Flashcard SRS (SM-2 Algorithm)
// ========================================

export const SRS_INITIAL_EASE = 2.5;
export const SRS_MIN_EASE = 1.3;
export const SRS_EASE_BONUS = 0.1;
export const SRS_EASE_PENALTY = 0.2;

// ========================================
// Badges
// ========================================

export const BADGE_CATEGORIES = {
    completion: '🏆',
    streak: '🔥',
    performance: '⚡',
    social: '👥',
} as const;

// ========================================
// Question Types
// ========================================

export const QUESTION_TYPES = {
    multiple_choice: { icon: '📋', label: { 'pt-BR': 'Múltipla Escolha', en: 'Multiple Choice' } },
    true_false: { icon: '✅', label: { 'pt-BR': 'Verdadeiro/Falso', en: 'True/False' } },
    fill: { icon: '✏️', label: { 'pt-BR': 'Preencher', en: 'Fill in the Blank' } },
    code: { icon: '💻', label: { 'pt-BR': 'Código', en: 'Code' } },
} as const;

// ========================================
// Difficulty Labels
// ========================================

export const DIFFICULTY_LABELS = {
    1: { 'pt-BR': 'Muito Fácil', en: 'Very Easy', color: '#22c55e' },
    2: { 'pt-BR': 'Fácil', en: 'Easy', color: '#84cc16' },
    3: { 'pt-BR': 'Médio', en: 'Medium', color: '#eab308' },
    4: { 'pt-BR': 'Difícil', en: 'Hard', color: '#f97316' },
    5: { 'pt-BR': 'Muito Difícil', en: 'Very Hard', color: '#ef4444' },
} as const;

// ========================================
// API Endpoints
// ========================================

export const API_VERSION = 'v1';
export const API_BASE_PATH = `/api/${API_VERSION}`;

export const XP_VALUES = {
    CORRECT_ANSWER: XP_PER_QUESTION,
    FIRST_TRY_BONUS: 5,
    LESSON_COMPLETION: 50,
    PERFECT_LESSON: XP_BONUS_PERFECT_LESSON,
} as const;

export const STREAK_MULTIPLIERS = {
    NONE: 1.0,
    DAYS_3: 1.1,
    DAYS_7: 1.25,
    DAYS_14: 1.5,
    DAYS_30: MAX_STREAK_MULTIPLIER,
} as const;
