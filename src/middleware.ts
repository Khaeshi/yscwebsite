import { defineMiddleware } from 'astro:middleware';
import { lucia } from './lib/auth.ts';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // ── Session validation ───────────────────────────────────────────────────
  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;

  if (sessionId) {
    const { session, user } = await lucia.validateSession(sessionId);

    // Refresh cookie if session was extended
    if (session?.fresh) {
      const cookie = lucia.createSessionCookie(session.id);
      context.cookies.set(cookie.name, cookie.value, cookie.attributes);
    }
    // Clear cookie if session is invalid
    if (!session) {
      const cookie = lucia.createBlankSessionCookie();
      context.cookies.set(cookie.name, cookie.value, cookie.attributes);
    }

    context.locals.user    = user;
    context.locals.session = session;
  } else {
    context.locals.user    = null;
    context.locals.session = null;
  }

  // ── Route protection ─────────────────────────────────────────────────────
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';

  if (isAdminRoute) {
    if (!context.locals.user) {
      return context.redirect('/admin/login');
    }
    if (context.locals.user.role !== 'admin') {
      return context.redirect('/admin/login');
    }
  }

  return next();
});