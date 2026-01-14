'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Send, CheckCircle2, Circle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureStatus = 'planned' | 'considered' | 'implemented';

interface FeatureRequest {
    id: string;
    description: string;
    location: string;
    category: string;
    status: FeatureStatus;
    votes: number;
    createdAt: string;
}

const FEATURE_CATEGORIES = [
    { id: 'visual', label: 'Design', icon: '🎨' },
    { id: 'functional', label: 'Funcionalidade', icon: '⚙️' },
    { id: 'content', label: 'Conteúdo', icon: '📝' },
    { id: 'other', label: 'Outro', icon: '❓' }
];

export function FeatureRequester() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('functional');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [features, setFeatures] = useState<FeatureRequest[]>([]);
    const [activeTab, setActiveTab] = useState<'request' | 'list'>('request');

    useEffect(() => {
        if (isOpen) {
            fetchFeatures();
        }
    }, [isOpen]);

    const fetchFeatures = async () => {
        try {
            const res = await fetch('/api/features');
            if (res.ok) {
                const data = await res.json();
                setFeatures(data.reverse()); // Show newest first
            }
        } catch (error) {
            console.error('Failed to fetch features', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/features', {
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
                fetchFeatures();
                setActiveTab('list'); // Switch to list view to see it
            }
        } catch (error) {
            console.error('Failed to submit feature', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusIcon = (status: FeatureStatus) => {
        switch (status) {
            case 'implemented': return <CheckCircle2 className="h-3 w-3 mr-1" />;
            case 'planned': return <Clock className="h-3 w-3 mr-1" />;
            case 'considered': default: return <Circle className="h-3 w-3 mr-1" />;
        }
    };

    const getStatusLabel = (status: FeatureStatus) => {
        switch (status) {
            case 'implemented': return 'Implementado';
            case 'planned': return 'Planejado';
            case 'considered': return 'Em Análise';
            default: return status;
        }
    };

    const getStatusColor = (status: FeatureStatus) => {
        switch (status) {
            case 'implemented': return "border-green-600 text-green-600 bg-green-50";
            case 'planned': return "border-blue-600 text-blue-600 bg-blue-50";
            case 'considered': return "border-zinc-500 text-zinc-500 bg-zinc-50";
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-24 right-6 h-14 w-14 rounded-full border-2 border-black neo-shadow-lg shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-y-1 transition-all z-50 bg-blue-500 hover:bg-blue-600 text-white"
                >
                    <Lightbulb className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md border-2 border-black bg-background neo-shadow-lg p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2 border-b-2 border-black bg-blue-50 dark:bg-zinc-900">
                    <DialogTitle className="text-2xl font-black uppercase flex items-center gap-2">
                        💡 Nova Ideia
                    </DialogTitle>
                    <DialogDescription className="font-medium text-black/60 dark:text-white/60">
                        O que você gostaria de ver no CodeQuest?
                    </DialogDescription>
                </DialogHeader>

                <div className="flex border-b-2 border-black">
                    <button
                        onClick={() => setActiveTab('request')}
                        className={cn(
                            "flex-1 p-3 font-bold uppercase text-sm border-r-2 border-black transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800",
                            activeTab === 'request' ? "bg-white dark:bg-background text-blue-600 underline decoration-2 underline-offset-4" : "bg-zinc-100 dark:bg-zinc-900 text-muted-foreground"
                        )}
                    >
                        Sugerir
                    </button>
                    <button
                        onClick={() => setActiveTab('list')}
                        className={cn(
                            "flex-1 p-3 font-bold uppercase text-sm transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800",
                            activeTab === 'list' ? "bg-white dark:bg-background text-blue-600 underline decoration-2 underline-offset-4" : "bg-zinc-100 dark:bg-zinc-900 text-muted-foreground"
                        )}
                    >
                        Sugestões ({features.length})
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'request' ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase">Categoria</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {FEATURE_CATEGORIES.map(cat => (
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
                                <label className="text-sm font-bold uppercase">Sua Ideia</label>
                                <Textarea
                                    placeholder="Descreva sua funcionalidade dos sonhos..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="min-h-[120px] border-2 border-black resize-none font-medium bg-zinc-50 dark:bg-zinc-900 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase">
                                <span>Página Relacionada: {pathname}</span>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !description.trim()}
                                className="w-full border-2 border-black font-black uppercase h-12 neo-shadow text-white bg-blue-600 hover:bg-blue-700"
                            >
                                {isSubmitting ? 'Enviando...' : (
                                    <>
                                        Enviar Sugestão <Send className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                            {features.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8 font-medium">Nenhuma sugestão ainda. Seja o primeiro!</p>
                            ) : (
                                features.map(feature => (
                                    <div key={feature.id} className="border-2 border-black p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="outline" className={cn(
                                                "border-2 font-bold uppercase text-[10px]",
                                                getStatusColor(feature.status)
                                            )}>
                                                {getStatusIcon(feature.status)}
                                                {getStatusLabel(feature.status)}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-2 mb-2">
                                            {(() => {
                                                const cat = FEATURE_CATEGORIES.find(c => c.id === (feature.category || 'functional'));
                                                return cat ? (
                                                    <Badge variant="secondary" className="text-[10px] uppercase font-bold bg-zinc-100 dark:bg-zinc-800">
                                                        {cat.icon} {cat.label}
                                                    </Badge>
                                                ) : null;
                                            })()}
                                        </div>
                                        <p className="text-sm font-medium line-clamp-2">{feature.description}</p>
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
