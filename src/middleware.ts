import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

// Protect all /admin routes
const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',
]);

export const onRequest = clerkMiddleware((auth, context) => {
  const { redirectToSignIn, userId } = auth();

  // Allow sign-in page
  if (context.url.pathname.includes('/sign-in') || context.url.pathname.includes('/sign-up')) {
    return;
  }

  // Protect admin routes
  if (!userId && isProtectedRoute(context.request)) {
    return redirectToSignIn();
  }
});