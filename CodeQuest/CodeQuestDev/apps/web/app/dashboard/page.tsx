// CodeQuest - Dashboard Page (Protected)
import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    const user = session.user;

    // Mock data (will come from database)
    const stats = {
        xp: 1250,
        level: 5,
        streak: 7,
        lessonsCompleted: 5,
        totalLessons: 15,
        accuracy: 87,
        badges: 4
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header with user info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-black dark:border-zinc-500">
                            <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                            <AvatarFallback className="text-xl font-black bg-primary text-black">
                                {user.name?.charAt(0).toUpperCase() || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter">Olá, {user.name?.split(' ')[0]}! 👋</h1>
                            <p className="text-muted-foreground font-mono font-bold">LVL {stats.level} • {stats.xp.toLocaleString()} XP</p>
                        </div>
                    </div>

                    <form
                        action={async () => {
                            'use server';
                            await signOut({ redirectTo: '/' });
                        }}
                    >
                        <Button variant="outline" type="submit" className="border-2 border-black font-bold uppercase hover:bg-red-100 hover:text-red-900 hover:border-red-900 transition-colors">
                            Sair
                        </Button>
                    </form>
                </div>

                {/* Streak Card */}
                {stats.streak > 0 && (
                    <Card className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 neo-shadow">
                        <CardContent className="flex items-center justify-between py-6">
                            <div className="flex items-center gap-4">
                                <span className="text-5xl animate-pulse filter drop-shadow-sm">🔥</span>
                                <div>
                                    <p className="text-xl font-black uppercase tracking-wide">{stats.streak} DIAS DE STREAK!</p>
                                    <p className="text-sm text-muted-foreground font-medium">Continue assim para mais bônus de XP</p>
                                </div>
                            </div>
                            <div className="text-right p-2 bg-primary/20 border-2 border-black rounded-sm">
                                <p className="text-2xl font-black text-black">+{Math.round((stats.streak >= 7 ? 0.5 : stats.streak >= 3 ? 0.25 : 0) * 100)}%</p>
                                <p className="text-xs font-bold uppercase text-muted-foreground">Bônus de XP</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4">
                    <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-black">{stats.xp.toLocaleString()}</div>
                            <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">XP Total</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-black">{stats.lessonsCompleted}</div>
                            <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Lições Completas</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-black">{stats.accuracy}%</div>
                            <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Precisão</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-black dark:border-zinc-700 neo-shadow-sm">
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-black">{stats.badges}</div>
                            <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Badges</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Card */}
                <Card className="border-2 border-black dark:border-zinc-700 neo-shadow">
                    <CardHeader>
                        <CardTitle className="uppercase font-black">📄 Trilha HTML</CardTitle>
                        <CardDescription className="font-mono">Seu progresso atual</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex justify-between text-sm font-bold uppercase">
                                <span>{stats.lessonsCompleted} de {stats.totalLessons} lições</span>
                                <span>{Math.round((stats.lessonsCompleted / stats.totalLessons) * 100)}%</span>
                            </div>
                            <Progress value={(stats.lessonsCompleted / stats.totalLessons) * 100} className="h-4 border-2 border-black bg-zinc-100" />
                            <Button asChild className="w-full h-12 text-lg font-black uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
                                <Link href="/learn">
                                    Continuar Aprendendo →
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Link href="/learn">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">📚</span>
                                <h3 className="font-black text-xl uppercase mb-1">Aprender</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Continue suas lições</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/playground">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">💻</span>
                                <h3 className="font-black text-xl uppercase mb-1">Playground</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Experimente código</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/ranking">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🏆</span>
                                <h3 className="font-black text-xl uppercase mb-1">Ranking</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Veja o leaderboard</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/friends">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🤝</span>
                                <h3 className="font-black text-xl uppercase mb-1">Amigos</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Conecte-se</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/duel">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">⚔️</span>
                                <h3 className="font-black text-xl uppercase mb-1">Duelos</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Batalha em tempo real</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/challenges">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🎯</span>
                                <h3 className="font-black text-xl uppercase mb-1">Desafios</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Desafie amigos</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/flashcards">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🧠</span>
                                <h3 className="font-black text-xl uppercase mb-1">Flashcards</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Revisão espaçada</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/speedrun">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">⚡</span>
                                <h3 className="font-black text-xl uppercase mb-1">Speedrun</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Modo velocidade</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/validator">
                        <Card className="h-full border-2 border-black dark:border-zinc-700 neo-shadow-sm hover:-translate-y-2 transition-transform cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group">
                            <CardContent className="pt-8 text-center">
                                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">🔍</span>
                                <h3 className="font-black text-xl uppercase mb-1">Validador</h3>
                                <p className="text-sm font-medium text-muted-foreground group-hover:text-zinc-300 dark:group-hover:text-zinc-700">Verifique seu código</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
