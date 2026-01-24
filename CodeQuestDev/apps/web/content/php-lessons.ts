// CodeQuest - PHP Learning Content
// Curso completo em Português com módulos bem categorizados

import { LearningModule } from './lessons';

// ============================================
// MÓDULO 1: FUNDAMENTOS PHP
// ============================================

export const PHP_FUNDAMENTOS: LearningModule = {
    id: 'php-fundamentos',
    name: 'Fundamentos PHP',
    description: 'Aprenda a base do PHP: sintaxe, variáveis e echo',
    icon: '🐘',
    difficulty: 'beginner',
    lessons: [
        {
            id: 'intro-php',
            title: 'Introdução ao PHP',
            description: 'O que é PHP e como ele funciona',
            xpReward: 100,
            estimatedTime: 15,
            content: {
                introduction: 'PHP (PHP: Hypertext Preprocessor) é uma linguagem de script do lado do servidor usada para desenvolvimento web.',
                sections: [
                    {
                        title: 'O que é PHP?',
                        text: 'PHP é uma linguagem de programação popular para desenvolvimento web. Roda no servidor e gera HTML dinâmico. É gratuito, open source e funciona em diversos sistemas operacionais.',
                    },
                    {
                        title: 'Sintaxe Básica',
                        text: 'Código PHP fica entre <?php e ?>. Todo comando termina com ponto e vírgula.',
                        code: '<?php\n  echo "Olá, mundo!";\n?>',
                    },
                    {
                        title: 'Comentários',
                        text: 'PHP suporta comentários de linha única (//) e múltiplas linhas (/* */).',
                        code: '<?php\n// Comentário de linha\n/* Comentário\n   de múltiplas\n   linhas */\necho "Teste";\n?>',
                    },
                    {
                        title: 'echo e print',
                        text: 'echo e print exibem texto. echo é mais rápido e aceita múltiplos argumentos.',
                        code: '<?php\necho "Olá";\necho "PHP", " é ", "legal";\nprint "Também funciona";\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'O que PHP significa?',
                    options: ['Personal Home Page', 'PHP: Hypertext Preprocessor', 'Programming Hypertext Protocol', 'Page Hyperlink Process'],
                    correctAnswer: 1,
                    explanation: 'PHP significa PHP: Hypertext Preprocessor (acrônimo recursivo)',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Onde o código PHP é executado?',
                    options: ['No navegador', 'No servidor', 'No banco de dados', 'No DNS'],
                    correctAnswer: 1,
                    explanation: 'PHP é uma linguagem server-side, roda no servidor',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: <?____ echo "Olá"; ?>',
                    correctAnswer: 'php',
                    explanation: 'Código PHP começa com <?php',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Comandos PHP devem terminar com ponto e vírgula',
                    correctAnswer: 'true',
                    explanation: 'Todo comando PHP termina com ; (ponto e vírgula)',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual comando exibe texto em PHP?',
                    options: ['print()', 'echo', 'display()', 'write()'],
                    correctAnswer: 1,
                    explanation: 'echo é o comando mais comum para exibir texto',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Qual extensão de arquivo PHP usa?',
                    options: ['.html', '.php', '.phtml', '.script'],
                    correctAnswer: 1,
                    explanation: 'Arquivos PHP usam a extensão .php',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'true-false',
                    question: 'PHP pode ser misturado com HTML no mesmo arquivo',
                    correctAnswer: 'true',
                    explanation: 'PHP pode alternar entre código PHP e HTML no mesmo arquivo',
                    points: 10,
                },
                {
                    id: 'q8',
                    type: 'multiple-choice',
                    question: 'Como fazer comentário de linha única em PHP?',
                    options: ['/* */', '//', '<!-- -->', '#'],
                    correctAnswer: 1,
                    explanation: '// é usado para comentários de linha única (# também funciona)',
                    points: 10,
                },
                {
                    id: 'q9',
                    type: 'fill-blank',
                    question: 'Complete: <?php echo "Olá"; ____>',
                    correctAnswer: '?',
                    explanation: 'Tags PHP fecham com ?>',
                    points: 15,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'Qual diferença entre echo e print?',
                    options: ['São idênticos', 'echo é mais rápido e aceita múltiplos argumentos', 'print é mais rápido', 'echo retorna valor'],
                    correctAnswer: 1,
                    explanation: 'echo é mais rápido, aceita múltiplos argumentos e não retorna valor',
                    points: 15,
                },
            ],
        },

        {
            id: 'variaveis-php',
            title: 'Variáveis em PHP',
            description: 'Declarando e usando variáveis',
            xpReward: 100,
            estimatedTime: 15,
            content: {
                introduction: 'Variáveis PHP armazenam dados e sempre começam com o símbolo $.',
                sections: [
                    {
                        title: 'Declarando Variáveis',
                        text: 'Em PHP, variáveis começam com $ e não precisam de declaração de tipo.',
                        code: '<?php\n$nome = "Maria";\n$idade = 25;\n$preco = 19.99;\n$ativo = true;\n?>',
                    },
                    {
                        title: 'Regras de Nomes',
                        text: 'Devem começar com $ + letra ou underscore. São case-sensitive.',
                        code: '<?php\n$nome = "Ana";\n$Nome = "João"; // diferente de $nome\n$_privado = "valor";\n// $1numero = "erro"; // inválido\n?>',
                    },
                    {
                        title: 'Concatenação',
                        text: 'Use o ponto (.) para concatenar strings.',
                        code: '<?php\n$nome = "Maria";\n$sobrenome = "Silva";\necho $nome . " " . $sobrenome;\n// Ou com aspas duplas:\necho "$nome $sobrenome";\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Como variáveis PHP começam?',
                    options: ['@', '#', '$', '&'],
                    correctAnswer: 2,
                    explanation: 'Variáveis PHP sempre começam com $',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual operador concatena strings em PHP?',
                    options: ['+', '.', '&', ','],
                    correctAnswer: 1,
                    explanation: 'O ponto (.) é usado para concatenação em PHP',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: ____nome = "João";',
                    correctAnswer: '$',
                    explanation: 'Variáveis começam com $',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: '$nome e $Nome são a mesma variável',
                    correctAnswer: 'false',
                    explanation: 'PHP é case-sensitive para variáveis',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'echo "$nome $idade" usa qual tipo de aspas?',
                    options: ['Simples', 'Duplas', 'Ambas funcionam igual', 'Crases'],
                    correctAnswer: 1,
                    explanation: 'Aspas duplas interpretam variáveis, simples não',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'true-false',
                    question: 'PHP requer declaração de tipo de variável',
                    correctAnswer: 'false',
                    explanation: 'PHP é dinamicamente tipado - tipos são inferidos automaticamente',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'multiple-choice',
                    question: 'Qual é inválido como nome de variável?',
                    options: ['$_nome', '$nome2', '$2nome', '$Nome_Completo'],
                    correctAnswer: 2,
                    explanation: 'Variáveis não podem começar com número após o $',
                    points: 10,
                },
                {
                    id: 'q8',
                    type: 'fill-blank',
                    question: 'Complete: echo $nome ____ " Silva"; (concatenar)',
                    correctAnswer: '.',
                    explanation: 'O ponto (.) concatena strings em PHP',
                    points: 15,
                },
                {
                    id: 'q9',
                    type: 'multiple-choice',
                    question: "echo 'Olá $nome' exibe:",
                    options: ['Olá João', 'Olá $nome', 'Erro', 'Nada'],
                    correctAnswer: 1,
                    explanation: 'Aspas simples não interpretam variáveis',
                    points: 15,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'Como verificar se variável existe?',
                    options: ['exists($var)', 'isset($var)', 'defined($var)', 'has($var)'],
                    correctAnswer: 1,
                    explanation: 'isset() verifica se variável existe e não é null',
                    points: 10,
                },
            ],
        },

    ],
};

// ============================================
// MÓDULO 2: TIPOS DE DADOS PHP
// ============================================

export const PHP_TIPOS: LearningModule = {
    id: 'php-tipos',
    name: 'Tipos de Dados',
    description: 'Strings, números, arrays e mais',
    icon: '📊',
    difficulty: 'beginner',
    requiredXP: 200,
    lessons: [
        {
            id: 'tipos-php',
            title: 'Tipos de Dados PHP',
            description: 'String, Integer, Float, Boolean, Array',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'PHP suporta vários tipos de dados: String, Integer, Float, Boolean, Array, Object e NULL.',
                sections: [
                    {
                        title: 'String',
                        text: 'Texto entre aspas simples ou duplas.',
                        code: '<?php\n$texto = "Olá, mundo!";\n$outra = \'Aspas simples\';\necho strlen($texto); // 12\necho strtoupper($texto); // OLÁÁÁÁÁÁÁ, MUNDO!\n?>',
                    },
                    {
                        title: 'Números',
                        text: 'Integer (inteiros) e Float (decimais).',
                        code: '<?php\n$inteiro = 42;\n$decimal = 3.14;\n$negativo = -10;\necho $inteiro + $decimal; // 45.14\n?>',
                    },
                    {
                        title: 'Boolean',
                        text: 'Verdadeiro (true) ou falso (false).',
                        code: '<?php\n$ativo = true;\n$logado = false;\nif ($ativo) {\n  echo "Está ativo";\n}\n?>',
                    },
                    {
                        title: 'Array',
                        text: 'Lista de valores indexados ou associativos.',
                        code: '<?php\n$frutas = ["maçã", "banana", "laranja"];\necho $frutas[0]; // maçã\n\n$pessoa = [\n  "nome" => "Maria",\n  "idade" => 30\n];\necho $pessoa["nome"]; // Maria\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual função retorna o tamanho de uma string?',
                    options: ['length()', 'strlen()', 'size()', 'count()'],
                    correctAnswer: 1,
                    explanation: 'strlen() retorna o comprimento da string',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Como criar array associativo em PHP?',
                    options: ['[key: value]', '[key = value]', '["key" => value]', '{key: value}'],
                    correctAnswer: 2,
                    explanation: 'Arrays associativos usam => para key => value',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: $arr = ["a", "b"]; echo $arr[____];',
                    correctAnswer: '0',
                    explanation: 'Arrays começam no índice 0',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'Float é usado para números decimais',
                    correctAnswer: 'true',
                    explanation: 'Float (ou double) armazena números com casas decimais',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual função converte string para maiúsculas?',
                    options: ['toUpper()', 'uppercase()', 'strtoupper()', 'UPPER()'],
                    correctAnswer: 2,
                    explanation: 'strtoupper() converte para maiúsculas',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 3: CONTROLE DE FLUXO PHP
// ============================================

export const PHP_CONTROLE: LearningModule = {
    id: 'php-controle',
    name: 'Controle de Fluxo',
    description: 'Condicionais e loops em PHP',
    icon: '🔀',
    difficulty: 'intermediate',
    requiredXP: 400,
    lessons: [
        {
            id: 'condicionais-php',
            title: 'Condicionais PHP',
            description: 'if, else, elseif e switch',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Condicionais permitem executar código baseado em condições.',
                sections: [
                    {
                        title: 'if e else',
                        text: 'Estrutura básica de condição.',
                        code: '<?php\n$idade = 18;\n\nif ($idade >= 18) {\n  echo "Maior de idade";\n} else {\n  echo "Menor de idade";\n}\n?>',
                    },
                    {
                        title: 'elseif',
                        text: 'Para múltiplas condições.',
                        code: '<?php\n$nota = 75;\n\nif ($nota >= 90) {\n  echo "A";\n} elseif ($nota >= 70) {\n  echo "B";\n} else {\n  echo "C";\n}\n?>',
                    },
                    {
                        title: 'switch',
                        text: 'Para comparar uma variável com vários valores.',
                        code: '<?php\n$dia = "segunda";\n\nswitch ($dia) {\n  case "segunda":\n    echo "Início da semana";\n    break;\n  case "sexta":\n    echo "Fim da semana";\n    break;\n  default:\n    echo "Meio da semana";\n}\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Como escrever "else if" em PHP?',
                    options: ['elseif ou else if', 'elsif', 'elif', 'otherwise'],
                    correctAnswer: 0,
                    explanation: 'PHP aceita elseif (junto) ou else if (separado)',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que break faz no switch?',
                    options: ['Quebra o código', 'Sai do switch', 'Pausa a execução', 'Retorna valor'],
                    correctAnswer: 1,
                    explanation: 'break sai do switch impedindo fall-through',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: if ($x > 10) { } ____ { }',
                    correctAnswer: 'else',
                    explanation: 'else executa quando if é falso',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'switch é útil para comparar uma variável com vários valores',
                    correctAnswer: 'true',
                    explanation: 'switch é ideal para múltiplas comparações de igualdade',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual caso é executado se nenhum match?',
                    options: ['else', 'otherwise', 'default', 'none'],
                    correctAnswer: 2,
                    explanation: 'default é executado quando nenhum case corresponde',
                    points: 10,
                },
            ],
        },
        {
            id: 'loops-php',
            title: 'Loops PHP',
            description: 'for, while, foreach',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Loops repetem código múltiplas vezes.',
                sections: [
                    {
                        title: 'for',
                        text: 'Loop com contador.',
                        code: '<?php\nfor ($i = 0; $i < 5; $i++) {\n  echo $i . " ";\n}\n// Saída: 0 1 2 3 4\n?>',
                    },
                    {
                        title: 'while',
                        text: 'Repete enquanto condição for verdadeira.',
                        code: '<?php\n$i = 0;\nwhile ($i < 5) {\n  echo $i;\n  $i++;\n}\n?>',
                    },
                    {
                        title: 'foreach',
                        text: 'Ideal para iterar arrays.',
                        code: '<?php\n$frutas = ["maçã", "banana", "laranja"];\nforeach ($frutas as $fruta) {\n  echo $fruta . "<br>";\n}\n\n// Com chave\nforeach ($pessoa as $chave => $valor) {\n  echo "$chave: $valor<br>";\n}\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual loop é melhor para arrays em PHP?',
                    options: ['for', 'while', 'foreach', 'do...while'],
                    correctAnswer: 2,
                    explanation: 'foreach foi criado especificamente para arrays',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Qual é a sintaxe de foreach?',
                    options: ['foreach ($arr in $item)', 'foreach ($arr as $item)', 'for each $arr as $item', 'foreach $item in $arr'],
                    correctAnswer: 1,
                    explanation: 'Sintaxe: foreach ($array as $item)',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: for ($i = 0; $i < 10; $i____)',
                    correctAnswer: '++',
                    explanation: '$i++ incrementa a variável em 1',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'foreach pode acessar chaves e valores',
                    correctAnswer: 'true',
                    explanation: 'Use foreach ($arr as $key => $value)',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual comando sai do loop?',
                    options: ['exit', 'stop', 'break', 'end'],
                    correctAnswer: 2,
                    explanation: 'break encerra o loop atual',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 4: FUNÇÕES PHP
// ============================================

export const PHP_FUNCOES: LearningModule = {
    id: 'php-funcoes',
    name: 'Funções PHP',
    description: 'Criando e usando funções',
    icon: '🔧',
    difficulty: 'intermediate',
    requiredXP: 600,
    lessons: [
        {
            id: 'funcoes-php',
            title: 'Funções em PHP',
            description: 'Declarando e chamando funções',
            xpReward: 120,
            estimatedTime: 18,
            content: {
                introduction: 'Funções são blocos de código reutilizáveis.',
                sections: [
                    {
                        title: 'Declarando Funções',
                        text: 'Use function para criar funções.',
                        code: '<?php\nfunction saudacao($nome) {\n  return "Olá, " . $nome . "!";\n}\n\necho saudacao("Maria"); // Olá, Maria!\n?>',
                    },
                    {
                        title: 'Parâmetros e Return',
                        text: 'Funções recebem parâmetros e retornam valores.',
                        code: '<?php\nfunction soma($a, $b) {\n  return $a + $b;\n}\n\n$resultado = soma(5, 3); // 8\n?>',
                    },
                    {
                        title: 'Parâmetros Padrão',
                        text: 'Defina valores padrão para parâmetros opcionais.',
                        code: '<?php\nfunction saudar($nome = "Visitante") {\n  return "Olá, " . $nome;\n}\n\necho saudar(); // Olá, Visitante\necho saudar("Ana"); // Olá, Ana\n?>',
                    },
                    {
                        title: 'Type Hints',
                        text: 'Especifique tipos de parâmetros e retorno.',
                        code: '<?php\nfunction soma(int $a, int $b): int {\n  return $a + $b;\n}\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual palavra-chave declara função em PHP?',
                    options: ['func', 'function', 'def', 'fn'],
                    correctAnswer: 1,
                    explanation: 'function é a palavra-chave para funções',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que return faz?',
                    options: ['Imprime valor', 'Retorna e encerra função', 'Declara variável', 'Inicia loop'],
                    correctAnswer: 1,
                    explanation: 'return retorna um valor e encerra a função',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: function soma($a, $b) { ____ $a + $b; }',
                    correctAnswer: 'return',
                    explanation: 'return retorna o resultado',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'PHP 7+ suporta type hints para parâmetros',
                    correctAnswer: 'true',
                    explanation: 'Type hints foram introduzidos no PHP 7',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Como definir parâmetro opcional?',
                    options: ['$param?', '$param = valor', 'optional $param', '$param || valor'],
                    correctAnswer: 1,
                    explanation: 'Parâmetros com = valor são opcionais',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 5: FORMULÁRIOS E WEB
// ============================================

export const PHP_FORMULARIOS: LearningModule = {
    id: 'php-formularios',
    name: 'Formulários e Web',
    description: 'GET, POST e validação de dados',
    icon: '📝',
    difficulty: 'intermediate',
    requiredXP: 800,
    lessons: [
        {
            id: 'get-post',
            title: 'GET e POST',
            description: 'Recebendo dados de formulários',
            xpReward: 150,
            estimatedTime: 20,
            content: {
                introduction: 'PHP recebe dados de formulários via $_GET e $_POST.',
                sections: [
                    {
                        title: 'Método GET',
                        text: 'Dados aparecem na URL. Bom para buscas.',
                        code: '<!-- HTML -->\n<form method="GET" action="busca.php">\n  <input name="termo" type="text">\n  <button>Buscar</button>\n</form>\n\n<!-- PHP: busca.php -->\n<?php\n$termo = $_GET["termo"];\necho "Buscando: " . $termo;\n?>',
                    },
                    {
                        title: 'Método POST',
                        text: 'Dados não aparecem na URL. Melhor para senhas e dados sensíveis.',
                        code: '<!-- HTML -->\n<form method="POST" action="login.php">\n  <input name="email" type="email">\n  <input name="senha" type="password">\n  <button>Entrar</button>\n</form>\n\n<!-- PHP: login.php -->\n<?php\n$email = $_POST["email"];\n$senha = $_POST["senha"];\n?>',
                    },
                    {
                        title: 'Validação',
                        text: 'Sempre valide dados do usuário.',
                        code: '<?php\nif (empty($_POST["email"])) {\n  echo "Email é obrigatório";\n} else {\n  $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);\n  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {\n    echo "Email válido";\n  }\n}\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'Qual método mostra dados na URL?',
                    options: ['POST', 'GET', 'PUT', 'DELETE'],
                    correctAnswer: 1,
                    explanation: 'GET envia dados pela URL (query string)',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'Como acessar dado POST chamado "nome"?',
                    options: ['$POST["nome"]', '$_POST["nome"]', 'POST.nome', '$_POST->nome'],
                    correctAnswer: 1,
                    explanation: '$_POST é o array superglobal para dados POST',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: $email = $_____["email"];',
                    correctAnswer: 'POST',
                    explanation: '$_POST acessa dados enviados via POST',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'POST é mais seguro que GET para senhas',
                    correctAnswer: 'true',
                    explanation: 'POST não expõe dados na URL como GET',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual função verifica se variável está vazia?',
                    options: ['isNull()', 'empty()', 'blank()', 'void()'],
                    correctAnswer: 1,
                    explanation: 'empty() retorna true se vazio, null, 0 ou ""',
                    points: 10,
                },
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'Qual função valida email em PHP?',
                    options: ['validate_email()', 'filter_var() com FILTER_VALIDATE_EMAIL', 'check_email()', 'email_valid()'],
                    correctAnswer: 1,
                    explanation: 'filter_var com FILTER_VALIDATE_EMAIL valida emails',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// MÓDULO 6: BANCO DE DADOS
// ============================================

export const PHP_DATABASE: LearningModule = {
    id: 'php-database',
    name: 'PHP e Banco de Dados',
    description: 'Conectando ao MySQL com PDO',
    icon: '🗄️',
    difficulty: 'advanced',
    requiredXP: 1000,
    lessons: [
        {
            id: 'pdo-php',
            title: 'PDO - PHP Data Objects',
            description: 'Conectando e consultando banco de dados',
            xpReward: 150,
            estimatedTime: 25,
            content: {
                introduction: 'PDO é a forma moderna e segura de conectar PHP a bancos de dados.',
                sections: [
                    {
                        title: 'Conectando ao Banco',
                        text: 'Use PDO para conexão segura.',
                        code: '<?php\ntry {\n  $pdo = new PDO(\n    "mysql:host=localhost;dbname=meubd",\n    "usuario",\n    "senha"\n  );\n  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);\n  echo "Conectado!";\n} catch (PDOException $e) {\n  echo "Erro: " . $e->getMessage();\n}\n?>',
                    },
                    {
                        title: 'Consultas SELECT',
                        text: 'Buscando dados do banco.',
                        code: '<?php\n$stmt = $pdo->query("SELECT * FROM usuarios");\nwhile ($row = $stmt->fetch()) {\n  echo $row["nome"] . "<br>";\n}\n?>',
                    },
                    {
                        title: 'Prepared Statements',
                        text: 'Previne SQL Injection.',
                        code: '<?php\n$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");\n$stmt->execute([$id]);\n$usuario = $stmt->fetch();\n\n// Com named parameters\n$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email) VALUES (:nome, :email)");\n$stmt->execute([\n  ":nome" => $nome,\n  ":email" => $email\n]);\n?>',
                    },
                ],
            },
            quiz: [
                {
                    id: 'q1',
                    type: 'multiple-choice',
                    question: 'O que PDO significa?',
                    options: ['PHP Data Object', 'PHP Database Operations', 'Personal Data Object', 'Process Data Output'],
                    correctAnswer: 0,
                    explanation: 'PDO = PHP Data Objects',
                    points: 10,
                },
                {
                    id: 'q2',
                    type: 'multiple-choice',
                    question: 'O que Prepared Statements previne?',
                    options: ['Erros de sintaxe', 'SQL Injection', 'Conexão lenta', 'Timeout'],
                    correctAnswer: 1,
                    explanation: 'Prepared Statements protegem contra SQL Injection',
                    points: 10,
                },
                {
                    id: 'q3',
                    type: 'fill-blank',
                    question: 'Complete: $pdo = new ____(dsn, user, pass);',
                    correctAnswer: 'PDO',
                    explanation: 'PDO é a classe para conexão',
                    points: 15,
                },
                {
                    id: 'q4',
                    type: 'true-false',
                    question: 'PDO suporta múltiplos bancos de dados',
                    correctAnswer: 'true',
                    explanation: 'PDO funciona com MySQL, PostgreSQL, SQLite, etc.',
                    points: 10,
                },
                {
                    id: 'q5',
                    type: 'multiple-choice',
                    question: 'Qual método executa prepared statement?',
                    options: ['run()', 'query()', 'execute()', 'start()'],
                    correctAnswer: 2,
                    explanation: 'execute() executa o prepared statement',
                    points: 10,
                },
            ],
        },
    ],
};

// ============================================
// EXPORTAÇÃO DOS MÓDULOS PHP
// ============================================

export const PHP_MODULES: LearningModule[] = [
    PHP_FUNDAMENTOS,
    PHP_TIPOS,
    PHP_CONTROLE,
    PHP_FUNCOES,
    PHP_FORMULARIOS,
    PHP_DATABASE,
];
