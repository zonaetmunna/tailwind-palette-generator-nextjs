import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - platform (platform routes)
     * - quiz-test (quiz-test routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * AND files with extensions (images, fonts, etc.)
     */
    '/((?!api|platform|quiz-test|_next/static|_next/image|.*\\.).*)',
  ],
};
