// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  experimental: {
    csp:false
  },
  vite: {
    plugins: [tailwindcss()],
    envPrefix: 'PUBLIC_',
  },
  
  integrations: [react(), sitemap()],
  site: 'https://youngstarterclub.asia',
  
});