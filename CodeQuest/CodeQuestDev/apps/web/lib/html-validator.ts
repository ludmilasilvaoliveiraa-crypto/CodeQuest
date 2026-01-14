// CodeQuest - HTML Validator Service
// Provides feedback on HTML code errors and suggestions

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationMessage {
    line: number;
    column: number;
    severity: ValidationSeverity;
    message: string;
    suggestion?: string;
    rule: string;
}

export interface ValidationResult {
    valid: boolean;
    messages: ValidationMessage[];
    score: number; // 0-100
}

// Common HTML validation rules
const VALIDATION_RULES = {
    // Structure errors
    missingDoctype: {
        pattern: /^(?!\s*<!DOCTYPE html)/i,
        severity: 'error' as const,
        message: 'Missing <!DOCTYPE html> declaration',
        suggestion: 'Add <!DOCTYPE html> at the beginning of your document',
        rule: 'doctype-required'
    },
    missingHtml: {
        pattern: /<html/i,
        check: 'missing',
        severity: 'error' as const,
        message: 'Missing <html> tag',
        suggestion: 'Wrap your content in <html></html> tags',
        rule: 'html-required'
    },
    missingHead: {
        pattern: /<head/i,
        check: 'missing',
        severity: 'warning' as const,
        message: 'Missing <head> section',
        suggestion: 'Add a <head> section for metadata, title, and styles',
        rule: 'head-required'
    },
    missingBody: {
        pattern: /<body/i,
        check: 'missing',
        severity: 'error' as const,
        message: 'Missing <body> tag',
        suggestion: 'Wrap your visible content in <body></body> tags',
        rule: 'body-required'
    },
    missingTitle: {
        pattern: /<title/i,
        check: 'missing',
        severity: 'warning' as const,
        message: 'Missing <title> tag',
        suggestion: 'Add a <title> tag inside <head> for better SEO and accessibility',
        rule: 'title-required'
    },
    missingAlt: {
        pattern: /<img[^>]*(?!alt=)[^>]*>/gi,
        severity: 'warning' as const,
        message: 'Image missing alt attribute',
        suggestion: 'Add alt="description" for accessibility',
        rule: 'img-alt-required'
    },
    // Common mistakes
    unclosedTag: {
        tags: ['div', 'p', 'span', 'a', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'form', 'section', 'article', 'header', 'footer', 'nav', 'main'],
        severity: 'error' as const,
        message: 'Unclosed HTML tag',
        suggestion: 'Make sure to close the tag with </$TAG>',
        rule: 'tag-closure'
    },
    deprecatedTags: {
        tags: ['font', 'center', 'marquee', 'blink', 'frame', 'frameset'],
        severity: 'warning' as const,
        message: 'Deprecated HTML tag',
        suggestion: 'Use CSS for styling instead of deprecated tags',
        rule: 'no-deprecated'
    },
    inlineStyles: {
        pattern: /style\s*=\s*["'][^"']+["']/gi,
        threshold: 3,
        severity: 'info' as const,
        message: 'Consider using external CSS instead of inline styles',
        suggestion: 'Move styles to a <style> block or external stylesheet',
        rule: 'prefer-external-css'
    }
};

// Find line number for a match
function getLineNumber(code: string, index: number): number {
    return code.substring(0, index).split('\n').length;
}

// Check for unclosed tags
function checkUnclosedTags(code: string): ValidationMessage[] {
    const messages: ValidationMessage[] = [];
    const tagStack: { tag: string; line: number; index: number }[] = [];

    // Simple tag matching (not a full parser, but good for feedback)
    const openTagRegex = /<([a-z][a-z0-9]*)\b[^>]*(?<!\/)\s*>/gi;
    const closeTagRegex = /<\/([a-z][a-z0-9]*)\s*>/gi;
    const selfClosingTags = ['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col', 'embed', 'param', 'source', 'track', 'wbr'];

    let match;
    const tags: { type: 'open' | 'close'; tag: string; index: number }[] = [];

    // Collect all tags
    while ((match = openTagRegex.exec(code)) !== null) {
        const tag = (match[1] || '').toLowerCase();
        if (!selfClosingTags.includes(tag)) {
            tags.push({ type: 'open', tag, index: match.index });
        }
    }

    while ((match = closeTagRegex.exec(code)) !== null) {
        tags.push({ type: 'close', tag: (match[1] || '').toLowerCase(), index: match.index });
    }

    // Sort by position
    tags.sort((a, b) => a.index - b.index);

    // Check for unclosed tags
    for (const item of tags) {
        if (item.type === 'open') {
            tagStack.push({ tag: item.tag, line: getLineNumber(code, item.index), index: item.index });
        } else {
            const lastOpen = tagStack.pop();
            if (!lastOpen) {
                messages.push({
                    line: getLineNumber(code, item.index),
                    column: 1,
                    severity: 'error',
                    message: `Unexpected closing tag </${item.tag}>`,
                    suggestion: `Remove this tag or add a matching opening tag`,
                    rule: 'tag-closure'
                });
            } else if (lastOpen.tag !== item.tag) {
                messages.push({
                    line: lastOpen.line,
                    column: 1,
                    severity: 'error',
                    message: `Tag <${lastOpen.tag}> was not properly closed`,
                    suggestion: `Close it with </${lastOpen.tag}> before </${item.tag}>`,
                    rule: 'tag-closure'
                });
                tagStack.push(lastOpen); // Put it back
            }
        }
    }

    // Remaining unclosed tags
    for (const unclosed of tagStack) {
        messages.push({
            line: unclosed.line,
            column: 1,
            severity: 'error',
            message: `Unclosed tag <${unclosed.tag}>`,
            suggestion: `Add </${unclosed.tag}> to close this tag`,
            rule: 'tag-closure'
        });
    }

    return messages;
}

