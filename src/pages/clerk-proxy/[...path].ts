import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, params }) => handle(request, params);
export const POST: APIRoute = async ({ request, params }) => handle(request, params);
export const PUT: APIRoute = async ({ request, params }) => handle(request, params);
export const DELETE: APIRoute = async ({ request, params }) => handle(request, params);
export const PATCH: APIRoute = async ({ request, params }) => handle(request, params);

async function handle(request: Request, params: any) {
  const clerkFrontendApi = 'https://frontend-api.clerk.services';
  const path = params.path ?? '';
  const url = new URL(request.url);

  const targetUrl = `${clerkFrontendApi}/${path}${url.search}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!['host', 'connection'].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD'
      ? await request.arrayBuffer()
      : undefined,
  });

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}