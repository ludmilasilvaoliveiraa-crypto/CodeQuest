// CodeQuest - Friends Page
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FriendCard, ActivityFeed, Leaderboard } from '@/components/social';
import {
    getFriends,
    getFriendActivities,
    sendFriendRequest,
    removeFriend,
    type Friend,
    type FriendActivity
} from '@/lib/friends-service';

export default function FriendsPage() {
    const { data: session, status } = useSession();
    const [friends, setFriends] = useState<Friend[]>([]);
    const [activities, setActivities] = useState<FriendActivity[]>([]);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [status]);

    useEffect(() => {
        async function loadData() {
            try {
                const [friendsData, activitiesData] = await Promise.all([
                    getFriends(),
                    getFriendActivities(),
                ]);
                setFriends(friendsData);
                setActivities(activitiesData);
            } catch (error) {
                console.error('[Friends] Failed to load:', error);
            } finally {
                setIsLoading(false);
            }
        }

        if (session?.user) {
            loadData();
        }
    }, [session]);

    const handleAddFriend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        try {
            const result = await sendFriendRequest(email);
            setMessage({ type: 'success', text: result.message });
            setEmail('');
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro ao enviar solicitação' });
        }

        setTimeout(() => setMessage(null), 3000);
    };

    const handleRemoveFriend = async (friendId: string) => {
        if (!confirm('Tem certeza que deseja remover este amigo?')) return;

        await removeFriend(friendId);
        setFriends(friends.filter(f => f.id !== friendId));
    };

    const handleChallenge = (friendId: string) => {
        // TODO: Implement challenge system
        alert('Sistema de desafios em breve!');
    };

    // Create leaderboard from friends + current user
    const leaderboardEntries = [
        {
            rank: 0,
            id: session?.user?.id || 'me',
            name: session?.user?.name || 'Você',
            image: session?.user?.image || undefined,
            xp: 0, // Real XP will come from backend when implemented
            level: 1,
            isCurrentUser: true,
        },
        ...friends.map(f => ({
            rank: 0,
            id: f.id,
            name: f.name,
            image: f.image,
            xp: f.xp,
            level: f.level,
        })),
    ]
        .sort((a, b) => b.xp - a.xp)
        .map((entry, index) => ({ ...entry, rank: index + 1 }));

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin text-4xl">⏳</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">👥 Amigos</h1>
                        <p className="text-muted-foreground font-medium mt-1">Conecte-se e compita com seus amigos</p>
                    </div>
                    <Link href="/dashboard">
                        <Button variant="outline" className="border-2 border-black font-bold uppercase">← Voltar</Button>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Friends List */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Add Friend */}
                        <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                            <CardHeader className="border-b-2 border-black dark:border-zinc-700 pb-4">
                                <CardTitle className="text-xl font-black uppercase flex items-center gap-2">
                                    ➕ Adicionar Amigo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={handleAddFriend} className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Email do amigo..."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 border-2 border-black dark:border-zinc-700 focus-visible:ring-0 focus-visible:border-primary font-medium"
                                    />
                                    <Button type="submit" className="border-2 border-black font-bold uppercase shadow-[4px_4px_0px_0px_#000000] hover:translate-y-1 hover:shadow-none transition-all">
                                        Adicionar
                                    </Button>
                                </form>
                                {message && (
                                    <p className={`mt-3 font-bold text-sm bg-black/5 p-2 rounded-sm border border-black/10 ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                        {message.text}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Friends List */}
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                                Seus Amigos <span className="text-sm bg-black text-white px-2 py-1 rounded-full align-middle">{friends.length}</span>
                            </h2>
                            {friends.length === 0 ? (
                                <Card className="border-2 border-dashed border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50">
                                    <CardContent className="py-12 text-center text-muted-foreground">
                                        <span className="text-6xl block mb-4 filter grayscale opacity-50">🤝</span>
                                        <p className="font-bold text-lg">Você ainda não tem amigos.</p>
                                        <p className="text-sm">Adicione alguém para começar a competir!</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="space-y-4">
                                    {friends.map(friend => (
                                        <FriendCard
                                            key={friend.id}
                                            friend={friend}
                                            onChallenge={handleChallenge}
                                            onRemove={handleRemoveFriend}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Activity & Ranking */}
                    <div className="space-y-6">
                        {/* Leaderboard */}
                        <Leaderboard
                            title="🏆 Ranking de Amigos"
                            entries={leaderboardEntries}
                            currentUserId={session?.user?.id}
                        />

                        {/* Activity Feed */}
                        <ActivityFeed activities={activities} />
                    </div>
                </div>
            </div>
        </div>
    );
}
