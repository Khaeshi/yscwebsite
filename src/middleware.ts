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
  const isAdminRoot = pathname.startsWith('/admin');
  const isLogin = pathname === '/admin/login';
  const isLogout = pathname === '/admin/logout';
  const isOnboarding = pathname === '/admin/onboarding';
  const isTeacherArea = pathname.startsWith('/admin/teacher');
  const isSchedules = pathname === '/admin/schedules' || pathname.startsWith('/admin/schedules/');

  if (isAdminRoot && !isLogin) {
    if (!context.locals.user) return context.redirect('/admin/login');

    const role = context.locals.user.role;
    const isAdminRole = role === 'admin' || role === 'superadmin';
    const isTeacherRole = role === 'teacher';

    // Teachers: allow only /admin/teacher/* and onboarding/logout
    if (isTeacherRole) {
      if (!context.locals.user.isApproved && !isOnboarding && !isLogout) {
        return context.redirect('/admin/onboarding');
      }

      if (!isTeacherArea && !isSchedules && !isOnboarding && !isLogout) {
        return context.redirect('/admin/teacher/dashboard');
      }
    }

    // Admins/Superadmins: allow all /admin/*
    if (!isAdminRole && !isTeacherRole) {
      return context.redirect('/admin/login');
    }

    // Non-admins can't access /admin/* (except teacher area)
    if (!isTeacherArea && !isOnboarding && !isLogout && !isAdminRole) {
      return context.redirect('/admin/login');
    }
  }

  return next();
});