# Copilot Instructions for Portfolio Daniel Tunjano

## Project Overview
Astro 5 static portfolio with Notion CMS integration, i18n (ES/EN), dark mode, and Tailwind CSS 4. Deployed on Vercel.

## Architecture

### Core Build Pipeline
- **Pre-build:** `pnpm generate` → `src/utils/generate-projectsData.ts` fetches projects from Notion API, generates `src/data/projects.json` and markdown files in `src/content/project/`
- **Build:** `astro build` → static site generation with SSG
- **Commands:** `pnpm dev` (localhost:4321), `pnpm build`, `pnpm preview`

### Internationalization (i18n)
- **Config:** [astro.config.mjs](astro.config.mjs) defines locales `["es", "en"]` with `defaultLocale: "es"`
- **Routing:** No prefix for Spanish (default), `/en/*` for English
- **Translation system:** [src/i18n/ui.ts](src/i18n/ui.ts) exports `labels` object from `src/data/dataPage.json`
- **Usage:** `useTranslations(lang)` returns translate function; `Astro.currentLocale` gets current language
- **Pattern:** Duplicate routes in `src/pages/` and `src/pages/en/` (e.g., [src/pages/projects/[slug].astro](src/pages/projects/[slug].astro), [src/pages/en/projects/[slug].astro](src/pages/en/projects/[slug].astro))

### Data Flow & Content Management
- **Notion Integration:** [src/lib/notion.ts](src/lib/notion.ts) initializes Notion client with `NOTION_TOKEN`
- **Project Fetching:** [src/lib/projects.ts](src/lib/projects.ts) `getProjectCard()` queries `NOTION_DATABASE_ID` using DataSource API
- **Project Details:** [src/lib/projectPage.ts](src/lib/projectPage.ts) `getProjectContent()` fetches rich block content from Notion pages
- **Generated Data:** [src/data/projects.json](src/data/projects.json) and markdown files (one per project)
- **Static Props:** Project pages use `GetStaticPaths` to read generated markdown and convert with `marked.parse()`

### Layout & Styling
- **Base Layout:** [src/layouts/Layout.astro](src/layouts/Layout.astro) → Header + Footer + Snow effect wrapper
- **Design System:** [src/styles/global.css](src/styles/global.css) defines CSS variables:
  - Light theme (root): `--color-bg`, `--color-text`, `--color-primary`, `--color-secondary`, `--color-accent`
  - Dark theme: `[data-theme="dark"]` selector
- **Fonts:** Inter (body), Kufam (headings) from Google Fonts
- **Dark Mode:** Toggle via `data-theme` attribute (CSS-based, no JS framework required)
- **Styling:** Tailwind CSS 4 with `@tailwindcss/vite` plugin

## Key Conventions

### Project Data Structure
Projects must have: `slug`, `title`, `description`, `image`, `tags`, `link` (href/external), `cover` (Notion file URL)
Status in Notion must be "Published" to be included in generation

### Markdown Content
Project markdown files (e.g., `rockTicket-app.md`) contain optional frontmatter and converted Notion blocks. Always remove frontmatter before rendering: `/^---\n.*?\n---\n/s`

### Component Organization
- **Sections:** [src/components/sections/](src/components/sections/) (Header, Footer, Hero, Projects, CTA, etc.)
- **UI Components:** [src/components/ui/](src/components/ui/) (Button, Card, Badge, LanguageToggle, etc.)
- **Effects:** [src/components/effects/](src/components/effects/) (Snow, VantaBackground animations)

### Environment Variables
Required: `NOTION_TOKEN`, `NOTION_DATABASE_ID`
Set in `.env` or Vercel project settings

## Common Tasks

### Add a Project
1. Add page to Notion database with Status="Published"
2. Run `pnpm generate` to sync
3. Markdown file auto-generates in `src/content/project/`; project data in `src/data/projects.json`

### Update Translations
Edit `src/data/dataPage.json` with new keys. Use `useTranslations(lang)` in components to fetch labels.

### Modify Theme Colors
Update CSS variables in [src/styles/global.css](src/styles/global.css) (light theme) and `[data-theme="dark"]` block. Changes cascade to all components via variable references.

### Create New Section
1. Add `.astro` file in [src/components/sections/](src/components/sections/)
2. Import in [src/pages/index.astro](src/pages/index.astro) and its English equivalent
3. Use `useTranslations()` for multilingual content

## Dependencies to Know
- `@astrojs/vercel` (static adapter), `@astrojs/sitemap` (SEO)
- `@notionhq/client` + `notion-to-md` (CMS integration)
- React 19 (for interactive components)
- Tailwind CSS 4 with `@tailwindcss/vite`
- `marked` for markdown-to-HTML conversion

## Important Notes
- This is a **static site**—all dynamic content must be pre-generated via `pnpm generate` before build
- Project slugs must match filenames and Notion slug field exactly
- Verify `.env` contains both `NOTION_TOKEN` and `NOTION_DATABASE_ID` before running generate script
- I18n routing requires separate page files per locale; don't use `astro.config.i18n.routing.strategy: "dir-and-file"`
