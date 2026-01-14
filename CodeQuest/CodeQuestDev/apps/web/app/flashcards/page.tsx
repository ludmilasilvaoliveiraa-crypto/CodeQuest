// CodeQuest - Flashcards Page
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
    FLASHCARD_DECKS,
    HTML_FLASHCARDS,
    getDueCards,
    calculateNextReview,
    saveFlashcardProgress,
    type Flashcard,
    type ReviewQuality,
} from '@/lib/flashcard-service';

type ViewState = 'decks' | 'study' | 'complete';

export default function FlashcardsPage() {
    const [viewState, setViewState] = useState<ViewState>('decks');
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [reviewed, setReviewed] = useState(0);

    const startStudy = (deckId: string) => {
        setSelectedDeck(deckId);
        const dueCards = getDueCards(HTML_FLASHCARDS);
        setCards(dueCards.length > 0 ? dueCards : HTML_FLASHCARDS.slice(0, 5));
        setCurrentIndex(0);
        setReviewed(0);
        setIsFlipped(false);
        setViewState('study');
    };

    const handleReview = (quality: ReviewQuality) => {
        const currentCard = cards[currentIndex];
        if (!currentCard) return;

        const updates = calculateNextReview(currentCard, quality);

        // Ensure id is present and string
        const updatedCard: Flashcard = {
            ...currentCard,
            ...updates,
            id: currentCard.id // Explicitly keep ID
        };

        saveFlashcardProgress(updatedCard);
        setReviewed(prev => prev + 1);

        if (currentIndex + 1 >= cards.length) {
            setViewState('complete');
        } else {
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    // Deck Selection View
    if (viewState === 'decks') {
        return (
            <div className="min-h-screen bg-background text-foreground p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="text-6xl mb-4 filter drop-shadow-[4px_4px_0px_#000000]">🃏</div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Flashcards SRS</h1>
                        <p className="text-xl font-medium text-muted-foreground">Memorize com repetição espaçada</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-12">
                        <Card className="text-center border-2 border-black dark:border-zinc-700 neo-shadow-sm bg-blue-100 dark:bg-blue-900/20">
                            <CardContent className="py-6">
                                <p className="text-4xl font-black text-blue-600 dark:text-blue-400">12</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Para revisar</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center border-2 border-black dark:border-zinc-700 neo-shadow-sm bg-orange-100 dark:bg-orange-900/20">
                            <CardContent className="py-6">
                                <p className="text-4xl font-black text-orange-600 dark:text-orange-400">5</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Dias de streak</p>
                            </CardContent>
                        </Card>
                        <Card className="text-center border-2 border-black dark:border-zinc-700 neo-shadow-sm bg-green-100 dark:bg-green-900/20">
                            <CardContent className="py-6">
                                <p className="text-4xl font-black text-green-600 dark:text-green-400">24</p>
                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Dominados</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Decks */}
                    <div className="space-y-4">
                        {FLASHCARD_DECKS.map(deck => (
                            <Card
                                key={deck.id}
                                className="cursor-pointer hover:-translate-y-1 transition-transform border-2 border-black dark:border-zinc-700 neo-shadow hover:shadow-none"
                                onClick={() => startStudy(deck.id)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-6">
                                        <div className="text-5xl">{deck.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black uppercase tracking-tight">{deck.name}</h3>
                                            <p className="text-base font-medium text-muted-foreground">{deck.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex gap-2">
                                                {deck.dueCount > 0 && (
                                                    <span className="bg-blue-600 text-white border-2 border-black px-3 py-1 text-sm font-bold uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        {deck.dueCount} para revisar
                                                    </span>
                                                )}
                                                {deck.newCount > 0 && (
                                                    <span className="bg-green-500 text-black border-2 border-black px-3 py-1 text-sm font-bold uppercase shadow-[2px_2px_0px_0px_#000000]">
                                                        {deck.newCount} novos
                                                    </span>
                                                )}
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

    // Study View
    if (viewState === 'study' && cards[currentIndex]) {
        const card = cards[currentIndex];
        const progress = ((currentIndex + 1) / cards.length) * 100;

        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col p-4">
                {/* Header */}
                <div className="max-w-3xl mx-auto w-full mb-8 mt-4">
                    <div className="flex justify-between items-center mb-4">
                        <Button
                            variant="ghost"
                            onClick={() => setViewState('decks')}
                            className="font-bold uppercase hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                            ✕ Sair
                        </Button>
                        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                            Card {currentIndex + 1} de {cards.length}
                        </span>
                    </div>
                    <Progress value={progress} className="h-3 border-2 border-black bg-zinc-200 dark:bg-zinc-800 rounded-none" />
                </div>

                {/* Card */}
                <div className="flex-1 flex items-center justify-center py-8">
                    <div
                        className={cn(
                            'w-full max-w-xl perspective-1000 cursor-pointer group',
                            isFlipped ? 'pointer-events-none' : ''
                        )}
                        onClick={() => !isFlipped && setIsFlipped(true)}
                    >
                        <div className={cn(
                            'relative w-full min-h-[400px] transition-transform duration-500 transform-style-3d',
                            isFlipped && 'rotate-y-180'
                        )}>
                            {/* Front */}
                            <Card className={cn(
                                'absolute inset-0 bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-500 neo-shadow group-hover:neo-shadow-lg transition-all backface-hidden flex flex-col',
                                isFlipped && 'invisible'
                            )}>
                                <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                    <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-black dark:border-zinc-600 text-xs font-black uppercase tracking-widest mb-8">
                                        {card.category}
                                    </span>
                                    <p className="text-3xl font-black uppercase tracking-tight leading-tight">{card.front}</p>
                                    {!isFlipped && (
                                        <p className="text-sm font-bold uppercase text-muted-foreground mt-12 animate-pulse">
                                            (Toque para virar)
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Back */}
                            <Card className={cn(
                                'absolute inset-0 bg-black text-white border-2 border-black dark:border-zinc-500 neo-shadow backface-hidden rotate-y-180 flex flex-col',
                                !isFlipped && 'invisible'
                            )}>
                                <CardContent className="flex-1 flex flex-col items-center justify-center p-12 text-center overflow-y-auto">
                                    <p className="text-2xl font-bold leading-relaxed mb-6">{card.back}</p>
                                    {card.code && (
                                        <pre className="bg-zinc-900 border border-zinc-700 rounded-sm p-4 text-sm text-left w-full overflow-x-auto text-green-400 font-mono">
                                            <code>{card.code}</code>
                                        </pre>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Rating Buttons (only when flipped) */}
                {isFlipped && (
                    <div className="max-w-3xl mx-auto w-full mt-8 mb-8 animate-in slide-in-from-bottom-4 fade-in duration-300">
                        <p className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                            Como foi?
                        </p>
                        <div className="grid grid-cols-4 gap-4">
                            <Button
                                variant="outline"
                                className="h-auto py-6 flex flex-col border-2 border-black hover:bg-red-500 hover:text-white hover:border-black transition-all neo-shadow-sm active:translate-y-1 active:shadow-none"
                                onClick={() => handleReview(1)}
                            >
                                <span className="text-2xl mb-2">😓</span>
                                <span className="font-black uppercase text-xs">Errei</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto py-6 flex flex-col border-2 border-black hover:bg-orange-500 hover:text-white hover:border-black transition-all neo-shadow-sm active:translate-y-1 active:shadow-none"
                                onClick={() => handleReview(3)}
                            >
                                <span className="text-2xl mb-2">😅</span>
                                <span className="font-black uppercase text-xs">Difícil</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto py-6 flex flex-col border-2 border-black hover:bg-blue-500 hover:text-white hover:border-black transition-all neo-shadow-sm active:translate-y-1 active:shadow-none"
                                onClick={() => handleReview(4)}
                            >
                                <span className="text-2xl mb-2">🙂</span>
                                <span className="font-black uppercase text-xs">Ok</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto py-6 flex flex-col border-2 border-black hover:bg-green-500 hover:text-white hover:border-black transition-all neo-shadow-sm active:translate-y-1 active:shadow-none"
                                onClick={() => handleReview(5)}
                            >
                                <span className="text-2xl mb-2">😄</span>
                                <span className="font-black uppercase text-xs">Fácil</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Complete View
    if (viewState === 'complete') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-8">
                <Card className="w-full max-w-md border-2 border-black dark:border-zinc-700 neo-shadow-lg">
                    <CardContent className="py-12 text-center">
                        <div className="text-8xl mb-6 animate-bounce">🎉</div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Sessão Completa!</h2>
                        <p className="text-muted-foreground font-medium mb-8">
                            Você revisou <span className="text-foreground font-bold">{reviewed}</span> cards
                        </p>

                        <div className="bg-green-100 dark:bg-green-900/30 border-2 border-black dark:border-green-500/50 p-6 rounded-sm mb-8 neo-shadow-sm rotate-1">
                            <p className="text-green-700 dark:text-green-400 font-black text-2xl">
                                +{reviewed * 5} XP
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Ganhos</p>
                        </div>

                        <div className="space-y-4">
                            <Button
                                className="w-full h-12 text-lg uppercase font-black tracking-wide border-2 border-black shadow-[4px_4px_0px_#000]"
                                onClick={() => startStudy(selectedDeck!)}
                            >
                                🔄 Continuar Estudando
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full border-2 border-black font-bold uppercase"
                                onClick={() => setViewState('decks')}
                            >
                                📚 Escolher Outro Deck
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
