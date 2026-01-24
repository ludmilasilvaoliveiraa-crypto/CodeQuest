#!/usr/bin/env python3
"""
W3Schools to CodeQuest Converter
Converts extracted W3Schools data to CodeQuest lesson format with quizzes
"""

import json
import os
import re
from typing import List, Dict, Any

# Load W3Schools data
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(SCRIPT_DIR, "..", "apps", "web", "data", "w3schools_courses.json")

def load_data():
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_quiz(lesson: Dict, course_id: str) -> List[Dict]:
    """Generate quiz questions based on lesson content"""
    quizzes = []
    sections = lesson.get('sections', [])
    
    # Generate questions from content
    for i, section in enumerate(sections[:6]):  # Max 6 questions per lesson
        heading = section.get('heading', '')
        content = section.get('content', [])
        
        if not heading or heading in ['Example', 'Exemplo']:
            continue
            
        # Create multiple choice question
        quiz = {
            'id': f'q{i+1}',
            'type': 'multiple-choice',
            'question': f'O que é correto sobre "{heading}"?',
            'options': [],
            'correctAnswer': 0,
            'explanation': f'Esta seção aborda {heading}',
            'points': 10
        }
        
        # Get correct content
        correct_text = ""
        for c in content:
            if isinstance(c, str) and len(c) > 20:
                correct_text = c[:100] + "..." if len(c) > 100 else c
                break
        
        if correct_text:
            quiz['options'] = [
                correct_text[:80],
                "Nenhuma das anteriores está correta",
                "Isso não é um conceito válido",
                "Essa informação está incorreta"
            ]
            quiz['explanation'] = correct_text
            quizzes.append(quiz)
    
    return quizzes[:5]  # Max 5 questions per lesson


def convert_lesson(lesson: Dict, course_id: str, order: int) -> Dict:
    """Convert W3Schools lesson to CodeQuest format"""
    sections = []
    
    for section in lesson.get('sections', []):
        if section.get('heading'):
            content_parts = section.get('content', [])
            text_parts = []
            
            for part in content_parts:
                if isinstance(part, str):
                    text_parts.append(part)
                elif isinstance(part, dict) and 'list' in part:
                    text_parts.append(". ".join(part['list']))
            
            section_data = {
                'title': section['heading'],
                'text': " ".join(text_parts)[:500]
            }
            
            # Add code examples
            examples = section.get('examples', [])
            if examples:
                section_data['code'] = examples[0].get('code', '')[:300]
            
            sections.append(section_data)
    
    # Calculate XP based on content length
    xp = 50 + (len(sections) * 15)
    if xp > 150:
        xp = 150
    
    return {
        'id': lesson.get('id', f'{course_id}-{order}'),
        'title': lesson.get('title', 'Lição'),
        'description': sections[0]['text'][:100] if sections else 'Aprenda este conceito',
        'xpReward': xp,
        'estimatedTime': max(5, len(sections) * 3),
        'content': {
            'introduction': sections[0]['text'] if sections else '',
            'sections': sections[1:8] if len(sections) > 1 else sections,
            'tips': [],
            'commonMistakes': []
        },
        'quiz': generate_quiz(lesson, course_id)
    }


def generate_module(course: Dict, module_name: str, lessons: List[Dict], 
                   difficulty: str, required_xp: int = None) -> str:
    """Generate TypeScript module definition"""
    
    lesson_strs = []
    for i, lesson in enumerate(lessons):
        converted = convert_lesson(lesson, course['id'], i + 1)
        
        sections_str = ",\n                    ".join([
            f'''{{
                        title: {json.dumps(s.get('title', ''), ensure_ascii=False)},
                        text: {json.dumps(s.get('text', '')[:400], ensure_ascii=False)},
                        {f"code: {json.dumps(s.get('code', '')[:300], ensure_ascii=False)}," if s.get('code') else ""}
                    }}''' for s in converted['content']['sections'][:5]
        ])
        
        quiz_str = ",\n                ".join([
            f'''{{
                    id: {json.dumps(q['id'])},
                    type: 'multiple-choice',
                    question: {json.dumps(q['question'], ensure_ascii=False)},
                    options: {json.dumps(q['options'], ensure_ascii=False)},
                    correctAnswer: {q['correctAnswer']},
                    explanation: {json.dumps(q['explanation'][:200], ensure_ascii=False)},
                    points: {q['points']},
                }}''' for q in converted['quiz']
        ])
        
        lesson_str = f'''        {{
            id: {json.dumps(converted['id'])},
            title: {json.dumps(converted['title'], ensure_ascii=False)},
            description: {json.dumps(converted['description'], ensure_ascii=False)},
            xpReward: {converted['xpReward']},
            estimatedTime: {converted['estimatedTime']},
            content: {{
                introduction: {json.dumps(converted['content']['introduction'][:300], ensure_ascii=False)},
                sections: [
                    {sections_str}
                ],
            }},
            quiz: [
                {quiz_str}
            ],
        }}'''
        lesson_strs.append(lesson_str)
    
    lessons_joined = ",\n".join(lesson_strs)
    
    required_xp_str = f"\n    requiredXP: {required_xp}," if required_xp else ""
    
    return f'''export const {module_name}: LearningModule = {{
    id: {json.dumps(course['id'])},
    name: {json.dumps(course['name'], ensure_ascii=False)},
    description: {json.dumps(course['description'], ensure_ascii=False)},
    icon: {json.dumps(course['icon'])},
    difficulty: {json.dumps(difficulty)},{required_xp_str}
    lessons: [
{lessons_joined}
    ],
}};'''


