// CodeQuest - Validation Feedback Component
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ValidationResult, ValidationMessage, ValidationSeverity } from '@/lib/html-validator';
import { getScoreFeedback } from '@/lib/html-validator';

interface ValidationFeedbackProps {
    result: ValidationResult | null;
    locale?: 'pt-BR' | 'en';
    className?: string;
}

const severityConfig: Record<ValidationSeverity, { icon: string; color: string; bgColor: string }> = {
    error: { icon: '❌', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-950' },
    warning: { icon: '⚠️', color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-950' },
    info: { icon: '💡', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-950' }
};

export function ValidationFeedback({ result, locale = 'pt-BR', className }: ValidationFeedbackProps) {
    if (!result) {
        return (
            <Card className={cn('opacity-50', className)}>
                <CardContent className="py-8 text-center text-muted-foreground">
                    {locale === 'pt-BR'
                        ? 'Escreva código HTML para ver a análise'
                        : 'Write HTML code to see the analysis'}
                </CardContent>
            </Card>
        );
    }

    const errorCount = result.messages.filter(m => m.severity === 'error').length;
    const warningCount = result.messages.filter(m => m.severity === 'warning').length;
    const infoCount = result.messages.filter(m => m.severity === 'info').length;

    return (
        <Card className={className}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                        {locale === 'pt-BR' ? '📋 Análise de Código' : '📋 Code Analysis'}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        {errorCount > 0 && (
                            <Badge variant="destructive">{errorCount} {locale === 'pt-BR' ? 'erros' : 'errors'}</Badge>
                        )}
                        {warningCount > 0 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                {warningCount} {locale === 'pt-BR' ? 'avisos' : 'warnings'}
                            </Badge>
                        )}
                        {infoCount > 0 && (
                            <Badge variant="outline">{infoCount} {locale === 'pt-BR' ? 'dicas' : 'tips'}</Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Score Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{locale === 'pt-BR' ? 'Pontuação' : 'Score'}</span>
                        <span className={cn(
                            'font-bold',
                            result.score >= 85 ? 'text-green-600' :
                                result.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                        )}>
                            {result.score}/100
                        </span>
                    </div>
                    <Progress
                        value={result.score}
                        className={cn(
                            'h-3',
                            result.score >= 85 ? '[&>div]:bg-green-500' :
                                result.score >= 70 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                        )}
                    />
                    <p className="text-sm text-muted-foreground">
                        {getScoreFeedback(result.score, locale)}
                    </p>
                </div>

                {/* Messages List */}
                {result.messages.length > 0 ? (
                    <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                            {result.messages.map((msg, index) => (
                                <MessageItem key={index} message={msg} locale={locale} />
                            ))}
                        </div>
                    </ScrollArea>
                ) : (
                    <div className="py-4 text-center">
                        <span className="text-4xl">✨</span>
                        <p className="mt-2 font-medium text-green-600">
                            {locale === 'pt-BR' ? 'Código sem problemas!' : 'Code looks perfect!'}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function MessageItem({ message, locale }: { message: ValidationMessage; locale: 'pt-BR' | 'en' }) {
    const config = severityConfig[message.severity];

    return (
        <div className={cn('rounded-lg p-3', config.bgColor)}>
            <div className="flex items-start gap-2">
                <span className="text-lg">{config.icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn('font-medium text-sm', config.color)}>
                            {locale === 'pt-BR' ? 'Linha' : 'Line'} {message.line}
                        </span>
                        <Badge variant="outline" className="text-xs">
                            {message.rule}
                        </Badge>
                    </div>
                    <p className="text-sm font-medium">{message.message}</p>
                    {message.suggestion && (
                        <p className="text-xs text-muted-foreground mt-1">
                            💡 {message.suggestion}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
