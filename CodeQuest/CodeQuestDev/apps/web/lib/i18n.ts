// CodeQuest - Internationalization (i18n) System

export type Locale = 'pt-BR' | 'en';

export interface Translations {
    common: {
        loading: string;
        error: string;
        save: string;
        cancel: string;
        back: string;
        next: string;
        start: string;
        finish: string;
        continue: string;
    };
    nav: {
        home: string;
        learn: string;
        playground: string;
        validator: string;
        dashboard: string;
        profile: string;
        settings: string;
        login: string;
        logout: string;
    };
    home: {
        title: string;
        subtitle: string;
        startButton: string;
        loginButton: string;
        features: {
            lessons: string;
            quizzes: string;
            playground: string;
            badges: string;
        };
    };
    dashboard: {
        welcome: string;
        stats: {
            xp: string;
            level: string;
            streak: string;
            lessons: string;
        };
        quickActions: {
            title: string;
            learn: string;
            speedrun: string;
            flashcards: string;
            challenges: string;
        };
    };
    gamification: {
        xpGained: string;
        levelUp: string;
        newBadge: string;
        streakDay: string;
        streakDays: string;
    };
    speedrun: {
        title: string;
        selectMode: string;
        questions: string;
        timePerQuestion: string;
        totalTime: string;
        result: {
            excellent: string;
            good: string;
            tryAgain: string;
            score: string;
            time: string;
            streak: string;
            xpEarned: string;
        };
    };
    flashcards: {
        title: string;
        tapToFlip: string;
        howWasIt: string;
        ratings: {
            again: string;
            hard: string;
            ok: string;
            easy: string;
        };
        sessionComplete: string;
        cardsReviewed: string;
    };
}

// Portuguese (Brazil) translations
export const ptBR: Translations = {
    common: {
        loading: 'Carregando...',
        error: 'Erro',
        save: 'Salvar',
        cancel: 'Cancelar',
        back: 'Voltar',
        next: 'Próximo',
        start: 'Iniciar',
        finish: 'Finalizar',
        continue: 'Continuar',
    },
    nav: {
        home: 'Início',
        learn: 'Aprender',
        playground: 'Playground',
        validator: 'Validador',
        dashboard: 'Painel',
        profile: 'Perfil',
        settings: 'Configurações',
        login: 'Entrar',
        logout: 'Sair',
    },
    home: {
        title: 'Aprenda HTML de forma divertida',
        subtitle: 'Domine HTML com lições interativas, quizzes gamificados e desafios!',
        startButton: 'Começar Jornada',
        loginButton: 'Entrar',
        features: {
            lessons: 'Lições Interativas',
            quizzes: 'Quizzes Gamificados',
            playground: 'Editor de Código',
            badges: 'Conquistas e Badges',
        },
    },
    dashboard: {
        welcome: 'Olá',
        stats: {
            xp: 'XP Total',
            level: 'Nível',
            streak: 'Streak',
            lessons: 'Lições Completas',
        },
        quickActions: {
            title: 'Ações Rápidas',
            learn: 'Continuar Aprendendo',
            speedrun: 'Modo Speedrun',
            flashcards: 'Flashcards',
            challenges: 'Desafios',
        },
    },
    gamification: {
        xpGained: 'XP ganho',
        levelUp: 'Subiu de nível!',
        newBadge: 'Novo badge desbloqueado!',
        streakDay: 'dia de streak',
        streakDays: 'dias de streak',
    },
    speedrun: {
        title: 'Modo Speedrun',
        selectMode: 'Escolha um modo',
        questions: 'perguntas',
        timePerQuestion: 's por pergunta',
        totalTime: 's no total',
        result: {
            excellent: 'Excelente!',
            good: 'Muito bem!',
            tryAgain: 'Tente novamente!',
            score: 'Pontuação',
            time: 'Tempo',
            streak: 'Maior streak',
            xpEarned: 'XP ganho',
        },
    },
    flashcards: {
        title: 'Flashcards SRS',
        tapToFlip: 'Toque para ver resposta',
        howWasIt: 'Como foi sua lembrança?',
        ratings: {
            again: 'Errei',
            hard: 'Difícil',
            ok: 'Ok',
            easy: 'Fácil',
        },
        sessionComplete: 'Sessão Completa!',
        cardsReviewed: 'cards revisados',
    },
};

