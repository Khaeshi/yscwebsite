import type { APIRoute } from 'astro';

async function handle(request: Request, params: any) {
  const clerkFrontendApi = 'https://frontend-api.clerk.services';
  const path = params.path ?? '';
  const url = new URL(request.url);
  const targetUrl = `${clerkFrontendApi}/${path}${url.search}`;

  try {
    const headers = new Headers();
    request.headers.forEach((value, key) => {
      if (!['host', 'connection', 'content-length'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    // Add the original host so Clerk knows which app this is for
    headers.set('x-forwarded-host', new URL(request.url).host);
    headers.set('x-forwarded-proto', 'https');

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method !== 'GET' && request.method !== 'HEAD'
        ? await request.arrayBuffer()
        : undefined,
    });

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding', 'connection'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });

    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders,
    });

  } catch (err: any) {
    // Return the actual error so we can see what's failing
    return new Response(JSON.stringify({ error: err.message, target: targetUrl }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const GET: APIRoute    = async ({ request, params }) => handle(request, params);
export const POST: APIRoute   = async ({ request, params }) => handle(request, params);
export const PUT: APIRoute    = async ({ request, params }) => handle(request, params);
export const DELETE: APIRoute = async ({ request, params }) => handle(request, params);
export const PATCH: APIRoute  = async ({ request, params }) => handle(request, params);
