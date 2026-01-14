// CodeQuest - HTML Validator Page
// Validates HTML code and provides feedback

'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeEditor, ValidationFeedback } from '@/components/editor';
import { validateHTML, type ValidationResult } from '@/lib/html-validator';

export default function ValidatorPage() {
    const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

    const exampleCode = `<!DOCTYPE html>
<html>
<head>
  <title>Minha Página</title>
</head>
<body>
  <h1>Olá, Mundo!</h1>
  <p>Este é um exemplo de HTML válido.</p>
</body>
</html>`;

    const handleCodeChange = useCallback((code: string) => {
        // Debounce validation to avoid too many calls
        const result = validateHTML(code);
        setValidationResult(result);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 flex items-center gap-3">
                            <span className="text-5xl filter drop-shadow-[4px_4px_0px_#000000]">🔍</span>
                            Validador HTML
                        </h1>
                        <p className="text-muted-foreground font-medium text-lg">
                            Escreva código HTML e receba feedback em tempo real
                        </p>
                    </div>
                    <Link href="/dashboard">
                        <Button variant="outline" className="border-2 border-black font-bold uppercase">← Voltar</Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Editor (2/3 width) */}
                    <div className="lg:col-span-2">
                        <div className="border-2 border-black dark:border-zinc-700 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-sm neo-shadow">
                            <div className="bg-white dark:bg-zinc-950 border-2 border-black dark:border-zinc-700">
                                <CodeEditor
                                    initialCode={exampleCode}
                                    height="600px"
                                    layout="split"
                                    showPreview={true}
                                    onCodeChange={handleCodeChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Validation Feedback (1/3 width) */}
                    <div className="space-y-6">
                        <div className="border-2 border-black dark:border-zinc-700 neo-shadow-sm bg-white dark:bg-zinc-900">
                            <ValidationFeedback
                                result={validationResult}
                                locale="pt-BR"
                            />
                        </div>

                        {/* Tips Section */}
                        <div className="bg-zinc-50 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-sm p-6 neo-shadow-sm">
                            <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                                💡 Dicas Essenciais
                            </h2>
                            <ul className="space-y-3">
                                <li className="flex gap-3 items-start">
                                    <span className="text-green-600 dark:text-green-400 font-black text-lg">✓</span>
                                    <span className="font-medium">Sempre comece com <code className="px-1 bg-black text-white text-xs font-bold rounded-none">&lt;!DOCTYPE html&gt;</code></span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-green-600 dark:text-green-400 font-black text-lg">✓</span>
                                    <span className="font-medium">Feche todas as tags abertas corretamente</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-green-600 dark:text-green-400 font-black text-lg">✓</span>
                                    <span className="font-medium">Adicione <code className="px-1 bg-black text-white text-xs font-bold rounded-none">alt</code> em todas as imagens</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-green-600 dark:text-green-400 font-black text-lg">✓</span>
                                    <span className="font-medium">Use apenas um <code className="px-1 bg-black text-white text-xs font-bold rounded-none">&lt;h1&gt;</code> por página</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <span className="text-green-600 dark:text-green-400 font-black text-lg">✓</span>
                                    <span className="font-medium">Inclua <code className="px-1 bg-black text-white text-xs font-bold rounded-none">&lt;title&gt;</code> no <code className="px-1 bg-black text-white text-xs font-bold rounded-none">&lt;head&gt;</code></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
