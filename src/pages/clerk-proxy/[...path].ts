import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ request, params }) => {
  const path = params.path;
  const clerkUrl = `https://clerk.youngstarterclub.asia/${path}`;
  
  const headers = new Headers(request.headers);
  
  const response = await fetch(clerkUrl, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' 
      ? await request.arrayBuffer() 
      : undefined,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
};