// Main validation function
export function validateHTML(code: string): ValidationResult {
    const messages: ValidationMessage[] = [];

    // Check DOCTYPE
    if (!code.trim().toLowerCase().startsWith('<!doctype html>')) {
        messages.push({
            line: 1,
            column: 1,
            severity: 'error',
            message: VALIDATION_RULES.missingDoctype.message,
            suggestion: VALIDATION_RULES.missingDoctype.suggestion,
            rule: VALIDATION_RULES.missingDoctype.rule
        });
    }

    // Check required tags
    if (!/<html/i.test(code)) {
        messages.push({
            line: 1,
            column: 1,
            severity: 'error',
            message: VALIDATION_RULES.missingHtml.message,
            suggestion: VALIDATION_RULES.missingHtml.suggestion,
            rule: VALIDATION_RULES.missingHtml.rule
        });
    }

    if (!/<head/i.test(code)) {
        messages.push({
            line: 1,
            column: 1,
            severity: 'warning',
            message: VALIDATION_RULES.missingHead.message,
            suggestion: VALIDATION_RULES.missingHead.suggestion,
            rule: VALIDATION_RULES.missingHead.rule
        });
    }

    if (!/<body/i.test(code)) {
        messages.push({
            line: 1,
            column: 1,
            severity: 'error',
            message: VALIDATION_RULES.missingBody.message,
            suggestion: VALIDATION_RULES.missingBody.suggestion,
            rule: VALIDATION_RULES.missingBody.rule
        });
    }

    if (!/<title/i.test(code)) {
        messages.push({
            line: 1,
            column: 1,
            severity: 'warning',
            message: VALIDATION_RULES.missingTitle.message,
            suggestion: VALIDATION_RULES.missingTitle.suggestion,
            rule: VALIDATION_RULES.missingTitle.rule
        });
    }

    // Check for images without alt
    const imgWithoutAlt = code.match(/<img(?![^>]*alt=)[^>]*>/gi);
    if (imgWithoutAlt) {
        for (const img of imgWithoutAlt) {
            const index = code.indexOf(img);
            messages.push({
                line: getLineNumber(code, index),
                column: 1,
                severity: 'warning',
                message: VALIDATION_RULES.missingAlt.message,
                suggestion: VALIDATION_RULES.missingAlt.suggestion,
                rule: VALIDATION_RULES.missingAlt.rule
            });
        }
    }

    // Check for deprecated tags
    for (const tag of VALIDATION_RULES.deprecatedTags.tags) {
        const regex = new RegExp(`<${tag}[\\s>]`, 'gi');
        let match;
        while ((match = regex.exec(code)) !== null) {
            messages.push({
                line: getLineNumber(code, match.index),
                column: 1,
                severity: 'warning',
                message: `Deprecated tag <${tag}> found`,
                suggestion: VALIDATION_RULES.deprecatedTags.suggestion,
                rule: VALIDATION_RULES.deprecatedTags.rule
            });
        }
    }

    // Check for unclosed tags
    messages.push(...checkUnclosedTags(code));

    // Calculate score
    const errorCount = messages.filter(m => m.severity === 'error').length;
    const warningCount = messages.filter(m => m.severity === 'warning').length;
    const infoCount = messages.filter(m => m.severity === 'info').length;

    let score = 100;
    score -= errorCount * 15; // -15 per error
    score -= warningCount * 5; // -5 per warning
    score -= infoCount * 1; // -1 per info
    score = Math.max(0, score);

    return {
        valid: errorCount === 0,
        messages: messages.sort((a, b) => a.line - b.line),
        score
    };
}

// Get feedback message based on score
export function getScoreFeedback(score: number, locale: 'pt-BR' | 'en' = 'pt-BR'): string {
    const feedback = {
        'pt-BR': {
            perfect: '🎉 Código perfeito! Nenhum erro encontrado.',
            excellent: '⭐ Excelente! Apenas pequenos ajustes recomendados.',
            good: '👍 Bom trabalho! Alguns pontos a melhorar.',
            needsWork: '📝 Precisa de atenção. Revise os erros indicados.',
            critical: '⚠️ Vários problemas encontrados. Corrija os erros.'
        },
        'en': {
            perfect: '🎉 Perfect code! No errors found.',
            excellent: '⭐ Excellent! Just minor adjustments recommended.',
            good: '👍 Good job! Some points to improve.',
            needsWork: '📝 Needs attention. Review the indicated errors.',
            critical: '⚠️ Several issues found. Fix the errors.'
        }
    };

    const fb = feedback[locale];

    if (score === 100) return fb.perfect;
    if (score >= 85) return fb.excellent;
    if (score >= 70) return fb.good;
    if (score >= 50) return fb.needsWork;
    return fb.critical;
}
