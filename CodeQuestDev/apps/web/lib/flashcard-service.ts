// CodeQuest - Flashcard SRS System (Spaced Repetition)

export interface Flashcard {
    id: string;
    front: string; // Question or concept
    back: string; // Answer or explanation
    code?: string; // Optional code snippet
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    // SRS fields
    interval: number; // Days until next review
    easeFactor: number; // How easy this card is (2.5 default)
    repetitions: number; // Number of successful reviews
    nextReview: string; // ISO date string
    lastReview?: string;
}

export interface FlashcardDeck {
    id: string;
    name: string;
    description: string;
    icon: string;
    cardCount: number;
    dueCount: number;
    newCount: number;
}

// SM-2 Algorithm parameters
const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

// Quality ratings
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0 - Complete blackout
// 1 - Incorrect; remembered when shown answer
// 2 - Incorrect; correct answer seemed easy to recall
// 3 - Correct with serious difficulty
// 4 - Correct with some hesitation
// 5 - Perfect response

// SM-2 Algorithm implementation
export function calculateNextReview(
    card: Flashcard,
    quality: ReviewQuality
): Pick<Flashcard, 'interval' | 'easeFactor' | 'repetitions' | 'nextReview'> {
    let { interval, easeFactor, repetitions } = card;

    if (quality < 3) {
        // Failed - reset repetitions
        repetitions = 0;
        interval = 1;
    } else {
        // Passed
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions++;
    }

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
        interval,
        easeFactor,
        repetitions,
        nextReview: nextReview.toISOString(),
    };
}

// Sample flashcards
export const HTML_FLASHCARDS: Flashcard[] = [
    {
        id: '1',
        front: 'Qual é a estrutura básica de um documento HTML5?',
        back: '<!DOCTYPE html>, <html>, <head>, <body>',
        code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Título</title>\n  </head>\n  <body>\n    Conteúdo\n  </body>\n</html>',
        category: 'structure',
        difficulty: 'easy',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '2',
        front: 'Diferença entre <div> e <span>?',
        back: '<div> é block-level (ocupa linha inteira), <span> é inline (flui com o texto)',
        category: 'elements',
        difficulty: 'easy',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '3',
        front: 'O que é o atributo "alt" em imagens?',
        back: 'Texto alternativo exibido quando a imagem não carrega e usado por leitores de tela',
        code: '<img src="foto.jpg" alt="Descrição da imagem">',
        category: 'accessibility',
        difficulty: 'easy',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '4',
        front: 'Diferença entre id e class?',
        back: 'id é único na página, class pode ser reutilizada em múltiplos elementos',
        code: '<div id="unico">...</div>\n<p class="reutilizavel">...</p>\n<p class="reutilizavel">...</p>',
        category: 'attributes',
        difficulty: 'medium',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '5',
        front: 'Para que serve a tag <meta charset="UTF-8">?',
        back: 'Define a codificação de caracteres, permitindo acentos e caracteres especiais',
        category: 'metadata',
        difficulty: 'medium',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '6',
        front: 'Diferença entre <strong> e <b>?',
        back: '<strong> tem significado semântico (importante), <b> é apenas visual (negrito)',
        category: 'semantics',
        difficulty: 'medium',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '7',
        front: 'O que são elementos semânticos HTML5?',
        back: 'Tags que descrevem seu conteúdo: <header>, <nav>, <main>, <article>, <section>, <footer>',
        category: 'semantics',
        difficulty: 'medium',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
    {
        id: '8',
        front: 'Como criar um link que abre em nova aba?',
        back: 'Usar target="_blank" com rel="noopener"',
        code: '<a href="url" target="_blank" rel="noopener">Link</a>',
        category: 'links',
        difficulty: 'easy',
        interval: 0,
        easeFactor: DEFAULT_EASE_FACTOR,
        repetitions: 0,
        nextReview: new Date().toISOString(),
    },
];

// Deck definitions
export const FLASHCARD_DECKS: FlashcardDeck[] = [
    {
        id: 'html-basics',
        name: 'HTML Básico',
        description: 'Estrutura, tags e atributos fundamentais',
        icon: '📝',
        cardCount: 8,
        dueCount: 5,
        newCount: 3,
    },
    {
        id: 'html-forms',
        name: 'Formulários',
        description: 'Inputs, validação e acessibilidade',
        icon: '📋',
        cardCount: 12,
        dueCount: 2,
        newCount: 4,
    },
    {
        id: 'html-semantics',
        name: 'Semântica HTML5',
        description: 'Tags semânticas e acessibilidade',
        icon: '🏗️',
        cardCount: 10,
        dueCount: 4,
        newCount: 2,
    },
];

// Storage functions (using localStorage/IndexedDB)
export function saveFlashcardProgress(card: Flashcard): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('flashcard-progress') || '{}';
    const progress = JSON.parse(stored);
    progress[card.id] = {
        interval: card.interval,
        easeFactor: card.easeFactor,
        repetitions: card.repetitions,
        nextReview: card.nextReview,
        lastReview: new Date().toISOString(),
    };
    localStorage.setItem('flashcard-progress', JSON.stringify(progress));
}

export function loadFlashcardProgress(): Record<string, Partial<Flashcard>> {
    if (typeof window === 'undefined') return {};

    const stored = localStorage.getItem('flashcard-progress') || '{}';
    return JSON.parse(stored);
}

// Get cards due for review
export function getDueCards(cards: Flashcard[]): Flashcard[] {
    const now = new Date();
    const progress = loadFlashcardProgress();

    return cards.map(card => ({
        ...card,
        ...progress[card.id],
    })).filter(card => new Date(card.nextReview) <= now);
}

// Get today's study stats
export function getStudyStats(): { reviewed: number; streak: number; mastered: number } {
    if (typeof window === 'undefined') return { reviewed: 0, streak: 0, mastered: 0 };

    const stored = localStorage.getItem('flashcard-stats') || '{}';
    return JSON.parse(stored);
}
