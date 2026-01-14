// CodeQuest - Interactive Questions (Fill-blank, Code-fix, True-false)
import type { QuizQuestion } from './lessons';

// =====================================================
// FILL-BLANK QUESTIONS - User types the answer
// =====================================================

export const FILL_BLANK_BASICS: QuizQuestion[] = [
    {
        id: 'fb-1',
        type: 'fill-blank',
        question: 'Complete: <!_____ html>',
        correctAnswer: 'DOCTYPE',
        explanation: '<!DOCTYPE html> declara que o documento é HTML5',
        points: 15,
    },
    {
        id: 'fb-2',
        type: 'fill-blank',
        question: 'Complete: <img ___="foto.jpg">',
        correctAnswer: 'src',
        explanation: 'src (source) define o caminho da imagem',
        points: 15,
    },
    {
        id: 'fb-3',
        type: 'fill-blank',
        question: 'Complete: <a ___="https://google.com">Link</a>',
        correctAnswer: 'href',
        explanation: 'href (Hypertext Reference) define o destino do link',
        points: 15,
    },
    {
        id: 'fb-4',
        type: 'fill-blank',
        question: 'Complete: <input type="email" ___>',
        correctAnswer: 'required',
        explanation: 'required torna o campo obrigatório',
        points: 15,
    },
    {
        id: 'fb-5',
        type: 'fill-blank',
        question: 'Complete: <button type="___">Enviar</button>',
        correctAnswer: 'submit',
        explanation: 'type="submit" envia o formulário',
        points: 15,
    },
];

export const FILL_BLANK_STRUCTURE: QuizQuestion[] = [
    {
        id: 'fb-s1',
        type: 'fill-blank',
        question: 'Complete: <___ class="item">Item</___>',
        correctAnswer: 'li',
        explanation: '<li> (list item) define um item de lista',
        points: 15,
    },
    {
        id: 'fb-s2',
        type: 'fill-blank',
        question: 'Complete: <td ___="2">Ocupa 2 colunas</td>',
        correctAnswer: 'colspan',
        explanation: 'colspan mescla colunas horizontalmente',
        points: 15,
    },
    {
        id: 'fb-s3',
        type: 'fill-blank',
        question: 'Complete: <div ___="container">',
        correctAnswer: 'class',
        explanation: 'class define classes CSS reutilizáveis',
        points: 15,
    },
    {
        id: 'fb-s4',
        type: 'fill-blank',
        question: 'Complete: <label ___="email">Email:</label>',
        correctAnswer: 'for',
        explanation: 'for conecta o label ao input com mesmo id',
        points: 15,
    },
];

export const FILL_BLANK_FORMS: QuizQuestion[] = [
    {
        id: 'fb-f1',
        type: 'fill-blank',
        question: 'Complete: <form ___="/enviar" method="POST">',
        correctAnswer: 'action',
        explanation: 'action define a URL de destino do formulário',
        points: 15,
    },
    {
        id: 'fb-f2',
        type: 'fill-blank',
        question: 'Complete: <input type="text" ___="3">',
        correctAnswer: 'minlength',
        explanation: 'minlength define o mínimo de caracteres',
        points: 15,
    },
    {
        id: 'fb-f3',
        type: 'fill-blank',
        question: 'Complete: <input type="___" placeholder="Digite seu email">',
        correctAnswer: 'email',
        explanation: 'type="email" valida formato de email',
        points: 15,
    },
];

// =====================================================
// CODE-FIX QUESTIONS - Find and fix the error
// =====================================================

export const CODE_FIX_QUESTIONS: QuizQuestion[] = [
    {
        id: 'cf-1',
        type: 'code-fix',
        question: 'Qual é o erro neste código?',
        code: '<p>Olá mundo<p>',
        options: ['Falta tag de fechamento </p>', 'Tag errada', 'Falta atributo', 'Não há erro'],
        correctAnswer: 0,
        explanation: 'A tag <p> precisa ser fechada com </p>',
        points: 20,
    },
    {
        id: 'cf-2',
        type: 'code-fix',
        question: 'Qual é o erro neste código?',
        code: '<img src="foto.jpg">',
        options: ['Falta alt', 'Falta fechamento', 'src errado', 'Não há erro'],
        correctAnswer: 0,
        explanation: 'Imagens devem ter o atributo alt para acessibilidade',
        points: 20,
    },
    {
        id: 'cf-3',
        type: 'code-fix',
        question: 'Qual é o erro neste código?',
        code: '<a href="link.html" target="_blank">Clique</a>',
        options: ['Falta rel="noopener"', 'href incorreto', 'target incorreto', 'Não há erro'],
        correctAnswer: 0,
        explanation: 'Links com target="_blank" devem ter rel="noopener" para segurança',
        points: 20,
    },
    {
        id: 'cf-4',
        type: 'code-fix',
        question: 'Qual é o problema de acessibilidade?',
        code: '<button>X</button>',
        options: ['Falta aria-label', 'Falta type', 'Falta id', 'Está correto'],
        correctAnswer: 0,
        explanation: 'Botões com apenas ícone precisam de aria-label para leitores de tela',
        points: 20,
    },
    {
        id: 'cf-5',
        type: 'code-fix',
        question: 'Qual é o erro semântico?',
        code: '<div class="header">\n  <div class="nav">Menu</div>\n</div>',
        options: ['Deveria usar <header> e <nav>', 'Falta class', 'Falta id', 'Está correto'],
        correctAnswer: 0,
        explanation: 'Use tags semânticas <header> e <nav> em vez de divs genéricos',
        points: 20,
    },
    {
        id: 'cf-6',
        type: 'code-fix',
        question: 'Qual é o erro neste formulário?',
        code: '<form>\n  <input type="text">\n  <button>Enviar</button>\n</form>',
        options: ['Falta name e label', 'Falta action', 'Falta id', 'Está correto'],
        correctAnswer: 0,
        explanation: 'Inputs devem ter name para enviar dados e label para acessibilidade',
        points: 20,
    },
];

