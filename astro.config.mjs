// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import clerk from '@clerk/astro';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';


// https://astro.build/config
export default defineConfig({
  experimental: {
    csp:false
  },
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal:['react', 'react-dom'],
    }
  },

  site: 'https://youngstarterclub.asia',
  integrations: [react(), sitemap(), clerk(),],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});