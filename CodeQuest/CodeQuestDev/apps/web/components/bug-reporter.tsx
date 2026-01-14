'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bug, Send, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type BugStatus = 'pending' | 'resolved';

interface BugReport {
    id: string;
    description: string;
    location: string;
    category: string;
    status: BugStatus;
    createdAt: string;
}

const BUG_CATEGORIES = [
    { id: 'visual', label: 'Visual', icon: '🎨' },
    { id: 'functional', label: 'Funcional', icon: '⚙️' },
    { id: 'content', label: 'Conteúdo', icon: '📝' },
    { id: 'other', label: 'Outro', icon: '❓' }
];

export function BugReporter() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('functional');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bugs, setBugs] = useState<BugReport[]>([]);
    const [activeTab, setActiveTab] = useState<'report' | 'list'>('report');

    useEffect(() => {
        if (isOpen) {
            fetchBugs();
        }
    }, [isOpen]);

    const fetchBugs = async () => {
        try {
            const res = await fetch('/api/bugs');
            if (res.ok) {
                const data = await res.json();
                setBugs(data.reverse()); // Show newest first
            }
        } catch (error) {
            console.error('Failed to fetch bugs', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/bugs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description,
                    location: pathname,
                    category
                }),
            });

            if (res.ok) {
                setDescription('');
                setCategory('functional');
                fetchBugs();
                setActiveTab('list'); // Switch to list view to see it
            }
        } catch (error) {
            console.error('Failed to submit bug', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full border-2 border-black neo-shadow-lg shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-y-1 transition-all z-50 bg-red-500 hover:bg-red-600 text-white"
                >
                    <Bug className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-2 border-black bg-background neo-shadow-lg p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 border-b-2 border-black bg-zinc-100 dark:bg-zinc-900">
                    <DialogTitle className="text-2xl font-black uppercase flex items-center gap-2">
                        🐞 Reportar Bug
                    </DialogTitle>
                    <DialogDescription className="font-medium text-black/60 dark:text-white/60">
                        Ajude-nos a melhorar o CodeQuest!
                    </DialogDescription>
                </DialogHeader>

                <div className="flex border-b-2 border-black">
                    <button
                        onClick={() => setActiveTab('report')}
                        className={cn(
                            "flex-1 p-3 font-bold uppercase text-sm border-r-2 border-black transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800",
                            activeTab === 'report' ? "bg-white dark:bg-background text-primary underline decoration-2 underline-offset-4" : "bg-zinc-100 dark:bg-zinc-900 text-muted-foreground"
                        )}
                    >
                        Novo Report
                    </button>
                    <button
                        onClick={() => setActiveTab('list')}
                        className={cn(
                            "flex-1 p-3 font-bold uppercase text-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800",
                            activeTab === 'list' ? "bg-white dark:bg-background text-primary underline decoration-2 underline-offset-4" : "bg-zinc-100 dark:bg-zinc-900 text-muted-foreground"
                        )}
                    >
                        Lista de Bugs ({bugs.filter(b => b.status === 'pending').length})
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'report' ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Categoria</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {BUG_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setCategory(cat.id)}
                                            className={cn(
                                                "p-2 text-sm font-medium border-2 rounded-sm transition-all text-left flex items-center gap-2",
                                                category === cat.id
                                                    ? "border-black bg-zinc-100 dark:bg-zinc-800 ring-1 ring-black/20"
                                                    : "border-transparent bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            )}
                                        >
                                            <span>{cat.icon}</span>
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Descrição do Problema</label>
                                <Textarea
                                    placeholder="O que aconteceu? Onde? Como reproduzir?"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="min-h-[120px] border-2 border-black resize-none font-medium bg-zinc-50 dark:bg-zinc-900 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase">
                                <span>Página: {pathname}</span>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !description.trim()}
                                className="w-full border-2 border-black font-black uppercase h-12 neo-shadow text-white bg-black hover:bg-black/90"
                            >
                                {isSubmitting ? 'Enviando...' : (
                                    <>
                                        Enviar Report <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                            {bugs.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8 font-medium">Nenhum bug reportado ainda.</p>
                            ) : (
                                bugs.map(bug => (
                                    <div key={bug.id} className="border-2 border-black p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className={cn(
                                                "border-2 font-bold uppercase text-[10px]",
                                                bug.status === 'resolved' ? "border-green-600 text-green-600 bg-green-50" : "border-amber-600 text-amber-600 bg-amber-50"
                                            )}>
                                                {bug.status === 'resolved' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                                {bug.status === 'resolved' ? 'Resolvido' : 'Pendente'}
                                            </Badge>
                                            <span className="text-[10px] font-bold text-muted-foreground">{bug.location}</span>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            {(() => {
                                                const cat = BUG_CATEGORIES.find(c => c.id === (bug.category || 'functional'));
                                                return cat ? (
                                                    <Badge variant="secondary" className="text-[10px] uppercase font-bold bg-zinc-100 dark:bg-zinc-800">
                                                        {cat.icon} {cat.label}
                                                    </Badge>
                                                ) : null;
                                            })()}
                                        </div>
                                        <p className="text-sm font-medium line-clamp-2">{bug.description}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