// =====================================================
// TRUE-FALSE QUESTIONS
// =====================================================

export const TRUE_FALSE_QUESTIONS: QuizQuestion[] = [
    {
        id: 'tf-1',
        type: 'true-false',
        question: 'A tag <br> precisa de fechamento: <br></br>',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 1,
        explanation: '<br> é uma tag vazia e não precisa de fechamento',
        points: 10,
    },
    {
        id: 'tf-2',
        type: 'true-false',
        question: 'É possível ter mais de um <main> por página',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 1,
        explanation: 'Deve haver apenas um <main> por página',
        points: 10,
    },
    {
        id: 'tf-3',
        type: 'true-false',
        question: 'IDs devem ser únicos em uma página HTML',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 0,
        explanation: 'Sim, cada ID deve aparecer apenas uma vez na página',
        points: 10,
    },
    {
        id: 'tf-4',
        type: 'true-false',
        question: '<strong> e <b> têm o mesmo significado semântico',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 1,
        explanation: '<strong> indica importância, <b> é apenas visual',
        points: 10,
    },
    {
        id: 'tf-5',
        type: 'true-false',
        question: 'O atributo alt em imagens é opcional',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 1,
        explanation: 'alt é obrigatório para acessibilidade',
        points: 10,
    },
    {
        id: 'tf-6',
        type: 'true-false',
        question: 'HTML5 suporta vídeo e áudio nativamente',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 0,
        explanation: 'Sim, com as tags <video> e <audio>',
        points: 10,
    },
    {
        id: 'tf-7',
        type: 'true-false',
        question: 'GET é mais seguro que POST para enviar senhas',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 1,
        explanation: 'GET expõe dados na URL, POST é mais seguro',
        points: 10,
    },
    {
        id: 'tf-8',
        type: 'true-false',
        question: 'SVG perde qualidade quando ampliado',
        options: ['Verdadeiro', 'Falso'],
        correctAnswer: 1,
        explanation: 'SVG é vetorial e não perde qualidade',
        points: 10,
    },
];

// =====================================================
// ADDITIONAL MULTIPLE CHOICE (More questions per module)
// =====================================================

export const EXTRA_BASICS_QUESTIONS: QuizQuestion[] = [
    {
        id: 'eb-1',
        type: 'multiple-choice',
        question: 'Qual tag cria um bloco de citação?',
        options: ['<cite>', '<blockquote>', '<quote>', '<q>'],
        correctAnswer: 1,
        explanation: '<blockquote> é para citações longas em bloco',
        points: 10,
    },
    {
        id: 'eb-2',
        type: 'multiple-choice',
        question: 'Qual tag preserva espaços e quebras de linha?',
        options: ['<code>', '<pre>', '<space>', '<text>'],
        correctAnswer: 1,
        explanation: '<pre> (preformatted) mantém formatação original',
        points: 10,
    },
    {
        id: 'eb-3',
        type: 'multiple-choice',
        question: 'Qual tag é para código inline?',
        options: ['<pre>', '<code>', '<script>', '<program>'],
        correctAnswer: 1,
        explanation: '<code> é usado para trechos de código inline',
        points: 10,
    },
    {
        id: 'eb-4',
        type: 'multiple-choice',
        question: 'Qual a diferença entre <section> e <div>?',
        options: ['Nenhuma', '<section> é semântico', '<div> é semântico', 'São iguais'],
        correctAnswer: 1,
        explanation: '<section> é semântico e indica uma seção temática',
        points: 10,
    },
    {
        id: 'eb-5',
        type: 'multiple-choice',
        question: 'Para que serve a tag <time>?',
        options: ['Mostrar relógio', 'Marcar data/hora', 'Timer', 'Countdown'],
        correctAnswer: 1,
        explanation: '<time> marca datas e horários de forma semântica',
        points: 10,
    },
];

