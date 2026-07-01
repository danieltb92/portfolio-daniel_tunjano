# AGENTS.md - Code Assistant Guidelines

This file provides guidelines for AI agents working on this codebase.

## Project Overview

Astro 5 static portfolio with Notion CMS integration, i18n (ES/EN), dark mode, native scroll animations (no GSAP), React 19 interactive components, and Tailwind CSS 4. Deployed on Vercel.

> **Note:** `framer-motion` appears in `package.json` dependencies but is **not used** — all animations use CSS + IntersectionObserver (see Animations section).

## Build/Lint/Test Commands

### Core Commands

```bash
pnpm dev          # Start dev server at http://localhost:4321
pnpm build        # Generate static site: runs pnpm generate + astro build
pnpm preview      # Preview built site locally
pnpm astro ...    # Run any Astro CLI command
pnpm start        # Run generate script then dev: tsx src/utils/generate-projectsData.ts && astro dev
pnpm start:prod   # Run generate script then build: tsx src/utils/generate-projectsData.ts && astro build
```

### Data Generation

```bash
pnpm generate     # Fetch projects from Notion, generate src/data/projects.json and markdown files
```

### Vercel Preview

```bash
pnpm start:prod   # Run local preview using production build output
```

**Note:** This project has no test suite. Verify changes manually by running `pnpm dev` and checking the output.

## Code Style Guidelines

### General

- No ESLint/Prettier configuration present—follow existing patterns in the codebase
- Use TypeScript strict mode (extends `astro/tsconfigs/strict`)
- Always define prop interfaces explicitly for Astro components

### Astro Components (.astro)

**Props Definition:**

```astro
---
export interface Props {
  variant?: "primary" | "secondary" | "outline" | "link" | "ghost";
  size?: "sm" | "md" | "lg";
  class?: string;
  [key: string]: any;  // Allow spread props
}

const { variant = "primary", class: className = "", ...rest } = Astro.props;
---

<button class={className} {...rest}>
  <slot />
</button>
```

**Component Structure:**

- Frontmatter (---) at top with Props interface and destructuring
- Template logic before HTML
- Use `<slot />` for content projection, `<slot name="icon-left" />` for named slots
- Use `class:list` for conditional classes (Astro) or `cn()` utility
- Embed `<script>` tags at bottom for client-side interactivity

**Web Components Pattern:**

```astro
<script>
  class MyComponent extends HTMLElement {
    constructor() {
      super();
      // initialization
    }
  }
  customElements.define("my-component", MyComponent);
</script>
```

### React Components (.tsx)

**Import Order:**

1. React imports
2. Third-party libraries
3. Internal imports (@/ aliases)
4. Type imports

**Component Pattern:**

```tsx
import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  className?: string;
}

export function ComponentName({ className, ...props }: Props) {
  return <svg className={cn("base-classes", className)} {...props} />;
}
```

### TypeScript Conventions

**Types over Interfaces (except Props):**

```ts
type Status = "published" | "draft";

type Project = {
  slug: string;
  title: string;
  tags: string[];
};
```

**Use `as const` for string unions:**

```ts
export const languageList = {
  es: "Español",
  en: "English",
} as const;

export type Language = keyof typeof languageList;
```

**Utility Types:**

- Use `cn()` from `@/lib/utils` for Tailwind class merging
- Avoid `any` types; use proper typing with `extends` constraints

### Imports & Aliases

Use the `@/` alias for internal imports:

```ts
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n/utils";
import { languageList } from "@/i18n/ui";
```

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### CSS & Styling

**CSS Variables (Light/Dark Themes):**

```css
:root {
  --color-bg: var(--primary-blue-50);
  --color-text: var(--neutrals-black);
  --color-primary: var(--primary-blue-600);
}

[data-theme="dark"] {
  --color-bg: var(--neutrals-black);
  --color-text: var(--neutrals-white);
  --color-primary: var(--primary-blue-300);
}
```

**Tailwind Classes:**

- Use Tailwind CSS 4 with `@tailwindcss/vite` plugin (NOT `@tailwindcss/postcss`)
- Use `cn()` utility from `@/lib/utils` (clsx + tailwind-merge) for conditional class merging
- Dark mode uses both `.dark` class and `[data-theme="dark"]` attribute on `<html>`
- Custom variants available: `dark:` prefix for dark mode

**Global CSS:**

