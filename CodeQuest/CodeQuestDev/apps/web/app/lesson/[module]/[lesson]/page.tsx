// CodeQuest - Individual Lesson Page
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getModuleById, getLessonById, type Lesson, type QuizQuestion } from '@/content/lessons';
import { getQuestionsForLesson } from '@/content';
import { InteractiveQuestion } from '@/components/quiz';

type LessonPhase = 'reading' | 'quiz' | 'complete';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const moduleId = params.module as string;
    const lessonId = params.lesson as string;

    const [phase, setPhase] = useState<LessonPhase>('reading');
    const [currentSection, setCurrentSection] = useState(0);
    const [quizIndex, setQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    const module = getModuleById(moduleId);
    const lesson = getLessonById(moduleId, lessonId);

    useEffect(() => {
        // Scroll to top when changing sections
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentSection, phase]);

    if (!module || !lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card>
                    <CardContent className="py-8 text-center">
                        <span className="text-4xl block mb-4">❌</span>
                        <h2 className="text-xl font-bold mb-2">Lição não encontrada</h2>
                        <Link href="/learn">
                            <Button>Voltar às Lições</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const sections = lesson.content.sections;
    // Use expanded questions if available, otherwise fallback to lesson's quiz
    const expandedQuestions = getQuestionsForLesson(moduleId, lessonId);
    const quiz = expandedQuestions.length > 0 ? expandedQuestions : lesson.quiz;

    const handleNextSection = () => {
        if (currentSection < sections.length - 1) {
            setCurrentSection(prev => prev + 1);
        } else {
            setPhase('quiz');
        }
    };

    const handlePrevSection = () => {
        if (currentSection > 0) {
            setCurrentSection(prev => prev - 1);
        }
    };

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;

        const question = quiz[quizIndex];
        if (!question) return;

        setSelectedAnswer(index);
        const isCorrect = index === question.correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + question.points);
            setStreak(prev => prev + 1);
        } else {
            setStreak(0);
        }

        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (quizIndex < quiz.length - 1) {
            setQuizIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            completeLesson();
        }
    };

    const completeLesson = () => {
        // Save progress to localStorage
        const stored = localStorage.getItem('codequest-progress');
        const data = stored ? JSON.parse(stored) : { completedLessons: [], xp: 0 };

        const lessonKey = `${moduleId}:${lessonId}`;
        if (!data.completedLessons.includes(lessonKey)) {
            data.completedLessons.push(lessonKey);
            data.xp += lesson.xpReward + score;
        }

        localStorage.setItem('codequest-progress', JSON.stringify(data));
        setPhase('complete');
    };

    // Reading Phase
    if (phase === 'reading') {
        const section = sections[currentSection];
        if (!section) return null;
        const readingProgress = ((currentSection + 1) / sections.length) * 100;

        return (
            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <header className="bg-background border-b-2 border-black dark:border-zinc-700 sticky top-0 z-40">
                    <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/learn" className="flex items-center gap-2 font-bold hover:text-primary transition-colors uppercase">
                            ← {module.name}
                        </Link>
                    </div>
                    <Progress value={readingProgress} className="h-2 rounded-none bg-zinc-100 dark:bg-zinc-800" />
                </header>

                <main className="max-w-4xl mx-auto p-6 pt-10">
                    {/* Lesson Title */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase text-muted-foreground mb-2 tracking-wider">
                            <span>{module.icon} {module.name}</span>
                            <span>/</span>
                            <span>Lição {sections.indexOf(section) + 1}</span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">{lesson.title}</h1>
                        {currentSection === 0 && (
                            <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-medium">{lesson.content.introduction}</p>
                        )}
                    </div>

                    {/* Section Content */}
                    <Card className="mb-8 border-2 border-black dark:border-zinc-700 neo-shadow">
                        <CardHeader className="border-b-2 border-black dark:border-zinc-700 pb-4">
                            <CardTitle className="text-2xl font-black uppercase">{section.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="prose dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">{section.text}</p>
                            </div>

                            {section.code && (
                                <div className="bg-zinc-950 border-2 border-black rounded-sm p-6 overflow-x-auto neo-shadow-sm">
                                    <pre className="text-sm font-mono text-zinc-50">
                                        <code>{section.code}</code>
                                    </pre>
                                </div>
                            )}

                            {section.codeOutput && (
                                <div className="bg-white dark:bg-zinc-900 border-2 border-dashed border-black dark:border-zinc-700 rounded-sm p-6">
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Resultado Preview:</p>
                                    <div dangerouslySetInnerHTML={{ __html: section.codeOutput }} />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Tips & Common Mistakes */}
                    {currentSection === sections.length - 1 && (
                        <div className="grid gap-6 mb-8">
                            {lesson.content.tips && (
                                <Card className="border-2 border-black bg-primary/20 neo-shadow-sm">
                                    <CardContent className="py-6">
                                        <h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2">
                                            💡 Dicas Pro
                                        </h3>
                                        <ul className="space-y-2 font-medium">
                                            {lesson.content.tips.map((tip, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-black font-bold">•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}

                            {lesson.content.commonMistakes && (
                                <Card className="border-2 border-black bg-white dark:bg-zinc-900 neo-shadow-sm">
                                    <CardContent className="py-6">
                                        <h3 className="font-black text-lg uppercase mb-4 flex items-center gap-2 text-red-600 dark:text-red-400">
                                            ⚠️ Cuidado
                                        </h3>
                                        <ul className="space-y-2 font-medium">
                                            {lesson.content.commonMistakes.map((mistake, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-red-500 font-bold">×</span>
                                                    {mistake}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between gap-4 mt-8">
                        <Button
                            variant="outline"
                            onClick={handlePrevSection}
                            disabled={currentSection === 0}
                            className="border-2 border-black font-bold uppercase"
                        >
                            ← Anterior
                        </Button>
                        <Button
                            onClick={handleNextSection}
                            className="bg-black text-primary hover:bg-zinc-900 font-bold uppercase px-8 border-2 border-black shadow-[4px_4px_0px_0px_#ccff00]"
                        >
                            {currentSection < sections.length - 1 ? 'Próximo →' : '🎯 Iniciar Quiz'}
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    // Quiz Phase
    if (phase === 'quiz') {
        const question = quiz[quizIndex];
        if (!question) return null;
        const quizProgress = ((quizIndex + 1) / quiz.length) * 100;

        return (
            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <header className="p-4 border-b-2 border-black dark:border-zinc-700 bg-background sticky top-0 z-40">
                    <div className="max-w-2xl mx-auto flex items-center justify-between mb-4">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quiz • {lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-3 py-1 bg-white dark:bg-zinc-800 border-2 border-black font-black text-sm uppercase">
                                {score} PTS
                            </div>
                            {streak > 1 && (
                                <div className="px-3 py-1 bg-primary text-black border-2 border-black font-black text-sm uppercase flex items-center gap-1 animate-pulse">
                                    🔥 {streak}x
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="max-w-2xl mx-auto">
                        <Progress value={quizProgress} className="h-4 border-2 border-black bg-zinc-100 rounded-none" />
                        <p className="text-right text-xs font-bold uppercase mt-1 text-muted-foreground">
                            Pergunta {quizIndex + 1} de {quiz.length}
                        </p>
                    </div>
                </header>

                <main className="max-w-2xl mx-auto p-6 pt-10">
                    {/* Interactive Question Component */}
                    <InteractiveQuestion
                        key={`${quizIndex}-${question.id}`}
                        question={question}
                        onAnswer={(isCorrect, points) => {
                            if (isCorrect) {
                                setScore(prev => prev + points);
                                setStreak(prev => prev + 1);
                            } else {
                                setStreak(0);
                            }
                            setShowExplanation(true);
                        }}
                        disabled={false}
                    />

                    {/* Next Button */}
                    {showExplanation && (
                        <div className="mt-8">
                            <Button
                                className="w-full h-14 text-lg bg-black text-primary hover:bg-zinc-900 border-2 border-black shadow-[4px_4px_0px_0px_#ccff00] uppercase font-black tracking-wider transition-transform hover:-translate-y-1"
                                onClick={handleNextQuestion}
                            >
                                {quizIndex < quiz.length - 1 ? 'Próxima Pergunta →' : '🎉 Ver Resultado'}
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        );
    }

    // Complete Phase
    if (phase === 'complete') {
        const totalPoints = quiz.reduce((sum, q) => sum + q.points, 0);
        const percentage = Math.round((score / totalPoints) * 100);
        const isPassing = percentage >= 60;

        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
                <Card className="w-full max-w-md border-2 border-black dark:border-zinc-700 neo-shadow-lg">
                    <CardContent className="py-10 text-center">
                        <div className="text-8xl mb-6 filter drop-shadow-md hover:-translate-y-2 transition-transform cursor-default">
                            {isPassing ? '🎉' : '📚'}
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                            {isPassing ? 'Lição Completa!' : 'Continue Praticando!'}
                        </h2>
                        <p className="text-muted-foreground font-medium text-lg mb-8">
                            {lesson.title}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 rounded-sm neo-shadow-sm">
                                <p className="text-3xl font-black">{score}/{totalPoints}</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pontos</p>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 p-4 rounded-sm neo-shadow-sm">
                                <p className="text-3xl font-black">{percentage}%</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Acertos</p>
                            </div>
                        </div>

                        {/* XP Earned */}
                        <div className="bg-black text-primary border-2 border-black rounded-sm p-6 mb-8 neo-shadow-sm transform rotate-1 hover:rotate-0 transition-transform">
                            <p className="text-4xl font-black">
                                +{lesson.xpReward + score} XP
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-white mt-1">
                                {lesson.xpReward} base + {score} bônus
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4">
                            {!isPassing && (
                                <Button
                                    variant="outline"
                                    className="w-full border-2 border-black uppercase font-bold"
                                    onClick={() => {
                                        setPhase('reading');
                                        setCurrentSection(0);
                                        setQuizIndex(0);
                                        setSelectedAnswer(null);
                                        setShowExplanation(false);
                                        setScore(0);
                                        setStreak(0);
                                    }}
                                >
                                    🔄 Tentar Novamente
                                </Button>
                            )}
                            <Link href="/learn" className="block">
                                <Button className="w-full bg-primary text-black hover:bg-primary/90 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase font-black tracking-wider h-12 text-lg">
                                    📚 Continuar Aprendendo
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return null;
}
