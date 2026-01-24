// CodeQuest - JavaScript Learning Content
// Curso completo em Português com módulos bem categorizados

import { LearningModule } from './lessons';

// ============================================
// MÓDULO 1: FUNDAMENTOS JAVASCRIPT
// ============================================

export const JS_FUNDAMENTOS: LearningModule = {
    id: 'js-fundamentos',
    name: 'Fundamentos JavaScript',
    description: 'Aprenda a base do JavaScript: sintaxe, variáveis e operadores',
    icon: '⚡',
    difficulty: 'beginner',
    lessons: [
        {
            id: 'intro-js',
            title: 'Introdução ao JavaScript',
            description: 'O que é JavaScript e como ele funciona',
            xpReward: 100,
            estimatedTime: 15,
            content: {
                introduction: 'JavaScript é a linguagem de programação da web. Ele permite criar páginas interativas e dinâmicas.',
                sections: [
                    {
                        title: 'O que é JavaScript?',
                        text: 'JavaScript (JS) é uma linguagem de programação de alto nível, interpretada e dinâmica. É a linguagem padrão para desenvolvimento web, rodando em todos os navegadores modernos.',
                    },
                    {
                        title: 'JavaScript no HTML',
                        text: 'JavaScript pode ser adicionado ao HTML de duas formas: inline com a tag <script> ou em arquivo externo.',
                        code: '<!-- Script interno -->\n<script>\n  alert("Olá, mundo!");\n</script>\n\n<!-- Script externo -->\n<script src="script.js"></script>',
                    },
                    {
                        title: 'Console do Navegador',
                        text: 'O console é uma ferramenta essencial para desenvolvimento. Use console.log() para exibir mensagens.',
                        code: 'console.log("Mensagem no console");\nconsole.warn("Aviso");\nconsole.error("Erro");',
                    },
                    {
                        title: 'Onde Colocar o Script',
                        text: 'Coloque scripts no final do <body> ou use defer para que o HTML carregue primeiro.',
                        code: '<!-- Recomendado: final do body -->\n<body>\n  <h1>Meu Site</h1>\n  <script src="script.js"></script>\n</body>\n\n<!-- Ou use defer -->\n<script src="script.js" defer></script>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual tag é usada para adicionar JavaScript ao HTML?',
                    options: ['<javascript>', '<js>', '<script>', '<code>'],
                    correctAnswer: 2,
                    explanation: 'A tag <script> é usada para incluir JavaScript no HTML',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual comando exibe mensagens no console?',
                    options: ['print()', 'echo()', 'console.log()', 'display()'],
                    correctAnswer: 2,
                    explanation: 'console.log() é o método padrão para exibir no console',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'true-false',
                    question: 'JavaScript só funciona em navegadores',
                    correctAnswer: 'false',
                    explanation: 'JavaScript também roda em servidores com Node.js',
                    points: 10,
                },
                {
                    id: 'q4',
                    type: 'fill-blank',
                    question: 'Complete: <script src="app.____"></script>',
                    correctAnswer: 'js',
                    explanation: 'Arquivos JavaScript usam a extensão .js',
                    points: 15,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Onde é recomendado colocar o <script>?',
                    options: ['No início do head', 'No final do body', 'Antes do DOCTYPE', 'No meio do body'],
                    correctAnswer: 1,
                    explanation: 'Final do body permite que o HTML carregue primeiro',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'O que o atributo defer faz no script?',
                    options: ['Atrasa o carregamento', 'Executa após o HTML carregar', 'Remove o script', 'Executa imediatamente'],
                    correctAnswer: 1,
                    explanation: 'defer faz o script executar depois que o HTML é parseado',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'true-false',
                    question: 'console.error() exibe mensagens de erro no console',
                    correctAnswer: 'true',
                    explanation: 'console.error() é usado para exibir erros com formatação vermelha',
                    points: 10,
                },
                {
                    id: 'q8',
                    type: 'multiple-choice',
                    question: 'Em que ano JavaScript foi criado?',
                    options: ['1990', '1995', '2000', '2005'],
                    correctAnswer: 1,
                    explanation: 'JavaScript foi criado por Brendan Eich em 1995 na Netscape',
                    points: 15,
                },
                {
                    id: 'q9',
                    type: 'fill-blank',
                    question: 'Complete: console.____("Aviso importante")',
                    correctAnswer: 'warn',
                    explanation: 'console.warn() exibe avisos com destaque amarelo no console',
                    points: 15,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'Qual é a diferença entre async e defer?',
                    options: ['São iguais', 'async bloqueia, defer não', 'async executa assim que carrega, defer espera o HTML', 'defer é mais rápido'],
                    correctAnswer: 2,
                    explanation: 'async executa imediatamente após carregar; defer espera o HTML terminar',
                    points: 15,
                },
            ],
        },

        {
            id: 'variaveis-js',
            title: 'Variáveis em JavaScript',
            description: 'let, const e var - quando usar cada um',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Variáveis armazenam dados que podem ser usados e modificados no programa.',
                sections: [
                    {
                        title: 'Declarando Variáveis',
                        text: 'Use let para variáveis que mudam, const para constantes. Evite var.',
                        code: 'let nome = "Maria";\nconst PI = 3.14159;\n\nnome = "João"; // OK, let permite reatribuição\n// PI = 3.14; // Erro! const não permite reatribuição',
                    },
                    {
                        title: 'let vs const vs var',
                        text: 'let: variável que pode mudar. const: constante. var: forma antiga, evite usar.',
                        code: 'let contador = 0;\nconstador++; // 1\n\nconst URL = "https://api.exemplo.com";\n// URL = "outro"; // Erro!\n\nvar antigo = "evite"; // funciona, mas não recomendado',
                    },
                    {
                        title: 'Nomes de Variáveis',
                        text: 'Use camelCase. Nomes devem começar com letra, $ ou _. Não use palavras reservadas.',
                        code: 'let nomeCompleto = "Maria Silva"; // camelCase\nlet _privado = "interno";\nlet $elemento = document.body;\n\n// Inválidos:\n// let 1nome = "erro";\n// let let = "erro";',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual palavra-chave é usada para constantes?',
                    options: ['let', 'var', 'const', 'constant'],
                    correctAnswer: 2,
                    explanation: 'const é usada para declarar constantes',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual convenção de nomenclatura é padrão em JavaScript?',
                    options: ['snake_case', 'camelCase', 'PascalCase', 'kebab-case'],
                    correctAnswer: 1,
                    explanation: 'camelCase é a convenção padrão para variáveis em JS',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'true-false',
                    question: 'const permite reatribuição de valor',
                    correctAnswer: 'false',
                    explanation: 'const não permite reatribuição após a declaração',
                    points: 10,
                },
                {
                    id: 'q4',
                    type: 'fill-blank',
                    question: 'Complete: ____ nome = "João";',
                    correctAnswer: 'let',
                    explanation: 'let é usado para variáveis que podem mudar',
                    points: 15,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Por que evitar var?',
                    options: ['É muito lento', 'Tem escopo confuso', 'Não funciona mais', 'Ocupa mais memória'],
                    correctAnswer: 1,
                    explanation: 'var tem escopo de função, não de bloco, causando bugs',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Qual é válido como nome de variável?',
                    options: ['2nome', 'nome-completo', '_nome', 'nome completo'],
                    correctAnswer: 2,
                    explanation: 'Variáveis podem começar com _, $ ou letra, não número ou hífen',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'true-false',
                    question: 'const com objeto permite alterar propriedades do objeto',
                    correctAnswer: 'true',
                    explanation: 'const impede reatribuição, mas propriedades de objetos podem ser alteradas',
                    points: 15,
                },
                {
                    id: 'q8',
                    type: 'fill-blank',
                    question: 'Complete: ____  PI = 3.14159; (não pode mudar)',
                    correctAnswer: 'const',
                    explanation: 'const é usado para valores que não devem mudar',
                    points: 15,
                },
                {
                    id: 'q9',
                    type: 'multiple-choice',
                    question: 'Qual escopo tem let?',
                    options: ['Global', 'Função', 'Bloco', 'Módulo'],
                    correctAnswer: 2,
                    explanation: 'let tem escopo de bloco (dentro de { })',
                    points: 10,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'O que é hoisting?',
                    options: ['Erro de JS', 'Elevação de declarações', 'Tipo de loop', 'Função async'],
                    correctAnswer: 1,
                    explanation: 'Hoisting eleva declarações (var, function) ao topo do escopo',
                    points: 15,
                },
            ],
        },

    ],
};

// ============================================
// MÓDULO 2: TIPOS DE DADOS
// ============================================

export const JS_TIPOS: LearningModule = {
    id: 'js-tipos',
    name: 'Tipos de Dados',
    description: 'Strings, numbers, booleans, arrays e objetos',
    icon: '📊',
    difficulty: 'beginner',
    requiredXP: 200,
    lessons: [
        {
            id: 'tipos-primitivos',
            title: 'Tipos Primitivos',
            description: 'String, Number, Boolean, null, undefined',
            xpReward: 100,
            estimatedTime: 15,
            content: {
                introduction: 'JavaScript tem tipos primitivos que são imutáveis e tipos de referência como objetos.',
                sections: [
                    {
                        title: 'String',
                        text: 'Texto entre aspas simples, duplas ou crases (template literals).',
                        code: 'let nome = "Maria";\nlet sobrenome = \'Silva\';\nlet completo = `${nome} ${sobrenome}`; // Template literal',
                    },
                    {
                        title: 'Number',
                        text: 'JavaScript tem apenas um tipo numérico que inclui inteiros e decimais.',
                        code: 'let idade = 25;\nlet preco = 19.99;\nlet infinito = Infinity;\nlet naoNumero = NaN; // Not a Number',
                    },
                    {
                        title: 'Boolean',
                        text: 'Verdadeiro ou falso, usado em condições.',
                        code: 'let ativo = true;\nlet logado = false;\nlet maior = 10 > 5; // true',
                    },
                    {
                        title: 'null e undefined',
                        text: 'null: ausência intencional. undefined: não definido.',
                        code: 'let vazio = null; // intencionalmente vazio\nlet indefinido; // undefined\nconsole.log(indefinido); // undefined',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual é a sintaxe de template literal?',
                    options: ['"texto"', "'texto'", '`texto`', '<texto>'],
                    correctAnswer: 2,
                    explanation: 'Template literals usam crases (backticks): `texto`',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que é NaN?',
                    options: ['Número negativo', 'Not a Number', 'Null and Nothing', 'Número alto'],
                    correctAnswer: 1,
                    explanation: 'NaN significa "Not a Number" - resultado de operações numéricas inválidas',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: let ativo = ____;',
                    correctAnswer: 'true',
                    explanation: 'Boolean usa true ou false',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'null e undefined são a mesma coisa',
                    correctAnswer: 'false',
                    explanation: 'null é intencional, undefined é ausência de valor',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Como inserir variável em template literal?',
                    options: ['#{var}', '${var}', '%{var}', '@{var}'],
                    correctAnswer: 1,
                    explanation: 'Template literals usam ${variavel} para interpolação',
                    points: 10,
                },
            ],
        },
        {
            id: 'arrays-js',
            title: 'Arrays',
            description: 'Listas ordenadas de valores',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Arrays armazenam múltiplos valores em uma única variável.',
                sections: [
                    {
                        title: 'Criando Arrays',
                        text: 'Arrays são listas ordenadas, começando do índice 0.',
                        code: 'let frutas = ["maçã", "banana", "laranja"];\nlet numeros = [1, 2, 3, 4, 5];\nlet misto = [1, "dois", true, null];',
                    },
                    {
                        title: 'Acessando Elementos',
                        text: 'Use índices para acessar elementos. Índices começam em 0.',
                        code: 'let frutas = ["maçã", "banana", "laranja"];\nconsole.log(frutas[0]); // "maçã"\nconsole.log(frutas[2]); // "laranja"\nconsole.log(frutas.length); // 3',
                    },
                    {
                        title: 'Métodos Básicos',
                        text: 'push adiciona ao final, pop remove do final.',
                        code: 'let lista = [1, 2, 3];\nlista.push(4); // [1, 2, 3, 4]\nlista.pop(); // [1, 2, 3]\nlista.unshift(0); // [0, 1, 2, 3]',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual é o índice do primeiro elemento de um array?',
                    options: ['1', '0', '-1', 'primeiro'],
                    correctAnswer: 1,
                    explanation: 'Arrays começam no índice 0',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual método adiciona elemento ao final?',
                    options: ['add()', 'push()', 'append()', 'insert()'],
                    correctAnswer: 1,
                    explanation: 'push() adiciona ao final do array',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: let frutas = ["maçã"]; frutas.____("banana");',
                    correctAnswer: 'push',
                    explanation: 'push adiciona ao final do array',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Arrays podem conter tipos diferentes',
                    correctAnswer: 'true',
                    explanation: 'JS permite arrays com tipos mistos',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'O que array.length retorna?',
                    options: ['Último elemento', 'Primeiro elemento', 'Número de elementos', 'Índice máximo'],
                    correctAnswer: 2,
                    explanation: 'length retorna a quantidade de elementos',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 3: CONTROLE DE FLUXO
// ============================================

export const JS_CONTROLE: LearningModule = {
    id: 'js-controle',
    name: 'Controle de Fluxo',
    description: 'Condicionais e loops',
    icon: '🔀',
    difficulty: 'intermediate',
    requiredXP: 400,
    lessons: [
        {
            id: 'condicionais-js',
            title: 'Condicionais',
            description: 'if, else, else if e operador ternário',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Condicionais permitem executar código baseado em condições.',
                sections: [
                    {
                        title: 'if e else',
                        text: 'if executa código se a condição for verdadeira.',
                        code: 'let idade = 18;\n\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}',
                    },
                    {
                        title: 'else if',
                        text: 'Para múltiplas condições.',
                        code: 'let nota = 75;\n\nif (nota >= 90) {\n  console.log("A");\n} else if (nota >= 70) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
                    },
                    {
                        title: 'Operador Ternário',
                        text: 'Forma curta de if/else.',
                        code: 'let idade = 20;\nlet status = idade >= 18 ? "adulto" : "menor";\nconsole.log(status); // "adulto"',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual operador verifica igualdade estrita?',
                    options: ['==', '===', '=', '!='],
                    correctAnswer: 1,
                    explanation: '=== compara valor E tipo (estrito)',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que o operador ternário faz?',
                    options: ['Loop 3 vezes', 'if/else curto', 'Declara 3 variáveis', 'Compara 3 valores'],
                    correctAnswer: 1,
                    explanation: 'Ternário: condição ? seVerdade : seFalso',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: if (x > 10) { } ____ { }',
                    correctAnswer: 'else',
                    explanation: 'else é executado quando if é falso',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: '== e === são equivalentes',
                    correctAnswer: 'false',
                    explanation: '== permite coerção, === é estrito (valor e tipo)',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual é a sintaxe do operador ternário?',
                    options: ['if ? then : else', 'condição ? verdade : falso', 'check(cond, v, f)', 'cond && v || f'],
                    correctAnswer: 1,
                    explanation: 'Ternário: condição ? valorSeVerdade : valorSeFalso',
                    points: 10,
                },
            ],
        },
        {
            id: 'loops-js',
            title: 'Loops',
            description: 'for, while e forEach',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Loops repetem código múltiplas vezes.',
                sections: [
                    {
                        title: 'for',
                        text: 'Loop clássico com contador.',
                        code: 'for (let i = 0; i < 5; i++) {\n  console.log(i); // 0, 1, 2, 3, 4\n}',
                    },
                    {
                        title: 'while',
                        text: 'Repete enquanto condição for verdadeira.',
                        code: 'let i = 0;\nwhile (i < 5) {\n  console.log(i);\n  i++;\n}',
                    },
                    {
                        title: 'for...of',
                        text: 'Itera sobre valores de arrays.',
                        code: 'let frutas = ["maçã", "banana", "laranja"];\nfor (let fruta of frutas) {\n  console.log(fruta);\n}',
                    },
                    {
                        title: 'forEach',
                        text: 'Método de array para iterar.',
                        code: 'let numeros = [1, 2, 3];\nnumeros.forEach(num => {\n  console.log(num * 2);\n});',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual loop é melhor para arrays?',
                    options: ['for clássico', 'while', 'for...of ou forEach', 'do...while'],
                    correctAnswer: 2,
                    explanation: 'for...of e forEach são mais limpos para arrays',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que i++ faz?',
                    options: ['Dobra i', 'Incrementa i em 1', 'Reseta i', 'Declara i'],
                    correctAnswer: 1,
                    explanation: 'i++ é equivalente a i = i + 1',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: for (let i = 0; i < 10; i____)',
                    correctAnswer: '++',
                    explanation: '++ incrementa a variável em 1',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'while pode criar loops infinitos',
                    correctAnswer: 'true',
                    explanation: 'Se a condição nunca se tornar falsa, o loop é infinito',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual comando sai do loop imediatamente?',
                    options: ['stop', 'exit', 'break', 'return'],
                    correctAnswer: 2,
                    explanation: 'break sai do loop atual',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 4: FUNÇÕES
// ============================================

export const JS_FUNCOES: LearningModule = {
    id: 'js-funcoes',
    name: 'Funções',
    description: 'Declaração, parâmetros e arrow functions',
    icon: '🔧',
    difficulty: 'intermediate',
    requiredXP: 600,
    lessons: [
        {
            id: 'funcoes-basicas',
            title: 'Funções Básicas',
            description: 'Declarando e chamando funções',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Funções são blocos de código reutilizáveis.',
                sections: [
                    {
                        title: 'Declarando Funções',
                        text: 'Use function para declarar uma função.',
                        code: 'function saudacao(nome) {\n  return "Olá, " + nome + "!";\n}\n\nconsole.log(saudacao("Maria")); // "Olá, Maria!"',
                    },
                    {
                        title: 'Parâmetros e Retorno',
                        text: 'Funções recebem parâmetros e retornam valores.',
                        code: 'function soma(a, b) {\n  return a + b;\n}\n\nlet resultado = soma(5, 3); // 8',
                    },
                    {
                        title: 'Parâmetros Padrão',
                        text: 'Defina valores padrão para parâmetros.',
                        code: 'function saudar(nome = "Visitante") {\n  return "Olá, " + nome;\n}\n\nsaudar(); // "Olá, Visitante"\nsaudar("Ana"); // "Olá, Ana"',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual palavra-chave declara uma função?',
                    options: ['func', 'function', 'def', 'fn'],
                    correctAnswer: 1,
                    explanation: 'function é a palavra-chave para declarar funções',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que return faz em uma função?',
                    options: ['Imprime valor', 'Retorna valor e encerra', 'Declara variável', 'Inicia loop'],
                    correctAnswer: 1,
                    explanation: 'return retorna um valor e encerra a função',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: function soma(a, b) { ____ a + b; }',
                    correctAnswer: 'return',
                    explanation: 'return retorna o resultado da função',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Funções podem ter parâmetros com valores padrão',
                    correctAnswer: 'true',
                    explanation: 'Parâmetros padrão são definidos com = na declaração',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Como chamar a função saudacao("João")?',
                    options: ['call saudacao("João")', 'saudacao("João")', 'run saudacao("João")', 'saudacao: "João"'],
                    correctAnswer: 1,
                    explanation: 'Funções são chamadas pelo nome seguido de ()',
                    points: 10,
                },
            ],
        },
        {
            id: 'arrow-functions',
            title: 'Arrow Functions',
            description: 'Sintaxe moderna e concisa para funções',
            xpReward: 100,
            estimatedTime: 15,
            content: {
                introduction: 'Arrow functions são uma forma mais curta de escrever funções.',
                sections: [
                    {
                        title: 'Sintaxe Arrow',
                        text: 'Use => para criar arrow functions.',
                        code: 'const soma = (a, b) => a + b;\nconst dobro = n => n * 2;\nconst saudar = () => "Olá!";',
                    },
                    {
                        title: 'Com Bloco',
                        text: 'Para múltiplas linhas, use chaves e return.',
                        code: 'const calcular = (a, b) => {\n  const resultado = a + b;\n  return resultado * 2;\n};',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual é a sintaxe de arrow function?',
                    options: ['function =>', '() ->', '() =>', '=> ()'],
                    correctAnswer: 2,
                    explanation: 'Arrow functions usam () => { }',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'fill-blank',
                    question: 'Complete: const dobro = n ____ n * 2;',
                    correctAnswer: '=>',
                    explanation: '=> é o operador arrow function',
                    points: 15,
                },
                {
                    id: 'q3',
                    type: 'true-false',
                    question: 'Arrow functions com uma expressão precisam de return',
                    correctAnswer: 'false',
                    explanation: 'Return é implícito para expressões simples',
                    points: 10,
                },
                {
                    id: 'q4',
                    type: 'multiple-choice',
                    question: 'Quando usar chaves {} em arrow functions?',
                    options: ['Sempre', 'Nunca', 'Com múltiplas linhas', 'Só com parâmetros'],
                    correctAnswer: 2,
                    explanation: 'Chaves são necessárias para múltiplas linhas de código',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'const x = n => n * 2. Quantos parênteses são necessários?',
                    options: ['Nenhum (um parâmetro)', 'Dois sempre', 'Quatro', 'Depende do navegador'],
                    correctAnswer: 0,
                    explanation: 'Com um parâmetro, parênteses são opcionais',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 5: DOM E EVENTOS
// ============================================

export const JS_DOM: LearningModule = {
    id: 'js-dom',
    name: 'DOM e Eventos',
    description: 'Manipule a página e responda a ações do usuário',
    icon: '🖱️',
    difficulty: 'intermediate',
    requiredXP: 800,
    lessons: [
        {
            id: 'selecionando-dom',
            title: 'Selecionando Elementos',
            description: 'querySelector, getElementById e mais',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'O DOM (Document Object Model) é a representação da página HTML como objetos JavaScript.',
                sections: [
                    {
                        title: 'querySelector',
                        text: 'Seleciona o primeiro elemento que corresponde ao seletor CSS.',
                        code: 'const titulo = document.querySelector("h1");\nconst botao = document.querySelector(".btn");\nconst form = document.querySelector("#formulario");',
                    },
                    {
                        title: 'querySelectorAll',
                        text: 'Seleciona todos os elementos correspondentes.',
                        code: 'const paragrafos = document.querySelectorAll("p");\nparagrafos.forEach(p => {\n  console.log(p.textContent);\n});',
                    },
                    {
                        title: 'Métodos Clássicos',
                        text: 'getElementById e getElementsByClassName.',
                        code: 'const header = document.getElementById("header");\nconst cards = document.getElementsByClassName("card");',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual método seleciona por seletor CSS?',
                    options: ['getElement()', 'querySelector()', 'select()', 'find()'],
                    correctAnswer: 1,
                    explanation: 'querySelector aceita qualquer seletor CSS',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que DOM significa?',
                    options: ['Document Object Model', 'Data Object Method', 'Direct Output Mode', 'Document Order Manager'],
                    correctAnswer: 0,
                    explanation: 'DOM = Document Object Model',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: document.____("#menu")',
                    correctAnswer: 'querySelector',
                    explanation: 'querySelector seleciona elementos por seletor CSS',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'querySelectorAll retorna um array',
                    correctAnswer: 'false',
                    explanation: 'Retorna NodeList, semelhante mas não idêntico a array',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Como selecionar elemento por ID com getElementById?',
                    options: ['getElementById("#id")', 'getElementById("id")', 'getElementById(".id")', 'getElementById(id)'],
                    correctAnswer: 1,
                    explanation: 'getElementById recebe apenas o nome do ID, sem #',
                    points: 10,
                },
            ],
        },
        {
            id: 'eventos-js',
            title: 'Eventos',
            description: 'Responda a cliques, teclas e mais',
            xpReward: 150,
            estimatedTime: 20,
            content: {
                introduction: 'Eventos permitem que seu código responda às ações do usuário.',
                sections: [
                    {
                        title: 'addEventListener',
                        text: 'Adiciona um listener de evento a um elemento.',
                        code: 'const botao = document.querySelector("button");\n\nbotao.addEventListener("click", () => {\n  alert("Clicado!");\n});',
                    },
                    {
                        title: 'Eventos Comuns',
                        text: 'click, submit, keydown, mouseover, change, load.',
                        code: 'form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  console.log("Formulário enviado");\n});\n\ninput.addEventListener("change", (e) => {\n  console.log(e.target.value);\n});',
                    },
                    {
                        title: 'Objeto Event',
                        text: 'O evento contém informações sobre a ação.',
                        code: 'document.addEventListener("keydown", (e) => {\n  console.log("Tecla:", e.key);\n  console.log("Código:", e.code);\n});',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual método adiciona evento a um elemento?',
                    options: ['on()', 'addEvent()', 'addEventListener()', 'bind()'],
                    correctAnswer: 2,
                    explanation: 'addEventListener é o método padrão para eventos',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que e.preventDefault() faz?',
                    options: ['Previne o comportamento padrão', 'Previne erros', 'Para a execução', 'Previne duplicação'],
                    correctAnswer: 0,
                    explanation: 'preventDefault impede a ação padrão do evento',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: btn.addEventListener("____", handler)',
                    correctAnswer: 'click',
                    explanation: 'click é o evento de clique do mouse',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'e.target retorna o elemento que disparou o evento',
                    correctAnswer: 'true',
                    explanation: 'e.target é o elemento onde o evento ocorreu',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual evento é disparado ao enviar formulário?',
                    options: ['click', 'send', 'submit', 'post'],
                    correctAnswer: 2,
                    explanation: 'submit é o evento de envio de formulário',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Como obter o valor de um input no evento?',
                    options: ['e.value', 'e.target.value', 'e.input.value', 'e.text'],
                    correctAnswer: 1,
                    explanation: 'e.target.value acessa o valor do input',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 6: OBJETOS E MÉTODOS MODERNOS
// ============================================

export const JS_OBJETOS: LearningModule = {
    id: 'js-objetos',
    name: 'Objetos JavaScript',
    description: 'Objetos, métodos e desestruturação',
    icon: '📦',
    difficulty: 'advanced',
    requiredXP: 1000,
    lessons: [
        {
            id: 'objetos-basicos',
            title: 'Objetos',
            description: 'Criando e manipulando objetos',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Objetos armazenam dados em pares chave-valor.',
                sections: [
                    {
                        title: 'Criando Objetos',
                        text: 'Use chaves {} para criar objetos.',
                        code: 'const pessoa = {\n  nome: "Maria",\n  idade: 30,\n  email: "maria@email.com"\n};',
                    },
                    {
                        title: 'Acessando Propriedades',
                        text: 'Use ponto ou colchetes para acessar.',
                        code: 'console.log(pessoa.nome); // "Maria"\nconsole.log(pessoa["idade"]); // 30\n\npessoa.cidade = "São Paulo"; // adiciona',
                    },
                    {
                        title: 'Métodos',
                        text: 'Objetos podem ter funções como propriedades.',
                        code: 'const usuario = {\n  nome: "João",\n  saudar() {\n    return `Olá, sou ${this.nome}`;\n  }\n};\n\nconsole.log(usuario.saudar());',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Como acessar propriedade "nome" de um objeto?',
                    options: ['objeto->nome', 'objeto.nome', 'objeto:nome', 'objeto(nome)'],
                    correctAnswer: 1,
                    explanation: 'Use ponto (.) para acessar propriedades',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que "this" representa dentro de um método?',
                    options: ['A função', 'O objeto', 'O documento', 'O window'],
                    correctAnswer: 1,
                    explanation: 'this referencia o objeto que contém o método',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: const obj = { nome: "Ana", ____: 25 };',
                    correctAnswer: 'idade',
                    explanation: 'Propriedades são pares chave: valor',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Objetos são mutáveis mesmo com const',
                    correctAnswer: 'true',
                    explanation: 'const impede reatribuição, não mutação',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Como adicionar propriedade a objeto existente?',
                    options: ['objeto.add("prop", valor)', 'objeto.prop = valor', 'objeto += prop', 'objeto.push(prop)'],
                    correctAnswer: 1,
                    explanation: 'objeto.propriedade = valor adiciona/modifica',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// EXPORTAÇÃO DOS MÓDULOS JAVASCRIPT
// ============================================

export const JS_MODULES: LearningModule[] = [
    JS_FUNDAMENTOS,
    JS_TIPOS,
    JS_CONTROLE,
    JS_FUNCOES,
    JS_DOM,
    JS_OBJETOS,
];
