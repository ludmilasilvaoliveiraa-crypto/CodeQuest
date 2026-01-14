// CodeQuest - Login Page (Client-side with proper signIn)
'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
    const handleGoogleSignIn = () => {
        // Use next-auth/react signIn function for proper OAuth flow
        signIn('google', { callbackUrl: '/dashboard' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="text-5xl mb-4 block">🚀</span>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        CodeQuest
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Entre para salvar seu progresso
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border">
                    <h2 className="text-xl font-semibold text-center mb-6">
                        Bem-vindo de volta!
                    </h2>

                    {/* Google Sign In Button */}
                    <Button
                        onClick={handleGoogleSignIn}
                        variant="outline"
                        className="w-full flex items-center justify-center gap-3 py-6 text-base"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continuar com Google
                    </Button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
                                Ou entre como convidado (Local)
                            </span>
                        </div>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const name = formData.get('name') as string;
                            if (name) signIn('credentials', { name, callbackUrl: '/dashboard' });
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <input
                                name="name"
                                type="text"
                                placeholder="Seu nome de jogador"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full font-bold uppercase transition-transform active:scale-95">
                            🎮 Entrar como Convidado
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        <p>
                            Ao entrar, você concorda com nossos{' '}
                            <Link href="/terms" className="text-primary hover:underline">
                                Termos de Uso
                            </Link>{' '}
                            e{' '}
                            <Link href="/privacy" className="text-primary hover:underline">
                                Política de Privacidade
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Continue without login */}
                <div className="mt-4 text-center">
                    <Link
                        href="/learn"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        Continuar sem login →
                    </Link>
                </div>
            </div>
        </div>
    );
}
