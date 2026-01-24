import { NextResponse } from 'next/server';
import { getCourse, getCourseStats } from '@/lib/course-service';

interface Params {
    params: Promise<{
        courseId: string;
    }>;
}

/**
 * GET /api/courses/[courseId]
 * Returns a single course with all its lessons
 */
export async function GET(request: Request, { params }: Params) {
    try {
        const { courseId } = await params;
        const { searchParams } = new URL(request.url);
        const lessonsOnly = searchParams.get('lessons') === 'true';
        const statsOnly = searchParams.get('stats') === 'true';

        const course = await getCourse(courseId);

        if (!course) {
            return NextResponse.json(
                { error: 'Course not found' },
                { status: 404 }
            );
        }

        if (statsOnly) {
            const stats = await getCourseStats(courseId);
            return NextResponse.json(stats);
        }

        if (lessonsOnly) {
            return NextResponse.json({
                courseId: course.id,
                courseName: course.name,
                lessons: course.lessons.map(lesson => ({
                    id: lesson.id,
                    title: lesson.title,
                    order: lesson.order
                }))
            });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json(
            { error: 'Failed to fetch course' },
            { status: 500 }
        );
    }
}
