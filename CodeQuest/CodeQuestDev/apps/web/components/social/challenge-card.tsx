// CodeQuest - Challenge Card Component
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import type { Challenge } from '@/lib/challenge-service';
import { getChallengeTypeInfo, getChallengeStatus, getTimeRemaining } from '@/lib/challenge-service';

interface ChallengeCardProps {
    challenge: Challenge;
    onSurrender?: (challengeId: string) => void;
}

export function ChallengeCard({ challenge, onSurrender }: ChallengeCardProps) {
    const typeInfo = getChallengeTypeInfo(challenge.type);
    const status = getChallengeStatus(challenge);
    const timeRemaining = getTimeRemaining(challenge.expiresAt);

    const isChallenger = challenge.challenger.id === 'me';
    const me = isChallenger ? challenge.challenger : challenge.opponent;
    const opponent = isChallenger ? challenge.opponent : challenge.challenger;

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{typeInfo.icon}</span>
                    <div>
                        <h3 className="font-semibold">{challenge.title}</h3>
                        <p className="text-xs text-muted-foreground">{typeInfo.name}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
                    {challenge.status === 'active' && (
                        <p className="text-xs text-muted-foreground">{timeRemaining}</p>
                    )}
                </div>
            </div>

            <CardContent className="p-4 space-y-4">
                {/* Players */}
                <div className="flex items-center gap-4">
                    {/* Me */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-8 w-8 border-2 border-primary">
                                <AvatarImage src={me.image} alt={me.name} />
                                <AvatarFallback className="text-xs">{me.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-sm">{me.name}</span>
                        </div>
                        <Progress value={(me.progress / challenge.goal) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                            {me.progress} / {challenge.goal}
                        </p>
                    </div>

                    <span className="text-2xl font-bold text-muted-foreground">VS</span>

                    {/* Opponent */}
                    <div className="flex-1 text-right">
                        <div className="flex items-center justify-end gap-2 mb-2">
                            <span className="font-medium text-sm">{opponent.name}</span>
                            <Avatar className="h-8 w-8 border-2 border-orange-400">
                                <AvatarImage src={opponent.image} alt={opponent.name} />
                                <AvatarFallback className="text-xs">{opponent.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <Progress value={(opponent.progress / challenge.goal) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                            {opponent.progress} / {challenge.goal}
                        </p>
                    </div>
                </div>

                {/* Reward */}
                <div className="flex items-center justify-between bg-yellow-50 dark:bg-yellow-950 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🏆</span>
                        <span className="text-sm font-medium">Recompensa</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-600">+{challenge.reward.xp} XP</span>
                        {challenge.reward.badge && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                + Badge
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                {challenge.status === 'active' && onSurrender && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => onSurrender(challenge.id)}
                    >
                        Desistir
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
