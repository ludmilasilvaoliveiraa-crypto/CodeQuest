// CodeQuest - Profile Page (Protected)
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import badge system
import { BADGES, RARITY_COLORS } from '@/lib/badge-system';

export default function ProfilePage() {
    const { data: session, status } = useSession();

    if (status === 'unauthenticated') {
        redirect('/login');
    }

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const user = session?.user;

    // Mock data (will come from database)
    const profile = {
        xp: 1250,
        level: 5,
        streak: 7,
        longestStreak: 14,
        lessonsCompleted: 5,
        questionsAnswered: 47,
        perfectLessons: 3,
        accuracy: 87,
        memberSince: new Date('2026-01-01'),
        earnedBadges: ['first-lesson', 'lesson-5', 'streak-3', 'streak-7']
    };

    // Get earned and locked badges
    const earnedBadges = BADGES.filter(b => profile.earnedBadges.includes(b.id));
    const lockedBadges = BADGES.filter(b => !profile.earnedBadges.includes(b.id));

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Profile Header */}
                <Card className="border-2 border-black dark:border-zinc-700 neo-shadow overflow-hidden">
                    <div className="h-32 bg-gradient-to-r from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-black border-b-2 border-black relative">
                        <div className="absolute -bottom-12 left-8">
                            <Avatar className="h-32 w-32 border-4 border-black dark:border-zinc-500 shadow-[4px_4px_0px_0px_#000]">
                                <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} className="object-cover" />
                                <AvatarFallback className="text-4xl font-black bg-zinc-100 text-black">
                                    {user?.name?.charAt(0).toUpperCase() || '?'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <CardContent className="pt-16 pb-8 px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter">{user?.name}</h1>
                                <p className="text-muted-foreground font-mono font-bold">@{user?.email?.split('@')[0]}</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <Badge className="bg-black text-white hover:bg-black/90 border-2 border-transparent uppercase">
                                        LVL {profile.level}
                                    </Badge>
                                    <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-2 border-black uppercase">
                                        🔥 {profile.streak} Dias Streak
                                    </Badge>
                                    <Badge variant="outline" className="border-2 border-black dark:border-zinc-500 font-bold uppercase text-xs">
                                        Desde {profile.memberSince.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
                                    </Badge>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-5xl font-black text-primary drop-shadow-[2px_2px_0px_#000]">
                                    {profile.xp.toLocaleString()}
                                </div>
                                <div className="text-sm uppercase tracking-widest font-black text-muted-foreground">XP Total</div>
                            </div>
                        </div>

                        {/* Level Progress */}
                        <div className="mt-8">
                            <div className="flex justify-between text-xs font-black uppercase mb-2">
                                <span>Nível {profile.level}</span>
                                <span className="text-muted-foreground">750 / 2000 XP</span>
                                <span>Nível {profile.level + 1}</span>
                            </div>
                            <Progress value={37} className="h-6 border-2 border-black bg-zinc-100 dark:bg-zinc-900 [&>div]:bg-primary" />
                        </div>
                    </CardContent>
                </Card>

                {/* Interactive Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Lições', value: profile.lessonsCompleted, icon: '📚', detail: 'Histórico de Lições' },
                        { label: 'Questões', value: profile.questionsAnswered, icon: '🤔', detail: 'Precisão por Tópico' },
                        { label: 'Precisão', value: `${profile.accuracy}%`, icon: '🎯', detail: 'Taxa de Acerto Global' },
                        { label: 'Streak', value: profile.longestStreak, icon: '🔥', detail: 'Maior Sequência' }
                    ].map((stat, i) => (
                        <Dialog key={i}>
                            <DialogTrigger asChild>
                                <Card className="border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all cursor-pointer bg-card group">
                                    <CardContent className="pt-6 pb-6 text-center">
                                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                                        <div className="text-3xl font-black">{stat.value}</div>
                                        <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{stat.label}</div>
                                    </CardContent>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="border-4 border-black neo-shadow max-w-sm">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black uppercase flex items-center gap-2">
                                        {stat.icon} {stat.label}
                                    </DialogTitle>
                                    <DialogDescription className="font-medium text-black">
                                        Detalhes sobre {stat.label.toLowerCase()}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-6 text-center bg-zinc-50 border-2 border-dashed border-black rounded-sm">
                                    <p className="font-mono text-sm text-muted-foreground">
                                        Gráfico de {stat.detail} virá aqui...
                                    </p>
                                    <div className="text-4xl font-black mt-4">{stat.value}</div>
                                    <p className="text-xs uppercase font-bold mt-2">Total Atual</p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>

                {/* Achievements Section */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Card className="border-2 border-black dark:border-zinc-700 neo-shadow cursor-pointer hover:border-primary transition-colors group">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="uppercase font-black text-2xl flex items-center gap-2">
                                        🏆 Conquistas
                                    </CardTitle>
                                    <CardDescription className="font-mono font-bold mt-1">
                                        {earnedBadges.length} de {BADGES.length} desbloqueadas
                                    </CardDescription>
                                </div>
                                <Button variant="ghost" className="border-2 border-black bg-white group-hover:bg-primary group-hover:text-black transition-colors font-bold uppercase">
                                    Ver Todas →
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                                    {earnedBadges.slice(0, 8).map(badge => (
                                        <div key={badge.id} className="aspect-square bg-card border-2 border-black flex items-center justify-center text-2xl" title={badge.name['pt-BR']}>
                                            {badge.icon}
                                        </div>
                                    ))}
                                    {Array.from({ length: Math.max(0, 8 - earnedBadges.length) }).map((_, i) => (
                                        <div key={i} className="aspect-square bg-zinc-50 border-2 border-dashed border-zinc-300 flex items-center justify-center opacity-50">
                                            🔒
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl border-4 border-black neo-shadow h-[80vh] flex flex-col p-0 gap-0">
                        <DialogHeader className="p-6 border-b-2 border-black bg-primary">
                            <DialogTitle className="text-3xl font-black uppercase text-black">Galeria de Conquistas</DialogTitle>
                            <DialogDescription className="text-black/80 font-bold">
                                Acompanhe seu progresso e desbloqueie novas badges!
                            </DialogDescription>
                        </DialogHeader>

                        <Tabs defaultValue="earned" className="flex-1 flex flex-col overflow-hidden">
                            <div className="px-6 pt-6">
                                <TabsList className="w-full justify-start border-2 border-black p-1 h-auto bg-white">
                                    <TabsTrigger value="earned" className="flex-1 font-black uppercase data-[state=active]:bg-black data-[state=active]:text-white h-9">
                                        Conquistadas ({earnedBadges.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="locked" className="flex-1 font-black uppercase data-[state=active]:bg-black data-[state=active]:text-white h-9">
                                        A Conquistar ({lockedBadges.length})
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="earned" className="flex-1 overflow-hidden m-0 p-6">
                                <ScrollArea className="h-full pr-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {earnedBadges.map(badge => (
                                            <div key={badge.id} className="border-2 border-black p-4 rounded-sm bg-card hover:bg-accent transition-colors text-center shadow-[4px_4px_0px_#22c55e]">
                                                <div className="text-5xl mb-3">{badge.icon}</div>
                                                <h3 className="font-black uppercase text-sm mb-1">{badge.name['pt-BR']}</h3>
                                                <p className="text-xs text-muted-foreground font-medium leading-tight">{badge.description['pt-BR']}</p>
                                                <div className="mt-3 inline-block px-2 py-0.5 bg-black text-white text-[10px] font-bold uppercase rounded-full">
                                                    +{badge.xpBonus} XP
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent value="locked" className="flex-1 overflow-hidden m-0 p-6">
                                <ScrollArea className="h-full pr-4">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {lockedBadges.map(badge => (
                                            <div key={badge.id} className="border-2 border-zinc-200 p-4 rounded-sm bg-zinc-50 text-center grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all cursor-help relative group">
                                                <div className="absolute top-2 right-2 text-xs">🔒</div>
                                                <div className="text-5xl mb-3">{badge.icon}</div>
                                                <h3 className="font-black uppercase text-sm mb-1">{badge.name['pt-BR']}</h3>
                                                <p className="text-xs text-muted-foreground font-medium leading-tight">{badge.description['pt-BR']}</p>
                                                <div className="mt-3 inline-block px-2 py-0.5 border-2 border-black text-black text-[10px] font-bold uppercase rounded-full">
                                                    {badge.xpBonus} XP
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
