// CodeQuest - Real-time Duel Page
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardHeader etc
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { createMockDuel, type DuelState } from '@/lib/duel-service';
import { useRouter } from 'next/navigation'; // Added useRouter

export default function DuelPage() {
    const { data: session, status } = useSession();
    const [duelState, setDuelState] = useState<DuelState | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [mockDuel, setMockDuel] = useState<ReturnType<typeof createMockDuel> | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [status]);

    const handleStateChange = useCallback((state: DuelState) => {
        setDuelState(state);
        if (state.status === 'question') {
            setSelectedAnswer(null);
        }
    }, []);

    const startDuel = () => {
        const duel = createMockDuel(handleStateChange);
        setMockDuel(duel);
        duel.start();
    };

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null || !mockDuel) return;
        setSelectedAnswer(index);
        mockDuel.answer(index);
    };

    const handleLeave = () => {
        mockDuel?.stop();
        setDuelState(null);
        setMockDuel(null);
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin text-4xl">⏳</div>
            </div>
        );
    }

    // Not in a duel - show start screen
    if (!duelState) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
                <div className="text-center max-w-lg w-full">
                    <div className="text-8xl mb-6 filter drop-shadow-[4px_4px_0px_#000000]">⚔️</div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Duelo PvP</h1>
                    <p className="text-xl font-medium text-muted-foreground mb-8">
                        Enfrente outros jogadores em batalhas de conhecimento HTML!
                    </p>
                    <div className="space-y-4">
                        <Button
                            size="lg"
                            className="w-full text-lg uppercase font-black tracking-wide border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all h-14"
                            onClick={startDuel}
                        >
                            🎮 Iniciar Duelo (Demo)
                        </Button>
                        <Link href="/challenges" className="block w-full">
                            <Button variant="outline" size="lg" className="w-full border-2 border-black font-bold uppercase h-14">
                                ← Voltar aos Desafios
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Matchmaking View
    if (duelState.status === 'matchmaking') {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
                <Card className="w-full max-w-lg border-2 border-black dark:border-zinc-700 neo-shadow-lg">
                    <CardHeader className="text-center border-b-2 border-black dark:border-zinc-700 pb-6">
                        <CardTitle className="text-4xl font-black uppercase tracking-tighter">⚔️ Matchmaking</CardTitle>
                        <CardDescription className="text-lg font-medium mt-2">Encontrando oponente...</CardDescription>
                    </CardHeader>
                    <CardContent className="py-12 flex flex-col items-center">
                        <div className="flex items-center gap-8 mb-8">
                            <div className="text-center">
                                <Avatar className="h-24 w-24 border-4 border-black mb-2 mx-auto">
                                    <AvatarImage src={session?.user?.image!} />
                                    <AvatarFallback className="font-bold text-2xl">EU</AvatarFallback>
                                </Avatar>
                                <p className="font-bold uppercase tracking-wider">Você</p>
                            </div>
                            <div className="text-5xl font-black animate-pulse text-red-600 italic">VS</div>
                            <div className="text-center relative">
                                <div className="h-24 w-24 rounded-full border-4 border-black border-dashed bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center animate-spin-slow">
                                    <span className="text-4xl">?</span>
                                </div>
                                <p className="font-bold uppercase tracking-wider mt-2 opacity-50">Oponente</p>
                            </div>
                        </div>
                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse mb-8">
                            Procurando jogador...
                        </p>
                        <Button
                            variant="destructive"
                            onClick={handleLeave}
                            className="border-2 border-black font-bold uppercase w-full max-w-xs shadow-[4px_4px_0px_0px_#000000] hover:translate-y-1 hover:shadow-none transition-all"
                        >
                            Cancelar
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Countdown
    if (duelState.status === 'countdown') {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-black uppercase tracking-widest text-muted-foreground mb-6">Oponente Encontrado!</p>
                    <div className="text-9xl font-black animate-ping text-primary stroke-black tracking-tighter">
                        3
                    </div>
                    <p className="text-2xl font-black uppercase mt-8 animate-pulse">Prepare-se!</p>
                </div>
            </div>
        );
    }

    // Game Loop (Question)
    if (duelState.status === 'question' && duelState.currentQuestion) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col p-4">
                {/* Header */}
                <div className="max-w-4xl mx-auto w-full mb-8 mt-4">
                    <div className="flex justify-between items-end mb-4 border-b-2 border-black dark:border-zinc-700 pb-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border-2 border-black">
                                <AvatarImage src={session?.user?.image!} />
                                <AvatarFallback>EU</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-black uppercase text-xl">{duelState.player1.score}</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Você</p>
                            </div>
                        </div>

                        <div className="text-center flex-1">
                            <div className={cn(
                                "text-5xl font-black tabular-nums tracking-tighter",
                                (duelState.timeRemaining || 0) <= 3 && "text-red-600 animate-pulse"
                            )}>
                                {duelState.timeRemaining}
                            </div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Segundos</p>
                        </div>

                        <div className="flex items-center gap-4 text-right">
                            <div>
                                <p className="font-black uppercase text-xl">{duelState.player2.score}</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Oponente</p>
                            </div>
                            <Avatar className="h-12 w-12 border-2 border-black">
                                <AvatarImage src={duelState.player2.image} />
                                <AvatarFallback className="bg-red-100 text-red-600 font-bold">OP</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <Progress
                        value={((duelState.timeRemaining || 0) / (duelState.currentQuestion.timeLimit || 10)) * 100}
                        className="h-3 border-2 border-black bg-zinc-200 dark:bg-zinc-800 rounded-none"
                    />
                </div>

                {/* Question Area */}
                <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
                    <Card className="mb-8 border-2 border-black dark:border-zinc-700 neo-shadow">
                        <CardContent className="py-8 text-center">
                            <span className="inline-block bg-primary text-black px-3 py-1 text-xs font-black uppercase tracking-widest border border-black mb-4">
                                Pergunta {duelState.questionNumber}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                                {duelState.currentQuestion.text}
                            </h2>
                            {duelState.currentQuestion.code && (
                                <pre className="bg-zinc-900 border-2 border-black rounded-sm p-4 text-left overflow-x-auto text-green-400 font-mono text-sm max-h-60">
                                    <code>{duelState.currentQuestion.code}</code>
                                </pre>
                            )}
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {duelState.currentQuestion.options.map((option: string, idx: number) => (
                            <Button
                                key={idx}
                                variant="outline"
                                className={cn(
                                    "h-auto py-6 text-lg font-bold border-2 border-black hover:bg-zinc-100 dark:hover:bg-zinc-800 whitespace-normal text-left px-6 neo-shadow-sm active:translate-y-1 active:shadow-none transition-all",
                                    selectedAnswer === idx && "bg-black text-white hover:bg-black/90 hover:text-white"
                                )}
                                onClick={() => handleAnswer(idx)}
                                disabled={selectedAnswer !== null}
                            >
                                <span className="mr-3 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                                {option}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Result (Round or Final) - For demo strictness let's assume 'finished' or 'result' state
    // The mock service might emit 'result' for round result, but eventually 'finished'. 
    // Let's handle 'finished' specifically as per original code.

    if (duelState.status === 'finished') {
        const isWinner = duelState.winner === 'me';
        const isDraw = duelState.winner === 'draw';

        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-8">
                <Card className={cn(
                    "w-full max-w-md border-2 border-black neo-shadow-lg",
                    isWinner ? "bg-green-50 dark:bg-green-950/20" : isDraw ? "bg-zinc-50 dark:bg-zinc-900" : "bg-red-50 dark:bg-red-950/20"
                )}>
                    <CardContent className="py-12 text-center">
                        <div className="text-8xl mb-6 animate-bounce">
                            {isWinner ? "🏆" : isDraw ? "🤝" : "💀"}
                        </div>

                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
                            {isWinner ? "Vitória!" : isDraw ? "Empate!" : "Derrota"}
                        </h1>
                        <p className="text-xl font-bold text-muted-foreground mb-8">
                            {isWinner ? "+200 XP" : isDraw ? "+50 XP" : "+20 XP"}
                        </p>

                        <div className="flex justify-center gap-12 mb-8 border-y-2 border-black/10 py-6">
                            <div className="text-center">
                                <p className="text-4xl font-black">{duelState.player1.score}</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Você</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-black">{duelState.player2.score}</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Oponente</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                className="w-full h-12 text-lg uppercase font-black tracking-wide border-2 border-black shadow-[4px_4px_0px_#000]"
                                onClick={() => {
                                    setDuelState(null);
                                    setMockDuel(null);
                                    startDuel();
                                }}
                            >
                                ⚔️ Jogar Novamente
                            </Button>
                            <Link href="/dashboard" className="block">
                                <Button variant="outline" className="w-full border-2 border-black font-bold uppercase">
                                    ← Voltar ao Dashboard
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Default loading/fallback
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin text-4xl">⏳</div>
        </div>
    );
}
