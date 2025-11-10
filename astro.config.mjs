// @ts-check
import path from 'node:path';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["es",],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    }
  },
  //site: 'https://your-domain.com',
  integrations: [sitemap()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
     resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  }
});