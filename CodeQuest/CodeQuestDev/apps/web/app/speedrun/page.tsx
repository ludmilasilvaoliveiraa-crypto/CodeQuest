// CodeQuest - Speedrun Page
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
    SPEEDRUN_MODES,
    getSpeedrunQuestions,
    calculateSpeedrunXP,
    calculateRank,
    type SpeedrunConfig,
    type SpeedrunResult,
} from '@/lib/speedrun-service';

type GameState = 'menu' | 'countdown' | 'playing' | 'result';

export default function SpeedrunPage() {
    const { data: session } = useSession();
    const [gameState, setGameState] = useState<GameState>('menu');
    const [selectedMode, setSelectedMode] = useState<SpeedrunConfig | null>(null);
    const [questions, setQuestions] = useState<Array<{ id: string; text: string; options: string[]; correct: number }>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [countdown, setCountdown] = useState(3);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [questionTimes, setQuestionTimes] = useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [result, setResult] = useState<SpeedrunResult | null>(null);

    const startTimeRef = useRef<number>(0);
    const questionStartRef = useRef<number>(0);

    // Timer effect
    useEffect(() => {
        if (gameState !== 'playing' || !selectedMode) return;

        const interval = setInterval(() => {
            if (selectedMode.totalTimeLimit) {
                setTimeRemaining(prev => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        finishGame();
                        return 0;
                    }
                    return prev - 1;
                });
            } else {
                setTimeRemaining(prev => {
                    if (prev <= 0) {
                        // Time's up for this question
                        handleTimeout();
                        return selectedMode.timePerQuestion;
                    }
                    return prev - 1;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameState, selectedMode, currentIndex]);

    // Countdown effect
    useEffect(() => {
        if (gameState !== 'countdown') return;

        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setGameState('playing');
            startTimeRef.current = Date.now();
            questionStartRef.current = Date.now();
            if (selectedMode) {
                setTimeRemaining(selectedMode.totalTimeLimit || selectedMode.timePerQuestion);
            }
        }
    }, [gameState, countdown, selectedMode]);

    const startGame = (mode: SpeedrunConfig) => {
        setSelectedMode(mode);
        setQuestions(getSpeedrunQuestions(mode));
        setCurrentIndex(0);
        setScore(0);
        setStreak(0);
        setMaxStreak(0);
        setQuestionTimes([]);
        setSelectedAnswer(null);
        setResult(null);
        setCountdown(3);
        setGameState('countdown');
    };

    const handleAnswer = useCallback((index: number) => {
        if (selectedAnswer !== null || !questions[currentIndex]) return;

        const questionTime = Date.now() - questionStartRef.current;
        setQuestionTimes(prev => [...prev, questionTime]);
        setSelectedAnswer(index);

        const isCorrect = index === questions[currentIndex].correct;

        if (isCorrect) {
            setScore(prev => prev + 10);
            setStreak(prev => {
                const newStreak = prev + 1;
                setMaxStreak(ms => Math.max(ms, newStreak));
                return newStreak;
            });
        } else {
            setStreak(0);
        }

        // Next question after brief delay
        setTimeout(() => {
            if (currentIndex + 1 >= questions.length) {
                finishGame();
            } else {
                setCurrentIndex(prev => prev + 1);
                setSelectedAnswer(null);
                questionStartRef.current = Date.now();
                if (!selectedMode?.totalTimeLimit) {
                    setTimeRemaining(selectedMode?.timePerQuestion || 10);
                }
            }
        }, 500);
    }, [selectedAnswer, currentIndex, questions, selectedMode]);

    const handleTimeout = useCallback(() => {
        if (selectedAnswer !== null) return;

        const questionTime = Date.now() - questionStartRef.current;
        setQuestionTimes(prev => [...prev, questionTime]);
        setStreak(0);

        if (currentIndex + 1 >= questions.length) {
            finishGame();
        } else {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            questionStartRef.current = Date.now();
        }
    }, [selectedAnswer, currentIndex, questions]);

    const finishGame = useCallback(() => {
        const endTime = Date.now() - startTimeRef.current;
        const avgTime = questionTimes.length > 0
            ? questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length
            : 0;

        const finalResult: SpeedrunResult = {
            configId: selectedMode?.id || '',
            score,
            correctAnswers: score / 10,
            totalQuestions: questions.length,
            totalTime: endTime,
            averageTime: avgTime,
            streak: maxStreak,
            xpEarned: 0,
            rank: 'bronze',
        };

        finalResult.xpEarned = calculateSpeedrunXP(finalResult);
        finalResult.rank = calculateRank(score, questions.length * 10, avgTime);

        setResult(finalResult);
        setTotalTime(endTime);
        setGameState('result');
    }, [score, questions, maxStreak, questionTimes, selectedMode]);

    // Menu
    if (gameState === 'menu') {
        return (
            <div className="min-h-screen bg-background text-foreground p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="text-6xl mb-4 filter drop-shadow-[4px_4px_0px_#000000]">⚡</div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Modo Speedrun</h1>
                        <p className="text-xl font-medium text-muted-foreground">Teste sua velocidade e conhecimento!</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {SPEEDRUN_MODES.map(mode => (
                            <Card
                                key={mode.id}
                                className="cursor-pointer hover:translate-y-[-4px] transition-transform border-2 border-black dark:border-zinc-700 neo-shadow hover:shadow-[8px_8px_0px_0px_#000000] dark:hover:shadow-[8px_8px_0px_0px_#ccff00]"
                                onClick={() => startGame(mode)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl">
                                            {mode.id === 'blitz' ? '🔥' : mode.difficulty === 'hard' ? '💎' : '⚡'}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black uppercase">{mode.name}</h3>
                                            <p className="text-base font-medium text-muted-foreground mb-3">{mode.description}</p>
                                            <div className="flex gap-2 text-xs font-bold uppercase tracking-wider">
                                                <span className="bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-600 px-2 py-1">
                                                    {mode.questionCount} perguntas
                                                </span>
                                                <span className="bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-600 px-2 py-1">
                                                    {mode.totalTimeLimit
                                                        ? `${mode.totalTimeLimit}s total`
                                                        : `${mode.timePerQuestion}s/questão`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/dashboard">
                            <Button variant="outline" className="border-2 border-black font-bold uppercase">
                                ← Voltar ao Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Countdown
    if (gameState === 'countdown') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-bold uppercase tracking-widest text-muted-foreground mb-6">{selectedMode?.name}</p>
                    <div className="text-9xl font-black animate-ping text-primary stroke-black tracking-tighter">
                        {countdown}
                    </div>
                    <p className="text-2xl font-black uppercase mt-8 animate-pulse">Prepare-se!</p>
                </div>
            </div>
        );
    }

    // Playing
    if (gameState === 'playing' && questions[currentIndex]) {
        const question = questions[currentIndex];
        const progress = ((currentIndex + 1) / questions.length) * 100;

        return (
            <div className="min-h-screen bg-background text-foreground p-4 flex flex-col">
                <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <span className="text-3xl font-black">{currentIndex + 1}</span>
                            <span className="text-muted-foreground font-bold">/{questions.length}</span>
                        </div>
                        <div className="text-center">
                            <div className={cn(
                                'text-4xl font-black tabular-nums tracking-tight',
                                timeRemaining <= 3 && 'text-red-600 animate-pulse'
                            )}>
                                {timeRemaining}s
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black text-primary">{score}</div>
                            {streak > 1 && (
                                <div className="text-sm font-bold uppercase text-orange-500 animate-bounce">🔥 Streak x{streak}</div>
                            )}
                        </div>
                    </div>

                    {/* Progress */}
                    <Progress value={progress} className="h-4 border-2 border-black bg-zinc-200 dark:bg-zinc-800 rounded-none mb-8" />

                    {/* Question */}
                    <Card className="border-2 border-black dark:border-zinc-700 neo-shadow mb-6">
                        <CardContent className="py-8">
                            <p className="text-xl md:text-2xl text-center font-bold">{question.text}</p>
                        </CardContent>
                    </Card>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-4">
                        {question.options.map((option, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                disabled={selectedAnswer !== null}
                                className={cn(
                                    'h-auto min-h-[4rem] text-lg font-bold border-2 border-black whitespace-normal hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all neo-shadow-sm active:translate-y-1 active:shadow-none',
                                    selectedAnswer === index && index === question.correct && 'bg-green-500 text-black border-black neo-shadow-none translate-y-1',
                                    selectedAnswer === index && index !== question.correct && 'bg-red-500 text-white border-black neo-shadow-none translate-y-1',
                                    // Reveal correct answer if wrong selected
                                    selectedAnswer !== null && index === question.correct && 'bg-green-500/50 border-green-700'
                                )}
                                onClick={() => handleAnswer(index)}
                            >
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Result
    if (gameState === 'result' && result) {
        const rankColors = {
            bronze: 'bg-amber-700',
            silver: 'bg-zinc-400',
            gold: 'bg-yellow-400',
            diamond: 'bg-cyan-400',
        };

        const rankEmojis = {
            bronze: '🥉',
            silver: '🥈',
            gold: '🥇',
            diamond: '💎',
        };

        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-lg w-full max-w-md">
                    <CardContent className="py-12 text-center">
                        <div className={cn(
                            'w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl border-4 border-black',
                            rankColors[result.rank || 'bronze']
                        )}>
                            {rankEmojis[result.rank || 'bronze']}
                        </div>

                        <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">
                            {result.rank === 'diamond' ? 'Incrível!' :
                                result.rank === 'gold' ? 'Excelente!' :
                                    result.rank === 'silver' ? 'Muito Bem!' : 'Bom Trabalho!'}
                        </h2>

                        <div className="grid grid-cols-2 gap-4 my-8">
                            <div className="bg-zinc-100 dark:bg-zinc-900 border-2 border-black p-4">
                                <p className="text-3xl font-black">{result.correctAnswers}/{result.totalQuestions}</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Acertos</p>
                            </div>
                            <div className="bg-zinc-100 dark:bg-zinc-900 border-2 border-black p-4">
                                <p className="text-3xl font-black">{(totalTime / 1000).toFixed(1)}s</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Tempo Total</p>
                            </div>
                            <div className="bg-zinc-100 dark:bg-zinc-900 border-2 border-black p-4">
                                <p className="text-3xl font-black">🔥 {result.streak}</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Maior Streak</p>
                            </div>
                            <div className="bg-primary border-2 border-black p-4">
                                <p className="text-3xl font-black text-black">+{result.xpEarned}</p>
                                <p className="text-xs font-bold uppercase text-black/70">XP Ganho</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                className="w-full text-lg border-2 border-black uppercase font-black tracking-wide h-12 shadow-[4px_4px_0px_#000]"
                                onClick={() => startGame(selectedMode!)}
                            >
                                🔄 Jogar Novamente
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-2 border-black font-bold uppercase"
                                onClick={() => setGameState('menu')}
                            >
                                📋 Escolher Outro Modo
                            </Button>
                            <Link href="/dashboard" className="block">
                                <Button variant="ghost" className="w-full font-bold uppercase">
                                    ← Voltar ao Dashboard
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
