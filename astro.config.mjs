// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

export default defineConfig({
  prefetch: {
    prefetchAll: true,     
    defaultStrategy: 'hover'
  },
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    ssr: isProd ? {
      noExternal: true,
    } : {},
  },
  site: 'https://youngstarterclub.asia',
  integrations: [react(), sitemap(), clerk({
    proxyUrl: 'https://youngstarterclub.asia/clerk-proxy',
  })],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});