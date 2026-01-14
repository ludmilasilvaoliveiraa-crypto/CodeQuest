// CodeQuest - Challenges Page
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChallengeCard } from '@/components/social/challenge-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    getChallenges,
    getChallengeInvites,
    acceptChallenge,
    declineChallenge,
    surrenderChallenge,
    type Challenge,
    type ChallengeInvite,
    getChallengeTypeInfo,
    getTimeRemaining,
} from '@/lib/challenge-service';

export default function ChallengesPage() {
    const { data: session, status } = useSession();
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [invites, setInvites] = useState<ChallengeInvite[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [status]);

    useEffect(() => {
        async function loadData() {
            try {
                const [challengesData, invitesData] = await Promise.all([
                    getChallenges(),
                    getChallengeInvites(),
                ]);
                setChallenges(challengesData);
                setInvites(invitesData);
            } catch (error) {
                console.error('[Challenges] Failed to load:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (session?.user) {
            loadData();
        }
    }, [session]);

    const handleAcceptInvite = async (inviteId: string) => {
        await acceptChallenge(inviteId);
        setInvites(invites.filter(i => i.id !== inviteId));
        // Reload challenges
        const updatedChallenges = await getChallenges();
        setChallenges(updatedChallenges);
    };

    const handleDeclineInvite = async (inviteId: string) => {
        await declineChallenge(inviteId);
        setInvites(invites.filter(i => i.id !== inviteId));
    };

    const handleSurrender = async (challengeId: string) => {
        if (!confirm('Tem certeza que deseja desistir deste desafio?')) return;
        await surrenderChallenge(challengeId);
        setChallenges(challenges.filter(c => c.id !== challengeId));
    };

    const activeChallenges = challenges.filter(c => c.status === 'active');
    const completedChallenges = challenges.filter(c => c.status === 'completed');

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin text-4xl">⏳</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">⚔️ Desafios</h1>
                        <p className="text-muted-foreground font-medium mt-1">Compita com seus amigos e suba no ranking</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/friends">
                            <Button variant="outline" className="border-2 border-black font-bold uppercase">👥 Amigos</Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" className="border-2 border-black font-bold uppercase">← Voltar</Button>
                        </Link>
                    </div>
                </div>

                {/* Pending Invites */}
                {invites.length > 0 && (
                    <Card className="mb-6 border-2 border-black dark:border-zinc-700 bg-orange-50 dark:bg-orange-950/10 neo-shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-black uppercase flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                📨 Convites Pendentes ({invites.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-2">
                            {invites.map(invite => {
                                const typeInfo = getChallengeTypeInfo(invite.type);
                                return (
                                    <div key={invite.id} className="flex items-center gap-4 bg-white dark:bg-zinc-900 rounded-sm p-4 border-2 border-black dark:border-zinc-700 shadow-sm">
                                        <Avatar className="border-2 border-black">
                                            <AvatarImage src={invite.from.image} alt={invite.from.name} />
                                            <AvatarFallback className="font-bold">{invite.from.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-bold text-lg">
                                                {invite.from.name} <span className="font-normal text-muted-foreground">te desafiou!</span>
                                            </p>
                                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                                                {typeInfo.icon} {typeInfo.name} <span className="mx-1">•</span> Meta: {invite.goal}
                                            </p>
                                            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 mt-1">
                                                {getTimeRemaining(invite.expiresAt)}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" onClick={() => handleAcceptInvite(invite.id)} className="bg-black text-white hover:bg-zinc-800 border-2 border-black font-bold uppercase">
                                                Aceitar
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDeclineInvite(invite.id)}
                                                className="border-2 border-black font-bold uppercase hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 hover:border-red-600"
                                            >
                                                Recusar
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                )}

                {/* Challenges Tabs */}
                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 border-2 border-black dark:border-zinc-700 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-sm mb-6">
                        <TabsTrigger value="active" className="font-bold uppercase data-[state=active]:bg-black data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                            🎮 Ativos ({activeChallenges.length})
                        </TabsTrigger>
                        <TabsTrigger value="completed" className="font-bold uppercase data-[state=active]:bg-black data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">
                            ✅ Finalizados ({completedChallenges.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="active" className="space-y-4">
                        {activeChallenges.length === 0 ? (
                            <Card className="border-2 border-dashed border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    <span className="text-6xl block mb-4 filter grayscale opacity-50">🎯</span>
                                    <p className="font-bold text-lg">Nenhum desafio ativo.</p>
                                    <p className="text-sm">Desafie um amigo para começar!</p>
                                </CardContent>
                            </Card>
                        ) : (
                            activeChallenges.map(challenge => (
                                <ChallengeCard
                                    key={challenge.id}
                                    challenge={challenge}
                                    onSurrender={handleSurrender}
                                />
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-4">
                        {completedChallenges.length === 0 ? (
                            <Card className="border-2 border-dashed border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                    <span className="text-6xl block mb-4 filter grayscale opacity-50">📜</span>
                                    <p className="font-bold text-lg">Nenhum desafio finalizado ainda.</p>
                                </CardContent>
                            </Card>
                        ) : (
                            completedChallenges.map(challenge => (
                                <ChallengeCard key={challenge.id} challenge={challenge} />
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
