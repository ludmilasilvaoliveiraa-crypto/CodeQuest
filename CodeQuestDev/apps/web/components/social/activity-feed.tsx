// CodeQuest - Activity Feed Component
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { FriendActivity } from '@/lib/friends-service';
import { getActivityIcon, getActivityMessage, formatTimeAgo } from '@/lib/friends-service';

interface ActivityFeedProps {
    activities: FriendActivity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
    if (activities.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                    <span className="text-4xl block mb-2">📭</span>
                    Nenhuma atividade recente
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">📰 Atividade dos Amigos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {activities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={activity.friendImage} alt={activity.friendName} />
                            <AvatarFallback className="text-xs">
                                {activity.friendName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm">
                                <span className="font-medium">{activity.friendName}</span>{' '}
                                {getActivityMessage(activity)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {formatTimeAgo(activity.createdAt)}
                            </p>
                        </div>
                        <span className="text-xl">{getActivityIcon(activity.type)}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
