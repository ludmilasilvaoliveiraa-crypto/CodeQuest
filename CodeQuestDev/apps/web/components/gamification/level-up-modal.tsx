// CodeQuest - Level Up Modal Component
'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getLevelTitle } from '@/lib/xp-system';

interface LevelUpModalProps {
    isOpen: boolean;
    oldLevel: number;
    newLevel: number;
    locale?: 'pt-BR' | 'en';
    onClose: () => void;
}

export function LevelUpModal({
    isOpen,
    oldLevel,
    newLevel,
    locale = 'pt-BR',
    onClose
}: LevelUpModalProps) {
    const [showConfetti, setShowConfetti] = useState(false);
    const title = getLevelTitle(newLevel, locale);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            // Auto-close after animation
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md text-center overflow-hidden">
                {/* Confetti Effect */}
                {showConfetti && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 animate-confetti"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: '-10px',
                                    backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9'][i % 6],
                                    borderRadius: Math.random() > 0.5 ? '50%' : '0',
                                    animationDelay: `${Math.random() * 0.5}s`,
                                    animationDuration: `${2 + Math.random()}s`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Level Up Content */}
                <div className="py-8 space-y-6">
                    {/* Animation */}
                    <div className="animate-level-up">
                        <div className="text-7xl mb-2">🎉</div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                            {locale === 'pt-BR' ? 'LEVEL UP!' : 'LEVEL UP!'}
                        </h2>
                    </div>

                    {/* Level Display */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="text-3xl font-bold text-muted-foreground opacity-50">
                            {oldLevel}
                        </div>
                        <div className="text-2xl">→</div>
                        <div className={cn(
                            'text-5xl font-black',
                            'bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent'
                        )}>
                            {newLevel}
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <p className="text-muted-foreground text-sm mb-1">
                            {locale === 'pt-BR' ? 'Você agora é' : 'You are now'}
                        </p>
                        <p className="text-xl font-semibold text-primary">
                            {title}
                        </p>
                    </div>

                    {/* Rewards info */}
                    <div className="bg-primary/10 rounded-lg p-3 text-sm">
                        <p>
                            {locale === 'pt-BR'
                                ? '✨ Novas conquistas desbloqueadas!'
                                : '✨ New achievements unlocked!'}
                        </p>
                    </div>

                    {/* Close Button */}
                    <Button onClick={onClose} className="w-full">
                        {locale === 'pt-BR' ? 'Continuar' : 'Continue'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
