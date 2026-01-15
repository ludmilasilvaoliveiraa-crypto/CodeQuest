// CodeQuest - Friend Request Card Component
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { FriendRequest } from '@/lib/friends-service';
import { formatTimeAgo } from '@/lib/friends-service';

interface FriendRequestCardProps {
    request: FriendRequest;
    onAccept?: (requestId: string) => void;
    onReject?: (requestId: string) => void;
}

export function FriendRequestCard({ request, onAccept, onReject }: FriendRequestCardProps) {
    return (
        <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={request.from.image} alt={request.from.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {request.from.name?.charAt(0).toUpperCase() || '?'}
                        </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">{request.from.name}</h3>
                            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                                Nv. {request.from.level}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.from.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {formatTimeAgo(request.createdAt)}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        {onAccept && (
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_#000000] hover:translate-y-0.5 hover:shadow-none transition-all"
                                onClick={() => onAccept(request.id)}
                            >
                                ✓ Aceitar
                            </Button>
                        )}
                        {onReject && (
                            <Button
                                size="sm"
                                variant="outline"
                                className="border-2 border-black font-bold hover:bg-red-50 dark:hover:bg-red-950"
                                onClick={() => onReject(request.id)}
                            >
                                ✕ Rejeitar
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
