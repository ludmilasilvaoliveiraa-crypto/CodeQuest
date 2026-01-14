// CodeQuest - Onboarding Flow
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface OnboardingStep {
    id: string;
    emoji: string;
    title: string;
    description: string;
    image?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
    {
        id: 'welcome',
        emoji: '👋',
        title: 'Bem-vindo ao CodeQuest!',
        description: 'Aprenda HTML de forma divertida e interativa. Resolva quizzes, ganhe XP e desbloqueie conquistas!',
    },
    {
        id: 'learn',
        emoji: '📚',
        title: 'Estude com Lições Interativas',
        description: 'Cada lição combina teoria e prática. Leia o conteúdo, experimente no código e teste seu conhecimento.',
    },
    {
        id: 'gamification',
        emoji: '🎮',
        title: 'Ganhe XP e Suba de Nível',
        description: 'Acerte questões, mantenha seu streak diário e desbloqueie badges. Quanto mais você aprende, mais você ganha!',
    },
    {
        id: 'compete',
        emoji: '🏆',
        title: 'Compita com Amigos',
        description: 'Adicione amigos, desafie-os para duelos e suba no ranking global. Aprender é mais divertido junto!',
    },
    {
        id: 'ready',
        emoji: '🚀',
        title: 'Pronto para Começar?',
        description: 'Sua jornada de aprendizado começa agora. Vamos dominar o HTML juntos!',
    },
];

export function Onboarding({ onComplete }: { onComplete?: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const router = useRouter();

    const step = ONBOARDING_STEPS[currentStep];

    if (!step) return null;

    const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;
    const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            handleComplete();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSkip = () => {
        handleComplete();
    };

    const handleComplete = () => {
        localStorage.setItem('onboarding-completed', 'true');
        setIsVisible(false);
        onComplete?.();
        router.push('/learn');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md animate-in fade-in zoom-in duration-300">
                <CardContent className="pt-8 pb-6">
                    {/* Progress */}
                    <Progress value={progress} className="h-1.5 mb-8" />

                    {/* Step dots */}
                    <div className="flex justify-center gap-2 mb-8">
                        {ONBOARDING_STEPS.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={cn(
                                    'w-2.5 h-2.5 rounded-full transition-colors',
                                    index === currentStep ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                )}
                            />
                        ))}
                    </div>

                    {/* Content */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{step.emoji}</div>
                        <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        {currentStep > 0 && (
                            <Button variant="outline" onClick={handlePrev} className="flex-1">
                                ← Voltar
                            </Button>
                        )}
                        {currentStep === 0 && (
                            <Button variant="ghost" onClick={handleSkip} className="flex-1">
                                Pular
                            </Button>
                        )}
                        <Button onClick={handleNext} className="flex-1">
                            {isLastStep ? '🚀 Começar!' : 'Próximo →'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// Hook to check if onboarding is needed
export function useOnboarding() {
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const completed = localStorage.getItem('onboarding-completed');
        if (!completed) {
            setShowOnboarding(true);
        }
    }, []);

    const complete = () => {
        setShowOnboarding(false);
    };

    const reset = () => {
        localStorage.removeItem('onboarding-completed');
        setShowOnboarding(true);
    };

    return { showOnboarding, complete, reset };
}
