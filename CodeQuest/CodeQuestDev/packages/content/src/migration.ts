// CodeQuest - Content Migration Script
// Converts existing questions.js to new TypeScript format with i18n support

import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

// Original lessons structure
const LESSONS = [
    { id: 1, slug: "criando-novo-projeto", title: { "pt-BR": "Criando Novo Projeto", en: "Creating New Project" } },
    { id: 2, slug: "estrutura-basica", title: { "pt-BR": "Estrutura Básica", en: "Basic Structure" } },
    { id: 3, slug: "meta-tags-cabecalho-paragrafo", title: { "pt-BR": "Meta Tags, Cabeçalho e Parágrafo", en: "Meta Tags, Heading and Paragraph" } },
    { id: 4, slug: "formatacao-texto", title: { "pt-BR": "Formatação de Texto", en: "Text Formatting" } },
    { id: 5, slug: "elementos-citacao", title: { "pt-BR": "Elementos de Citação", en: "Quotation Elements" } },
    { id: 6, slug: "comentarios", title: { "pt-BR": "Comentários", en: "Comments" } },
    { id: 7, slug: "links", title: { "pt-BR": "Links", en: "Links" } },
    { id: 8, slug: "imagens", title: { "pt-BR": "Tudo Sobre Imagens", en: "All About Images" } },
    { id: 9, slug: "tabelas", title: { "pt-BR": "Tabelas", en: "Tables" } },
    { id: 10, slug: "listas", title: { "pt-BR": "Listas", en: "Lists" } },
    { id: 11, slug: "iframes", title: { "pt-BR": "iframes", en: "iframes" } },
    { id: 12, slug: "formularios", title: { "pt-BR": "Formulários", en: "Forms" } },
    { id: 13, slug: "audio", title: { "pt-BR": "Áudio", en: "Audio" } },
    { id: 14, slug: "videos", title: { "pt-BR": "Vídeos", en: "Videos" } },
    { id: 15, slug: "div-html-semantico", title: { "pt-BR": "Div e HTML Semântico", en: "Div and Semantic HTML" } }
];

// Track with lessons grouped
const TRACK = {
    slug: "html-fundamentals",
    title: { "pt-BR": "Fundamentos de HTML", en: "HTML Fundamentals" },
    icon: "📄",
    lessons: LESSONS
};

// Helper to convert question type
function convertType(type: string): string {
    const typeMap: Record<string, string> = {
        'multiple_choice': 'multiple_choice',
        'true_false': 'true_false',
        'fill': 'fill',
        'code': 'code'
    };
    return typeMap[type] || type;
}

// Helper to extract and convert options
function convertOptions(options: any[]): { "pt-BR": string[]; en: string[] } | undefined {
    if (!options || !Array.isArray(options)) return undefined;

    const ptBROptions = options.map(opt =>
        typeof opt === 'string' ? opt : (opt.text || '')
    );

    // For now, use PT-BR for both (translation can be added later)
    return {
        "pt-BR": ptBROptions,
        en: ptBROptions // Placeholder for English translation
    };
}

// Convert a single question
function convertQuestion(q: any, lessonId: number, index: number) {
    const id = `lesson-${lessonId}-q-${index + 1}`;

    return {
        id,
        lessonId: `lesson-${lessonId}`,
        type: convertType(q.type),
        question: {
            "pt-BR": q.question,
            en: q.question // Placeholder for English
        },
        options: q.options ? convertOptions(q.options) : undefined,
        answer: q.answer,
        acceptedAnswers: q.acceptedAnswers || undefined,
        explanation: q.explanation ? {
            "pt-BR": q.explanation,
            en: q.explanation // Placeholder for English
        } : undefined,
        difficulty: 2 // Default medium difficulty
    };
}

// Generate exported content
export function generateContentFiles() {
    console.log('Generating content files...');
    console.log(`Track: ${TRACK.title["pt-BR"]}`);
    console.log(`Lessons: ${TRACK.lessons.length}`);

    return {
        track: TRACK,
        lessons: LESSONS
    };
}

// Export type for questions
export type Question = {
    id: string;
    lessonId: string;
    type: 'multiple_choice' | 'true_false' | 'fill' | 'code';
    question: { "pt-BR": string; en: string };
    options?: { "pt-BR": string[]; en: string[] };
    answer: string | boolean | string[];
    acceptedAnswers?: string[];
    explanation?: { "pt-BR": string; en: string };
    difficulty: 1 | 2 | 3 | 4 | 5;
};

export type Lesson = {
    id: number;
    slug: string;
    title: { "pt-BR": string; en: string };
};

export type Track = {
    slug: string;
    title: { "pt-BR": string; en: string };
    icon: string;
    lessons: Lesson[];
};

console.log("Content migration script created!");
console.log("This script will help convert the existing 15 lessons to the new format.");
