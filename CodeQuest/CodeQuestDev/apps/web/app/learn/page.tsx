// CodeQuest - Learn Page with Modules
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Onboarding, useOnboarding } from '@/components/onboarding/onboarding';
import { ThemeToggle } from '@/components/settings/theme-toggle';
import { ALL_MODULES, type LearningModule, type Lesson } from '@/content/lessons';

export default function LearnPage() {
    const { showOnboarding, complete } = useOnboarding();
    const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [userXP, setUserXP] = useState(0);

    useEffect(() => {
        // Load progress from localStorage
        const stored = localStorage.getItem('codequest-progress');
        if (stored) {
            const data = JSON.parse(stored);
            setCompletedLessons(data.completedLessons || []);
            setUserXP(data.xp || 0);
        }
    }, []);

    const getModuleProgress = (module: LearningModule) => {
        const completed = module.lessons.filter(l =>
            completedLessons.includes(`${module.id}:${l.id}`)
        ).length;
        return (completed / module.lessons.length) * 100;
    };

    const isModuleLocked = (module: LearningModule) => {
        if (!module.requiredXP) return false;
        return userXP < module.requiredXP;
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'bg-primary text-black border border-black';
            case 'intermediate': return 'bg-white dark:bg-zinc-800 text-foreground border border-black dark:border-zinc-500';
            case 'advanced': return 'bg-black text-white dark:bg-zinc-600 border border-black';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getDifficultyLabel = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'Iniciante';
            case 'intermediate': return 'Intermediário';
            case 'advanced': return 'Avançado';
            default: return difficulty;
        }
    };

    // Module List View
    if (!selectedModule) {
        return (
            <div className="min-h-screen bg-background text-foreground">
                {showOnboarding && <Onboarding onComplete={complete} />}

                <main className="container mx-auto p-6 pt-10">
                    <div className="mb-12 text-center md:text-left">
                        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">📚 Aprenda HTML</h1>
                        <p className="text-muted-foreground text-lg">
                            {ALL_MODULES.length} módulos · {ALL_MODULES.reduce((t, m) => t + m.lessons.length, 0)} lições
                        </p>
                    </div>

                    {/* Modules Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {ALL_MODULES.map((module, index) => {
                            const progress = getModuleProgress(module);
                            const locked = isModuleLocked(module);

                            return (
                                <Card
                                    key={module.id}
                                    className={cn(
                                        'cursor-pointer transition-all hover:-translate-y-2',
                                        locked && 'opacity-60 grayscale'
                                    )}
                                    onClick={() => !locked && setSelectedModule(module)}
                                >
                                    <CardHeader className="pb-4 border-b-2 border-black dark:border-zinc-800">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-primary border-2 border-black rounded-sm">
                                                    <span className="text-2xl text-black font-bold">#{index + 1}</span>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl uppercase font-black">{module.name}</CardTitle>
                                                    <span className={cn(
                                                        'text-xs font-bold uppercase tracking-widest',
                                                        getDifficultyColor(module.difficulty)
                                                    )}>
                                                        {getDifficultyLabel(module.difficulty)}
                                                    </span>
                                                </div>
                                            </div>
                                            {locked && (
                                                <span className="text-2xl">🔒</span>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed">
                                            {module.description}
                                        </p>
                                        <div className="flex items-center justify-between text-xs font-bold uppercase mb-2">
                                            <span>{module.lessons.length} lições</span>
                                            <span>{Math.round(progress)}% completo</span>
                                        </div>
                                        <Progress value={progress} className="h-4 border-2 border-black dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900" />
                                        {locked && (
                                            <p className="text-xs font-bold text-red-500 mt-2 uppercase">
                                                🔒 Requer {module.requiredXP} XP
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </main>
            </div>
        );
    }

    // Lesson List View (when module is selected)
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto p-6 pt-10">
                <Button
                    variant="ghost"
                    onClick={() => setSelectedModule(null)}
                    className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors"
                >
                    <span className="mr-2 text-xl">←</span> VOLTAR AOS MÓDULOS
                </Button>

                {/* Module Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 border-b-4 border-black dark:border-zinc-800 pb-8">
                    <div className="p-6 bg-primary border-2 border-black neo-shadow rounded-sm">
                        <span className="text-4xl text-black font-black">M{selectedModule.id}</span>
                    </div>
                    <div>
                        <h1 className="text-4xl font-black uppercase mb-2 tracking-tighter">{selectedModule.name}</h1>
                        <p className="text-xl text-muted-foreground">{selectedModule.description}</p>
                    </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-4">
                    {selectedModule.lessons.map((lesson, index) => {
                        const lessonId = `${selectedModule.id}:${lesson.id}`;
                        const isCompleted = completedLessons.includes(lessonId);

                        return (
                            <Link
                                key={lesson.id}
                                href={`/lesson/${selectedModule.id}/${lesson.id}`}
                            >
                                <Card className={cn(
                                    'cursor-pointer transition-all border-2 border-black dark:border-zinc-800 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(204,255,0,1)]',
                                    isCompleted && 'border-primary bg-primary/5'
                                )}>
                                    <CardContent className="py-6 flex items-center gap-6">
                                        <div className={cn(
                                            'w-12 h-12 flex items-center justify-center text-xl font-black border-2 border-black rounded-sm',
                                            isCompleted
                                                ? 'bg-primary text-black'
                                                : 'bg-white dark:bg-zinc-900 text-muted-foreground'
                                        )}>
                                            {isCompleted ? '✓' : index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg uppercase tracking-tight mb-1">{lesson.title}</h3>
                                            <p className="text-sm text-muted-foreground font-medium">{lesson.description}</p>
                                        </div>
                                        <div className="text-right text-xs font-bold uppercase tracking-wider">
                                            <p className="text-primary mb-1">+{lesson.xpReward} XP</p>
                                            <p className="text-muted-foreground">{lesson.estimatedTime} min</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
