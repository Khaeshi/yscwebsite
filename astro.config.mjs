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
      noExternal: process.env.NODE_ENV === 'production'
        ? ['react', 'react-dom', 'react/jsx-runtime']
        : [],
    },
  },
  site: 'https://youngstarterclub.asia',
  integrations: [react(), sitemap(), clerk()],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});