// CodeQuest - Sentry Configuration for Error Tracking
import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Release tracking
    release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'development',

    // Environment
    environment: process.env.NODE_ENV,

    // Enable in production only
    enabled: process.env.NODE_ENV === 'production',

    // Ignore specific errors
    ignoreErrors: [
        // Browser extension errors
        'top.GLOBALS',
        'chrome-extension',
        'moz-extension',
        // Network errors
        'Failed to fetch',
        'NetworkError',
        'AbortError',
        // User actions
        'ResizeObserver loop',
    ],

    beforeSend(event, hint) {
        // Filter out non-actionable errors
        const error = hint.originalException as Error;

        if (error?.message?.includes('Loading chunk')) {
            // Chunk loading errors are often transient
            return null;
        }

        return event;
    },
});
