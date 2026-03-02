// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Always bundle react — dev handles it fine with React 18
      noExternal: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/server'],
    },
  },
  site: 'https://youngstarterclub.asia',
  integrations: [react(), sitemap(), clerk()],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});