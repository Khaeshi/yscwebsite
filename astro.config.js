// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  experimental: {
    csp:false
  },
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    envPrefix: 'PUBLIC_',
  },

  site: 'https://youngstarterclub.asia',
  integrations: [react(), sitemap(),],
  adapter: vercel(),
});