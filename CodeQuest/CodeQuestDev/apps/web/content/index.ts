// CodeQuest - Content Index (Expanded + Interactive Questions)
export * from './lessons';
export * from './questions-basics';
export * from './questions-structure';
export * from './questions-forms';
export * from './questions-advanced';
export * from './questions-interactive';

// Question bank mapping for lessons
import {
    BASICS_INTRO_QUESTIONS,
    BASICS_ELEMENTS_QUESTIONS,
    BASICS_ATTRIBUTES_QUESTIONS,
    BASICS_HEADINGS_QUESTIONS,
    BASICS_FORMATTING_QUESTIONS,
} from './questions-basics';

import {
    BASICS_LINKS_QUESTIONS,
    BASICS_IMAGES_QUESTIONS,
    STRUCTURE_LISTS_QUESTIONS,
    STRUCTURE_TABLES_QUESTIONS,
    STRUCTURE_DIVSPAN_QUESTIONS,
    STRUCTURE_CLASSID_QUESTIONS,
} from './questions-structure';

import {
    FORMS_BASICS_QUESTIONS,
    FORMS_INPUTS_QUESTIONS,
    FORMS_VALIDATION_QUESTIONS,
    SEMANTICS_ELEMENTS_QUESTIONS,
    SEMANTICS_ACCESSIBILITY_QUESTIONS,
} from './questions-forms';

import {
    MEDIA_VIDEO_QUESTIONS,
    MEDIA_SVG_QUESTIONS,
    ADVANCED_CANVAS_QUESTIONS,
    ADVANCED_STORAGE_QUESTIONS,
} from './questions-advanced';

import {
    FILL_BLANK_BASICS,
    FILL_BLANK_STRUCTURE,
    FILL_BLANK_FORMS,
    CODE_FIX_QUESTIONS,
    TRUE_FALSE_QUESTIONS,
    EXTRA_BASICS_QUESTIONS,
    EXTRA_FORMS_QUESTIONS,
    EXTRA_MEDIA_QUESTIONS,
    EXTRA_ADVANCED_QUESTIONS,
} from './questions-interactive';

// Map lesson IDs to expanded question banks (with interactive questions mixed in)
export const EXPANDED_QUESTIONS: Record<string, import('./lessons').QuizQuestion[]> = {
    // Module: Basics - now with more questions (8-10 per lesson)
    'basics:intro': [...BASICS_INTRO_QUESTIONS, ...FILL_BLANK_BASICS.slice(0, 2), ...TRUE_FALSE_QUESTIONS.slice(0, 2)],
    'basics:elements': [...BASICS_ELEMENTS_QUESTIONS, ...CODE_FIX_QUESTIONS.slice(0, 2), ...EXTRA_BASICS_QUESTIONS.slice(0, 2)],
    'basics:attributes': [...BASICS_ATTRIBUTES_QUESTIONS, ...FILL_BLANK_BASICS.slice(2, 4), ...TRUE_FALSE_QUESTIONS.slice(2, 3)],
    'basics:headings': [...BASICS_HEADINGS_QUESTIONS, ...EXTRA_BASICS_QUESTIONS.slice(2, 4)],
    'basics:formatting': [...BASICS_FORMATTING_QUESTIONS, ...TRUE_FALSE_QUESTIONS.slice(3, 5)],
    'basics:links': [...BASICS_LINKS_QUESTIONS, ...CODE_FIX_QUESTIONS.slice(2, 3)],
    'basics:images': [...BASICS_IMAGES_QUESTIONS, ...TRUE_FALSE_QUESTIONS.slice(5, 6), ...EXTRA_MEDIA_QUESTIONS.slice(3, 4)],

    // Module: Structure - with interactive
    'structure:lists': [...STRUCTURE_LISTS_QUESTIONS, ...FILL_BLANK_STRUCTURE.slice(0, 2)],
    'structure:tables': [...STRUCTURE_TABLES_QUESTIONS, ...FILL_BLANK_STRUCTURE.slice(1, 3)],
    'structure:divs-spans': [...STRUCTURE_DIVSPAN_QUESTIONS, ...CODE_FIX_QUESTIONS.slice(4, 5)],
    'structure:classes-ids': [...STRUCTURE_CLASSID_QUESTIONS, ...FILL_BLANK_STRUCTURE.slice(2, 4), ...TRUE_FALSE_QUESTIONS.slice(2, 3)],

    // Module: Forms - with interactive
    'forms:form-basics': [...FORMS_BASICS_QUESTIONS, ...FILL_BLANK_FORMS, ...CODE_FIX_QUESTIONS.slice(5, 6)],
    'forms:input-types': [...FORMS_INPUTS_QUESTIONS, ...EXTRA_FORMS_QUESTIONS.slice(0, 3)],
    'forms:form-validation': [...FORMS_VALIDATION_QUESTIONS, ...EXTRA_FORMS_QUESTIONS.slice(3, 5), ...TRUE_FALSE_QUESTIONS.slice(6, 7)],

    // Module: Semantics - with interactive
    'semantics:semantic-elements': [...SEMANTICS_ELEMENTS_QUESTIONS, ...CODE_FIX_QUESTIONS.slice(4, 5), ...TRUE_FALSE_QUESTIONS.slice(1, 2)],
    'semantics:accessibility': [...SEMANTICS_ACCESSIBILITY_QUESTIONS, ...CODE_FIX_QUESTIONS.slice(3, 4), ...TRUE_FALSE_QUESTIONS.slice(4, 5)],

    // Module: Media - with interactive
    'media:video-audio': [...MEDIA_VIDEO_QUESTIONS, ...EXTRA_MEDIA_QUESTIONS.slice(0, 3), ...TRUE_FALSE_QUESTIONS.slice(5, 6)],
    'media:svg': [...MEDIA_SVG_QUESTIONS, ...EXTRA_MEDIA_QUESTIONS.slice(4, 5), ...TRUE_FALSE_QUESTIONS.slice(7, 8)],

    // Module: Advanced - with interactive
    'advanced:canvas': [...ADVANCED_CANVAS_QUESTIONS, ...EXTRA_ADVANCED_QUESTIONS.slice(0, 3)],
    'advanced:web-storage': [...ADVANCED_STORAGE_QUESTIONS, ...EXTRA_ADVANCED_QUESTIONS.slice(3, 5)],
};

// Get questions for a lesson (uses expanded bank if available)
export function getQuestionsForLesson(
    moduleId: string,
    lessonId: string
): import('./lessons').QuizQuestion[] {
    const key = `${moduleId}:${lessonId}`;
    return EXPANDED_QUESTIONS[key] || [];
}

// Get total question count
export function getTotalExpandedQuestions(): number {
    return Object.values(EXPANDED_QUESTIONS).reduce(
        (total, questions) => total + questions.length,
        0
    );
}

// Get questions by type
export function getQuestionsByType(type: string): import('./lessons').QuizQuestion[] {
    return Object.values(EXPANDED_QUESTIONS)
        .flat()
        .filter(q => q.type === type);
}
