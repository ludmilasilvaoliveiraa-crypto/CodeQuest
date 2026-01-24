import { NextResponse } from 'next/server';
import { getAllCourses, getGlobalStats, getCategories } from '@/lib/course-service';

/**
 * GET /api/courses
 * Returns all courses or filters by category
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const stats = searchParams.get('stats') === 'true';

        if (stats) {
            const globalStats = await getGlobalStats();
            return NextResponse.json(globalStats);
        }

        let courses = await getAllCourses();

        if (category) {
            courses = courses.filter(course => course.category === category);
        }

        // Return lightweight list (without full lesson content)
        const courseList = courses.map(course => ({
            id: course.id,
            name: course.name,
            description: course.description,
            category: course.category,
            difficulty: course.difficulty,
            icon: course.icon,
            lessonCount: course.lessons.length,
            source: course.source
        }));

        const categories = await getCategories();

        return NextResponse.json({
            courses: courseList,
            categories,
            total: courseList.length
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        return NextResponse.json(
            { error: 'Failed to fetch courses' },
            { status: 500 }
        );
    }
}
