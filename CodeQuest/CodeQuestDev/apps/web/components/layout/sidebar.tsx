// CodeQuest - Sidebar Navigation
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Track, Locale } from '@repo/shared';

interface SidebarProps {
    tracks: Track[];
    locale: Locale;
    className?: string;
}

export function Sidebar({ tracks, locale, className }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r',
            'bg-white dark:bg-gray-950',
            'hidden lg:block',
            className
        )}>
            <ScrollArea className="h-full py-4">
                <nav className="space-y-1 px-3">
                    {/* Quick Links */}
                    <div className="mb-4">
                        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {locale === 'pt-BR' ? 'Início Rápido' : 'Quick Start'}
                        </p>
                        {[
                            { href: '/dashboard', icon: '🏠', label: { 'pt-BR': 'Dashboard', en: 'Dashboard' } },
                            { href: '/flashcards', icon: '🎴', label: { 'pt-BR': 'Flashcards', en: 'Flashcards' } },
                            { href: '/speedrun', icon: '⚡', label: { 'pt-BR': 'Speedrun', en: 'Speedrun' } },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                                    pathname === item.href && 'bg-primary/10 text-primary font-medium'
                                )}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label[locale]}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Tracks */}
                    <div>
                        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            {locale === 'pt-BR' ? 'Trilhas' : 'Tracks'}
                        </p>
                        {tracks.map((track) => (
                            <Link
                                key={track.id}
                                href={`/learn/${track.slug}`}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                                    pathname.includes(track.slug) && 'bg-primary/10 text-primary font-medium'
                                )}
                            >
                                <span>{track.icon}</span>
                                <span>{track.title[locale]}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Social */}
                    <div className="pt-4 border-t mt-4">
                        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Social
                        </p>
                        {[
                            { href: '/friends', icon: '👥', label: { 'pt-BR': 'Amigos', en: 'Friends' } },
                            { href: '/leaderboard', icon: '🏆', label: { 'pt-BR': 'Ranking', en: 'Leaderboard' } },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                                    pathname === item.href && 'bg-primary/10 text-primary font-medium'
                                )}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label[locale]}</span>
                            </Link>
                        ))}
                    </div>
                </nav>
            </ScrollArea>
        </aside>
    );
}
