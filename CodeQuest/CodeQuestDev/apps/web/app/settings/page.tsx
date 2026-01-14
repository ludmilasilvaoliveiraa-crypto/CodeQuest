// CodeQuest - Settings Page
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NotificationSettings } from '@/components/settings/notification-settings';

export default function SettingsPage() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [status]);

    if (status === 'loading') {
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
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="text-6xl mb-4 filter drop-shadow-[4px_4px_0px_#000000]">⚙️</div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Configurações</h1>
                        <p className="text-xl font-medium text-muted-foreground border-l-4 border-primary pl-4">
                            Gerencie sua conta e preferências
                        </p>
                    </div>
                    <Link href="/dashboard">
                        <Button variant="outline" className="border-2 border-black font-bold uppercase h-12 px-6 hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-y-1">
                            ← Voltar
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <Card className="border-2 border-black dark:border-zinc-700 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#fff] overflow-hidden">
                            <div className="bg-primary p-6 border-b-2 border-black flex justify-between items-center">
                                <h2 className="text-2xl font-black uppercase tracking-tight text-black">👤 Perfil</h2>
                                <Button size="sm" variant="ghost" className="h-8 border-2 border-black bg-white text-black font-bold hover:bg-black hover:text-white uppercase text-xs">
                                    Editar
                                </Button>
                            </div>
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="h-32 w-32 border-4 border-black shadow-[4px_4px_0px_0px_#000] mb-6">
                                        <AvatarImage src={session?.user?.image || undefined} className="object-cover" />
                                        <AvatarFallback className="text-4xl font-black bg-zinc-200 text-black">
                                            {session?.user?.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-black text-3xl uppercase tracking-tighter mb-1">{session?.user?.name}</h3>
                                    <p className="font-mono font-bold text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-sm border-2 border-transparent">
                                        {session?.user?.email}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notification Settings */}
                        <div className="border-2 border-black dark:border-zinc-700 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#3f3f46] bg-card overflow-hidden">
                            <NotificationSettings />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Data & Privacy */}
                        <Card className="border-2 border-black dark:border-zinc-700 shadow-[8px_8px_0px_0px_#000] dark:shadow-[8px_8px_0px_0px_#ccff00]">
                            <CardHeader className="border-b-2 border-black dark:border-zinc-700 pb-4 bg-zinc-100 dark:bg-zinc-900">
                                <CardTitle className="text-xl font-black uppercase flex items-center gap-3">
                                    <span className="text-2xl">💾</span> Dados & Privacidade
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="p-4 border-2 border-black rounded-sm hover:translate-x-1 transition-transform cursor-pointer group">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-black uppercase text-lg group-hover:text-primary transition-colors">Exportar Dados</h4>
                                        <span className="text-2xl">📥</span>
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground mb-4">Baixe uma cópia completa do seu histórico e progresso.</p>
                                    <Button variant="outline" className="w-full border-2 border-black font-bold uppercase hover:bg-black hover:text-white">
                                        Solicitar Download
                                    </Button>
                                </div>

                                <div className="p-4 border-2 border-red-500 bg-red-50 dark:bg-red-950/20 rounded-sm hover:translate-x-1 transition-transform cursor-pointer group">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-black uppercase text-lg text-red-600 dark:text-red-400">Zona de Perigo</h4>
                                        <span className="text-2xl">☢️</span>
                                    </div>
                                    <p className="text-sm font-medium text-red-800/70 dark:text-red-300/70 mb-4">Ações irreversíveis para sua conta.</p>
                                    <Button variant="outline" className="w-full border-2 border-red-500 text-red-600 hover:bg-red-600 hover:text-white font-bold uppercase">
                                        Excluir Conta
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About & Info */}
                        <Card className="border-2 border-black dark:border-zinc-700 shadow-[4px_4px_0px_0px_#000] bg-zinc-900 text-white">
                            <CardContent className="p-8 flex flex-col items-center text-center">
                                <div className="text-4xl font-black uppercase mb-2 tracking-tighter">CodeQuest</div>
                                <div className="text-xs font-mono mb-6 text-zinc-400">v1.0.0-beta</div>

                                <p className="font-medium text-zinc-300 mb-6 max-w-[200px]">
                                    Desenvolvido com 💚 e muito café para devoradores de código.
                                </p>

                                <div className="flex gap-4 w-full">
                                    <Button variant="secondary" className="flex-1 font-bold border-2 border-white hover:bg-white hover:text-black">
                                        Termos
                                    </Button>
                                    <Button variant="secondary" className="flex-1 font-bold border-2 border-white hover:bg-white hover:text-black">
                                        Privacidade
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
