// CodeQuest - Notification Settings Component
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { notificationService } from '@/lib/notification-service';

interface NotificationPreference {
    id: string;
    label: string;
    description: string;
    enabled: boolean;
}

export function NotificationSettings() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isLoading, setIsLoading] = useState(false);
    const [preferences, setPreferences] = useState<NotificationPreference[]>([
        { id: 'challenges', label: '⚔️ Desafios', description: 'Novos desafios e resultados', enabled: true },
        { id: 'friends', label: '👥 Amigos', description: 'Solicitações e atividades', enabled: true },
        { id: 'achievements', label: '🏆 Conquistas', description: 'Badges e level up', enabled: true },
        { id: 'streaks', label: '🔥 Streak', description: 'Lembretes para manter seu streak', enabled: true },
        { id: 'duels', label: '⚔️ Duelos', description: 'Convites para duelos em tempo real', enabled: true },
    ]);

    useEffect(() => {
        setPermission(notificationService.getPermission());
    }, []);

    const handleRequestPermission = async () => {
        setIsLoading(true);
        const result = await notificationService.requestPermission();
        setPermission(result);
        setIsLoading(false);

        if (result === 'granted') {
            // Subscribe to push notifications
            await notificationService.subscribeToPush();
        }
    };

    const handleTestNotification = () => {
        notificationService.showNotification({
            title: '🎉 Notificações Ativadas!',
            body: 'Você receberá alertas sobre desafios, amigos e conquistas.',
        });
    };

    const togglePreference = (id: string) => {
        setPreferences(prefs =>
            prefs.map(p =>
                p.id === id ? { ...p, enabled: !p.enabled } : p
            )
        );
        // TODO: Save to server/localStorage
    };

    return (
        <>
            <CardHeader className="border-b-2 border-black dark:border-zinc-700 pb-4">
                <CardTitle className="text-xl font-black uppercase flex items-center gap-2">🔔 Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Permission Status */}
                <div className="bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-zinc-700 rounded-sm p-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold uppercase text-sm">Status das Notificações</span>
                        {permission === 'granted' ? (
                            <span className="bg-green-100 text-green-900 border-2 border-green-900 px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1">
                                ✓ Ativadas
                            </span>
                        ) : permission === 'denied' ? (
                            <span className="bg-red-100 text-red-900 border-2 border-red-900 px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1">
                                ✕ Bloqueadas
                            </span>
                        ) : (
                            <span className="bg-yellow-100 text-yellow-900 border-2 border-yellow-900 px-2 py-0.5 text-xs font-black uppercase flex items-center gap-1">
                                ⚠ Não ativadas
                            </span>
                        )}
                    </div>

                    {permission === 'default' && (
                        <Button
                            onClick={handleRequestPermission}
                            disabled={isLoading}
                            className="w-full border-2 border-black shadow-[2px_2px_0px_0px_#000] font-bold uppercase transition-transform active:translate-y-0.5 active:shadow-none"
                        >
                            {isLoading ? '...' : '🔔 Ativar Notificações'}
                        </Button>
                    )}

                    {permission === 'granted' && (
                        <Button
                            variant="outline"
                            onClick={handleTestNotification}
                            className="w-full border-2 border-black font-bold uppercase hover:bg-black hover:text-white transition-colors"
                        >
                            📤 Enviar Notific. de Teste
                        </Button>
                    )}

                    {permission === 'denied' && (
                        <p className="text-xs font-medium text-muted-foreground mt-2">
                            * Notificações bloqueadas pelo navegador. Ative nas configurações do site.
                        </p>
                    )}
                </div>

                {/* Preferences */}
                {permission === 'granted' && (
                    <div className="space-y-4">
                        <h3 className="font-black uppercase text-sm border-b-2 border-dashed border-zinc-300 dark:border-zinc-700 pb-2">Preferências</h3>
                        {preferences.map(pref => (
                            <div key={pref.id} className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-sm uppercase">{pref.label}</p>
                                    <p className="text-xs text-muted-foreground font-medium">{pref.description}</p>
                                </div>
                                <Switch
                                    checked={pref.enabled}
                                    onCheckedChange={() => togglePreference(pref.id)}
                                    className="border-2 border-black"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </>
    );
}
