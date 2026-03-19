import { defineMiddleware } from 'astro:middleware';
import { lucia } from './lib/auth.ts';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;

  if (sessionId) {
    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
      const cookie = lucia.createSessionCookie(session.id);
      context.cookies.set(cookie.name, cookie.value, cookie.attributes);
    }
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

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!context.locals.user) {
      return context.redirect('/admin/login');
    }
    if (context.locals.user.role !== 'admin') {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