def main():
    data = load_data()
    
    # Find CSS course
    css_course = None
    js_course = None
    php_course = None
    
    for course in data['courses']:
        if course['id'] == 'css':
            css_course = course
        elif course['id'] == 'javascript':
            js_course = course
        elif course['id'] == 'php':
            php_course = course
    
    # Generate CSS lessons file
    if css_course:
        print(f"Converting CSS: {len(css_course['lessons'])} lessons")
        
        # Split into modules
        lessons = css_course['lessons']
        basics = lessons[:20]
        layout = lessons[20:40]
        advanced = lessons[40:60]
        
        output = f'''// CodeQuest - CSS Learning Content
// Based on W3Schools curriculum

import {{ LearningModule, Lesson, QuizQuestion }} from './lessons';

// ============================================
// MODULE CSS 1: CSS BASICS (Beginner)
// ============================================

{generate_module(css_course, 'CSS_BASICS', basics, 'beginner')}

// ============================================
// MODULE CSS 2: CSS LAYOUT (Intermediate)
// ============================================

{generate_module({**css_course, 'id': 'css-layout', 'name': 'CSS Layout', 'description': 'Box Model, Flexbox e posicionamento'}, 'CSS_LAYOUT', layout, 'intermediate', 300)}

// ============================================
// MODULE CSS 3: CSS ADVANCED (Advanced)
// ============================================

{generate_module({**css_course, 'id': 'css-advanced', 'name': 'CSS Avançado', 'description': 'Grid, animações e transformações'}, 'CSS_ADVANCED', advanced, 'advanced', 600)}

// All CSS modules
export const CSS_MODULES: LearningModule[] = [
    CSS_BASICS,
    CSS_LAYOUT,
    CSS_ADVANCED,
];
'''
        
        output_path = os.path.join(SCRIPT_DIR, "..", "apps", "web", "content", "css-lessons.ts")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"✓ Created css-lessons.ts")
    
    # Generate JS lessons file
    if js_course:
        print(f"Converting JavaScript: {len(js_course['lessons'])} lessons")
        
        lessons = js_course['lessons']
        basics = lessons[:20]
        functions = lessons[20:40]
        dom = lessons[40:60]
        advanced = lessons[60:80]
        
        output = f'''// CodeQuest - JavaScript Learning Content
// Based on W3Schools curriculum

import {{ LearningModule, Lesson, QuizQuestion }} from './lessons';

// ============================================
// MODULE JS 1: JS BASICS (Beginner)
// ============================================

{generate_module(js_course, 'JS_BASICS', basics, 'beginner')}

// ============================================
// MODULE JS 2: JS FUNCTIONS (Intermediate)
// ============================================

{generate_module({**js_course, 'id': 'js-functions', 'name': 'Funções JavaScript', 'description': 'Funções, arrow functions e escopo'}, 'JS_FUNCTIONS', functions, 'intermediate', 400)}

// ============================================
// MODULE JS 3: JS DOM (Intermediate)
// ============================================

{generate_module({**js_course, 'id': 'js-dom', 'name': 'JavaScript DOM', 'description': 'Manipulação do DOM e eventos'}, 'JS_DOM', dom, 'intermediate', 600)}

// ============================================
// MODULE JS 4: JS ADVANCED (Advanced)
// ============================================

{generate_module({**js_course, 'id': 'js-advanced', 'name': 'JavaScript Avançado', 'description': 'Arrays, objetos, classes e async'}, 'JS_ADVANCED', advanced, 'advanced', 800)}

// All JS modules
export const JS_MODULES: LearningModule[] = [
    JS_BASICS,
    JS_FUNCTIONS,
    JS_DOM,
    JS_ADVANCED,
];
'''
        
        output_path = os.path.join(SCRIPT_DIR, "..", "apps", "web", "content", "js-lessons.ts")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"✓ Created js-lessons.ts")
    
    # Generate PHP lessons file
    if php_course:
        print(f"Converting PHP: {len(php_course['lessons'])} lessons")
        
        lessons = php_course['lessons']
        basics = lessons[:20]
        control = lessons[20:40]
        forms = lessons[40:60]
        advanced = lessons[60:80]
        
        output = f'''// CodeQuest - PHP Learning Content
// Based on W3Schools curriculum

import {{ LearningModule, Lesson, QuizQuestion }} from './lessons';

// ============================================
// MODULE PHP 1: PHP BASICS (Beginner)
// ============================================

{generate_module(php_course, 'PHP_BASICS', basics, 'beginner')}

// ============================================
// MODULE PHP 2: PHP CONTROL (Intermediate)
// ============================================

{generate_module({**php_course, 'id': 'php-control', 'name': 'Controle PHP', 'description': 'Condicionais, loops e funções'}, 'PHP_CONTROL', control, 'intermediate', 400)}

// ============================================
// MODULE PHP 3: PHP FORMS (Intermediate)
// ============================================

{generate_module({**php_course, 'id': 'php-forms', 'name': 'Formulários PHP', 'description': 'GET, POST e validação'}, 'PHP_FORMS', forms, 'intermediate', 600)}

// ============================================
// MODULE PHP 4: PHP ADVANCED (Advanced)
// ============================================

{generate_module({**php_course, 'id': 'php-advanced', 'name': 'PHP Avançado', 'description': 'OOP, MySQL e Sessions'}, 'PHP_ADVANCED', advanced, 'advanced', 800)}

// All PHP modules
export const PHP_MODULES: LearningModule[] = [
    PHP_BASICS,
    PHP_CONTROL,
    PHP_FORMS,
    PHP_ADVANCED,
];
'''
        
        output_path = os.path.join(SCRIPT_DIR, "..", "apps", "web", "content", "php-lessons.ts")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"✓ Created php-lessons.ts")
    
    print("\n✅ All course files generated!")


if __name__ == "__main__":
    main()
