// CodeQuest - Badge System Service
// Handles badge definitions, checking, and awarding

import type { Locale } from '@repo/shared';

export interface Badge {
    id: string;
    slug: string;
    name: { 'pt-BR': string; en: string };
    description: { 'pt-BR': string; en: string };
    icon: string;
    category: 'progress' | 'streak' | 'social' | 'achievement' | 'special';
    xpBonus: number;
    condition: BadgeCondition;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export type BadgeCondition =
    | { type: 'lessons_completed'; count: number }
    | { type: 'questions_correct'; count: number }
    | { type: 'streak_days'; count: number }
    | { type: 'level_reached'; level: number }
    | { type: 'perfect_lessons'; count: number }
    | { type: 'challenges_won'; count: number }
    | { type: 'friends_added'; count: number }
    | { type: 'xp_earned'; amount: number }
    | { type: 'track_completed'; trackId: string }
    | { type: 'speedrun_position'; position: number }
    | { type: 'first_action'; action: string };

// Badge definitions (~30 badges)
export const BADGES: Badge[] = [
    // Progress badges
    {
        id: 'first-lesson',
        slug: 'first-lesson',
        name: { 'pt-BR': 'Primeiro Passo', en: 'First Step' },
        description: { 'pt-BR': 'Complete sua primeira lição', en: 'Complete your first lesson' },
        icon: '🎯',
        category: 'progress',
        xpBonus: 50,
        condition: { type: 'lessons_completed', count: 1 },
        rarity: 'common'
    },
    {
        id: 'lesson-5',
        slug: 'lesson-5',
        name: { 'pt-BR': 'Estudante Dedicado', en: 'Dedicated Student' },
        description: { 'pt-BR': 'Complete 5 lições', en: 'Complete 5 lessons' },
        icon: '📚',
        category: 'progress',
        xpBonus: 100,
        condition: { type: 'lessons_completed', count: 5 },
        rarity: 'common'
    },
    {
        id: 'lesson-15',
        slug: 'lesson-15',
        name: { 'pt-BR': 'Mestre HTML', en: 'HTML Master' },
        description: { 'pt-BR': 'Complete todas as 15 lições de HTML', en: 'Complete all 15 HTML lessons' },
        icon: '🏆',
        category: 'progress',
        xpBonus: 500,
        condition: { type: 'lessons_completed', count: 15 },
        rarity: 'rare'
    },
    {
        id: 'questions-50',
        slug: 'questions-50',
        name: { 'pt-BR': 'Respondedor Iniciante', en: 'Beginner Answerer' },
        description: { 'pt-BR': 'Acerte 50 questões', en: 'Answer 50 questions correctly' },
        icon: '✓',
        category: 'progress',
        xpBonus: 100,
        condition: { type: 'questions_correct', count: 50 },
        rarity: 'common'
    },
    {
        id: 'questions-200',
        slug: 'questions-200',
        name: { 'pt-BR': 'Respondedor Expert', en: 'Expert Answerer' },
        description: { 'pt-BR': 'Acerte 200 questões', en: 'Answer 200 questions correctly' },
        icon: '✓✓',
        category: 'progress',
        xpBonus: 300,
        condition: { type: 'questions_correct', count: 200 },
        rarity: 'uncommon'
    },

    // Streak badges
    {
        id: 'streak-3',
        slug: 'streak-3',
        name: { 'pt-BR': 'Em Chamas', en: 'On Fire' },
        description: { 'pt-BR': 'Mantenha um streak de 3 dias', en: 'Keep a 3-day streak' },
        icon: '🔥',
        category: 'streak',
        xpBonus: 50,
        condition: { type: 'streak_days', count: 3 },
        rarity: 'common'
    },
    {
        id: 'streak-7',
        slug: 'streak-7',
        name: { 'pt-BR': 'Semana Perfeita', en: 'Perfect Week' },
        description: { 'pt-BR': 'Mantenha um streak de 7 dias', en: 'Keep a 7-day streak' },
        icon: '⭐',
        category: 'streak',
        xpBonus: 150,
        condition: { type: 'streak_days', count: 7 },
        rarity: 'uncommon'
    },
    {
        id: 'streak-30',
        slug: 'streak-30',
        name: { 'pt-BR': 'Mês Imparável', en: 'Unstoppable Month' },
        description: { 'pt-BR': 'Mantenha um streak de 30 dias', en: 'Keep a 30-day streak' },
        icon: '💎',
        category: 'streak',
        xpBonus: 500,
        condition: { type: 'streak_days', count: 30 },
        rarity: 'rare'
    },
    {
        id: 'streak-100',
        slug: 'streak-100',
        name: { 'pt-BR': 'Centurião', en: 'Centurion' },
        description: { 'pt-BR': 'Mantenha um streak de 100 dias', en: 'Keep a 100-day streak' },
        icon: '🏅',
        category: 'streak',
        xpBonus: 1000,
        condition: { type: 'streak_days', count: 100 },
        rarity: 'epic'
    },
    {
        id: 'streak-365',
        slug: 'streak-365',
        name: { 'pt-BR': 'Lenda do Ano', en: 'Year Legend' },
        description: { 'pt-BR': 'Mantenha um streak de 365 dias', en: 'Keep a 365-day streak' },
        icon: '👑',
        category: 'streak',
        xpBonus: 5000,
        condition: { type: 'streak_days', count: 365 },
        rarity: 'legendary'
    },

    // Level badges
    {
        id: 'level-5',
        slug: 'level-5',
        name: { 'pt-BR': 'Aprendiz', en: 'Apprentice' },
        description: { 'pt-BR': 'Alcance o nível 5', en: 'Reach level 5' },
        icon: '🌱',
        category: 'achievement',
        xpBonus: 100,
        condition: { type: 'level_reached', level: 5 },
        rarity: 'common'
    },
    {
        id: 'level-10',
        slug: 'level-10',
        name: { 'pt-BR': 'Desenvolvedor', en: 'Developer' },
        description: { 'pt-BR': 'Alcance o nível 10', en: 'Reach level 10' },
        icon: '💻',
        category: 'achievement',
        xpBonus: 250,
        condition: { type: 'level_reached', level: 10 },
        rarity: 'uncommon'
    },
    {
        id: 'level-20',
        slug: 'level-20',
        name: { 'pt-BR': 'Expert', en: 'Expert' },
        description: { 'pt-BR': 'Alcance o nível 20', en: 'Reach level 20' },
        icon: '🚀',
        category: 'achievement',
        xpBonus: 500,
        condition: { type: 'level_reached', level: 20 },
        rarity: 'rare'
    },
    {
        id: 'level-50',
        slug: 'level-50',
        name: { 'pt-BR': 'Lenda', en: 'Legend' },
        description: { 'pt-BR': 'Alcance o nível 50', en: 'Reach level 50' },
        icon: '🌟',
        category: 'achievement',
        xpBonus: 2000,
        condition: { type: 'level_reached', level: 50 },
        rarity: 'legendary'
    },

    // Achievement badges
    {
        id: 'perfect-1',
        slug: 'perfect-1',
        name: { 'pt-BR': 'Perfeccionista', en: 'Perfectionist' },
        description: { 'pt-BR': 'Complete uma lição com 100%', en: 'Complete a lesson with 100%' },
        icon: '💯',
        category: 'achievement',
        xpBonus: 100,
        condition: { type: 'perfect_lessons', count: 1 },
        rarity: 'common'
    },
    {
        id: 'perfect-5',
        slug: 'perfect-5',
        name: { 'pt-BR': 'Super Perfeccionista', en: 'Super Perfectionist' },
        description: { 'pt-BR': 'Complete 5 lições com 100%', en: 'Complete 5 lessons with 100%' },
        icon: '🎯',
        category: 'achievement',
        xpBonus: 300,
        condition: { type: 'perfect_lessons', count: 5 },
        rarity: 'uncommon'
    },
    {
        id: 'perfect-15',
        slug: 'perfect-15',
        name: { 'pt-BR': 'Perfeição Absoluta', en: 'Absolute Perfection' },
        description: { 'pt-BR': 'Complete todas as 15 lições com 100%', en: 'Complete all 15 lessons with 100%' },
        icon: '✨',
        category: 'achievement',
        xpBonus: 1000,
        condition: { type: 'perfect_lessons', count: 15 },
        rarity: 'epic'
    },

    // Social badges
    {
        id: 'first-friend',
        slug: 'first-friend',
        name: { 'pt-BR': 'Sociável', en: 'Social' },
        description: { 'pt-BR': 'Adicione seu primeiro amigo', en: 'Add your first friend' },
        icon: '👥',
        category: 'social',
        xpBonus: 50,
        condition: { type: 'friends_added', count: 1 },
        rarity: 'common'
    },
    {
        id: 'friends-5',
        slug: 'friends-5',
        name: { 'pt-BR': 'Grupo de Estudos', en: 'Study Group' },
        description: { 'pt-BR': 'Adicione 5 amigos', en: 'Add 5 friends' },
        icon: '👨‍👩‍👧‍👦',
        category: 'social',
        xpBonus: 150,
        condition: { type: 'friends_added', count: 5 },
        rarity: 'uncommon'
    },
    {
        id: 'first-challenge',
        slug: 'first-challenge',
        name: { 'pt-BR': 'Desafiante', en: 'Challenger' },
        description: { 'pt-BR': 'Vença seu primeiro desafio', en: 'Win your first challenge' },
        icon: '⚔️',
        category: 'social',
        xpBonus: 100,
        condition: { type: 'challenges_won', count: 1 },
        rarity: 'common'
    },
    {
        id: 'challenges-10',
        slug: 'challenges-10',
        name: { 'pt-BR': 'Campeão', en: 'Champion' },
        description: { 'pt-BR': 'Vença 10 desafios', en: 'Win 10 challenges' },
        icon: '🥇',
        category: 'social',
        xpBonus: 500,
        condition: { type: 'challenges_won', count: 10 },
        rarity: 'rare'
    },

    // Special badges
    {
        id: 'html-track',
        slug: 'html-track',
        name: { 'pt-BR': 'Trilha HTML Completa', en: 'HTML Track Complete' },
        description: { 'pt-BR': 'Complete a trilha de HTML', en: 'Complete the HTML track' },
        icon: '📄',
        category: 'special',
        xpBonus: 500,
        condition: { type: 'track_completed', trackId: 'html-fundamentals' },
        rarity: 'rare'
    },
    {
        id: 'xp-1k',
        slug: 'xp-1k',
        name: { 'pt-BR': 'Primeiros Mil', en: 'First Thousand' },
        description: { 'pt-BR': 'Acumule 1.000 XP', en: 'Earn 1,000 XP' },
        icon: '💰',
        category: 'achievement',
        xpBonus: 100,
        condition: { type: 'xp_earned', amount: 1000 },
        rarity: 'common'
    },
    {
        id: 'xp-10k',
        slug: 'xp-10k',
        name: { 'pt-BR': 'Dez Mil', en: 'Ten Thousand' },
        description: { 'pt-BR': 'Acumule 10.000 XP', en: 'Earn 10,000 XP' },
        icon: '💎',
        category: 'achievement',
        xpBonus: 500,
        condition: { type: 'xp_earned', amount: 10000 },
        rarity: 'rare'
    },
    {
        id: 'speedrun-top3',
        slug: 'speedrun-top3',
        name: { 'pt-BR': 'Velocista', en: 'Speedster' },
        description: { 'pt-BR': 'Fique no top 3 do speedrun', en: 'Get in the top 3 of speedrun' },
        icon: '⚡',
        category: 'special',
        xpBonus: 300,
        condition: { type: 'speedrun_position', position: 3 },
        rarity: 'rare'
    },
    {
        id: 'early-bird',
        slug: 'early-bird',
        name: { 'pt-BR': 'Early Bird', en: 'Early Bird' },
        description: { 'pt-BR': 'Complete uma lição antes das 6h', en: 'Complete a lesson before 6 AM' },
        icon: '🌅',
        category: 'special',
        xpBonus: 100,
        condition: { type: 'first_action', action: 'early_lesson' },
        rarity: 'uncommon'
    },
    {
        id: 'night-owl',
        slug: 'night-owl',
        name: { 'pt-BR': 'Coruja Noturna', en: 'Night Owl' },
        description: { 'pt-BR': 'Complete uma lição após meia-noite', en: 'Complete a lesson after midnight' },
        icon: '🦉',
        category: 'special',
        xpBonus: 100,
        condition: { type: 'first_action', action: 'night_lesson' },
        rarity: 'uncommon'
    },
    {
        id: 'weekend-warrior',
        slug: 'weekend-warrior',
        name: { 'pt-BR': 'Guerreiro de Fim de Semana', en: 'Weekend Warrior' },
        description: { 'pt-BR': 'Estude em ambos os dias do fim de semana', en: 'Study on both weekend days' },
        icon: '💪',
        category: 'special',
        xpBonus: 150,
        condition: { type: 'first_action', action: 'weekend_both' },
        rarity: 'uncommon'
    }
];

// Get badge by ID
export function getBadge(badgeId: string): Badge | undefined {
    return BADGES.find(b => b.id === badgeId);
}

// Get badges by category
export function getBadgesByCategory(category: Badge['category']): Badge[] {
    return BADGES.filter(b => b.category === category);
}

// Get badge name for locale
export function getBadgeName(badge: Badge, locale: Locale): string {
    return badge.name[locale] || badge.name['pt-BR'];
}

// Get badge description for locale
export function getBadgeDescription(badge: Badge, locale: Locale): string {
    return badge.description[locale] || badge.description['pt-BR'];
}

// Rarity colors
export const RARITY_COLORS: Record<Badge['rarity'], string> = {
    common: '#9ca3af',      // Gray
    uncommon: '#22c55e',    // Green
    rare: '#3b82f6',        // Blue
    epic: '#a855f7',        // Purple
    legendary: '#f59e0b'    // Gold
};
