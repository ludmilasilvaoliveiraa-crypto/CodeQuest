// CodeQuest - HTML Track Content
// Auto-migrated from Quiz HTML original

import type { Locale } from '@repo/shared';

// Track definition
export const htmlTrack = {
    id: 'html-fundamentals',
    slug: 'html-fundamentals',
    title: {
        'pt-BR': 'Fundamentos de HTML',
        en: 'HTML Fundamentals'
    },
    icon: '📄',
    order: 1
};

// Lessons definition
export const htmlLessons = [
    {
        id: 'lesson-1',
        trackId: 'html-fundamentals',
        slug: 'criando-novo-projeto',
        title: { 'pt-BR': 'Criando Novo Projeto', en: 'Creating New Project' },
        order: 1,
        xpReward: 100
    },
    {
        id: 'lesson-2',
        trackId: 'html-fundamentals',
        slug: 'estrutura-basica',
        title: { 'pt-BR': 'Estrutura Básica', en: 'Basic Structure' },
        order: 2,
        xpReward: 100
    },
    {
        id: 'lesson-3',
        trackId: 'html-fundamentals',
        slug: 'meta-tags-cabecalho-paragrafo',
        title: { 'pt-BR': 'Meta Tags, Cabeçalho e Parágrafo', en: 'Meta Tags, Heading and Paragraph' },
        order: 3,
        xpReward: 100
    },
    {
        id: 'lesson-4',
        trackId: 'html-fundamentals',
        slug: 'formatacao-texto',
        title: { 'pt-BR': 'Formatação de Texto', en: 'Text Formatting' },
        order: 4,
        xpReward: 100
    },
    {
        id: 'lesson-5',
        trackId: 'html-fundamentals',
        slug: 'elementos-citacao',
        title: { 'pt-BR': 'Elementos de Citação', en: 'Quotation Elements' },
        order: 5,
        xpReward: 100
    },
    {
        id: 'lesson-6',
        trackId: 'html-fundamentals',
        slug: 'comentarios',
        title: { 'pt-BR': 'Comentários', en: 'Comments' },
        order: 6,
        xpReward: 100
    },
    {
        id: 'lesson-7',
        trackId: 'html-fundamentals',
        slug: 'links',
        title: { 'pt-BR': 'Links', en: 'Links' },
        order: 7,
        xpReward: 100
    },
    {
        id: 'lesson-8',
        trackId: 'html-fundamentals',
        slug: 'imagens',
        title: { 'pt-BR': 'Tudo Sobre Imagens', en: 'All About Images' },
        order: 8,
        xpReward: 100
    },
    {
        id: 'lesson-9',
        trackId: 'html-fundamentals',
        slug: 'tabelas',
        title: { 'pt-BR': 'Tabelas', en: 'Tables' },
        order: 9,
        xpReward: 100
    },
    {
        id: 'lesson-10',
        trackId: 'html-fundamentals',
        slug: 'listas',
        title: { 'pt-BR': 'Listas', en: 'Lists' },
        order: 10,
        xpReward: 100
    },
    {
        id: 'lesson-11',
        trackId: 'html-fundamentals',
        slug: 'iframes',
        title: { 'pt-BR': 'iframes', en: 'iframes' },
        order: 11,
        xpReward: 100
    },
    {
        id: 'lesson-12',
        trackId: 'html-fundamentals',
        slug: 'formularios',
        title: { 'pt-BR': 'Formulários', en: 'Forms' },
        order: 12,
        xpReward: 100
    },
    {
        id: 'lesson-13',
        trackId: 'html-fundamentals',
        slug: 'audio',
        title: { 'pt-BR': 'Áudio', en: 'Audio' },
        order: 13,
        xpReward: 100
    },
    {
        id: 'lesson-14',
        trackId: 'html-fundamentals',
        slug: 'videos',
        title: { 'pt-BR': 'Vídeos', en: 'Videos' },
        order: 14,
        xpReward: 100
    },
    {
        id: 'lesson-15',
        trackId: 'html-fundamentals',
        slug: 'div-html-semantico',
        title: { 'pt-BR': 'Div e HTML Semântico', en: 'Div and Semantic HTML' },
        order: 15,
        xpReward: 100
    }
];

// Helper to get lesson by locale
export function getLessonTitle(lesson: typeof htmlLessons[0], locale: Locale): string {
    return lesson.title[locale] || lesson.title['pt-BR'];
}
