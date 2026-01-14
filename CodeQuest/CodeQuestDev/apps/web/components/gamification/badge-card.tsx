// CodeQuest - Badge Card Component
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Badge as BadgeType, Locale } from '@repo/shared';
import { BADGE_CATEGORIES } from '@repo/shared';

interface BadgeCardProps {
    badge: BadgeType;
    locale: Locale;
    earned?: boolean;
    earnedAt?: Date;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function BadgeCard({
    badge,
    locale,
    earned = false,
    earnedAt,
    size = 'md',
    className
}: BadgeCardProps) {
    const categoryIcon = BADGE_CATEGORIES[badge.category as keyof typeof BADGE_CATEGORIES];

    const sizeClasses = {
        sm: 'p-2 text-2xl',
        md: 'p-4 text-4xl',
        lg: 'p-6 text-6xl'
    };

    return (
        <Card className={cn(
            'relative overflow-hidden transition-all duration-300',
            earned
                ? 'bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-300'
                : 'bg-gray-100 dark:bg-gray-800 opacity-50 grayscale',
            earned && 'hover:scale-105 hover:shadow-lg',
            className
        )}>
            <CardContent className={cn('flex flex-col items-center gap-2', sizeClasses[size])}>
                <span className={cn(
                    'transition-all',
                    earned && 'animate-level-up'
                )}>
                    {badge.icon}
                </span>

                <div className="text-center">
                    <p className="font-semibold text-sm">{badge.name[locale]}</p>
                    <p className="text-xs text-muted-foreground">{badge.description[locale]}</p>
                </div>

                {earned && earnedAt && (
                    <p className="text-xs text-muted-foreground">
                        {new Date(earnedAt).toLocaleDateString(locale)}
                    </p>
                )}

                {badge.xpBonus > 0 && earned && (
                    <span className="absolute top-2 right-2 text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                        +{badge.xpBonus} XP
                    </span>
                )}

                <span className="absolute top-2 left-2 text-sm">
                    {categoryIcon}
                </span>
            </CardContent>
        </Card>
    );
}
