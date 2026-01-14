// CodeQuest - Leaderboard Component
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    image?: string;
    xp: number;
    level: number;
    isCurrentUser?: boolean;
}

interface LeaderboardProps {
    title?: string;
    entries: LeaderboardEntry[];
    currentUserId?: string;
}

export function Leaderboard({ title = '🏆 Ranking', entries, currentUserId }: LeaderboardProps) {
    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white';
            case 2: return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
            case 3: return 'bg-gradient-to-r from-amber-600 to-orange-700 text-white';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getRankEmoji = (rank: number) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {entries.map(entry => (
                    <div
                        key={entry.id}
                        className={cn(
                            'flex items-center gap-3 p-3 rounded-lg transition-colors',
                            entry.id === currentUserId
                                ? 'bg-primary/10 border-2 border-primary'
                                : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        )}
                    >
                        {/* Rank */}
                        <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                            getRankStyle(entry.rank)
                        )}>
                            {getRankEmoji(entry.rank) || entry.rank}
                        </div>

                        {/* Avatar */}
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={entry.image} alt={entry.name} />
                            <AvatarFallback>{entry.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-medium truncate">
                                    {entry.name}
                                    {entry.id === currentUserId && (
                                        <span className="text-xs text-primary ml-1">(você)</span>
                                    )}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Nível {entry.level}
                            </p>
                        </div>

                        {/* XP */}
                        <div className="text-right">
                            <p className="font-bold text-primary">
                                {entry.xp.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">XP</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
