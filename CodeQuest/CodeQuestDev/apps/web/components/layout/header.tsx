// CodeQuest - Main Layout Header
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { XPBar } from '@/components/gamification/xp-bar';
import { StreakCounter } from '@/components/gamification/streak-counter';
import { cn } from '@/lib/utils';
import type { User, Streak, Locale } from '@repo/shared';

interface HeaderProps {
    user?: User | null;
    streak?: Streak | null;
    locale: Locale;
    className?: string;
}

export function Header({ user, streak, locale, className }: HeaderProps) {
    return (
        <header className={cn(
            'sticky top-0 z-50 w-full border-b',
            'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md',
            className
        )}>
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl">🚀</span>
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        CodeQuest
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/learn" className="text-sm font-medium hover:text-primary transition-colors">
                        {locale === 'pt-BR' ? 'Aprender' : 'Learn'}
                    </Link>
                    <Link href="/practice" className="text-sm font-medium hover:text-primary transition-colors">
                        {locale === 'pt-BR' ? 'Praticar' : 'Practice'}
                    </Link>
                    <Link href="/challenge" className="text-sm font-medium hover:text-primary transition-colors">
                        {locale === 'pt-BR' ? 'Desafios' : 'Challenges'}
                    </Link>
                    <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                        Ranking
                    </Link>
                </nav>

                {/* User Section */}
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* Streak */}
                        {streak && (
                            <StreakCounter
                                currentStreak={streak.currentStreak}
                                size="sm"
                            />
                        )}

                        {/* XP */}
                        <div className="hidden lg:block w-48">
                            <XPBar
                                currentXP={user.xp}
                                level={user.level}
                            />
                        </div>

                        {/* Avatar */}
                        <Link href="/profile">
                            <Avatar className="h-9 w-9 border-2 border-primary hover:scale-110 transition-transform">
                                <AvatarImage src={user.avatarUrl || ''} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>
                ) : (
                    <Button asChild>
                        <Link href="/login">
                            {locale === 'pt-BR' ? 'Entrar' : 'Sign In'}
                        </Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
