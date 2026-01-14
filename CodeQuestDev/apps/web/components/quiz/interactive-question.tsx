// CodeQuest - Interactive Question Component
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/content/lessons';

interface InteractiveQuestionProps {
    question: QuizQuestion;
    onAnswer: (isCorrect: boolean, points: number) => void;
    disabled?: boolean;
}

export function InteractiveQuestion({ question, onAnswer, disabled }: InteractiveQuestionProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleMultipleChoice = (index: number) => {
        if (showExplanation || disabled) return;

        setSelectedAnswer(index);
        const correct = index === question.correctAnswer;
        setIsCorrect(correct);
        setShowExplanation(true);
        onAnswer(correct, correct ? question.points : 0);
    };

    const handleFillBlank = () => {
        if (showExplanation || disabled) return;

        const userAnswer = textAnswer.trim().toLowerCase();
        const correctAnswerStr = String(question.correctAnswer).toLowerCase();
        const correct = userAnswer === correctAnswerStr;

        setIsCorrect(correct);
        setShowExplanation(true);
        onAnswer(correct, correct ? question.points : 0);
    };

    const handleTrueFalse = (index: number) => {
        if (showExplanation || disabled) return;

        setSelectedAnswer(index);
        const correct = index === question.correctAnswer;
        setIsCorrect(correct);
        setShowExplanation(true);
        onAnswer(correct, correct ? question.points : 0);
    };

    // Render based on question type
    switch (question.type) {
        case 'fill-blank':
            return (
                <div className="space-y-4">
                    {/* Question */}
                    <Card className="bg-white/10 border-white/20">
                        <CardContent className="py-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">
                                    ✏️ Preencha
                                </span>
                            </div>
                            <p className="text-xl font-medium text-center font-mono">{question.question}</p>
                            {question.code && (
                                <pre className="bg-black/30 rounded-lg p-4 mt-4 text-sm overflow-x-auto">
                                    <code>{question.code}</code>
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    {/* Input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            disabled={showExplanation || disabled}
                            placeholder="Digite sua resposta..."
                            className={cn(
                                'flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30',
                                showExplanation && isCorrect && 'border-green-400 bg-green-500/20',
                                showExplanation && !isCorrect && 'border-red-400 bg-red-500/20'
                            )}
                            onKeyDown={(e) => e.key === 'Enter' && handleFillBlank()}
                        />
                        {!showExplanation && (
                            <Button
                                onClick={handleFillBlank}
                                disabled={!textAnswer.trim() || disabled}
                                className="bg-white text-indigo-700 hover:bg-white/90"
                            >
                                Verificar
                            </Button>
                        )}
                    </div>

                    {/* Feedback */}
                    {showExplanation && (
                        <Card className={cn(
                            isCorrect ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'
                        )}>
                            <CardContent className="py-4">
                                <p className="font-semibold mb-1">
                                    {isCorrect ? '✅ Correto!' : `❌ Incorreto - Resposta: ${question.correctAnswer}`}
                                </p>
                                <p className="text-sm opacity-90">{question.explanation}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            );

        case 'code-fix':
            return (
                <div className="space-y-4">
                    {/* Question */}
                    <Card className="bg-white/10 border-white/20">
                        <CardContent className="py-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded text-xs">
                                    🔧 Encontre o erro
                                </span>
                            </div>
                            <p className="text-xl font-medium text-center">{question.question}</p>
                            {question.code && (
                                <pre className="bg-black/50 rounded-lg p-4 mt-4 text-sm overflow-x-auto border-2 border-dashed border-orange-400/50">
                                    <code className="text-orange-200">{question.code}</code>
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    {/* Options */}
                    <div className="space-y-2">
                        {question.options?.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isOptionCorrect = index === question.correctAnswer;

                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    disabled={showExplanation || disabled}
                                    className={cn(
                                        'w-full py-5 px-4 text-left justify-start border-white/20 hover:bg-white/10',
                                        showExplanation && isOptionCorrect && 'bg-green-500/30 border-green-400',
                                        showExplanation && isSelected && !isOptionCorrect && 'bg-red-500/30 border-red-400'
                                    )}
                                    onClick={() => handleMultipleChoice(index)}
                                >
                                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Feedback */}
                    {showExplanation && (
                        <Card className={cn(
                            isCorrect ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'
                        )}>
                            <CardContent className="py-4">
                                <p className="font-semibold mb-1">{isCorrect ? '✅ Correto!' : '❌ Incorreto'}</p>
                                <p className="text-sm opacity-90">{question.explanation}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            );

        case 'true-false':
            return (
                <div className="space-y-4">
                    {/* Question */}
                    <Card className="bg-white/10 border-white/20">
                        <CardContent className="py-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">
                                    ❓ Verdadeiro ou Falso
                                </span>
                            </div>
                            <p className="text-xl font-medium text-center">{question.question}</p>
                            {question.code && (
                                <pre className="bg-black/30 rounded-lg p-4 mt-4 text-sm overflow-x-auto">
                                    <code>{question.code}</code>
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    {/* True/False Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        {['Verdadeiro', 'Falso'].map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isOptionCorrect = index === question.correctAnswer;

                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    disabled={showExplanation || disabled}
                                    className={cn(
                                        'py-8 text-lg font-medium border-white/20 hover:bg-white/10',
                                        index === 0 && 'hover:bg-green-500/20 hover:border-green-400',
                                        index === 1 && 'hover:bg-red-500/20 hover:border-red-400',
                                        showExplanation && isOptionCorrect && 'bg-green-500/30 border-green-400',
                                        showExplanation && isSelected && !isOptionCorrect && 'bg-red-500/30 border-red-400'
                                    )}
                                    onClick={() => handleTrueFalse(index)}
                                >
                                    {index === 0 ? '✅' : '❌'} {option}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Feedback */}
                    {showExplanation && (
                        <Card className={cn(
                            isCorrect ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'
                        )}>
                            <CardContent className="py-4">
                                <p className="font-semibold mb-1">{isCorrect ? '✅ Correto!' : '❌ Incorreto'}</p>
                                <p className="text-sm opacity-90">{question.explanation}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            );

        // Default: multiple-choice
        default:
            return (
                <div className="space-y-4">
                    {/* Question */}
                    <Card className="bg-white/10 border-white/20">
                        <CardContent className="py-6">
                            <p className="text-xl font-medium text-center">{question.question}</p>
                            {question.code && (
                                <pre className="bg-black/30 rounded-lg p-4 mt-4 text-sm overflow-x-auto">
                                    <code>{question.code}</code>
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    {/* Options */}
                    <div className="space-y-2">
                        {question.options?.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isOptionCorrect = index === question.correctAnswer;

                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    disabled={showExplanation || disabled}
                                    className={cn(
                                        'w-full py-5 px-4 text-left justify-start border-white/20 hover:bg-white/10',
                                        showExplanation && isOptionCorrect && 'bg-green-500/30 border-green-400',
                                        showExplanation && isSelected && !isOptionCorrect && 'bg-red-500/30 border-red-400'
                                    )}
                                    onClick={() => handleMultipleChoice(index)}
                                >
                                    <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                                    <code className="text-sm">{option}</code>
                                </Button>
                            );
                        })}
                    </div>

                    {/* Feedback */}
                    {showExplanation && (
                        <Card className={cn(
                            isCorrect ? 'bg-green-500/20 border-green-400' : 'bg-red-500/20 border-red-400'
                        )}>
                            <CardContent className="py-4">
                                <p className="font-semibold mb-1">{isCorrect ? '✅ Correto!' : '❌ Incorreto'}</p>
                                <p className="text-sm opacity-90">{question.explanation}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            );
    }
}
