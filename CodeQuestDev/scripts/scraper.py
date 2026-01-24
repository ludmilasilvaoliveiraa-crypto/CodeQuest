#!/usr/bin/env python3
"""
W3Schools Course Data Extractor
Extracts course content from W3Schools for educational purposes.
All extracted content includes source attribution.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
from urllib.parse import urljoin, urlparse
from typing import Optional
import os

BASE_URL = "https://www.w3schools.com"

# Course definitions with URLs and metadata
COURSES = {
    # High Priority - Most Popular
    "html": {
        "name": "HTML Tutorial",
        "url": "/html/default.asp",
        "base_path": "/html/",
        "category": "frontend",
        "difficulty": "beginner",
        "icon": "📄",
        "description": "Learn HTML, the standard markup language for creating Web pages."
    },
    "css": {
        "name": "CSS Tutorial",
        "url": "/css/default.asp",
        "base_path": "/css/",
        "category": "frontend",
        "difficulty": "beginner",
        "icon": "🎨",
        "description": "Learn CSS, the language for styling web pages."
    },
    "javascript": {
        "name": "JavaScript Tutorial",
        "url": "/js/default.asp",
        "base_path": "/js/",
        "category": "frontend",
        "difficulty": "beginner",
        "icon": "⚡",
        "description": "Learn JavaScript, the programming language of the Web."
    },
    "python": {
        "name": "Python Tutorial",
        "url": "/python/default.asp",
        "base_path": "/python/",
        "category": "backend",
        "difficulty": "beginner",
        "icon": "🐍",
        "description": "Learn Python, a popular programming language."
    },
    # Medium Priority
    "sql": {
        "name": "SQL Tutorial",
        "url": "/sql/default.asp",
        "base_path": "/sql/",
        "category": "database",
        "difficulty": "beginner",
        "icon": "🗃️",
        "description": "Learn SQL, the standard language for accessing databases."
    },
    "react": {
        "name": "React Tutorial",
        "url": "/react/default.asp",
        "base_path": "/react/",
        "category": "frontend",
        "difficulty": "intermediate",
        "icon": "⚛️",
        "description": "Learn React, a JavaScript library for building user interfaces."
    },
    "typescript": {
        "name": "TypeScript Tutorial",
        "url": "/typescript/index.php",
        "base_path": "/typescript/",
        "category": "frontend",
        "difficulty": "intermediate",
        "icon": "📘",
        "description": "Learn TypeScript, JavaScript with syntax for types."
    },
    "git": {
        "name": "Git Tutorial",
        "url": "/git/default.asp",
        "base_path": "/git/",
        "category": "devops",
        "difficulty": "beginner",
        "icon": "🔀",
        "description": "Learn Git, the version control system."
    },
    "nodejs": {
        "name": "Node.js Tutorial",
        "url": "/nodejs/default.asp",
        "base_path": "/nodejs/",
        "category": "backend",
        "difficulty": "intermediate",
        "icon": "🟢",
        "description": "Learn Node.js, run JavaScript on the server."
    },
    "java": {
        "name": "Java Tutorial",
        "url": "/java/default.asp",
        "base_path": "/java/",
        "category": "backend",
        "difficulty": "intermediate",
        "icon": "☕",
        "description": "Learn Java, a popular programming language."
    },
    "cpp": {
        "name": "C++ Tutorial",
        "url": "/cpp/default.asp",
        "base_path": "/cpp/",
        "category": "backend",
        "difficulty": "intermediate",
        "icon": "🔧",
        "description": "Learn C++, a powerful programming language."
    },
    "c": {
        "name": "C Tutorial",
        "url": "/c/index.php",
        "base_path": "/c/",
        "category": "backend",
        "difficulty": "intermediate",
        "icon": "©️",
        "description": "Learn C, one of the oldest programming languages."
    },
    "php": {
        "name": "PHP Tutorial",
        "url": "/php/default.asp",
        "base_path": "/php/",
        "category": "backend",
        "difficulty": "intermediate",
        "icon": "🐘",
        "description": "Learn PHP, a server scripting language."
    },
    "mysql": {
        "name": "MySQL Tutorial",
        "url": "/mysql/default.asp",
        "base_path": "/mysql/",
        "category": "database",
        "difficulty": "beginner",
        "icon": "🐬",
        "description": "Learn MySQL, a popular relational database."
    },
    "mongodb": {
        "name": "MongoDB Tutorial",
        "url": "/mongodb/index.php",
        "base_path": "/mongodb/",
        "category": "database",
        "difficulty": "intermediate",
        "icon": "🍃",
        "description": "Learn MongoDB, a popular NoSQL database."
    },
    "bootstrap": {
        "name": "Bootstrap 5 Tutorial",
        "url": "/bootstrap5/index.php",
        "base_path": "/bootstrap5/",
        "category": "frontend",
        "difficulty": "beginner",
        "icon": "🅱️",
        "description": "Learn Bootstrap, a CSS framework for responsive design."
    },
    "jquery": {
        "name": "jQuery Tutorial",
        "url": "/jquery/default.asp",
        "base_path": "/jquery/",
        "category": "frontend",
        "difficulty": "beginner",
        "icon": "💲",
        "description": "Learn jQuery, a JavaScript library."
    },
    "vue": {
        "name": "Vue Tutorial",
        "url": "/vue/index.php",
        "base_path": "/vue/",
        "category": "frontend",
        "difficulty": "intermediate",
        "icon": "💚",
        "description": "Learn Vue, a progressive JavaScript framework."
    },
    "django": {
        "name": "Django Tutorial",
        "url": "/django/index.php",
        "base_path": "/django/",
        "category": "backend",
        "difficulty": "intermediate",
        "icon": "🎸",
        "description": "Learn Django, a Python web framework."
    },
    "numpy": {
        "name": "NumPy Tutorial",
        "url": "/python/numpy/default.asp",
        "base_path": "/python/numpy/",
        "category": "data-science",
        "difficulty": "intermediate",
        "icon": "🔢",
        "description": "Learn NumPy, the Python library for numerical computing."
    },
    "pandas": {
        "name": "Pandas Tutorial",
        "url": "/python/pandas/default.asp",
        "base_path": "/python/pandas/",
        "category": "data-science",
        "difficulty": "intermediate",
        "icon": "🐼",
        "description": "Learn Pandas, the Python library for data analysis."
    },
    "dsa": {
        "name": "DSA Tutorial",
        "url": "/dsa/index.php",
        "base_path": "/dsa/",
        "category": "computer-science",
        "difficulty": "intermediate",
        "icon": "🌳",
        "description": "Learn Data Structures and Algorithms."
    }
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def get_page(url: str, base_path: str = "") -> Optional[BeautifulSoup]:
    """Fetch a page and return BeautifulSoup object."""
    try:
        # Handle relative URLs - prepend base_path if needed
        if not url.startswith("http") and not url.startswith("/"):
            url = base_path + url
        
        full_url = urljoin(BASE_URL, url)
        response = requests.get(full_url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        return BeautifulSoup(response.text, "html.parser")
    except Exception as e:
        print(f"  ⚠️ Error fetching {url}: {e}")
        return None


def extract_sidebar_links(soup: BeautifulSoup, base_path: str) -> list:
    """Extract all lesson links from the sidebar navigation."""
    links = []
    seen_urls = set()
    
    # Find the left menu/sidebar
    sidebar = soup.find("div", {"id": "leftmenuinnerinner"})
    if not sidebar:
        sidebar = soup.find("div", class_="w3-sidebar")
    
    if sidebar:
        for a in sidebar.find_all("a", href=True):
            href = a.get("href", "")
            text = a.get_text(strip=True)
            
            # Skip navigation and empty links
            if not text or text.startswith("❮") or text.startswith("❯"):
                continue
                
            # Skip external links and anchors
            if href.startswith("http") or href.startswith("#") or href.startswith("javascript"):
                continue
            
            # Skip reference pages and other non-tutorial content
            skip_patterns = ["_ref_", "quiz", "exercise", "exam", "bootcamp", "syllabus", "interview"]
            if any(pattern in href.lower() for pattern in skip_patterns):
                continue
            
            # Build full relative path
            if not href.startswith("/"):
                full_href = base_path + href
            else:
                full_href = href
            
            # Avoid duplicates
            if full_href in seen_urls:
                continue
            seen_urls.add(full_href)
            
            links.append({
                "title": text,
                "url": full_href
            })
    
    return links


def extract_lesson_content(soup: BeautifulSoup, url: str) -> dict:
    """Extract content from a lesson page."""
    content = {
        "sections": [],
        "examples": [],
        "source": urljoin(BASE_URL, url)
    }
    
    # Find main content area
    main = soup.find("div", {"id": "main"})
    if not main:
        main = soup.find("div", class_="w3-main")
    
    if not main:
        return content
    
    # Extract title
    title_elem = main.find("h1")
    if title_elem:
        content["title"] = title_elem.get_text(strip=True)
    
    # Extract sections
    current_section = {"heading": "", "content": [], "examples": []}
    
    for elem in main.find_all(["h1", "h2", "h3", "p", "ul", "ol", "pre", "div"], recursive=True):
        # Skip navigation, ads, and buttons
        elem_classes = str(elem.get("class", []))
        if any(c in elem_classes for c in ["w3-btn", "nextprev", "w3-panel", "w3-note"]):
            continue
        
        # Skip if inside navigation
        if elem.find_parent(class_=["nextprev", "w3-btn"]):
            continue
            
        if elem.name in ["h1", "h2", "h3"]:
            # Save previous section if it has content
            if current_section["content"] or current_section["examples"]:
                content["sections"].append(current_section.copy())
            
            current_section = {
                "heading": elem.get_text(strip=True),
                "content": [],
                "examples": []
            }
        
        elif elem.name == "p":
            text = elem.get_text(strip=True)
            # Skip short texts and navigation texts
            if text and len(text) > 15 and not text.startswith("❮") and not text.startswith("❯"):
                current_section["content"].append(text)
        
        elif elem.name in ["ul", "ol"]:
            items = [li.get_text(strip=True) for li in elem.find_all("li", recursive=False)]
            items = [item for item in items if len(item) > 5]
            if items:
                current_section["content"].append({"list": items})
        
        elif elem.name == "pre" or (elem.name == "div" and "w3-code" in elem_classes):
            code = elem.get_text()
            if code and len(code.strip()) > 10:
                current_section["examples"].append({
                    "code": code.strip(),
                    "language": detect_language(code)
                })
    
    # Add last section
    if current_section["content"] or current_section["examples"]:
        content["sections"].append(current_section)
    
    return content


def detect_language(code: str) -> str:
    """Detect programming language from code snippet."""
    code_lower = code.lower()
    
    if "<!doctype" in code_lower or "<html" in code_lower or "<div" in code_lower:
        return "html"
    elif ":" in code and ";" in code and not "function" in code_lower and ("color" in code_lower or "background" in code_lower or "margin" in code_lower):
        return "css"
    elif "def " in code or "import " in code and "from " in code:
        return "python"
    elif "function " in code or "const " in code or "let " in code or "=>" in code:
        return "javascript"
    elif "SELECT " in code.upper() or "FROM " in code.upper() or "WHERE " in code.upper():
        return "sql"
    elif "#include" in code or "int main(" in code:
        return "c"
    elif "public class" in code or "public static void" in code:
        return "java"
    elif "<?php" in code_lower:
        return "php"
    
    return "text"


def extract_course(course_id: str, course_info: dict) -> dict:
    """Extract all lessons from a course."""
    print(f"\n📚 Extracting: {course_info['name']}")
    
    base_path = course_info.get("base_path", f"/{course_id}/")
    
    course = {
        "id": course_id,
        "name": course_info["name"],
        "description": course_info["description"],
        "category": course_info["category"],
        "difficulty": course_info["difficulty"],
        "icon": course_info["icon"],
        "source": urljoin(BASE_URL, course_info["url"]),
        "lessons": []
    }
    
    # Get main page
    soup = get_page(course_info["url"])
    if not soup:
        return course
    
    # Extract lesson links
    links = extract_sidebar_links(soup, base_path)
    print(f"  Found {len(links)} lessons")
    
    # Extract each lesson
    for i, link in enumerate(links[:80]):  # Limit to 80 lessons per course
        time.sleep(0.3)  # Be polite to the server
        
        lesson_soup = get_page(link["url"])
        if lesson_soup:
            lesson_content = extract_lesson_content(lesson_soup, link["url"])
            
            # Skip if no content extracted
            if not lesson_content.get("sections"):
                print(f"  ⚠️ [{i+1}/{len(links)}] No content: {link['title']}")
                continue
                
            lesson = {
                "id": f"{course_id}-{i+1}",
                "title": link["title"],
                "order": i + 1,
                **lesson_content
            }
            course["lessons"].append(lesson)
            print(f"  ✓ [{i+1}/{len(links)}] {link['title']}")
        else:
            print(f"  ✗ [{i+1}/{len(links)}] Failed: {link['title']}")
    
    return course


def main():
    """Main extraction function."""
    print("=" * 60)
    print("🌐 W3Schools Course Data Extractor")
    print("=" * 60)
    print("\n⚠️  Educational use only. All content will include source attribution.\n")
    
    # Define output path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, "..", "apps", "web", "data", "w3schools_courses.json")
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    all_courses = {
        "metadata": {
            "source": "W3Schools (https://www.w3schools.com)",
            "extracted_at": time.strftime("%Y-%m-%d %H:%M:%S"),
            "attribution": "Content adapted from W3Schools. Visit https://www.w3schools.com for the original tutorials.",
            "license": "Educational use only"
        },
        "courses": []
    }
    
    # Extract courses in priority order
    priority_order = ["html", "css", "javascript", "python", "sql", "react", "typescript", 
                      "git", "nodejs", "java", "cpp", "c", "php", "mysql", "mongodb",
                      "bootstrap", "jquery", "vue", "django", "numpy", "pandas", "dsa"]
    
    for course_id in priority_order:
        if course_id in COURSES:
            try:
                course = extract_course(course_id, COURSES[course_id])
                if course["lessons"]:  # Only add if we got lessons
                    all_courses["courses"].append(course)
                    
                    # Save after each course (incremental save)
                    with open(output_path, "w", encoding="utf-8") as f:
                        json.dump(all_courses, f, ensure_ascii=False, indent=2)
                    
                    print(f"  💾 Saved ({len(course['lessons'])} lessons)")
                else:
                    print(f"  ⚠️ No lessons extracted for {course_id}")
                
            except Exception as e:
                print(f"  ❌ Error extracting {course_id}: {e}")
                import traceback
                traceback.print_exc()
    
    print("\n" + "=" * 60)
    print(f"✅ Extraction complete!")
    print(f"📁 Output: {output_path}")
    print(f"📊 Total courses: {len(all_courses['courses'])}")
    total_lessons = sum(len(c['lessons']) for c in all_courses['courses'])
    print(f"📝 Total lessons: {total_lessons}")
    print("=" * 60)


if __name__ == "__main__":
    main()
