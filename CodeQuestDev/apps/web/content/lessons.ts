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
            id: 'intro',
            title: 'Introdução ao HTML',
            description: 'O que é HTML e como funciona a web',
            xpReward: 50,
            estimatedTime: 10,
            content: {
                introduction: 'HTML (HyperText Markup Language) é a linguagem padrão para criar páginas web. Com HTML, você define a estrutura e o conteúdo de uma página.',
                sections: [
                    {
                        title: 'O que é HTML?',
                        text: 'HTML descreve a estrutura de uma página web usando marcações (tags). Cada tag HTML define um tipo diferente de conteúdo.',
                        code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Minha Página</title>\n</head>\n<body>\n  <h1>Olá, Mundo!</h1>\n</body>\n</html>',
                    },
                    {
                        title: 'Como funciona?',
                        text: 'O navegador lê o código HTML e renderiza a página. As tags dizem ao navegador como exibir o conteúdo.',
                    },
                ],
                tips: ['Todo documento HTML começa com <!DOCTYPE html>', 'Sempre feche suas tags'],
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
                    question: 'Qual tag define o título da página no navegador?',
                    options: ['<heading>', '<title>', '<head>', '<meta>'],
                    correctAnswer: 1,
                    explanation: 'A tag <title> define o título que aparece na aba do navegador',
                    points: 10,
                },
            ],
        },
        {
            id: 'elements',
            title: 'Elementos HTML',
            description: 'Entenda a anatomia de um elemento HTML',
            xpReward: 60,
            estimatedTime: 12,
            content: {
                introduction: 'Um elemento HTML é composto por uma tag de abertura, conteúdo e uma tag de fechamento.',
                sections: [
                    {
                        title: 'Anatomia de um Elemento',
                        text: 'Todo elemento tem uma estrutura: <tag>conteúdo</tag>',
                        code: '<p>Este é um parágrafo.</p>\n<a href="url">Este é um link</a>\n<img src="imagem.jpg" alt="Descrição">',
                    },
                    {
                        title: 'Elementos Vazios',
                        text: 'Alguns elementos não têm conteúdo e não precisam de tag de fechamento.',
                        code: '<br> <!-- Quebra de linha -->\n<hr> <!-- Linha horizontal -->\n<img src="foto.jpg" alt="Uma foto">',
                    },
                ],
                commonMistakes: ['Esquecer de fechar tags', 'Aninhar tags incorretamente'],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual é a estrutura correta de um elemento HTML?',
                    options: ['<tag>conteúdo</tag>', 'tag>conteúdo</tag>', '<tag>conteúdo<tag/>', '{tag}conteúdo{/tag}'],
                    correctAnswer: 0,
                    explanation: 'Elementos HTML usam < > para as tags, com / na tag de fechamento',
                    points: 10,
                },
            ],
        },
        {
            id: 'attributes',
            title: 'Atributos HTML',
            description: 'Adicione informações extras aos elementos',
            xpReward: 60,
            estimatedTime: 12,
            content: {
                introduction: 'Atributos fornecem informações adicionais sobre elementos HTML. Eles sempre vão na tag de abertura.',
                sections: [
                    {
                        title: 'Sintaxe de Atributos',
                        text: 'Atributos são escritos como nome="valor" dentro da tag de abertura.',
                        code: '<a href="https://google.com">Link para Google</a>\n<img src="foto.jpg" alt="Minha foto" width="300">\n<p style="color: red;">Texto vermelho</p>',
                    },
                    {
                        title: 'Atributos Comuns',
                        text: 'id, class, style, title são atributos que funcionam em quase todos os elementos.',
                        code: '<div id="cabecalho" class="container">\n  <h1 title="Dica ao passar o mouse">Título</h1>\n</div>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual atributo define a URL de destino de um link?',
                    options: ['src', 'href', 'link', 'url'],
                    correctAnswer: 1,
                    explanation: 'O atributo href (Hypertext REFerence) define o destino do link',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'fill-blank',
                    question: 'Complete: <img _____="foto.jpg">',
                    correctAnswer: 'src',
                    explanation: 'O atributo src define o caminho da imagem',
                    points: 15,
                },
            ],
        },
        {
            id: 'headings',
            title: 'Títulos e Parágrafos',
            description: 'Organize seu conteúdo com headings e parágrafos',
            xpReward: 50,
            estimatedTime: 10,
            content: {
                introduction: 'Os títulos (headings) e parágrafos são fundamentais para estruturar o conteúdo de uma página.',
                sections: [
                    {
                        title: 'Títulos (h1 a h6)',
                        text: 'HTML oferece 6 níveis de títulos, do h1 (mais importante) ao h6 (menos importante).',
                        code: '<h1>Título Principal</h1>\n<h2>Subtítulo</h2>\n<h3>Seção</h3>\n<h4>Subseção</h4>',
                    },
                    {
                        title: 'Parágrafos',
                        text: 'A tag <p> define um parágrafo. O navegador adiciona espaço antes e depois automaticamente.',
                        code: '<p>Este é o primeiro parágrafo.</p>\n<p>Este é o segundo parágrafo.</p>',
                    },
                ],
                tips: ['Use apenas um h1 por página', 'Não pule níveis (h1 para h3)'],
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
            ],
        },
        {
            id: 'formatting',
            title: 'Formatação de Texto',
            description: 'Negrito, itálico, sublinhado e mais',
            xpReward: 50,
            estimatedTime: 10,
            content: {
                introduction: 'HTML oferece várias tags para formatar texto, algumas semânticas e outras apenas visuais.',
                sections: [
                    {
                        title: 'Tags Semânticas',
                        text: 'Tags semânticas têm significado além da aparência visual.',
                        code: '<strong>Texto importante (negrito)</strong>\n<em>Texto enfatizado (itálico)</em>\n<mark>Texto destacado</mark>\n<del>Texto deletado</del>\n<ins>Texto inserido</ins>',
                    },
                    {
                        title: 'Tags Visuais',
                        text: 'Tags apenas para estilo, sem significado semântico.',
                        code: '<b>Negrito visual</b>\n<i>Itálico visual</i>\n<u>Sublinhado</u>\n<small>Texto pequeno</small>',
                    },
                ],
                tips: ['Prefira <strong> a <b> para conteúdo importante', 'Use <em> para ênfase real'],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tag indica texto importante semanticamente?',
                    options: ['<b>', '<bold>', '<strong>', '<important>'],
                    correctAnswer: 2,
                    explanation: '<strong> indica importância, enquanto <b> é apenas visual',
                    points: 10,
                },
            ],
        },
        {
            id: 'links',
            title: 'Links e Navegação',
            description: 'Crie hyperlinks para conectar páginas',
            xpReward: 60,
            estimatedTime: 12,
            content: {
                introduction: 'Links são a essência da web - eles conectam páginas e recursos.',
                sections: [
                    {
                        title: 'Criando Links',
                        text: 'Use a tag <a> com o atributo href para criar links.',
                        code: '<a href="https://google.com">Ir para Google</a>\n<a href="pagina.html">Página Local</a>\n<a href="#secao">Link Interno</a>',
                    },
                    {
                        title: 'Atributo target',
                        text: 'Use target="_blank" para abrir em nova aba.',
                        code: '<a href="url" target="_blank" rel="noopener">Abre em nova aba</a>',
                    },
                    {
                        title: 'Links de Email e Telefone',
                        text: 'Links especiais para email e telefone.',
                        code: '<a href="mailto:email@exemplo.com">Enviar Email</a>\n<a href="tel:+5511999999999">Ligar</a>',
                    },
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
            ],
        },
        {
            id: 'images',
            title: 'Imagens',
            description: 'Adicione imagens às suas páginas',
            xpReward: 60,
            estimatedTime: 12,
            content: {
                introduction: 'Imagens tornam as páginas mais atraentes e informativas.',
                sections: [
                    {
                        title: 'Tag img',
                        text: 'A tag <img> é um elemento vazio - não precisa de fechamento.',
                        code: '<img src="foto.jpg" alt="Descrição da foto">',
                    },
                    {
                        title: 'Atributos Importantes',
                        text: 'src define o caminho, alt o texto alternativo, width/height o tamanho.',
                        code: '<img \n  src="images/foto.jpg" \n  alt="Foto de um gato" \n  width="300" \n  height="200"\n>',
                    },
                    {
                        title: 'Formatos de Imagem',
                        text: 'JPEG para fotos, PNG para transparência, SVG para vetores, WebP para web moderna.',
                    },
                ],
                tips: ['Sempre use alt para acessibilidade', 'Otimize imagens para web'],
                commonMistakes: ['Esquecer o alt', 'Usar imagens muito pesadas'],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Para que serve o atributo alt em imagens?',
                    options: ['Define a altura', 'Texto alternativo', 'Alinha a imagem', 'Define o formato'],
                    correctAnswer: 1,
                    explanation: 'alt é o texto alternativo, exibido quando a imagem não carrega e lido por leitores de tela',
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

// Get total lesson count
export function getTotalLessons(): number {
    return ALL_MODULES.reduce((total, mod) => total + mod.lessons.length, 0);
}

// Get total questions count
export function getTotalQuestions(): number {
    return ALL_MODULES.reduce((total, mod) =>
        total + mod.lessons.reduce((lt, lesson) => lt + lesson.quiz.length, 0), 0);
}

// Get module by ID
export function getModuleById(id: string): LearningModule | undefined {
    return ALL_MODULES.find(m => m.id === id);
}

// Get lesson by ID
export function getLessonById(moduleId: string, lessonId: string): Lesson | undefined {
    const module = getModuleById(moduleId);
    return module?.lessons.find(l => l.id === lessonId);
}
