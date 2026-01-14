// CodeQuest - Speedrun Mode Service

export interface SpeedrunConfig {
    id: string;
    name: string;
    description: string;
    questionCount: number;
    timePerQuestion: number; // seconds
    totalTimeLimit?: number; // seconds, optional
    difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
    category?: string;
}

export interface SpeedrunResult {
    configId: string;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    totalTime: number; // milliseconds
    averageTime: number; // milliseconds per question
    streak: number; // max correct streak
    xpEarned: number;
    rank?: 'bronze' | 'silver' | 'gold' | 'diamond';
    isNewRecord?: boolean;
    previousBest?: number;
}

export interface SpeedrunLeaderboardEntry {
    rank: number;
    name: string;
    image?: string;
    score: number;
    time: number;
    date: string;
}

// Predefined speedrun modes
export const SPEEDRUN_MODES: SpeedrunConfig[] = [
    {
        id: 'quick-5',
        name: 'Rápido 5',
        description: 'Responda 5 perguntas o mais rápido possível',
        questionCount: 5,
        timePerQuestion: 10,
        difficulty: 'easy',
    },
    {
        id: 'sprint-10',
        name: 'Sprint 10',
        description: '10 perguntas com tempo limitado',
        questionCount: 10,
        timePerQuestion: 8,
        difficulty: 'medium',
    },
    {
        id: 'marathon-25',
        name: 'Maratona 25',
        description: '25 perguntas de dificuldade mista',
        questionCount: 25,
        timePerQuestion: 12,
        difficulty: 'mixed',
    },
    {
        id: 'expert-15',
        name: 'Expert 15',
        description: '15 perguntas difíceis para especialistas',
        questionCount: 15,
        timePerQuestion: 15,
        difficulty: 'hard',
    },
    {
        id: 'blitz',
        name: 'Blitz',
        description: '20 perguntas em 60 segundos!',
        questionCount: 20,
        totalTimeLimit: 60,
        timePerQuestion: 3,
        difficulty: 'easy',
    },
];

// Mock questions for speedrun
export const SPEEDRUN_QUESTIONS = [
    {
        id: '1',
        text: 'Qual tag cria um parágrafo?',
        options: ['<p>', '<paragraph>', '<text>', '<pg>'],
        correct: 0,
        difficulty: 'easy',
    },
    {
        id: '2',
        text: 'Qual atributo define a URL de um link?',
        options: ['src', 'href', 'url', 'link'],
        correct: 1,
        difficulty: 'easy',
    },
    {
        id: '3',
        text: 'Como criar um título principal?',
        options: ['<h1>', '<title>', '<header>', '<heading>'],
        correct: 0,
        difficulty: 'easy',
    },
    {
        id: '4',
        text: 'Qual tag cria uma lista ordenada?',
        options: ['<ul>', '<list>', '<ol>', '<order>'],
        correct: 2,
        difficulty: 'medium',
    },
    {
        id: '5',
        text: 'Atributo para texto alternativo de imagem?',
        options: ['title', 'alt', 'text', 'desc'],
        correct: 1,
        difficulty: 'medium',
    },
    {
        id: '6',
        text: 'Como criar uma quebra de linha?',
        options: ['<break>', '<br>', '<lb>', '<newline>'],
        correct: 1,
        difficulty: 'easy',
    },
    {
        id: '7',
        text: 'Tag para texto em negrito semântico?',
        options: ['<b>', '<bold>', '<strong>', '<em>'],
        correct: 2,
        difficulty: 'medium',
    },
    {
        id: '8',
        text: 'Qual atributo identifica um elemento único?',
        options: ['class', 'id', 'name', 'key'],
        correct: 1,
        difficulty: 'easy',
    },
    {
        id: '9',
        text: 'Tag para agrupar elementos inline?',
        options: ['<div>', '<span>', '<group>', '<inline>'],
        correct: 1,
        difficulty: 'medium',
    },
    {
        id: '10',
        text: 'Como definir um campo obrigatório em form?',
        options: ['mandatory', 'required', 'must', 'needed'],
        correct: 1,
        difficulty: 'medium',
    },
];

// Calculate XP based on performance
export function calculateSpeedrunXP(result: SpeedrunResult): number {
    const baseXP = result.correctAnswers * 10;
    const speedBonus = Math.max(0, 100 - Math.floor(result.averageTime / 100));
    const streakBonus = result.streak * 5;
    const perfectBonus = result.correctAnswers === result.totalQuestions ? 100 : 0;

    return baseXP + speedBonus + streakBonus + perfectBonus;
}

// Determine rank based on score and time
export function calculateRank(
    score: number,
    maxScore: number,
    averageTime: number
): SpeedrunResult['rank'] {
    const accuracy = score / maxScore;
    const speedScore = Math.max(0, 1 - averageTime / 10000); // Normalize to 0-1
    const combined = accuracy * 0.7 + speedScore * 0.3;

    if (combined >= 0.95) return 'diamond';
    if (combined >= 0.8) return 'gold';
    if (combined >= 0.6) return 'silver';
    return 'bronze';
}

// Mock leaderboard
export async function getSpeedrunLeaderboard(modeId: string): Promise<SpeedrunLeaderboardEntry[]> {
    return [
        { rank: 1, name: 'Maria Oliveira', score: 100, time: 25000, date: '2026-01-12' },
        { rank: 2, name: 'João Pedro', score: 95, time: 28000, date: '2026-01-11' },
        { rank: 3, name: 'Ana Silva', score: 90, time: 32000, date: '2026-01-10' },
        { rank: 4, name: 'Carlos Santos', score: 85, time: 35000, date: '2026-01-09' },
        { rank: 5, name: 'Você', score: 80, time: 40000, date: '2026-01-08' },
    ];
}

// Get random questions for a mode
export function getSpeedrunQuestions(mode: SpeedrunConfig): typeof SPEEDRUN_QUESTIONS {
    let filtered = SPEEDRUN_QUESTIONS;

    if (mode.difficulty !== 'mixed') {
        filtered = filtered.filter(q => q.difficulty === mode.difficulty);
    }

    // Shuffle and pick required count
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(mode.questionCount, shuffled.length));
}
