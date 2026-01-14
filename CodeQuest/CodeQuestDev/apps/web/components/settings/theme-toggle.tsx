import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Laptop } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('system');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as Theme;
        if (stored) {
            setTheme(stored);
            applyTheme(stored);
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement;

        if (newTheme === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
        } else {
            root.classList.toggle('dark', newTheme === 'dark');
        }
    };

    const cycleTheme = () => {
        const themes: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        // Default to 'system' if current theme is somehow invalid
        const validIndex = currentIndex === -1 ? 2 : currentIndex;

        const nextTheme = themes[(validIndex + 1) % themes.length];

        // Ensure nextTheme is defined (it always will be in this logic, but TS needs assurance)
        if (nextTheme) {
            setTheme(nextTheme);
            localStorage.setItem('theme', nextTheme);
            applyTheme(nextTheme);
        }
    };

    if (!mounted) return (
        <Button variant="ghost" size="icon" className="border-2 border-transparent">
            <span className="opacity-0">...</span>
        </Button>
    );

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={cycleTheme}
            className="border-2 border-black dark:border-zinc-500 bg-white dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            title={`Tema atual: ${theme === 'light' ? 'Claro' : theme === 'dark' ? 'Escuro' : 'Sistema'}`}
        >
            {theme === 'light' && <Sun className="h-5 w-5" />}
            {theme === 'dark' && <Moon className="h-5 w-5" />}
            {theme === 'system' && <Laptop className="h-5 w-5" />}
            <span className="sr-only">Alternar tema</span>
        </Button>
    );
}
