// CodeQuest - Complete HTML Learning Content
// Based on W3Schools curriculum - From Beginner to Advanced

export interface LearningModule {
    id: string;
    name: string;
    description: string;
    icon: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    lessons: Lesson[];
    requiredXP?: number;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    content: LessonContent;
    quiz: QuizQuestion[];
    xpReward: number;
    estimatedTime: number; // minutes
}

export interface LessonContent {
    introduction: string;
    sections: ContentSection[];
    tips?: string[];
    commonMistakes?: string[];
}

export interface ContentSection {
    title: string;
    text: string;
    code?: string;
    codeOutput?: string;
}

export interface QuizQuestion {
    id: string;
    type: 'multiple-choice' | 'fill-blank' | 'code-fix' | 'true-false';
    question: string;
    code?: string;
    options?: string[];
    correctAnswer: string | number;
    explanation: string;
    points: number;
}

// ============================================
// MODULE 1: HTML BASICS (Beginner)
// ============================================

export const MODULE_BASICS: LearningModule = {
    id: 'basics',
    name: 'Fundamentos HTML',
    description: 'Aprenda a base do HTML: estrutura, elementos e atributos',
    icon: '📝',
    difficulty: 'beginner',
    lessons: [
        {
            id: 'intro-completo',
            title: 'Introdução Completa ao HTML',
            description: 'Tudo sobre HTML: estrutura, elementos, tags e como a web funciona',
            xpReward: 150,
            estimatedTime: 25,
            content: {
                introduction: 'HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Nesta lição completa, você aprenderá desde o básico até a estrutura completa de um documento HTML.',
                sections: [
                    {
                        title: 'O que é HTML?',
                        text: 'HTML significa HyperText Markup Language (Linguagem de Marcação de HiperTexto). É a linguagem padrão para criar páginas web. HTML descreve a estrutura de uma página usando marcações (tags). Cada tag define um tipo diferente de conteúdo como "isto é um título", "isto é um parágrafo", "isto é um link".',
                    },
                    {
                        title: 'Estrutura Básica de um Documento HTML',
                        text: 'Todo documento HTML tem uma estrutura básica com elementos obrigatórios. O <!DOCTYPE html> declara que é um documento HTML5. O elemento <html> é a raiz. O <head> contém metadados. O <body> contém todo o conteúdo visível.',
                        code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Título da Página</title>\n</head>\n<body>\n  <h1>Meu Primeiro Título</h1>\n  <p>Meu primeiro parágrafo.</p>\n</body>\n</html>',
                    },
                    {
                        title: 'Elementos HTML',
                        text: 'Um elemento HTML é tudo desde a tag de abertura até a tag de fechamento. A estrutura é: <tag>conteúdo</tag>. A tag de abertura inicia, o conteúdo fica no meio, e a tag de fechamento (com /) termina o elemento.',
                        code: '<h1>Este é um título</h1>\n<p>Este é um parágrafo</p>\n<a href="url">Este é um link</a>',
                    },
                    {
                        title: 'Elementos Aninhados',
                        text: 'Elementos HTML podem conter outros elementos. Isso se chama aninhamento. O documento HTML é formado por elementos aninhados. É importante fechar as tags na ordem correta.',
                        code: '<html>\n  <body>\n    <h1>Título dentro do body</h1>\n    <p>Parágrafo com <strong>texto em negrito</strong> dentro.</p>\n  </body>\n</html>',
                    },
                    {
                        title: 'Elementos Vazios',
                        text: 'Alguns elementos não têm conteúdo e não precisam de tag de fechamento. São chamados de elementos vazios. Exemplos: <br> para quebra de linha, <hr> para linha horizontal, <img> para imagens.',
                        code: '<p>Primeira linha.<br>Segunda linha.</p>\n<hr>\n<img src="foto.jpg" alt="Descrição da foto">',
                    },
                    {
                        title: 'Como os Navegadores Funcionam',
                        text: 'O navegador (Chrome, Firefox, Safari, Edge) lê o código HTML e renderiza a página. O navegador não exibe as tags, mas usa elas para interpretar como o conteúdo deve ser exibido.',
                    },
                    {
                        title: 'DOCTYPE e Versões HTML',
                        text: 'O <!DOCTYPE html> deve ser a primeira linha de todo documento HTML. Ele indica ao navegador qual versão do HTML está sendo usada. Para HTML5 (versão atual), usamos simplesmente <!DOCTYPE html>.',
                        code: '<!DOCTYPE html>\n<!-- Isso declara um documento HTML5 -->',
                    },
                    {
                        title: 'Boas Práticas',
                        text: 'Sempre declare o DOCTYPE. Use letras minúsculas para tags (recomendado). Sempre feche suas tags. Use indentação para organizar o código.',
                        code: '<!DOCTYPE html>\n<html>\n  <head>\n    <title>Boas Práticas</title>\n  </head>\n  <body>\n    <h1>Código Organizado</h1>\n  </body>\n</html>',
                    },
                ],
                tips: [
                    'Todo documento HTML começa com <!DOCTYPE html>',
                    'Use apenas um <h1> por página',
                    'Sempre feche suas tags na ordem correta',
                    'Indente seu código para melhor legibilidade',
                    'HTML não é case-sensitive, mas use minúsculas',
                ],
                commonMistakes: [
                    'Esquecer o <!DOCTYPE html>',
                    'Não fechar tags corretamente',
                    'Aninhar tags na ordem errada',
                    'Esquecer as aspas nos valores de atributos',
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'O que significa HTML?',
                    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'],
                    correctAnswer: 0,
                    explanation: 'HTML significa HyperText Markup Language - Linguagem de Marcação de HiperTexto',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual é a primeira linha de um documento HTML5?',
                    options: ['<html>', '<head>', '<!DOCTYPE html>', '<body>'],
                    correctAnswer: 2,
                    explanation: '<!DOCTYPE html> deve ser a primeira linha, declarando que é um documento HTML5',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'multiple-choice',
                    question: 'Qual tag contém todo o conteúdo visível da página?',
                    options: ['<head>', '<html>', '<content>', '<body>'],
                    correctAnswer: 3,
                    explanation: 'O elemento <body> contém todo o conteúdo visível da página web',
                    points: 10,
                },
                {
                    id: 'q4',
                    type: 'multiple-choice',
                    question: 'Qual é a estrutura correta de um elemento HTML?',
                    options: ['<tag>conteúdo</tag>', '[tag]conteúdo[/tag]', '{tag}conteúdo{/tag}', 'tag>conteúdo</tag'],
                    correctAnswer: 0,
                    explanation: 'Elementos HTML usam < e > para tags, com / na tag de fechamento',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'true-false',
                    question: 'Elementos vazios como <br> precisam de tag de fechamento',
                    correctAnswer: 'false',
                    explanation: 'Elementos vazios não têm conteúdo e não precisam de tag de fechamento',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Qual tag define o título que aparece na aba do navegador?',
                    options: ['<heading>', '<h1>', '<title>', '<meta>'],
                    correctAnswer: 2,
                    explanation: 'A tag <title> dentro de <head> define o título da aba do navegador',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'fill-blank',
                    question: 'Complete a estrutura: <!DOCTYPE html><____><head>...</head><body>...</body></____>',
                    correctAnswer: 'html',
                    explanation: 'O elemento <html> é a raiz do documento e contém head e body',
                    points: 15,
                },
                {
                    id: 'q8',
                    type: 'multiple-choice',
                    question: 'Qual é a função do navegador ao ler HTML?',
                    options: ['Executar o código', 'Compilar para binário', 'Interpretar e renderizar', 'Salvar no servidor'],
                    correctAnswer: 2,
                    explanation: 'O navegador interpreta o HTML e renderiza (exibe) a página para o usuário',
                    points: 10,
                },
            ],
        },
        {
            id: 'attributes',
            title: 'Atributos HTML Completo',
            description: 'Domine todos os atributos essenciais do HTML',
            xpReward: 120,
            estimatedTime: 20,
            content: {
                introduction: 'Atributos fornecem informações adicionais sobre elementos HTML. Eles aparecem sempre na tag de abertura e seguem o formato nome="valor".',
                sections: [
                    {
                        title: 'O que são Atributos?',
                        text: 'Atributos são propriedades que modificam ou fornecem informações extras aos elementos. Todos os elementos podem ter atributos. Eles sempre são especificados na tag de abertura.',
                        code: '<elemento atributo="valor">conteúdo</elemento>\n\n<!-- Exemplo real -->\n<a href="https://google.com">Google</a>',
                    },
                    {
                        title: 'Atributo href',
                        text: 'O atributo href (Hypertext REFerence) é usado na tag <a> para especificar a URL de destino do link.',
                        code: '<a href="https://www.google.com">Ir para Google</a>\n<a href="pagina.html">Página local</a>\n<a href="#secao">Âncora interna</a>\n<a href="mailto:email@exemplo.com">Enviar email</a>',
                    },
                    {
                        title: 'Atributo src',
                        text: 'O atributo src (source) especifica o caminho para um recurso externo como imagens, vídeos ou scripts.',
                        code: '<img src="imagem.jpg" alt="Foto">\n<script src="script.js"></script>\n<video src="video.mp4"></video>',
                    },
                    {
                        title: 'Atributo alt',
                        text: 'O atributo alt fornece texto alternativo para imagens. É essencial para acessibilidade e SEO. Aparece quando a imagem não carrega.',
                        code: '<img src="foto.jpg" alt="Foto do produto XYZ">\n<img src="logo.png" alt="Logo da empresa">',
                    },
                    {
                        title: 'Atributos id e class',
                        text: 'id identifica um elemento único na página. class agrupa elementos para estilização. Um elemento pode ter múltiplas classes.',
                        code: '<div id="cabecalho">Apenas um na página</div>\n<p class="destaque">Pode ter vários</p>\n<div class="card azul grande">Múltiplas classes</div>',
                    },
                    {
                        title: 'Atributo style',
                        text: 'O atributo style aplica CSS inline diretamente no elemento. Útil para estilos únicos, mas prefira CSS externo.',
                        code: '<p style="color: red; font-size: 20px;">Texto estilizado</p>\n<div style="background-color: blue; padding: 10px;">Container azul</div>',
                    },
                    {
                        title: 'Atributo title',
                        text: 'O atributo title exibe uma dica (tooltip) quando o usuário passa o mouse sobre o elemento.',
                        code: '<p title="Esta é uma dica!">Passe o mouse aqui</p>\n<abbr title="HyperText Markup Language">HTML</abbr>',
                    },
                    {
                        title: 'Atributos Booleanos',
                        text: 'Alguns atributos não precisam de valor, sua presença indica true. Exemplos: disabled, readonly, required, checked.',
                        code: '<input type="text" disabled>\n<input type="checkbox" checked>\n<input type="text" required>',
                    },
                ],
                tips: [
                    'Sempre use aspas duplas nos valores de atributos',
                    'Use id para elementos únicos, class para grupos',
                    'Sempre inclua alt em imagens para acessibilidade',
                    'Prefira CSS externo ao invés de style inline',
                ],
                commonMistakes: [
                    'Esquecer as aspas no valor do atributo',
                    'Usar o mesmo id mais de uma vez',
                    'Confundir src com href',
                    'Esquecer o alt em imagens',
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual atributo define a URL de destino de um link?',
                    options: ['src', 'href', 'link', 'url'],
                    correctAnswer: 1,
                    explanation: 'O atributo href (Hypertext REFerence) define o destino do link na tag <a>',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'fill-blank',
                    question: 'Complete: <img _____="foto.jpg">',
                    correctAnswer: 'src',
                    explanation: 'O atributo src (source) define o caminho da imagem',
                    points: 15,
                },
                {
                    id: 'q3',
                    type: 'multiple-choice',
                    question: 'Qual atributo fornece texto alternativo para imagens?',
                    options: ['title', 'alt', 'text', 'description'],
                    correctAnswer: 1,
                    explanation: 'O atributo alt fornece texto alternativo para acessibilidade e SEO',
                    points: 10,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Um mesmo id pode ser usado em múltiplos elementos na página',
                    correctAnswer: 'false',
                    explanation: 'O id deve ser único na página. Use class para múltiplos elementos',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual é a sintaxe correta de um atributo?',
                    options: ['atributo:valor', 'atributo=valor', 'atributo="valor"', '@atributo(valor)'],
                    correctAnswer: 2,
                    explanation: 'Atributos usam a sintaxe nome="valor" com aspas duplas',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'O que acontece quando o atributo disabled está presente em um input?',
                    options: ['O input fica vermelho', 'O input fica invisível', 'O input fica desabilitado', 'O input é deletado'],
                    correctAnswer: 2,
                    explanation: 'O atributo disabled é um booleano que desabilita o elemento',
                    points: 10,
                },
            ],
        },
        {
            id: 'text-content',
            title: 'Texto e Formatação Completo',
            description: 'Títulos, parágrafos, quebras de linha e formatação de texto',
            xpReward: 130,
            estimatedTime: 22,
            content: {
                introduction: 'Dominar texto em HTML é essencial. Aprenda todos os elementos para estruturar e formatar conteúdo textual, desde títulos até formatação semântica.',
                sections: [
                    {
                        title: 'Títulos (h1 a h6)',
                        text: 'HTML oferece 6 níveis de títulos. h1 é o mais importante (título principal), h6 o menos importante. Use para criar hierarquia de conteúdo. Motores de busca usam títulos para indexar páginas.',
                        code: '<h1>Título Principal (h1)</h1>\n<h2>Subtítulo (h2)</h2>\n<h3>Seção (h3)</h3>\n<h4>Subseção (h4)</h4>\n<h5>Tópico menor (h5)</h5>\n<h6>Detalhe (h6)</h6>',
                    },
                    {
                        title: 'Parágrafos',
                        text: 'A tag <p> define um parágrafo. O navegador adiciona espaço (margem) antes e depois automaticamente. Espaços extras e quebras de linha no código são ignorados.',
                        code: '<p>Este é o primeiro parágrafo.</p>\n<p>Este é o segundo parágrafo com\nmúltiplas linhas no código, mas\no navegador exibe em uma linha só.</p>',
                    },
                    {
                        title: 'Quebras de Linha e Divisões',
                        text: 'A tag <br> cria uma quebra de linha sem iniciar novo parágrafo. A tag <hr> cria uma linha horizontal para separar seções.',
                        code: '<p>Linha 1<br>Linha 2<br>Linha 3</p>\n<hr>\n<p>Nova seção após a linha</p>',
                    },
                    {
                        title: 'Tags Semânticas de Formatação',
                        text: 'Tags semânticas têm significado além da aparência visual. Leitores de tela e motores de busca interpretam seu significado.',
                        code: '<strong>Texto importante (negrito)</strong>\n<em>Texto enfatizado (itálico)</em>\n<mark>Texto destacado (amarelo)</mark>\n<del>Texto deletado (riscado)</del>\n<ins>Texto inserido (sublinhado)</ins>\n<sub>Subscrito</sub> e <sup>Sobrescrito</sup>',
                    },
                    {
                        title: 'Tags Visuais de Formatação',
                        text: 'Tags visuais aplicam estilos sem significado semântico. Use quando a aparência importa mais que o significado.',
                        code: '<b>Negrito visual</b>\n<i>Itálico visual</i>\n<u>Sublinhado</u>\n<small>Texto pequeno</small>\n<s>Texto riscado</s>',
                    },
                    {
                        title: 'Citações e Código',
                        text: 'HTML tem tags específicas para citações e código. <blockquote> para citações longas, <q> para curtas, <code> para código.',
                        code: '<blockquote>Esta é uma citação longa em bloco.</blockquote>\n<p>Ele disse <q>Olá mundo</q></p>\n<p>Use <code>console.log()</code> para debug</p>\n<pre>Texto pré-formatado\n  mantém espaços</pre>',
                    },
                    {
                        title: 'Comentários HTML',
                        text: 'Comentários não são exibidos no navegador. Use para documentar seu código ou "desativar" partes temporariamente.',
                        code: '<!-- Este é um comentário -->\n<p>Texto visível</p>\n<!-- <p>Este texto está comentado</p> -->',
                    },
                ],
                tips: [
                    'Use apenas um <h1> por página',
                    'Não pule níveis de título (h1 para h3)',
                    'Prefira <strong> a <b> para texto importante',
                    'Use <em> para ênfase real, não apenas itálico',
                    'Comentários ajudam a organizar código complexo',
                ],
                commonMistakes: [
                    'Usar headings para deixar texto grande (use CSS)',
                    'Pular níveis de headline',
                    'Confundir <b> com <strong>',
                    'Usar <br> para espaçamento (use CSS margin)',
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual é o título mais importante em HTML?',
                    options: ['<h6>', '<h1>', '<head>', '<title>'],
                    correctAnswer: 1,
                    explanation: 'h1 é o título de maior importância, h6 o menor',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual tag indica texto importante semanticamente?',
                    options: ['<b>', '<bold>', '<strong>', '<important>'],
                    correctAnswer: 2,
                    explanation: '<strong> indica importância semântica, enquanto <b> é apenas visual',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'multiple-choice',
                    question: 'Qual tag cria uma quebra de linha?',
                    options: ['<break>', '<br>', '<newline>', '<lb>'],
                    correctAnswer: 1,
                    explanation: '<br> (break) cria uma quebra de linha sem novo parágrafo',
                    points: 10,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Você pode usar múltiplos <h1> na mesma página',
                    correctAnswer: 'false',
                    explanation: 'Recomenda-se usar apenas um <h1> por página para SEO',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'fill-blank',
                    question: 'Complete o comentário: <!-- Este é um _____ -->',
                    correctAnswer: 'comentário',
                    explanation: 'Comentários HTML usam a sintaxe <!-- texto -->',
                    points: 15,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Qual tag cria uma linha horizontal?',
                    options: ['<line>', '<hr>', '<hl>', '<hline>'],
                    correctAnswer: 1,
                    explanation: '<hr> (horizontal rule) cria uma linha divisória',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'multiple-choice',
                    question: 'Qual tag é usada para citações curtas inline?',
                    options: ['<blockquote>', '<cite>', '<q>', '<quote>'],
                    correctAnswer: 2,
                    explanation: '<q> é para citações curtas inline, <blockquote> para blocos',
                    points: 10,
                },
            ],
        },
        {
            id: 'links-images',
            title: 'Links e Imagens Completo',
            description: 'Domine hyperlinks, navegação e inserção de imagens',
            xpReward: 140,
            estimatedTime: 25,
            content: {
                introduction: 'Links conectam páginas e são a essência da web. Imagens tornam o conteúdo visual e atrativo. Nesta lição, você dominará ambos.',
                sections: [
                    {
                        title: 'Criando Links Básicos',
                        text: 'A tag <a> (anchor) cria hyperlinks. O atributo href especifica o destino. Links podem apontar para páginas externas, locais, ou seções da mesma página.',
                        code: '<a href="https://www.google.com">Link Externo</a>\n<a href="sobre.html">Página Local</a>\n<a href="pasta/arquivo.html">Caminho Relativo</a>',
                    },
                    {
                        title: 'Abrindo em Nova Aba',
                        text: 'Use target="_blank" para abrir links em nova aba. Sempre adicione rel="noopener" por segurança.',
                        code: '<a href="https://google.com" target="_blank" rel="noopener">\n  Abre em nova aba\n</a>',
                    },
                    {
                        title: 'Links Internos (Âncoras)',
                        text: 'Use # seguido do id do elemento para criar links que pulam para seções da mesma página.',
                        code: '<!-- Link para seção -->\n<a href="#contato">Ir para Contato</a>\n\n<!-- Seção de destino -->\n<section id="contato">\n  <h2>Contato</h2>\n</section>',
                    },
                    {
                        title: 'Links Especiais',
                        text: 'mailto: abre cliente de email. tel: inicia chamada em dispositivos móveis.',
                        code: '<a href="mailto:contato@exemplo.com">Enviar Email</a>\n<a href="mailto:email@site.com?subject=Olá">Email com Assunto</a>\n<a href="tel:+5511999999999">Ligar Agora</a>',
                    },
                    {
                        title: 'Tag img Básica',
                        text: 'A tag <img> insere imagens. É um elemento vazio (não precisa de fechamento). Atributos obrigatórios: src (caminho) e alt (texto alternativo).',
                        code: '<img src="foto.jpg" alt="Descrição da imagem">\n<img src="images/logo.png" alt="Logo da empresa">',
                    },
                    {
                        title: 'Dimensões de Imagem',
                        text: 'Use width e height para definir dimensões. Ajuda o navegador a reservar espaço antes de carregar.',
                        code: '<img \n  src="produto.jpg" \n  alt="Produto XYZ"\n  width="300"\n  height="200"\n>',
                    },
                    {
                        title: 'Formatos de Imagem',
                        text: 'JPEG: fotos com muitas cores. PNG: transparência e gráficos. SVG: vetores escaláveis. WebP: formato moderno otimizado. GIF: animações simples.',
                    },
                    {
                        title: 'Imagens como Links',
                        text: 'Envolva uma imagem com a tag <a> para torná-la clicável.',
                        code: '<a href="pagina.html">\n  <img src="banner.jpg" alt="Clique aqui">\n</a>',
                    },
                    {
                        title: 'Figure e Figcaption',
                        text: 'Use <figure> para agrupar imagem e legenda, e <figcaption> para a legenda.',
                        code: '<figure>\n  <img src="grafico.png" alt="Gráfico de vendas">\n  <figcaption>Vendas do primeiro trimestre</figcaption>\n</figure>',
                    },
                ],
                tips: [
                    'Sempre inclua alt descritivo para acessibilidade',
                    'Use target="_blank" com rel="noopener" para segurança',
                    'Otimize imagens antes de upload para melhor performance',
                    'Use caminhos relativos para arquivos locais',
                    'Use figure/figcaption para imagens com legendas',
                ],
                commonMistakes: [
                    'Esquecer o alt em imagens',
                    'Usar imagens muito pesadas sem otimização',
                    'Links quebrados (href incorreto)',
                    'Esquecer target="_blank" quando necessário',
                    'Confundir href (links) com src (imagens)',
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual atributo faz o link abrir em nova aba?',
                    options: ['new="_blank"', 'target="_blank"', 'open="new"', 'href="_new"'],
                    correctAnswer: 1,
                    explanation: 'target="_blank" abre o link em uma nova aba do navegador',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Para que serve o atributo alt em imagens?',
                    options: ['Define a altura', 'Texto alternativo', 'Alinha a imagem', 'Define o formato'],
                    correctAnswer: 1,
                    explanation: 'alt é o texto alternativo para acessibilidade e quando a imagem não carrega',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete o link de email: <a href="_____:contato@site.com">',
                    correctAnswer: 'mailto',
                    explanation: 'mailto: abre o cliente de email padrão do usuário',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'multiple-choice',
                    question: 'Qual atributo define o caminho da imagem?',
                    options: ['href', 'path', 'src', 'link'],
                    correctAnswer: 2,
                    explanation: 'src (source) define o caminho/URL da imagem',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'true-false',
                    question: 'A tag <img> precisa de tag de fechamento </img>',
                    correctAnswer: 'false',
                    explanation: '<img> é um elemento vazio e não precisa de tag de fechamento',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Como criar um link para uma seção da mesma página?',
                    options: ['href="secao"', 'href="#secao"', 'link="secao"', 'anchor="secao"'],
                    correctAnswer: 1,
                    explanation: 'Use # seguido do id do elemento destino',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'multiple-choice',
                    question: 'Qual formato de imagem é melhor para fotos?',
                    options: ['PNG', 'SVG', 'JPEG', 'GIF'],
                    correctAnswer: 2,
                    explanation: 'JPEG é otimizado para fotos com muitas cores e gradientes',
                    points: 10,
                },
                {
                    id: 'q8',
                    type: 'multiple-choice',
                    question: 'Qual tag é usada para legenda de imagem?',
                    options: ['<caption>', '<legend>', '<figcaption>', '<label>'],
                    correctAnswer: 2,
                    explanation: '<figcaption> é usado dentro de <figure> para legendas de imagens',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MODULE 2: HTML STRUCTURE (Beginner-Intermediate)
// ============================================

export const MODULE_STRUCTURE: LearningModule = {
    id: 'structure',
    name: 'Estrutura HTML',
    description: 'Listas, tabelas, divs e organização de conteúdo',
    icon: '🏗️',
    difficulty: 'beginner',
    lessons: [
        {
            id: 'lists',
            title: 'Listas HTML',
            description: 'Listas ordenadas, não-ordenadas e de definição',
            xpReward: 60,
            estimatedTime: 12,
            content: {
                introduction: 'Listas são essenciais para organizar informações de forma clara.',
                sections: [
                    {
                        title: 'Lista Não-Ordenada (ul)',
                        text: 'Itens com marcadores (bullets).',
                        code: '<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>',
                    },
                    {
                        title: 'Lista Ordenada (ol)',
                        text: 'Itens numerados automaticamente.',
                        code: '<ol>\n  <li>Primeiro</li>\n  <li>Segundo</li>\n  <li>Terceiro</li>\n</ol>',
                    },
                    {
                        title: 'Lista de Definição (dl)',
                        text: 'Para termos e suas definições.',
                        code: '<dl>\n  <dt>HTML</dt>\n  <dd>Linguagem de marcação</dd>\n  <dt>CSS</dt>\n  <dd>Folhas de estilo</dd>\n</dl>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tag cria uma lista ordenada?',
                    options: ['<ul>', '<ol>', '<li>', '<list>'],
                    correctAnswer: 1,
                    explanation: '<ol> (ordered list) cria listas numeradas',
                    points: 10,
                },
            ],
        },
        {
            id: 'tables',
            title: 'Tabelas HTML',
            description: 'Organize dados em linhas e colunas',
            xpReward: 80,
            estimatedTime: 15,
            content: {
                introduction: 'Tabelas são usadas para exibir dados tabulares de forma organizada.',
                sections: [
                    {
                        title: 'Estrutura Básica',
                        text: 'table > tr > td/th',
                        code: '<table>\n  <tr>\n    <th>Nome</th>\n    <th>Idade</th>\n  </tr>\n  <tr>\n    <td>Ana</td>\n    <td>25</td>\n  </tr>\n</table>',
                    },
                    {
                        title: 'Seções da Tabela',
                        text: 'thead, tbody, tfoot para organizar.',
                        code: '<table>\n  <thead>\n    <tr><th>Produto</th><th>Preço</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Item</td><td>R$ 10</td></tr>\n  </tbody>\n</table>',
                    },
                    {
                        title: 'Colspan e Rowspan',
                        text: 'Mesclar células horizontal ou verticalmente.',
                        code: '<td colspan="2">Ocupa 2 colunas</td>\n<td rowspan="2">Ocupa 2 linhas</td>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tag define uma célula de cabeçalho?',
                    options: ['<td>', '<th>', '<tr>', '<thead>'],
                    correctAnswer: 1,
                    explanation: '<th> (table header) define células de cabeçalho, geralmente em negrito e centralizado',
                    points: 10,
                },
            ],
        },
        {
            id: 'divs-spans',
            title: 'Div e Span',
            description: 'Containers genéricos para estilização',
            xpReward: 50,
            estimatedTime: 10,
            content: {
                introduction: 'Div e Span são containers genéricos usados para agrupar elementos.',
                sections: [
                    {
                        title: 'Div - Block Level',
                        text: '<div> é um container de bloco, ocupa toda a largura disponível.',
                        code: '<div class="container">\n  <h2>Seção 1</h2>\n  <p>Conteúdo da seção</p>\n</div>',
                    },
                    {
                        title: 'Span - Inline',
                        text: '<span> é inline, flui com o texto.',
                        code: '<p>Isso é <span style="color: red;">vermelho</span> e isso não.</p>',
                    },
                ],
                tips: ['Use div para layout e agrupamento', 'Use span para estilizar parte do texto'],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual é a diferença entre div e span?',
                    options: ['div é inline, span é bloco', 'div é bloco, span é inline', 'São iguais', 'Não existe span'],
                    correctAnswer: 1,
                    explanation: '<div> é elemento de bloco (ocupa linha inteira), <span> é inline (flui com texto)',
                    points: 10,
                },
            ],
        },
        {
            id: 'classes-ids',
            title: 'Classes e IDs',
            description: 'Identifique e agrupe elementos',
            xpReward: 60,
            estimatedTime: 12,
            content: {
                introduction: 'Classes e IDs são atributos fundamentais para CSS e JavaScript.',
                sections: [
                    {
                        title: 'ID - Único',
                        text: 'Cada ID deve aparecer apenas uma vez na página.',
                        code: '<div id="cabecalho">\n  <h1>Site</h1>\n</div>\n\n<!-- CSS: #cabecalho { ... } -->',
                    },
                    {
                        title: 'Class - Reutilizável',
                        text: 'Classes podem ser usadas em múltiplos elementos.',
                        code: '<p class="destaque">Primeiro destaque</p>\n<p class="destaque">Segundo destaque</p>\n\n<!-- CSS: .destaque { ... } -->',
                    },
                    {
                        title: 'Múltiplas Classes',
                        text: 'Um elemento pode ter várias classes.',
                        code: '<div class="card azul grande shadow">\n  Cartão estilizado\n</div>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Quantas vezes um ID pode aparecer na mesma página?',
                    options: ['Quantas vezes quiser', 'Apenas uma vez', 'No máximo 3 vezes', 'Depende do navegador'],
                    correctAnswer: 1,
                    explanation: 'IDs devem ser únicos na página. Use class para elementos repetidos.',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MODULE 3: HTML FORMS (Intermediate)
// ============================================

export const MODULE_FORMS: LearningModule = {
    id: 'forms',
    name: 'Formulários HTML',
    description: 'Inputs, validação e envio de dados',
    icon: '📋',
    difficulty: 'intermediate',
    requiredXP: 500,
    lessons: [
        {
            id: 'form-basics',
            title: 'Estrutura de Formulários',
            description: 'Tags form, input, label e button',
            xpReward: 70,
            estimatedTime: 15,
            content: {
                introduction: 'Formulários permitem que usuários enviem dados para o servidor.',
                sections: [
                    {
                        title: 'Estrutura Básica',
                        text: 'O container form com action e method.',
                        code: '<form action="/enviar" method="POST">\n  <label for="nome">Nome:</label>\n  <input type="text" id="nome" name="nome">\n  <button type="submit">Enviar</button>\n</form>',
                    },
                    {
                        title: 'Label e For',
                        text: 'Labels melhoram acessibilidade e UX.',
                        code: '<label for="email">Email:</label>\n<input type="email" id="email" name="email">',
                    },
                ],
                tips: ['Sempre use label com for', 'Defina name para cada input'],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual atributo conecta um label ao seu input?',
                    options: ['name', 'id', 'for', 'href'],
                    correctAnswer: 2,
                    explanation: 'O atributo for do label deve ter o mesmo valor que o id do input',
                    points: 10,
                },
            ],
        },
        {
            id: 'input-types',
            title: 'Tipos de Input',
            description: 'text, email, password, number e mais',
            xpReward: 80,
            estimatedTime: 15,
            content: {
                introduction: 'HTML5 oferece diversos tipos de input especializados.',
                sections: [
                    {
                        title: 'Inputs de Texto',
                        text: 'Diferentes tipos para diferentes dados.',
                        code: '<input type="text" placeholder="Texto livre">\n<input type="email" placeholder="Email">\n<input type="password" placeholder="Senha">\n<input type="tel" placeholder="Telefone">\n<input type="url" placeholder="https://...">',
                    },
                    {
                        title: 'Inputs Numéricos',
                        text: 'Para números, datas, horas.',
                        code: '<input type="number" min="0" max="100">\n<input type="range" min="0" max="100">\n<input type="date">\n<input type="time">\n<input type="color">',
                    },
                    {
                        title: 'Seletores',
                        text: 'Checkboxes e radio buttons.',
                        code: '<input type="checkbox" id="aceito" name="aceito">\n<label for="aceito">Aceito os termos</label>\n\n<input type="radio" name="plano" value="basico"> Básico\n<input type="radio" name="plano" value="pro"> Pro',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tipo de input valida formato de email automaticamente?',
                    options: ['type="text"', 'type="email"', 'type="mail"', 'validate="email"'],
                    correctAnswer: 1,
                    explanation: 'type="email" valida o formato de email nativamente no HTML5',
                    points: 10,
                },
            ],
        },
        {
            id: 'form-validation',
            title: 'Validação de Formulários',
            description: 'required, pattern, min, max',
            xpReward: 80,
            estimatedTime: 15,
            content: {
                introduction: 'HTML5 oferece validação nativa sem JavaScript.',
                sections: [
                    {
                        title: 'Atributos de Validação',
                        text: 'Validações simples integradas.',
                        code: '<input type="text" required>\n<input type="text" minlength="3" maxlength="50">\n<input type="number" min="1" max="100">\n<input type="text" pattern="[A-Za-z]{3,}">',
                    },
                    {
                        title: 'Mensagens Personalizadas',
                        text: 'Usando title para dicas.',
                        code: '<input \n  type="text" \n  pattern="[0-9]{5}-[0-9]{3}" \n  title="Formato: 12345-678"\n  placeholder="CEP"\n>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual atributo torna um campo obrigatório?',
                    options: ['mandatory', 'required', 'must', 'needed'],
                    correctAnswer: 1,
                    explanation: 'O atributo required impede o envio do formulário sem preencher o campo',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MODULE 4: HTML SEMANTICS (Intermediate)
// ============================================

export const MODULE_SEMANTICS: LearningModule = {
    id: 'semantics',
    name: 'Semântica HTML5',
    description: 'Tags semânticas, acessibilidade e SEO',
    icon: '🎯',
    difficulty: 'intermediate',
    requiredXP: 800,
    lessons: [
        {
            id: 'semantic-elements',
            title: 'Elementos Semânticos',
            description: 'header, nav, main, article, section, footer',
            xpReward: 80,
            estimatedTime: 15,
            content: {
                introduction: 'Tags semânticas descrevem seu propósito, melhorando acessibilidade e SEO.',
                sections: [
                    {
                        title: 'Estrutura da Página',
                        text: 'Tags que definem áreas da página.',
                        code: '<header>\n  <nav>Menu aqui</nav>\n</header>\n\n<main>\n  <article>\n    <section>Parte 1</section>\n    <section>Parte 2</section>\n  </article>\n  <aside>Barra lateral</aside>\n</main>\n\n<footer>Rodapé</footer>',
                    },
                    {
                        title: 'Quando Usar Cada Uma',
                        text: 'header: cabeçalho | nav: navegação | main: conteúdo principal | article: conteúdo independente | section: seção temática | aside: conteúdo relacionado | footer: rodapé',
                    },
                ],
                tips: ['Use main apenas uma vez por página', 'header e footer podem estar dentro de article'],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tag define o conteúdo principal da página?',
                    options: ['<content>', '<main>', '<body>', '<article>'],
                    correctAnswer: 1,
                    explanation: '<main> define o conteúdo principal único da página',
                    points: 10,
                },
            ],
        },
        {
            id: 'accessibility',
            title: 'Acessibilidade Web',
            description: 'ARIA, alt, labels e navegação por teclado',
            xpReward: 100,
            estimatedTime: 20,
            content: {
                introduction: 'Acessibilidade garante que todos possam usar seu site, incluindo pessoas com deficiências.',
                sections: [
                    {
                        title: 'Textos Alternativos',
                        text: 'Sempre forneça alt para imagens.',
                        code: '<!-- Bom -->\n<img src="grafico.png" alt="Gráfico de vendas de 2024">\n\n<!-- Decorativo -->\n<img src="borda.png" alt="" role="presentation">',
                    },
                    {
                        title: 'Atributos ARIA',
                        text: 'ARIA fornece contexto adicional para leitores de tela.',
                        code: '<button aria-label="Fechar menu">\n  <span aria-hidden="true">×</span>\n</button>\n\n<div role="alert">Erro no formulário</div>',
                    },
                    {
                        title: 'Navegação por Teclado',
                        text: 'Garanta que todos os elementos sejam acessíveis via Tab.',
                        code: '<button>Posso focar com Tab</button>\n<a href="#">Links também</a>\n<div tabindex="0">Div focável</div>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'true-false',
                    question: 'Imagens decorativas devem ter alt vazio (alt="")',
                    correctAnswer: 'true',
                    explanation: 'alt="" indica que a imagem é decorativa e pode ser ignorada por leitores de tela',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MODULE 5: HTML MEDIA (Intermediate)
// ============================================

export const MODULE_MEDIA: LearningModule = {
    id: 'media',
    name: 'Mídia HTML',
    description: 'Vídeo, áudio, SVG e elementos multimídia',
    icon: '🎬',
    difficulty: 'intermediate',
    requiredXP: 1000,
    lessons: [
        {
            id: 'video-audio',
            title: 'Vídeo e Áudio',
            description: 'Tags video e audio nativas',
            xpReward: 70,
            estimatedTime: 12,
            content: {
                introduction: 'HTML5 suporta vídeo e áudio nativamente, sem plugins.',
                sections: [
                    {
                        title: 'Tag Video',
                        text: 'Embed de vídeos com controles.',
                        code: '<video controls width="640">\n  <source src="video.mp4" type="video/mp4">\n  <source src="video.webm" type="video/webm">\n  Seu navegador não suporta vídeo.\n</video>',
                    },
                    {
                        title: 'Tag Audio',
                        text: 'Player de áudio nativo.',
                        code: '<audio controls>\n  <source src="musica.mp3" type="audio/mpeg">\n  <source src="musica.ogg" type="audio/ogg">\n</audio>',
                    },
                    {
                        title: 'Atributos Úteis',
                        text: 'controls, autoplay, loop, muted, poster.',
                        code: '<video \n  controls \n  autoplay \n  muted \n  loop \n  poster="thumbnail.jpg"\n>\n  <source src="video.mp4">\n</video>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual atributo exibe os controles do player de vídeo?',
                    options: ['player', 'controls', 'buttons', 'ui'],
                    correctAnswer: 1,
                    explanation: 'O atributo controls exibe play, pause, volume e outros controles',
                    points: 10,
                },
            ],
        },
        {
            id: 'svg',
            title: 'SVG Inline',
            description: 'Gráficos vetoriais escaláveis',
            xpReward: 80,
            estimatedTime: 15,
            content: {
                introduction: 'SVG cria gráficos vetoriais que não perdem qualidade ao escalar.',
                sections: [
                    {
                        title: 'SVG Básico',
                        text: 'Desenhando formas simples.',
                        code: '<svg width="100" height="100">\n  <circle \n    cx="50" cy="50" r="40" \n    fill="blue" \n    stroke="black"\n  />\n</svg>',
                    },
                    {
                        title: 'Formas SVG',
                        text: 'Círculos, retângulos, linhas, polígonos.',
                        code: '<svg width="200" height="100">\n  <rect x="0" y="0" width="50" height="50" fill="red"/>\n  <line x1="60" y1="0" x2="60" y2="50" stroke="green"/>\n  <ellipse cx="120" cy="25" rx="30" ry="20" fill="purple"/>\n</svg>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'SVG significa:',
                    options: ['Super Vector Graphics', 'Scalable Vector Graphics', 'Simple Visual Graphics', 'Standard Vector Graphics'],
                    correctAnswer: 1,
                    explanation: 'SVG = Scalable Vector Graphics (Gráficos Vetoriais Escaláveis)',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MODULE 6: HTML ADVANCED (Advanced)
// ============================================

export const MODULE_ADVANCED: LearningModule = {
    id: 'advanced',
    name: 'HTML Avançado',
    description: 'APIs web, canvas, web storage e mais',
    icon: '🚀',
    difficulty: 'advanced',
    requiredXP: 2000,
    lessons: [
        {
            id: 'canvas',
            title: 'HTML Canvas',
            description: 'Desenho 2D programático',
            xpReward: 100,
            estimatedTime: 20,
            content: {
                introduction: 'Canvas permite desenhar gráficos 2D via JavaScript.',
                sections: [
                    {
                        title: 'Setup do Canvas',
                        text: 'Criando o elemento e obtendo o contexto.',
                        code: '<canvas id="meuCanvas" width="400" height="300"></canvas>\n\n<script>\nconst canvas = document.getElementById("meuCanvas");\nconst ctx = canvas.getContext("2d");\n\nctx.fillStyle = "blue";\nctx.fillRect(50, 50, 100, 75);\n</script>',
                    },
                    {
                        title: 'Desenhando Formas',
                        text: 'Retângulos, linhas, arcos.',
                        code: '// Retângulo preenchido\nctx.fillRect(x, y, width, height);\n\n// Contorno\nctx.strokeRect(x, y, width, height);\n\n// Círculo\nctx.beginPath();\nctx.arc(x, y, radius, 0, Math.PI * 2);\nctx.fill();',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual método obtém o contexto de desenho do canvas?',
                    options: ['getContext("2d")', 'getDrawing()', 'get2D()', 'context()'],
                    correctAnswer: 0,
                    explanation: 'canvas.getContext("2d") retorna o contexto para desenho 2D',
                    points: 10,
                },
            ],
        },
        {
            id: 'web-storage',
            title: 'Web Storage',
            description: 'localStorage e sessionStorage',
            xpReward: 80,
            estimatedTime: 15,
            content: {
                introduction: 'Web Storage permite armazenar dados no navegador do usuário.',
                sections: [
                    {
                        title: 'localStorage',
                        text: 'Persiste mesmo após fechar o navegador.',
                        code: '// Salvar\nlocalStorage.setItem("nome", "João");\n\n// Ler\nconst nome = localStorage.getItem("nome");\n\n// Remover\nlocalStorage.removeItem("nome");\n\n// Limpar tudo\nlocalStorage.clear();',
                    },
                    {
                        title: 'sessionStorage',
                        text: 'Apagado quando a aba é fechada.',
                        code: '// Mesmo uso que localStorage\nsessionStorage.setItem("temp", "valor");\nconst temp = sessionStorage.getItem("temp");',
                    },
                    {
                        title: 'Armazenando Objetos',
                        text: 'Use JSON para objetos complexos.',
                        code: 'const user = { nome: "Ana", idade: 25 };\n\n// Salvar\nlocalStorage.setItem("user", JSON.stringify(user));\n\n// Ler\nconst dados = JSON.parse(localStorage.getItem("user"));',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual storage persiste após fechar o navegador?',
                    options: ['sessionStorage', 'tempStorage', 'localStorage', 'cacheStorage'],
                    correctAnswer: 2,
                    explanation: 'localStorage persiste indefinidamente, sessionStorage é apagado ao fechar a aba',
                    points: 10,
                },
            ],
        },
    ],
};

// All modules exported
export const ALL_MODULES: LearningModule[] = [
    MODULE_BASICS,
    MODULE_STRUCTURE,
    MODULE_FORMS,
    MODULE_SEMANTICS,
    MODULE_MEDIA,
    MODULE_ADVANCED,
];

// Import other course modules
import { CSS_MODULES } from './css-lessons';
import { JS_MODULES } from './js-lessons';
import { PHP_MODULES } from './php-lessons';

// Re-export for compatibility
export { CSS_MODULES, CSS_FUNDAMENTOS, CSS_CORES, CSS_TIPOGRAFIA, CSS_BOX_MODEL, CSS_FLEXBOX, CSS_EFEITOS } from './css-lessons';
export { JS_MODULES } from './js-lessons';
export { PHP_MODULES } from './php-lessons';

// Combined modules from all courses for global search
const GLOBAL_MODULES: LearningModule[] = [
    ...ALL_MODULES,
    ...CSS_MODULES,
    ...JS_MODULES,
    ...PHP_MODULES,
];

// Get total lesson count
function getTotalLessons(): number {
    return ALL_MODULES.reduce((total, mod) => total + mod.lessons.length, 0);
}

// Get total questions count
function getTotalQuestions(): number {
    return ALL_MODULES.reduce((total, mod) =>
        total + mod.lessons.reduce((lt, lesson) => lt + lesson.quiz.length, 0), 0);
}

// Get module by ID - searches all courses
function getModuleById(id: string): LearningModule | undefined {
    return GLOBAL_MODULES.find(m => m.id === id);
}

// Get lesson by ID - searches all courses
function getLessonById(moduleId: string, lessonId: string): Lesson | undefined {
    const module = getModuleById(moduleId);
    return module?.lessons.find(l => l.id === lessonId);
}

export { getTotalLessons, getTotalQuestions, getModuleById, getLessonById };

// Course type for navigation
export type CourseType = 'html' | 'css' | 'javascript' | 'php';

// Get modules by course
export async function getModulesByCourse(course: CourseType): Promise<LearningModule[]> {
    switch (course) {
        case 'html':
            return ALL_MODULES;
        case 'css':
            const { CSS_MODULES } = await import('./css-lessons');
            return CSS_MODULES;
        case 'javascript':
            const { JS_MODULES } = await import('./js-lessons');
            return JS_MODULES;
        case 'php':
            const { PHP_MODULES } = await import('./php-lessons');
            return PHP_MODULES;
        default:
            return ALL_MODULES;
    }
}

// Course metadata
export const COURSES = {
    html: { name: 'HTML', icon: '📄', color: 'bg-orange-500' },
    css: { name: 'CSS', icon: '🎨', color: 'bg-blue-500' },
    javascript: { name: 'JavaScript', icon: '⚡', color: 'bg-yellow-500' },
    php: { name: 'PHP', icon: '🐘', color: 'bg-purple-500' },
};
