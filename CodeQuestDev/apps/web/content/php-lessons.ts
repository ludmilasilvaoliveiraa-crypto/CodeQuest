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
            description: 'O que é PHP, como funciona no servidor e por que é popular',
            xpReward: 150,
            estimatedTime: 25,
            content: {
                introduction: 'PHP (PHP: Hypertext Preprocessor) é a linguagem de script do lado do servidor mais popular da web. Diferente de JavaScript que roda no navegador, PHP é executado no servidor e gera HTML dinamicamente. WordPress, Facebook, Wikipedia e milhões de sites usam PHP. É gratuito, open source e fácil de aprender.',
                sections: [
                    {
                        title: 'O que é PHP?',
                        text: 'PHP é uma linguagem de programação criada especificamente para desenvolvimento web. Roda no servidor (não no navegador), processa requisições, acessa bancos de dados e gera páginas HTML dinâmicas. O nome é um acrônimo recursivo: PHP Hypertext Preprocessor.',
                        code: '<?php\n// PHP roda no servidor\n// O usuário NUNCA vê o código PHP\n// Ele só recebe o HTML gerado\n\n$nome = "Maria";\necho "<h1>Olá, $nome!</h1>";\n\n// O navegador recebe apenas:\n// <h1>Olá, Maria!</h1>\n?>',
                    },
                    {
                        title: 'Por que usar PHP?',
                        text: 'PHP é popular por várias razões: é gratuito e open source, fácil de aprender, roda em qualquer servidor (Linux, Windows, Mac), tem excelente integração com MySQL e outras bases de dados, possui grande comunidade e documentação, e alimenta mais de 75% dos sites da web.',
                        code: '<?php\n// PHP pode fazer muitas coisas:\n\n// 1. Gerar conteúdo dinâmico\necho "Hoje é " . date("d/m/Y");\n\n// 2. Acessar banco de dados\n$usuarios = buscarUsuarios();\n\n// 3. Processar formulários\n$email = $_POST["email"];\n\n// 4. Gerenciar sessões (login)\nsession_start();\n$_SESSION["usuario"] = $email;\n\n// 5. Enviar emails\nmail($email, "Assunto", "Mensagem");\n?>',
                    },
                    {
                        title: 'Sintaxe Básica',
                        text: 'Código PHP fica entre as tags <?php e ?>. Todo comando termina com ponto e vírgula (;). PHP é case-sensitive para variáveis ($nome ≠ $Nome), mas não para funções. Arquivos PHP têm extensão .php.',
                        code: '<?php\n// Arquivo: index.php\n\n// Comandos terminam com ;\necho "Olá, mundo!";\nprint "Também funciona";\n\n// Variáveis são case-sensitive\n$nome = "Ana";\n$Nome = "João";  // Variável diferente!\n\n// Funções NÃO são case-sensitive\nECHO "funciona";  // Funciona, mas evite\necho "melhor";    // Padrão: minúsculas\n?>',
                    },
                    {
                        title: 'Comentários',
                        text: 'PHP suporta três tipos de comentários: linha única com // ou #, e múltiplas linhas com /* */. Use comentários para explicar código complexo, não para descrever o óbvio.',
                        code: '<?php\n// Comentário de linha única\n# Também linha única (estilo shell)\n\n/*\n  Comentário de\n  múltiplas linhas\n  para explicações longas\n*/\n\n// Bom comentário:\n// Calcula desconto progressivo baseado na fidelidade\n$desconto = calcularDesconto($cliente);\n\n// Comentário ruim (óbvio):\n$total = 100;  // Define total como 100\n?>',
                    },
                    {
                        title: 'echo e print',
                        text: 'echo e print exibem conteúdo na página. echo é mais usado: é um pouco mais rápido e aceita múltiplos argumentos. print retorna 1, podendo ser usado em expressões (raro). Para interpolar variáveis, use aspas duplas.',
                        code: '<?php\n// echo - mais comum e versátil\necho "Olá, mundo!";\necho "Linha 1", " - ", "Linha 2";  // Múltiplos args\n\n// print - retorna 1\nprint "Também funciona";\n$sucesso = print "Retorna 1";  // $sucesso = 1\n\n// Aspas duplas vs simples\n$nome = "Ana";\necho "Olá, $nome!";      // Olá, Ana! (interpola)\necho \'Olá, $nome!\';     // Olá, $nome! (literal)\n\n// Concatenação com ponto\necho "Nome: " . $nome . "<br>";\n?>',
                    },
                    {
                        title: 'PHP e HTML',
                        text: 'A grande força do PHP é gerar HTML dinâmico. Você pode alternar entre PHP e HTML no mesmo arquivo, inserir variáveis PHP no HTML, ou gerar HTML completo com echo. O servidor processa o PHP e envia apenas HTML ao navegador.',
                        code: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Minha Página</title>\n</head>\n<body>\n  <h1>Bem-vindo!</h1>\n  \n  <?php\n    // Variáveis PHP\n    $usuario = "Maria";\n    $produtos = ["Camiseta", "Calça", "Tênis"];\n  ?>\n  \n  <p>Olá, <?php echo $usuario; ?>!</p>\n  \n  <h2>Produtos:</h2>\n  <ul>\n    <?php foreach($produtos as $p): ?>\n      <li><?php echo $p; ?></li>\n    <?php endforeach; ?>\n  </ul>\n</body>\n</html>',
                    },
                    {
                        title: 'Configuração e Servidor',
                        text: 'Para rodar PHP localmente, você precisa de um servidor como XAMPP (Windows/Mac), MAMP (Mac), ou o servidor embutido do PHP (php -S). Em produção, PHP roda em servidores Apache ou Nginx. O arquivo principal geralmente é index.php.',
                        code: '# Iniciando servidor embutido do PHP\n# No terminal, na pasta do projeto:\nphp -S localhost:8000\n\n# Acesse: http://localhost:8000\n\n# Estrutura típica de projeto:\nproject/\n├── index.php        # Página inicial\n├── about.php        # Outras páginas\n├── includes/\n│   ├── header.php   # Cabeçalho comum\n│   └── footer.php   # Rodapé comum\n├── css/\n│   └── style.css\n└── config.php       # Configurações',
                    },
                ],
                tips: [
                    'Sempre termine comandos com ponto e vírgula',
                    'Use aspas duplas para interpolar variáveis',
                    'Nunca mostre erros em produção (display_errors = Off)',
                    'Separe lógica (PHP) de apresentação (HTML)',
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
                introduction: 'Variáveis PHP armazenam dados e sempre começam com o símbolo $. PHP é uma linguagem de tipagem dinâmica - o tipo é determinado automaticamente pelo valor. Entender escopo, constantes e tipos é essencial para código organizado.',
                sections: [
                    {
                        title: 'Declarando Variáveis',
                        text: 'Em PHP, variáveis começam com $ e não precisam de declaração de tipo. O tipo é inferido do valor atribuído. Você pode reatribuir valores de tipos diferentes.',
                        code: '<?php\n// Tipos são inferidos automaticamente\n$nome = "Maria";      // string\n$idade = 25;          // integer\n$preco = 19.99;       // float\n$ativo = true;        // boolean\n$nulo = null;         // null\n\n// Reatribuição (tipagem dinâmica)\n$valor = 10;\n$valor = "dez";  // agora é string\n\n// Verificar tipo\nvar_dump($nome);  // string(5) "Maria"\ngettype($idade);  // "integer"\n?>',
                    },
                    {
                        title: 'Regras de Nomes',
                        text: 'Variáveis devem começar com $ + letra ou underscore. São case-sensitive ($nome ≠ $Nome). Não podem começar com número. Use nomes descritivos que indiquem o propósito.',
                        code: '<?php\n// ✅ Válidos\n$nome = "Ana";\n$Nome = "João";        // diferente de $nome!\n$_privado = "valor";\n$preco_total = 100;\n$precoTotal = 100;     // camelCase também ok\n\n// ❌ Inválidos\n// $1numero = "erro";   // não pode começar com número\n// $pre-co = 10;        // hífen não permitido\n\n// Convenções comuns\n$totalDeItens = 5;     // camelCase\n$total_de_itens = 5;   // snake_case (mais comum em PHP)\n?>',
                    },
                    {
                        title: 'Constantes',
                        text: 'Constantes são valores que não mudam. Use define() ou const. Convenção: MAIÚSCULAS com underscore. Não usam $. Úteis para configurações e valores fixos.',
                        code: '<?php\n// Forma tradicional\ndefine("PI", 3.14159);\ndefine("SITE_NOME", "CodeQuest");\n\n// Forma moderna (dentro de classes também)\nconst VERSAO = "2.0";\nconst MAX_USUARIOS = 100;\n\n// Usando constantes\necho PI;           // 3.14159\necho SITE_NOME;    // CodeQuest\n\n// Constantes mágicas (built-in)\necho __FILE__;     // caminho do arquivo\necho __LINE__;     // número da linha\necho __DIR__;      // diretório do arquivo\necho __FUNCTION__; // nome da função\necho __CLASS__;    // nome da classe\n?>',
                    },
                    {
                        title: 'Escopo de Variáveis',
                        text: 'PHP tem escopo global e local. Variáveis de função são locais. Use global para acessar globais dentro de função (evite!) ou $GLOBALS. Parâmetros são sempre locais.',
                        code: '<?php\n$global = "Sou global";\n\nfunction teste() {\n    $local = "Sou local";\n    echo $local;  // funciona\n    // echo $global; // ❌ erro! não existe aqui\n    \n    // Acessar global (evite se possível)\n    global $global;\n    echo $global;  // agora funciona\n    \n    // Ou via $GLOBALS\n    echo $GLOBALS[\"global\"];\n}\n\nteste();\n// echo $local; // ❌ erro! só existe dentro da função\n\n// Variáveis estáticas (mantém valor entre chamadas)\nfunction contador() {\n    static $count = 0;\n    $count++;\n    return $count;\n}\necho contador(); // 1\necho contador(); // 2\necho contador(); // 3\n?>',
                    },
                    {
                        title: 'Concatenação e Interpolação',
                        text: 'Use ponto (.) para concatenar. Aspas duplas permitem interpolação ($var dentro da string). Aspas simples são literais. Para arrays use chaves {}.',
                        code: '<?php\n$nome = "Maria";\n$idade = 25;\n\n// Concatenação com .\necho "Olá, " . $nome . "!";\necho "Idade: " . $idade;\n\n// Interpolação (aspas duplas)\necho "Olá, $nome!";        // Olá, Maria!\necho "Idade: $idade anos";\n\n// Aspas simples (literal)\necho \'Olá, $nome!\';        // Olá, $nome! (literal)\n\n// Arrays - use chaves\n$user = ["nome" => "João"];\necho "Usuário: {$user[\"nome\"]}";\n\n// Heredoc (strings longas)\n$html = <<<HTML\n<div>\n    <h1>$nome</h1>\n    <p>Idade: $idade</p>\n</div>\nHTML;\n?>',
                    },
                    {
                        title: 'Type Casting',
                        text: 'Converta tipos explicitamente com casting: (int), (float), (string), (bool), (array). Funções: intval(), floatval(), strval() também funcionam.',
                        code: '<?php\n// Casting explícito\n$numero = "42";\n$int = (int) $numero;      // 42 (integer)\n$float = (float) "3.14";   // 3.14\n$string = (string) 100;    // "100"\n$bool = (bool) 1;          // true\n$array = (array) "texto";  // ["texto"]\n\n// Funções de conversão\n$valor = intval("99");     // 99\n$preco = floatval("19.99"); // 19.99\n$texto = strval(42);       // "42"\n\n// Cuidado com conversões\n$x = (int) "10abc";  // 10\n$y = (int) "abc10";  // 0\n$z = (bool) "";      // false\n$w = (bool) "0";     // false\n$v = (bool) "false"; // true! (string não vazia)\n\n// Verificar tipos\nis_int($int);      // true\nis_string($texto); // true\nis_array($array);  // true\n?>',
                    },
                    {
                        title: 'Variáveis Superglobais',
                        text: 'PHP tem variáveis globais especiais acessíveis em qualquer escopo: $_GET, $_POST, $_SESSION, $_COOKIE, $_SERVER, $_FILES, $_ENV, $_REQUEST.',
                        code: '<?php\n// Dados de formulário GET (URL)\n$busca = $_GET["q"] ?? "";  // ?q=termo\n\n// Dados de formulário POST\n$email = $_POST["email"] ?? "";\n\n// Sessão (dados entre páginas)\nsession_start();\n$_SESSION["usuario"] = "João";\n\n// Cookies\n$tema = $_COOKIE["tema"] ?? "light";\n\n// Informações do servidor\n$ip = $_SERVER["REMOTE_ADDR"];\n$url = $_SERVER["REQUEST_URI"];\n$metodo = $_SERVER["REQUEST_METHOD"];\n\n// Arquivos enviados\n$arquivo = $_FILES["documento"];\n$nomeArq = $arquivo["name"];\n$tamanho = $arquivo["size"];\n\n// Sempre valide dados externos!\n$email = filter_input(INPUT_POST, \"email\", FILTER_VALIDATE_EMAIL);\n?>',
                    },
                ],
                tips: [
                    'Use const para constantes em classes',
                    'Evite global - passe parâmetros para funções',
                    'Valide sempre $_GET e $_POST antes de usar',
                    'static mantém valor entre chamadas de função',
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
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'O que acontece sem break no switch?',
                    options: ['Erro', 'Fall-through (executa próximos cases)', 'Para execução', 'Reinicia switch'],
                    correctAnswer: 1,
                    explanation: 'Sem break, a execução "cai" para o próximo case',
                    points: 15,
                },
                {
                    id: 'q7',
                    type: 'true-false',
                    question: 'PHP suporta operador ternário (?:)',
                    correctAnswer: 'true',
                    explanation: 'PHP suporta: $x = $cond ? "sim" : "não";',
                    points: 10,
                },
                {
                    id: 'q8',
                    type: 'fill-blank',
                    question: 'Complete: $x = $a > $b ____ $a : $b;',
                    correctAnswer: '?',
                    explanation: 'Operador ternário: condição ? valor1 : valor2',
                    points: 15,
                },
                {
                    id: 'q9',
                    type: 'multiple-choice',
                    question: 'O que && representa em PHP?',
                    options: ['OU lógico', 'E lógico', 'Concatenação', 'Comparação'],
                    correctAnswer: 1,
                    explanation: '&& (ou and) é o operador E lógico',
                    points: 10,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'O que || representa em PHP?',
                    options: ['E lógico', 'OU lógico', 'Pipe', 'Módulo'],
                    correctAnswer: 1,
                    explanation: '|| (ou or) é o operador OU lógico',
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
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'O que continue faz?',
                    options: ['Sai do loop', 'Pula para próxima iteração', 'Reinicia contador', 'Para PHP'],
                    correctAnswer: 1,
                    explanation: 'continue pula para a próxima iteração',
                    points: 10,
                },
                {
                    id: 'q7',
                    type: 'fill-blank',
                    question: 'Complete: foreach ($arr as $key ____ $value)',
                    correctAnswer: '=>',
                    explanation: '=> separa chave do valor no foreach',
                    points: 15,
                },
                {
                    id: 'q8',
                    type: 'true-false',
                    question: 'do...while executa pelo menos uma vez',
                    correctAnswer: 'true',
                    explanation: 'do...while verifica condição DEPOIS da primeira execução',
                    points: 10,
                },
                {
                    id: 'q9',
                    type: 'multiple-choice',
                    question: 'Qual forma correta de decrementar?',
                    options: ['$i--', '$i-1', 'dec($i)', '$i minus 1'],
                    correctAnswer: 0,
                    explanation: '$i-- decrementa a variável em 1',
                    points: 10,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'continue 2 faz o quê em loops aninhados?',
                    options: ['Erro', 'Pula 2 iterações', 'Continua no loop externo', 'Para tudo'],
                    correctAnswer: 2,
                    explanation: 'continue N afeta o N-ésimo loop externo',
                    points: 15,
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
                {
                    id: 'q6',
                    type: 'multiple-choice',
                    question: 'O que : int após () significa?',
                    options: ['Parâmetro int', 'Tipo de retorno int', 'Erro', 'Constante'],
                    correctAnswer: 1,
                    explanation: ': tipo após () define o tipo de retorno da função',
                    points: 15,
                },
                {
                    id: 'q7',
                    type: 'true-false',
                    question: 'PHP suporta funções anônimas (closures)',
                    correctAnswer: 'true',
                    explanation: 'PHP suporta closures desde PHP 5.3',
                    points: 10,
                },
                {
                    id: 'q8',
                    type: 'fill-blank',
                    question: 'Complete: function greet(string $name): ____ { }',
                    correctAnswer: 'string',
                    explanation: 'O tipo de retorno é declarado após :',
                    points: 15,
                },
                {
                    id: 'q9',
                    type: 'multiple-choice',
                    question: 'O que significa ?string como tipo?',
                    options: ['String obrigatória', 'String ou null', 'Qualquer tipo', 'Erro'],
                    correctAnswer: 1,
                    explanation: '? permite null além do tipo especificado',
                    points: 15,
                },
                {
                    id: 'q10',
                    type: 'multiple-choice',
                    question: 'Qual é a syntax de arrow function no PHP 7.4+?',
                    options: ['() => {}', 'fn() => expr', 'function => {}', '-> () {}'],
                    correctAnswer: 1,
                    explanation: 'Arrow functions: fn($x) => $x * 2',
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