// English translations
export const en: Translations = {
    common: {
        loading: 'Loading...',
        error: 'Error',
        save: 'Save',
        cancel: 'Cancel',
        back: 'Back',
        next: 'Next',
        start: 'Start',
        finish: 'Finish',
        continue: 'Continue',
    },
    nav: {
        home: 'Home',
        learn: 'Learn',
        playground: 'Playground',
        validator: 'Validator',
        dashboard: 'Dashboard',
        profile: 'Profile',
        settings: 'Settings',
        login: 'Login',
        logout: 'Logout',
    },
    home: {
        title: 'Learn HTML the Fun Way',
        subtitle: 'Master HTML with interactive lessons, gamified quizzes and challenges!',
        startButton: 'Start Journey',
        loginButton: 'Login',
        features: {
            lessons: 'Interactive Lessons',
            quizzes: 'Gamified Quizzes',
            playground: 'Code Editor',
            badges: 'Achievements & Badges',
        },
    },
    dashboard: {
        welcome: 'Hello',
        stats: {
            xp: 'Total XP',
            level: 'Level',
            streak: 'Streak',
            lessons: 'Completed Lessons',
        },
        quickActions: {
            title: 'Quick Actions',
            learn: 'Continue Learning',
            speedrun: 'Speedrun Mode',
            flashcards: 'Flashcards',
            challenges: 'Challenges',
        },
    },
    gamification: {
        xpGained: 'XP earned',
        levelUp: 'Level up!',
        newBadge: 'New badge unlocked!',
        streakDay: 'day streak',
        streakDays: 'days streak',
    },
    speedrun: {
        title: 'Speedrun Mode',
        selectMode: 'Select a mode',
        questions: 'questions',
        timePerQuestion: 's per question',
        totalTime: 's total',
        result: {
            excellent: 'Excellent!',
            good: 'Well done!',
            tryAgain: 'Try again!',
            score: 'Score',
            time: 'Time',
            streak: 'Best streak',
            xpEarned: 'XP earned',
        },
    },
    flashcards: {
        title: 'Flashcards SRS',
        tapToFlip: 'Tap to reveal answer',
        howWasIt: 'How well did you remember?',
        ratings: {
            again: 'Again',
            hard: 'Hard',
            ok: 'Good',
            easy: 'Easy',
        },
        sessionComplete: 'Session Complete!',
        cardsReviewed: 'cards reviewed',
    },
};

// Translations map
const translations: Record<Locale, Translations> = {
    'pt-BR': ptBR,
    'en': en,
};

// Default locale
const DEFAULT_LOCALE: Locale = 'pt-BR';

// Get current locale from localStorage or browser
export function getLocale(): Locale {
    if (typeof window === 'undefined') return DEFAULT_LOCALE;

    const stored = localStorage.getItem('locale') as Locale;
    if (stored && translations[stored]) return stored;

    const browserLang = navigator.language;
    if (browserLang.startsWith('en')) return 'en';

    return DEFAULT_LOCALE;
}

// Set locale
export function setLocale(locale: Locale): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('locale', locale);
    window.location.reload();
}

// Get translations for a locale
export function getTranslations(locale?: Locale): Translations {
    const l = locale || getLocale();
    return translations[l] || translations[DEFAULT_LOCALE];
}

// Translation hook helper
export function t(path: string, locale?: Locale): string {
    const trans = getTranslations(locale);
    const keys = path.split('.');
    let result: unknown = trans;

    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = (result as Record<string, unknown>)[key];
        } else {
            return path; // Return path if translation not found
        }
    }

    return typeof result === 'string' ? result : path;
}
