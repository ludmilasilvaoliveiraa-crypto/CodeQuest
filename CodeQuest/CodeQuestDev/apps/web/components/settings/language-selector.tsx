// CodeQuest - Language Selector Component
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getLocale, setLocale, type Locale } from '@/lib/i18n';

const LANGUAGES = [
    { code: 'pt-BR' as Locale, name: 'Português', flag: '🇧🇷' },
    { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
];

export function LanguageSelector() {
    const [currentLocale, setCurrentLocale] = useState<Locale>('pt-BR');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setCurrentLocale(getLocale());
    }, []);

    const handleChange = (locale: Locale) => {
        setLocale(locale);
        setIsOpen(false);
    };

    const current = LANGUAGES.find(l => l.code === currentLocale) || LANGUAGES[0];

    if (!current) return null;

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
            >
                <span className="text-lg">{current.flag}</span>
                <span className="text-sm">{current.code}</span>
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border p-1 min-w-[150px] z-50">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => handleChange(lang.code)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-slate-800 text-left ${lang.code === currentLocale ? 'bg-gray-100 dark:bg-slate-800' : ''
                                }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="text-sm">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
