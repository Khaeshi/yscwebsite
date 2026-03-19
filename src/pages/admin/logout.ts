import type { APIRoute } from 'astro';
import { lucia } from '../../lib/auth.ts';

export const POST: APIRoute = async ({ cookies, redirect, locals }) => {
  const session = locals.session;
  if (session) await lucia.invalidateSession(session.id);
  const cookie = lucia.createBlankSessionCookie();
  cookies.set(cookie.name, cookie.value, cookie.attributes);
  return redirect('/admin/login');
};