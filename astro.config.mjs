// @ts-check
import path from 'node:path';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  //site: 'https://your-domain.com',
  vite: {
    plugins: [tailwindcss()],
     resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  }
});