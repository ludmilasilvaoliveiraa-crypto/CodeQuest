// CodeQuest - Home Page
import Link from 'next/link';
import { BookOpen, Zap, Trophy, Flame, Swords, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="animate-slide-up">
          <span className="text-6xl mb-6 block">🚀</span>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            CodeQuest
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Domine HTML de forma divertida! Aprenda, pratique e desafie amigos em uma jornada gamificada de programação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/learn">
                🎮 Começar Jornada
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="/login">
                Entrar
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-center mb-12 uppercase tracking-tighter">
          Por que CodeQuest?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-10 w-10 mb-4 text-primary" />,
              title: 'Lições Interativas',
              description: 'Aprenda HTML com exemplos práticos e editor de código ao vivo.'
            },
            {
              icon: <Zap className="h-10 w-10 mb-4 text-primary" />,
              title: 'Ganhe XP & Níveis',
              description: 'Evolua seu perfil, conquiste badges e desbloqueie recompensas.'
            },
            {
              icon: <Flame className="h-10 w-10 mb-4 text-primary" />,
              title: 'Streaks Diários',
              description: 'Mantenha sua sequência e ganhe bônus de XP multiplicados.'
            },
            {
              icon: <Trophy className="h-10 w-10 mb-4 text-primary" />,
              title: 'Ranking Global',
              description: 'Compete com outros estudantes e suba no leaderboard.'
            },
            {
              icon: <Swords className="h-10 w-10 mb-4 text-primary" />,
              title: 'Desafie Amigos',
              description: 'Duelos em tempo real ou desafios assíncronos.'
            },
            {
              icon: <Brain className="h-10 w-10 mb-4 text-primary" />,
              title: 'Flashcards SRS',
              description: 'Repetição espaçada para memorização eficiente.'
            },
          ].map((feature, i) => (
            <Card key={i} className="hover:-translate-y-2 transition-transform border-2 border-black dark:border-zinc-800 neo-shadow">
              <CardHeader>
                {feature.icon}
                <CardTitle className="uppercase font-black">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground font-medium">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="bg-secondary text-secondary-foreground border-2 border-black dark:border-zinc-700">
          <CardContent className="py-12">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-muted-foreground mb-6">
              Junte-se a milhares de estudantes aprendendo HTML de forma divertida!
            </p>
            <Button size="lg" asChild>
              <Link href="/learn">
                Iniciar Gratuitamente 🚀
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2026 CodeQuest. Feito com ❤️ para desenvolvedores.</p>
      </footer>
    </div>
  );
}