- `src/styles/global.css`: Contains Tailwind import, CSS variables (shadcn-style), font faces (Kufam + Inter), and theme definitions for light/dark.
- `src/styles/animations.css`: Contains all custom CSS keyframes and transitions for scroll animations, view transitions, and stagger effects.

### I18n Pattern

```astro
---
import { useTranslations } from '@/i18n/utils'
import { languageList } from '@/i18n/ui'

const t = useTranslations(Astro.currentLocale)
---

<h1>{t('home.title')}</h1>
```

- `useTranslations()` is defined in `src/i18n/utils.ts` — it returns a function that looks up keys from the appropriate language block in `dataPage.json`
- `languageList` is defined in `src/i18n/ui.ts` — it maps locale codes to display names
- **Translation keys** are defined in `src/data/dataPage.json` with `es` and `en` blocks
- **Default locale** is `es` (Spanish) without prefix; English is at `/en/`

### File Naming Conventions

| Type             | Convention     | Example                          |
| ---------------- | -------------- | -------------------------------- |
| Astro components | PascalCase     | `Button.astro`, `Card.astro`     |
| React components | PascalCase.tsx | `InteractiveGridPattern.tsx`     |
| Utilities        | camelCase      | `generate-projectsData.ts`       |
| Pages            | kebab-case     | `projects/[slug].astro`          |
| Data             | kebab-case     | `projects.json`, `dataPage.json` |
| API routes       | kebab-case     | `make-webhook.ts`                |

### Directory Structure

```
src/
├── assets/
│   ├── icons/           # SVG icons (arrow, menu, socials)
│   ├── socials/         # Social media SVG icons
│   └── tools/           # Technology logos (Astro, React, Figma, etc.)
├── components/
│   ├── sections/        # Page sections (Header, Hero, Projects, CTA, Footer, LogoScroller)
│   ├── ui/              # Reusable UI components (Button, Card, Badge, FadeIn, Scroller, ThemeToggle, LanguageToggle, Background, BackgroundAura, InteractiveGridPattern)
│   ├── effects/         # Visual effects (Snow, CursorTrail, VantaBackground)
│   └── seo/             # SEO component with JSON-LD and meta tags
├── content/
│   ├── config.ts        # Astro content collections configuration
│   └── project/         # Auto-generated project markdown files
├── data/
│   ├── projects.json    # Auto-generated project cards from Notion
│   ├── dataPage.json    # i18n translation keys (es/en)
│   ├── data.json        # Profile data (name, socials, etc.)
│   └── seo.json         # SEO configuration (site name, author, social handles)
├── i18n/
│   ├── ui.ts            # Language list definition
│   └── utils.ts         # useTranslations() hook
├── layouts/
│   ├── HeadLayout.astro # <head> with ViewTransitions, SEO, fonts, flash-prevention theme script
│   └── Layout.astro     # Main layout shell with Header, Footer, animation init
├── lib/
│   ├── notion.ts        # Notion client initialization
│   ├── projects.ts      # Fetches published project cards from Notion
│   ├── projectPage.ts   # Fetches project page blocks, converts to markdown (notion-to-md)
│   ├── download-image.ts# Downloads Notion images to public/content/notion/
│   ├── animations.ts    # IntersectionObserver-based scroll animation controller
│   └── utils.ts         # cn() utility (clsx + tailwind-merge)
├── pages/
│   ├── index.astro      # Home page (Spanish)
│   ├── about.astro      # About page (Spanish)
│   ├── 404.astro        # 404 page
│   ├── projects/
│   │   └── [slug].astro # Project detail page (Spanish) — reads .md, renders with marked
│   ├── en/
│   │   ├── index.astro  # Home page (English)
│   │   ├── about.astro  # About page (English)
│   │   └── projects/
│   │       └── [slug].astro # Project detail page (English)
│   └── api/
│       ├── make-webhook.ts          # ACTIVE: POST webhook to re-generate content from Make
│       ├── projectPageRoute.ts      # DISABLED: GET route (commented out)
│       └── projectsRoute.ts         # DISABLED: GET route (commented out)
├── scripts/
│   └── start.ts         # Dev helper: runs generate + dev/build sequentially
├── styles/
│   ├── global.css       # Tailwind CSS 4 import, theme variables, fonts, shadcn variables
│   └── animations.css   # Keyframes, scroll animations, view transitions, stagger effects
├── utils/
│   ├── generate-projectsData.ts  # Main script: fetches Notion data, writes .json + .md files
│   ├── jsonLD.js        # JSON-LD structured data generation
│   └── slugify.js       # URL slug utility
└── env.d.ts             # TypeScript env declarations
```

