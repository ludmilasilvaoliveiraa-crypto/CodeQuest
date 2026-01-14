// CodeQuest - Streak Counter Component
'use client';

import { cn } from '@/lib/utils';
import { STREAK_MILESTONES } from '@repo/shared';

interface StreakCounterProps {
    currentStreak: number;
    showFlame?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function StreakCounter({
    currentStreak,
    showFlame = true,
    size = 'md',
    className
}: StreakCounterProps) {
    const isOnFire = currentStreak >= 3;
    const milestone = STREAK_MILESTONES.find(m => currentStreak >= m);

    const sizeClasses = {
        sm: 'text-sm gap-1',
        md: 'text-lg gap-2',
        lg: 'text-2xl gap-3'
    };

    const iconSizes = {
        sm: 'text-base',
        md: 'text-xl',
        lg: 'text-3xl'
    };

    return (
        <div className={cn(
            'flex items-center font-bold',
            sizeClasses[size],
            className
        )}>
            {showFlame && (
                <span className={cn(
                    iconSizes[size],
                    isOnFire && 'animate-streak'
                )}>
                    🔥
                </span>
            )}
            <span className={cn(
                isOnFire ? 'text-orange-500' : 'text-gray-500'
            )}>
                {currentStreak}
            </span>
            {milestone && currentStreak >= 7 && (
                <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    {currentStreak >= 365 ? '🏆' : currentStreak >= 100 ? '💎' : currentStreak >= 30 ? '🥇' : '⭐'}
                </span>
            )}
        </div>
    );
}
