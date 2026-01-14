// CodeQuest - XP Progress Bar Component
'use client';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { LEVEL_THRESHOLDS } from '@repo/shared';

interface XPBarProps {
    currentXP: number;
    level: number;
    showAnimation?: boolean;
    className?: string;
}

export function XPBar({ currentXP, level, showAnimation = false, className }: XPBarProps) {
    // Calculate XP progress within current level
    const currentLevelXP = LEVEL_THRESHOLDS[level - 1] || 0;
    const nextLevelXP = LEVEL_THRESHOLDS[level] || currentLevelXP + 1000;
    const xpInLevel = currentXP - currentLevelXP;
    const xpNeeded = nextLevelXP - currentLevelXP;
    const progress = Math.min((xpInLevel / xpNeeded) * 100, 100);

    return (
        <div className={cn('space-y-1', className)}>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-purple-500 animate-xp-glow">
                        ⚡ {currentXP.toLocaleString()} XP
                    </span>
                </div>
                <span className="text-muted-foreground">
                    Level {level} → {level + 1}
                </span>
            </div>

            <div className="relative">
                <Progress
                    value={progress}
                    className={cn(
                        'h-3 bg-gray-200 dark:bg-gray-800',
                        showAnimation && 'animate-pulse'
                    )}
                />
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()}</span>
                <span>{Math.round(progress)}%</span>
            </div>
        </div>
    );
}
