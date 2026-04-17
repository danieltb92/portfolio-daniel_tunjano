// @ts-check
import path from "node:path";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
// Import /static for a static site
import vercelStatic from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  site: "https://danieltunjano.online",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize: (item) => {
        if (item.url === "https://danieltunjano.online/" || item.url === "https://danieltunjano.online") {
          return {
            ...item,
            priority: 1.0,
            changefreq: "daily",
          };
        }
        if (item.url.includes("/about")) {
          return {
            ...item,
            priority: 0.8,
            changefreq: "monthly",
          };
        }
        if (item.url.includes("/projects")) {
          return {
            ...item,
            priority: 0.9,
            changefreq: "weekly",
          };
        }
        return item;
      },
    }),
    react(),
  ],
  output: "static",
  adapter: vercelStatic({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
  }),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
});
