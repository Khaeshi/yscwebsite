// src/pages/api/stats.ts
import type { APIRoute } from 'astro';
import { connectDB } from '../../lib/db/client.ts';
import { getDashboardStats } from '../../lib/db/queries.ts';

export const GET: APIRoute = async () => {
  await connectDB();
  const stats = await getDashboardStats();
  return new Response(JSON.stringify({ success: true, ...stats }), {
    headers: { 'Content-Type': 'application/json' }
  });
};