export const EXTRA_FORMS_QUESTIONS: QuizQuestion[] = [
    {
        id: 'ef-1',
        type: 'multiple-choice',
        question: 'Qual input cria um campo de busca?',
        options: ['type="text"', 'type="search"', 'type="find"', 'type="query"'],
        correctAnswer: 1,
        explanation: 'type="search" cria campo de busca otimizado',
        points: 10,
    },
    {
        id: 'ef-2',
        type: 'multiple-choice',
        question: 'Qual tag cria lista suspensa?',
        options: ['<list>', '<dropdown>', '<select>', '<option>'],
        correctAnswer: 2,
        explanation: '<select> com <option> cria dropdown',
        points: 10,
    },
    {
        id: 'ef-3',
        type: 'multiple-choice',
        question: 'Qual tag cria área de texto multilinha?',
        options: ['<input type="text">', '<textbox>', '<textarea>', '<multiline>'],
        correctAnswer: 2,
        explanation: '<textarea> permite múltiplas linhas de texto',
        points: 10,
    },
    {
        id: 'ef-4',
        type: 'multiple-choice',
        question: 'Qual atributo desabilita um campo?',
        options: ['inactive', 'disabled', 'off', 'readonly'],
        correctAnswer: 1,
        explanation: 'disabled desabilita completamente o campo',
        points: 10,
    },
    {
        id: 'ef-5',
        type: 'multiple-choice',
        question: 'Qual a diferença entre disabled e readonly?',
        options: ['Iguais', 'readonly permite copiar', 'disabled envia dados', 'Nenhuma'],
        correctAnswer: 1,
        explanation: 'readonly permite ler/copiar, disabled não',
        points: 10,
    },
];

export const EXTRA_MEDIA_QUESTIONS: QuizQuestion[] = [
    {
        id: 'em-1',
        type: 'multiple-choice',
        question: 'Qual tag incorpora página externa?',
        options: ['<embed>', '<iframe>', '<frame>', '<include>'],
        correctAnswer: 1,
        explanation: '<iframe> incorpora documentos externos',
        points: 10,
    },
    {
        id: 'em-2',
        type: 'multiple-choice',
        question: 'Qual atributo carrega imagem sob demanda?',
        options: ['defer', 'async', 'loading="lazy"', 'ondemand'],
        correctAnswer: 2,
        explanation: 'loading="lazy" carrega imagens quando visíveis',
        points: 10,
    },
    {
        id: 'em-3',
        type: 'multiple-choice',
        question: 'Qual tag define legenda para <figure>?',
        options: ['<caption>', '<figcaption>', '<legend>', '<label>'],
        correctAnswer: 1,
        explanation: '<figcaption> descreve o conteúdo de <figure>',
        points: 10,
    },
    {
        id: 'em-4',
        type: 'multiple-choice',
        question: 'Qual formato de imagem é melhor para web moderna?',
        options: ['JPEG', 'PNG', 'WebP', 'GIF'],
        correctAnswer: 2,
        explanation: 'WebP oferece melhor compressão que JPEG e PNG',
        points: 10,
    },
    {
        id: 'em-5',
        type: 'multiple-choice',
        question: 'Qual tag agrupa opções em <select>?',
        options: ['<group>', '<optgroup>', '<options>', '<set>'],
        correctAnswer: 1,
        explanation: '<optgroup> agrupa opções relacionadas',
        points: 10,
    },
];

export const EXTRA_ADVANCED_QUESTIONS: QuizQuestion[] = [
    {
        id: 'ea-1',
        type: 'multiple-choice',
        question: 'Qual API permite detectar geolocalização?',
        options: ['GPS API', 'Geolocation API', 'Location API', 'Position API'],
        correctAnswer: 1,
        explanation: 'navigator.geolocation fornece localização',
        points: 10,
    },
    {
        id: 'ea-2',
        type: 'multiple-choice',
        question: 'Qual atributo torna página PWA instalável?',
        options: ['pwa.json', 'app.json', 'manifest.json', 'config.json'],
        correctAnswer: 2,
        explanation: 'manifest.json com metadados do PWA',
        points: 10,
    },
    {
        id: 'ea-3',
        type: 'multiple-choice',
        question: 'Qual tag define template reutilizável?',
        options: ['<template>', '<component>', '<reuse>', '<slot>'],
        correctAnswer: 0,
        explanation: '<template> contém HTML que não é renderizado',
        points: 10,
    },
    {
        id: 'ea-4',
        type: 'multiple-choice',
        question: 'Qual atributo define Web Component?',
        options: ['is', 'custom', 'component', 'slot'],
        correctAnswer: 0,
        explanation: 'is="" estende elementos existentes',
        points: 10,
    },
    {
        id: 'ea-5',
        type: 'multiple-choice',
        question: 'Qual meta tag otimiza para mobile?',
        options: ['<meta mobile>', '<meta responsive>', '<meta viewport>', '<meta screen>'],
        correctAnswer: 2,
        explanation: 'viewport configura escala e largura',
        points: 10,
    },
];
