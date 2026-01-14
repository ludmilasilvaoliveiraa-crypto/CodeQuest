// CodeQuest - Global Ranking Page
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaderboard } from '@/components/social/leaderboard';

interface RankingEntry {
    rank: number;
    id: string;
    name: string;
    image?: string;
    xp: number;
    level: number;
}

// Mock data for different rankings
const MOCK_WEEKLY: RankingEntry[] = [
    { rank: 1, id: '1', name: 'Maria Oliveira', xp: 2450, level: 12 },
    { rank: 2, id: '2', name: 'João Pedro', xp: 1890, level: 9 },
    { rank: 3, id: '3', name: 'Ana Silva', xp: 1650, level: 8 },
    { rank: 4, id: 'me', name: 'Você', xp: 1250, level: 5 },
    { rank: 5, id: '4', name: 'Carlos Santos', xp: 1100, level: 5 },
    { rank: 6, id: '5', name: 'Fernanda Costa', xp: 980, level: 4 },
    { rank: 7, id: '6', name: 'Lucas Almeida', xp: 850, level: 4 },
    { rank: 8, id: '7', name: 'Beatriz Lima', xp: 720, level: 3 },
    { rank: 9, id: '8', name: 'Rafael Souza', xp: 650, level: 3 },
    { rank: 10, id: '9', name: 'Juliana Martins', xp: 580, level: 3 },
];

const MOCK_MONTHLY: RankingEntry[] = [
    { rank: 1, id: '1', name: 'Maria Oliveira', xp: 8500, level: 12 },
    { rank: 2, id: '2', name: 'João Pedro', xp: 7200, level: 9 },
    { rank: 3, id: 'me', name: 'Você', xp: 5600, level: 5 },
    { rank: 4, id: '3', name: 'Ana Silva', xp: 5400, level: 8 },
    { rank: 5, id: '4', name: 'Carlos Santos', xp: 4800, level: 5 },
    { rank: 6, id: '5', name: 'Fernanda Costa', xp: 4200, level: 4 },
    { rank: 7, id: '6', name: 'Lucas Almeida', xp: 3900, level: 4 },
    { rank: 8, id: '7', name: 'Beatriz Lima', xp: 3500, level: 3 },
    { rank: 9, id: '8', name: 'Rafael Souza', xp: 3200, level: 3 },
    { rank: 10, id: '9', name: 'Juliana Martins', xp: 2800, level: 3 },
];

const MOCK_ALLTIME: RankingEntry[] = [
    { rank: 1, id: '1', name: 'Maria Oliveira', xp: 45000, level: 25 },
    { rank: 2, id: '10', name: 'Pedro Augusto', xp: 42000, level: 23 },
    { rank: 3, id: '2', name: 'João Pedro', xp: 38000, level: 21 },
    { rank: 4, id: '11', name: 'Camila Rocha', xp: 35000, level: 20 },
    { rank: 5, id: '3', name: 'Ana Silva', xp: 32000, level: 18 },
    { rank: 6, id: '4', name: 'Carlos Santos', xp: 28000, level: 16 },
    { rank: 7, id: '5', name: 'Fernanda Costa', xp: 25000, level: 15 },
    { rank: 8, id: '6', name: 'Lucas Almeida', xp: 22000, level: 14 },
    { rank: 9, id: '7', name: 'Beatriz Lima', xp: 19000, level: 12 },
    { rank: 10, id: '8', name: 'Rafael Souza', xp: 16000, level: 11 },
    { rank: 42, id: 'me', name: 'Você', xp: 5600, level: 5 },
];

export default function RankingPage() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [weeklyRanking, setWeeklyRanking] = useState<RankingEntry[]>([]);
    const [monthlyRanking, setMonthlyRanking] = useState<RankingEntry[]>([]);
    const [allTimeRanking, setAllTimeRanking] = useState<RankingEntry[]>([]);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setWeeklyRanking(MOCK_WEEKLY);
            setMonthlyRanking(MOCK_MONTHLY);
            setAllTimeRanking(MOCK_ALLTIME);
            setIsLoading(false);
        }, 500);
    }, []);

    // Find user's position
    const weeklyPosition = weeklyRanking.find(r => r.id === 'me')?.rank || 0;
    const monthlyPosition = monthlyRanking.find(r => r.id === 'me')?.rank || 0;
    const allTimePosition = allTimeRanking.find(r => r.id === 'me')?.rank || 0;

    if (isLoading) {
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
                        <h1 className="text-4xl font-black uppercase tracking-tighter">🏆 Ranking Global</h1>
                        <p className="text-muted-foreground font-medium mt-1">Veja onde você está entre os melhores</p>
                    </div>
                    <Link href="/dashboard">
                        <Button variant="outline" className="border-2 border-black font-bold uppercase">← Voltar</Button>
                    </Link>
                </div>

                {/* User Position Summary */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <Card className="text-center border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="py-6">
                            <p className="text-4xl font-black text-primary stroke-black">#{weeklyPosition}</p>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Semanal</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="py-6">
                            <p className="text-4xl font-black text-primary">#{monthlyPosition}</p>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Mensal</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="py-6">
                            <p className="text-4xl font-black text-primary">#{allTimePosition}</p>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">Geral</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Ranking Tabs */}
                <Tabs defaultValue="weekly" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 border-2 border-black dark:border-zinc-700 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-sm">
                        <TabsTrigger value="weekly" className="font-bold uppercase data-[state=active]:bg-black data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">📅 Semanal</TabsTrigger>
                        <TabsTrigger value="monthly" className="font-bold uppercase data-[state=active]:bg-black data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">📆 Mensal</TabsTrigger>
                        <TabsTrigger value="alltime" className="font-bold uppercase data-[state=active]:bg-black data-[state=active]:text-primary data-[state=active]:shadow-none rounded-none">🌟 Geral</TabsTrigger>
                    </TabsList>

                    <TabsContent value="weekly" className="mt-6">
                        <Leaderboard
                            title="🔥 Top 10 Esta Semana"
                            entries={weeklyRanking.slice(0, 10)}
                            currentUserId="me"
                        />
                    </TabsContent>

                    <TabsContent value="monthly" className="mt-6">
                        <Leaderboard
                            title="📈 Top 10 Este Mês"
                            entries={monthlyRanking.slice(0, 10)}
                            currentUserId="me"
                        />
                    </TabsContent>

                    <TabsContent value="alltime" className="mt-6">
                        <Leaderboard
                            title="👑 Top 10 de Todos os Tempos"
                            entries={allTimeRanking.slice(0, 10)}
                            currentUserId="me"
                        />
                        {/* Show user if not in top 10 */}
                        {allTimePosition > 10 && (
                            <Card className="mt-4 border-2 border-black dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900">
                                <CardContent className="py-4">
                                    <p className="text-center text-muted-foreground font-medium">
                                        Sua posição: <span className="font-black text-primary text-lg">#{allTimePosition}</span>
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
