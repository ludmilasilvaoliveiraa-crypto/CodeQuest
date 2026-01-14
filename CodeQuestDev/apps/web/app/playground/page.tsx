// CodeQuest - Playground Page
// Live code editor demo page

import { CodeEditor } from '@/components/editor';

export default function PlaygroundPage() {
  const exampleCode = `<!DOCTYPE html>
<html>
<head>
  <title>Minha Primeira Página</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
      text-align: center;
    }
    h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    p {
      color: #666;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>🚀 CodeQuest</h1>
    <p>Edite o código e veja as mudanças ao vivo!</p>
  </div>
</body>
</html>`;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase mb-2">
            💻 Playground
          </h1>
          <p className="text-muted-foreground">
            Experimente HTML, CSS e JavaScript em tempo real
          </p>
        </div>

        {/* Split Layout Demo */}
        <section>
          <h2 className="text-xl font-semibold mb-4">📐 Layout Split (Lado a lado)</h2>
          <CodeEditor
            initialCode={exampleCode}
            height="500px"
            layout="split"
            showPreview={true}
          />
        </section>

        {/* Tabs Layout Demo */}
        <section>
          <h2 className="text-xl font-semibold mb-4">🗂️ Layout Tabs (Alternado)</h2>
          <CodeEditor
            initialCode={exampleCode}
            height="400px"
            layout="tabs"
            showPreview={true}
          />
        </section>
      </div>
    </div>
  );
}
