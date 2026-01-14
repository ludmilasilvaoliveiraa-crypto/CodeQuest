// CodeQuest - Question Card Component
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Question, QuestionType, Locale } from '@repo/shared';
import { QUESTION_TYPES, DIFFICULTY_LABELS } from '@repo/shared';

interface QuestionCardProps {
    question: Question;
    locale: Locale;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (answer: string | boolean | string[]) => void;
    showResult?: boolean;
    isCorrect?: boolean;
}

export function QuestionCard({
    question,
    locale,
    questionNumber,
    totalQuestions,
    onAnswer,
    showResult = false,
    isCorrect,
}: QuestionCardProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');

    const questionType = QUESTION_TYPES[question.type];
    const difficulty = DIFFICULTY_LABELS[question.difficulty];

    const handleSubmit = () => {
        if (question.type === 'fill' || question.type === 'code') {
            onAnswer(userInput);
        } else if (selectedAnswer !== null) {
            if (question.type === 'true_false') {
                onAnswer(selectedAnswer === 'true');
            } else {
                onAnswer(selectedAnswer);
            }
        }
    };

    return (
        <Card className={cn(
            'animate-slide-up border-2 border-black dark:border-zinc-700 neo-shadow',
            showResult && isCorrect && 'border-black bg-primary/20',
            showResult && !isCorrect && 'border-black bg-red-100 dark:bg-red-900/20'
        )}>
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b-2 border-black dark:border-zinc-700">
                <div className="flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow-sm">{questionType.icon}</span>
                    <Badge variant="outline" className="border-2 border-black dark:border-zinc-500 bg-white dark:bg-zinc-800 uppercase font-bold">
                        {questionType.label[locale]}
                    </Badge>
                    <Badge
                        variant="secondary"
                        className="border-2 border-black dark:border-zinc-500 font-bold uppercase"
                        style={{ backgroundColor: 'white', color: 'black' }}
                    >
                        {difficulty[locale]}
                    </Badge>
                </div>
                <span className="font-mono font-bold text-lg">
                    {questionNumber} / {totalQuestions}
                </span>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
                <CardTitle className="text-xl font-black uppercase leading-tight tracking-tight">
                    {question.question[locale]}
                </CardTitle>

                {/* Multiple Choice Options */}
                {question.type === 'multiple_choice' && question.options && (
                    <div className="space-y-3">
                        {question.options[locale]?.map((option, index) => {
                            const letter = String.fromCharCode(65 + index); // A, B, C, D
                            const isSelected = selectedAnswer === letter;

                            return (
                                <button
                                    key={index}
                                    onClick={() => !showResult && setSelectedAnswer(letter)}
                                    disabled={showResult}
                                    className={cn(
                                        'w-full flex items-center gap-4 p-4 border-2 border-black dark:border-zinc-700 transition-all text-left neo-shadow-sm',
                                        'hover:-translate-y-1 hover:bg-black hover:text-white',
                                        isSelected && !showResult && 'bg-black text-white translate-y-0.5 shadow-none',
                                        showResult && question.answer === letter && 'bg-primary text-black border-black',
                                        showResult && isSelected && question.answer !== letter && 'bg-white text-gray-400 border-gray-400 line-through',
                                        showResult && 'cursor-default hover:translate-y-0 hover:bg-inherit hover:text-inherit'
                                    )}
                                >
                                    <span className={cn(
                                        'w-8 h-8 flex items-center justify-center font-black text-sm border-2 border-current',
                                        isSelected ? 'bg-primary text-black border-black' : 'bg-transparent'
                                    )}>
                                        {letter}
                                    </span>
                                    <span className="flex-1 font-medium">{option}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* True/False Options */}
                {question.type === 'true_false' && (
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { value: 'true', label: locale === 'pt-BR' ? 'VERDADEIRO' : 'TRUE', icon: '👍', color: 'green' },
                            { value: 'false', label: locale === 'pt-BR' ? 'FALSO' : 'FALSE', icon: '👎', color: 'red' }
                        ].map((opt) => {
                            const isSelected = selectedAnswer === opt.value;
                            const isCorrectAnswer = String(question.answer) === opt.value;

                            return (
                                <button
                                    key={opt.value}
                                    onClick={() => !showResult && setSelectedAnswer(opt.value)}
                                    disabled={showResult}
                                    className={cn(
                                        'p-6 border-2 border-black dark:border-zinc-700 transition-all flex flex-col items-center gap-2 neo-shadow-sm',
                                        'hover:-translate-y-1 hover:bg-black hover:text-white',
                                        isSelected && !showResult && 'bg-black text-white translate-y-0.5 shadow-none',
                                        showResult && isCorrectAnswer && 'bg-primary text-black border-black',
                                        showResult && isSelected && !isCorrectAnswer && 'bg-white text-gray-400 border-gray-400 line-through'
                                    )}
                                >
                                    <span className="text-4xl mb-2">{opt.icon}</span>
                                    <span className="font-black uppercase tracking-widest">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* Fill in the blank */}
                {question.type === 'fill' && (
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={showResult}
                        placeholder={locale === 'pt-BR' ? 'DIGITE SUA RESPOSTA...' : 'TYPE YOUR ANSWER...'}
                        className={cn(
                            'w-full p-4 border-2 border-black bg-white dark:bg-zinc-900 font-mono text-lg uppercase neo-shadow-sm',
                            'focus:outline-none focus:ring-0 focus:translate-y-1 focus:shadow-none transition-all',
                            showResult && isCorrect && 'border-primary bg-primary/10',
                            showResult && !isCorrect && 'border-red-500 bg-red-50'
                        )}
                    />
                )}

                {/* Submit Button */}
                {!showResult && (
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            (question.type === 'multiple_choice' && !selectedAnswer) ||
                            (question.type === 'true_false' && !selectedAnswer) ||
                            (question.type === 'fill' && !userInput.trim()) ||
                            (question.type === 'code' && !userInput.trim())
                        }
                        size="lg"
                        className="w-full text-lg font-black uppercase tracking-wider"
                    >
                        {locale === 'pt-BR' ? 'Verificar Resposta' : 'Check Answer'}
                    </Button>
                )}

                {/* Result Feedback */}
                {showResult && (
                    <div className={cn(
                        'p-6 border-2 border-black neo-shadow-sm',
                        isCorrect ? 'bg-primary text-black' : 'bg-white text-black'
                    )}>
                        <p className="font-black text-2xl uppercase mb-2">
                            {isCorrect
                                ? (locale === 'pt-BR' ? '🎉 Resposta Correta!' : '🎉 Correct Answer!')
                                : (locale === 'pt-BR' ? '💀 Resposta Incorreta' : '💀 Incorrect Answer')}
                        </p>
                        {question.explanation && (
                            <p className="font-medium text-lg leading-snug">
                                {question.explanation[locale]}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
