// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  experimental: {
    csp:true
  },
  vite: {
    plugins: [tailwindcss()],
    envPrefix: 'PUBLIC_',
  },
  
  integrations: [react()]
  
});