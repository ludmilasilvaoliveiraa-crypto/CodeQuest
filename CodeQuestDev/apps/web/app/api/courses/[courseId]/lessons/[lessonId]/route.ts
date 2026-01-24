import { NextResponse } from 'next/server';
import { getLesson, getNextLesson, getPreviousLesson, getCourse } from '@/lib/course-service';

interface Params {
    params: Promise<{
        courseId: string;
        lessonId: string;
    }>;
}

/**
 * GET /api/courses/[courseId]/lessons/[lessonId]
 * Returns a single lesson with navigation info
 */
export async function GET(request: Request, { params }: Params) {
    try {
        const { courseId, lessonId } = await params;

        const lesson = await getLesson(courseId, lessonId);

        if (!lesson) {
            return NextResponse.json(
                { error: 'Lesson not found' },
                { status: 404 }
            );
        }

        // Get navigation info
        const [nextLesson, prevLesson, course] = await Promise.all([
            getNextLesson(courseId, lessonId),
            getPreviousLesson(courseId, lessonId),
            getCourse(courseId)
        ]);

        return NextResponse.json({
            lesson,
            navigation: {
                previous: prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null,
                next: nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null
            },
            course: course ? {
                id: course.id,
                name: course.name,
                totalLessons: course.lessons.length
            } : null,
            attribution: `Conteúdo adaptado de W3Schools. Fonte: ${lesson.source}`
        });
    } catch (error) {
        console.error('Error fetching lesson:', error);
        return NextResponse.json(
            { error: 'Failed to fetch lesson' },
            { status: 500 }
        );
    }
}
