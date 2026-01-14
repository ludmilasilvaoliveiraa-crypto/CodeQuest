// CodeQuest - Monaco Code Editor Component
'use client';

import { useState, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
    initialCode?: string;
    language?: 'html' | 'css' | 'javascript';
    height?: string;
    readOnly?: boolean;
    showPreview?: boolean;
    layout?: 'split' | 'tabs';
    onCodeChange?: (code: string) => void;
    className?: string;
}

export function CodeEditor({
    initialCode = '<!DOCTYPE html>\n<html>\n<head>\n  <title>Minha Página</title>\n</head>\n<body>\n  <h1>Olá, Mundo!</h1>\n</body>\n</html>',
    language = 'html',
    height = '400px',
    readOnly = false,
    showPreview = true,
    layout = 'split',
    onCodeChange,
    className,
}: CodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

    const handleEditorChange = useCallback((value: string | undefined) => {
        const newCode = value || '';
        setCode(newCode);
        onCodeChange?.(newCode);
    }, [onCodeChange]);

    const resetCode = () => {
        setCode(initialCode);
        onCodeChange?.(initialCode);
    };

    // Generate preview HTML with styling
    const previewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif;
            padding: 16px;
            margin: 0;
          }
        </style>
      </head>
      <body>${code}</body>
    </html>
  `;

    const EditorComponent = (
        <div className="relative h-full">
            <Editor
                height="100%"
                language={language}
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    readOnly,
                    padding: { top: 12, bottom: 12 },
                }}
            />
            {!readOnly && (
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 text-xs opacity-60 hover:opacity-100"
                    onClick={resetCode}
                >
                    🔄 Reset
                </Button>
            )}
        </div>
    );

    const PreviewComponent = (
        <div className="h-full bg-white rounded-lg border overflow-hidden">
            <div className="bg-gray-100 px-3 py-1 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 bg-red-400 rounded-full" />
                    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <span className="text-xs text-gray-500 ml-2">Preview</span>
            </div>
            <iframe
                srcDoc={previewHtml}
                className="w-full h-[calc(100%-32px)] border-none"
                sandbox="allow-scripts"
                title="HTML Preview"
            />
        </div>
    );

    // Split Layout (side by side)
    if (layout === 'split' && showPreview) {
        return (
            <div
                className={cn('grid grid-cols-1 lg:grid-cols-2 gap-4', className)}
                style={{ height }}
            >
                <div className="rounded-lg overflow-hidden border bg-[#1e1e1e]">
                    {EditorComponent}
                </div>
                {PreviewComponent}
            </div>
        );
    }

    // Tabs Layout
    if (layout === 'tabs' && showPreview) {
        return (
            <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as 'code' | 'preview')}
                className={className}
            >
                <TabsList className="grid w-full grid-cols-2 mb-2">
                    <TabsTrigger value="code" className="gap-2">
                        💻 Código
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="gap-2">
                        👁️ Preview
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="code" style={{ height }}>
                    <div className="rounded-lg overflow-hidden border bg-[#1e1e1e] h-full">
                        {EditorComponent}
                    </div>
                </TabsContent>
                <TabsContent value="preview" style={{ height }}>
                    {PreviewComponent}
                </TabsContent>
            </Tabs>
        );
    }

    // Editor only
    return (
        <div
            className={cn('rounded-lg overflow-hidden border bg-[#1e1e1e]', className)}
            style={{ height }}
        >
            {EditorComponent}
        </div>
    );
}
