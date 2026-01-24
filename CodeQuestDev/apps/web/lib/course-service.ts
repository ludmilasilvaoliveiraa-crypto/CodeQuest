/**
 * Course Service
 * Service for managing W3Schools course data in CodeQuest
 * 
 * @source Content adapted from W3Schools (https://www.w3schools.com)
 */

// Types
export interface CourseExample {
    code: string;
    language: string;
}

export interface CourseSection {
    heading: string;
    content: (string | { list: string[] })[];
    examples: CourseExample[];
}

export interface Lesson {
    id: string;
    title: string;
    order: number;
    sections: CourseSection[];
    source: string;
}

export interface Course {
    id: string;
    name: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    icon: string;
    source: string;
    lessons: Lesson[];
}

export interface CoursesData {
    metadata: {
        source: string;
        extracted_at: string;
        attribution: string;
        license: string;
    };
    courses: Course[];
}

// Cache for course data
let coursesCache: CoursesData | null = null;

/**
 * Load all courses from the JSON file
 */
export async function loadCourses(): Promise<CoursesData> {
    if (coursesCache) {
        return coursesCache;
    }

    try {
        // Dynamic import for the JSON data
        const data = await import('@/data/w3schools_courses.json');
        coursesCache = data.default as CoursesData;
        return coursesCache;
    } catch (error) {
        console.error('Error loading courses:', error);
        return {
            metadata: {
                source: 'W3Schools',
                extracted_at: '',
                attribution: 'Content from W3Schools',
                license: 'Educational use only'
            },
            courses: []
        };
    }
}

/**
 * Get all courses
 */
export async function getAllCourses(): Promise<Course[]> {
    const data = await loadCourses();
    return data.courses;
}

/**
 * Get courses by category
 */
export async function getCoursesByCategory(category: string): Promise<Course[]> {
    const data = await loadCourses();
    return data.courses.filter(course => course.category === category);
}

/**
 * Get available categories
 */
export async function getCategories(): Promise<string[]> {
    const data = await loadCourses();
    const categories = new Set(data.courses.map(course => course.category));
    return Array.from(categories);
}

/**
 * Get a single course by ID
 */
export async function getCourse(courseId: string): Promise<Course | null> {
    const data = await loadCourses();
    return data.courses.find(course => course.id === courseId) || null;
}

/**
 * Get a lesson by course ID and lesson ID
 */
export async function getLesson(courseId: string, lessonId: string): Promise<Lesson | null> {
    const course = await getCourse(courseId);
    if (!course) return null;

    return course.lessons.find(lesson => lesson.id === lessonId) || null;
}

/**
 * Get lesson by order (1-indexed)
 */
export async function getLessonByOrder(courseId: string, order: number): Promise<Lesson | null> {
    const course = await getCourse(courseId);
    if (!course) return null;

    return course.lessons.find(lesson => lesson.order === order) || null;
}

/**
 * Get next lesson
 */
export async function getNextLesson(courseId: string, currentLessonId: string): Promise<Lesson | null> {
    const course = await getCourse(courseId);
    if (!course) return null;

    const currentLesson = course.lessons.find(l => l.id === currentLessonId);
    if (!currentLesson) return null;

    return course.lessons.find(l => l.order === currentLesson.order + 1) || null;
}

/**
 * Get previous lesson
 */
export async function getPreviousLesson(courseId: string, currentLessonId: string): Promise<Lesson | null> {
    const course = await getCourse(courseId);
    if (!course) return null;

    const currentLesson = course.lessons.find(l => l.id === currentLessonId);
    if (!currentLesson || currentLesson.order <= 1) return null;

    return course.lessons.find(l => l.order === currentLesson.order - 1) || null;
}

/**
 * Search courses by name or description
 */
export async function searchCourses(query: string): Promise<Course[]> {
    const data = await loadCourses();
    const lowerQuery = query.toLowerCase();

    return data.courses.filter(course =>
        course.name.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Search lessons within a course
 */
export async function searchLessons(courseId: string, query: string): Promise<Lesson[]> {
    const course = await getCourse(courseId);
    if (!course) return [];

    const lowerQuery = query.toLowerCase();

    return course.lessons.filter(lesson =>
        lesson.title.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get course statistics
 */
export async function getCourseStats(courseId: string) {
    const course = await getCourse(courseId);
    if (!course) return null;

    const totalExamples = course.lessons.reduce((acc, lesson) => {
        return acc + lesson.sections.reduce((sAcc, section) => sAcc + section.examples.length, 0);
    }, 0);

    return {
        totalLessons: course.lessons.length,
        totalExamples,
        difficulty: course.difficulty,
        category: course.category
    };
}

/**
 * Get all statistics
 */
export async function getGlobalStats() {
    const data = await loadCourses();

    const totalCourses = data.courses.length;
    const totalLessons = data.courses.reduce((acc, course) => acc + course.lessons.length, 0);

    const coursesByCategory = data.courses.reduce((acc, course) => {
        acc[course.category] = (acc[course.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const coursesByDifficulty = data.courses.reduce((acc, course) => {
        acc[course.difficulty] = (acc[course.difficulty] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return {
        totalCourses,
        totalLessons,
        coursesByCategory,
        coursesByDifficulty,
        attribution: data.metadata.attribution
    };
}

/**
 * Format lesson content to HTML (utility function)
 */
export function formatContentToHtml(content: (string | { list: string[] })[]): string {
    return content.map(item => {
        if (typeof item === 'string') {
            return `<p>${item}</p>`;
        } else if ('list' in item) {
            const listItems = item.list.map(li => `<li>${li}</li>`).join('');
            return `<ul>${listItems}</ul>`;
        }
        return '';
    }).join('\n');
}

/**
 * Get the source attribution for a lesson
 */
export function getAttribution(source: string): string {
    return `Conteúdo adaptado de W3Schools. <a href="${source}" target="_blank" rel="noopener noreferrer">Ver original</a>`;
}
