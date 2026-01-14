// CodeQuest - Friend Card Component
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Friend } from '@/lib/friends-service';
import { getStatusColor, formatTimeAgo } from '@/lib/friends-service';

interface FriendCardProps {
    friend: Friend;
    onChallenge?: (friendId: string) => void;
    onRemove?: (friendId: string) => void;
}

export function FriendCard({ friend, onChallenge, onRemove }: FriendCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    {/* Avatar with status */}
                    <div className="relative">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={friend.image} alt={friend.name} />
                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {friend.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={cn(
                                'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
                                getStatusColor(friend.status)
                            )}
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{friend.name}</h3>
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                                Nv. {friend.level}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>{friend.xp.toLocaleString()} XP</span>
                            {friend.streak > 0 && (
                                <span className="flex items-center gap-1">
                                    🔥 {friend.streak}
                                </span>
                            )}
                            <span className="text-xs">
                                {friend.status === 'online' ? 'Online' : formatTimeAgo(friend.lastActive)}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        {onChallenge && (
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onChallenge(friend.id)}
                            >
                                ⚔️
                            </Button>
                        )}
                        {onRemove && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => onRemove(friend.id)}
                            >
                                ✕
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