### shadcn/ui Configuration

The project uses shadcn/ui with the following configuration (`components.json`):

- **Style:** new-york
- **RSC:** false (Astro static site)
- **Base color:** neutral
- **CSS variables:** enabled
- **Icon library:** lucide-react
- **Registries:** includes `@magicui` registry (https://magicui.design)

### Error Handling

- Use try/catch for async operations (Notion API calls, file I/O)
- Provide meaningful error messages with console logs (emoji-prefixed)
- Handle missing environment variables gracefully with early exits

### Environment Variables

Required in `.env`:

```env
NOTION_TOKEN=your_notion_api_token
NOTION_DATABASE_ID=your_database_id
MAKE_WEBHOOK_SECRET=your_webhook_secret
```

Access via `process.env.*` in lib files or `import 'dotenv/config'` at top.

## Key Patterns

### Animations & Performance (No GSAP)

- **Zero Dependencies**: All animations use Vanilla JS (`IntersectionObserver`, `requestAnimationFrame`) and CSS transitions for maximum performance. GSAP and Framer Motion are strictly prohibited for scroll/entry animations.
- **Scroll Animations**: Add `.scroll-animate` or `.scroll-animate-stagger` classes to HTML elements. The global observer in `src/lib/animations.ts` will trigger them when they enter the viewport (rootMargin: `"0px 0px -15% 0px"`, threshold: 0).
- **Animation variants**: `.scroll-animate`, `.scroll-animate-left`, `.scroll-animate-right`, `.scroll-animate-scale`, with matching `.is-visible` state classes.
- **Stagger containers**: Elements with `.scroll-animate-stagger` get per-child delays (50ms increments, up to 10 children).
- **CSS Transitions**: Defined in `src/styles/animations.css`. Elements start with `opacity: 0` and transform, then transition to `opacity: 1` when `.is-visible` is added.
- **View Transitions**: `::view-transition-old(root)` and `::view-transition-new(root)` animated with crossfade. Animation observers re-initialize on `astro:page-load` / `astro:after-swap` and clean up on `astro:before-swap`.
- **Performance**: Respects `prefers-reduced-motion` media query to disable animations.

### Markdown Content Pipeline (Project Pages)

1. **Generation** (`pnpm generate` → `src/utils/generate-projectsData.ts`):
   - Fetches published projects from Notion via `src/lib/projects.ts`
   - For each project, fetches page blocks via `src/lib/projectPage.ts`
   - `projectPage.ts` uses `notion-to-md` library with custom transformers (embed, video, code, image, callout, file, column_list, column)
   - Outputs: `src/data/projects.json` (card data) + `src/content/project/*.md` (full content with frontmatter)

2. **Rendering** (`src/pages/projects/[slug].astro`):
   - Reads the `.md` file, strips frontmatter with regex `/^---\n.*?\n---\n/s`
   - Passes remaining content through `marked.parse()` (configured with GFM, breaks, HTML enabled)
   - Renders raw HTML via `set:html={content}` inside a `prose` article element

3. **Styling**: Tailwind typography plugin (`prose` classes) + custom `:global(.prose ...)` styles for callouts, columns, blockquotes, code blocks, videos, iframes, and images.

### SEO Implementation

- **Component:** `src/components/seo/SEO.astro` — generates `<head>` meta tags
- **Data source:** `src/data/seo.json` (site name, author, social handles, default image)
- **Generated tags:** Open Graph, Twitter Card, canonical URL, hreflang, JSON-LD (Person, Website, BreadcrumbList schemas)
- **Integration:** Called from `src/layouts/HeadLayout.astro` with per-page props
- **Sitemap:** Auto-generated by `@astrojs/sitemap` integration with custom priority/changefreq per section

### Static Generation

This is a **static site**—all Notion content must be pre-generated via `pnpm generate` before build. Generated files:

- `src/data/projects.json` - Project metadata (used for cards, static paths)
- `src/content/project/*.md` - Project markdown content (rendered on detail pages)

### Content Collections

The project defines Astro content collections in `src/content/config.ts`. However, project pages bypass the collection system and read markdown files directly via `fs.readFile` + `marked.parse()` for full HTML control.

### API Routes

- **make-webhook.ts** (ACTIVE): POST endpoint that accepts webhook calls from Make.com to trigger content re-generation. Protected by `MAKE_WEBHOOK_SECRET` env var.
- **projectPageRoute.ts** (DISABLED): Former GET endpoint for individual project content — commented out.
- **projectsRoute.ts** (DISABLED): Former GET endpoint for all projects — commented out.

### Notion Integration

- Projects must have `Status: "Published"` in Notion to be included
- Use `src/lib/notion.ts` for Notion client initialization
- Use `src/lib/projects.ts` for fetching project cards (queries database, downloads cover images)
- Use `src/lib/projectPage.ts` for fetching project details (converts blocks to markdown with custom transformers)
- Use `src/lib/download-image.ts` for downloading Notion-hosted images/videos to `public/content/notion/`

### Custom Notion Block Transformers

Defined in `src/lib/projectPage.ts`:

| Block | Output |
|---|---|
| `video` | `<video>` with autoplay, loop, local source |
| `code` | Markdown fenced code block |
| `embed` | Full-height `<iframe>` with allow attributes |
| `image` | Markdown image with local download |
| `callout` | Styled `<div>` with emoji icon, color-coded backgrounds |
| `file` | Download link with file icon |
| `column_list` | Flexbox grid with `responsive-columns` class |
| `column` | Flexbox column wrapper |

### Dark Mode Implementation

- Toggle via `data-theme` attribute on `<html>`, with automated `class="dark"` fallback
- Persisted in `localStorage("theme")` with three states: `"light"`, `"dark"`, `"system"`
- **Flash prevention:** Inline `<script>` in `HeadLayout.astro` reads `localStorage` + `prefers-color-scheme` before paint
- CSS variables switch via `[data-theme="dark"]` selector
- Component: `ThemeToggle.astro` (web component with dropdown selector)

### i18n Routing

- Spanish (default, no prefix): `/`, `/projects/[slug]`, `/about`
- English (prefixed): `/en/*`, `/en/projects/[slug]`, `/en/about`
- Each locale requires separate page files under `src/pages/en/`
- Do NOT use `prefixDefaultLocale: true` in astro.config (Spanish is un-prefixed)
- `getRelativeLocaleUrl()` from Astro's i18n utilities is used for locale switching in Header

### Components Catalogue

#### UI Components (`src/components/ui/`)

| Component | Type | Props | Description |
|---|---|---|---|
| `Button` | Astro | variant, size, href, disabled, fullWidth, ariaLabel | Renders `<a>` or `<button>` with icon slots |
| `Card` | Astro | title, slug, image, tags, link, variant | Project card with 3 variants (default, featured, minimal) |
| `Badge` (Bagde) | Astro | text, status, pulse | Status indicator badge |
| `FadeIn` | Astro | as, delay, duration, animation, class | Scroll-triggered fade-in wrapper |
| `Scroller` | Astro | logos, speed, height, showMask, grayscale | Infinite horizontal logo scroller |
| `ThemeToggle` | Astro (WC) | — | Dark/light/system theme toggle with dropdown |
| `LanguageToggle` | Astro (WC) | — | ES/EN language switcher with dropdown |
| `Background` | Astro | — | Animated blob background (CSS keyframes) |
| `BackgroundAura` | Astro | — | Image-based background aura |
| `InteractiveGridPattern` | React (TSX) | width, className + SVG props | Interactive grid with hover tracking |

#### Section Components (`src/components/sections/`)

| Component | Description |
|---|---|
| `Header` | Navigation with mobile menu web component |
| `Hero` | Hero section with profile, socials, InteractiveGridPattern background |
| `Projects` | Grid of project cards from `projects.json` |
| `CTA` | Call-to-action with form illustration |
| `Footer` | Footer with social links, email copy web component |
| `LogoScroller` | Technology logos horizontal scroller |

#### Effect Components (`src/components/effects/`)

| Component | Description |
|---|---|
| `CursorTrail` | Custom cursor trail effect (web component) |
| `Snow` | Snow particle effect (web component) |
| `VantaBackground` | 3D background effect wrapper |

### Analytics & Monitoring

- **Google Tag Manager**: Injected in `HeadLayout.astro` (G-XXXXXXXX)
- **ContentSquare**: User experience analytics script in `HeadLayout.astro`
- **Vercel Web Analytics**: Enabled via `@astrojs/vercel/static` adapter config (`webAnalytics: { enabled: true }`)
