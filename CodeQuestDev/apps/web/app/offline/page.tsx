// CodeQuest - Offline Page
// Shown when user is offline and page is not cached
'use client';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="text-8xl mb-6">📡</div>
                <h1 className="text-3xl font-bold mb-4">Você está offline</h1>
                <p className="text-muted-foreground mb-6">
                    Parece que você perdeu a conexão com a internet.
                    Algumas funcionalidades podem estar limitadas.
                </p>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border">
                        <h2 className="font-semibold mb-2">✅ Disponível offline:</h2>
                        <ul className="text-sm text-muted-foreground text-left list-disc list-inside">
                            <li>Seu progresso salvo localmente</li>
                            <li>Lições já acessadas</li>
                            <li>Playground de código</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border">
                        <h2 className="font-semibold mb-2">❌ Precisa de internet:</h2>
                        <ul className="text-sm text-muted-foreground text-left list-disc list-inside">
                            <li>Login com Google</li>
                            <li>Sincronização de progresso</li>
                            <li>Desafios e ranking</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        </div>
    );
}
