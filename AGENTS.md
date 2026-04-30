# AGENTS.md - Code Assistant Guidelines

This file provides guidelines for AI agents working on this codebase.

## Project Overview

Astro 5 static portfolio with Notion CMS integration, i18n (ES/EN), dark mode, native scroll animations (no GSAP), and Tailwind CSS 4. Deployed on Vercel.

## Build/Lint/Test Commands

### Core Commands
```bash
pnpm dev          # Start dev server at http://localhost:4321
pnpm build        # Generate static site: runs pnpm generate + astro build
pnpm preview      # Preview built site locally
pnpm astro ...    # Run any Astro CLI command
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
import React from "react"
import { cn } from "@/lib/utils"

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number
  className?: string
}

export function ComponentName({ className, ...props }: Props) {
  return <svg className={cn("base-classes", className)} {...props} />
}
```

### TypeScript Conventions

**Types over Interfaces (except Props):**
```ts
type Status = "published" | "draft"

type Project = {
  slug: string
  title: string
  tags: string[]
}
```

**Use `as const` for string unions:**
```ts
export const languageList = {
  es: "Español",
  en: "English",
} as const

export type Language = keyof typeof languageList
```

**Utility Types:**
- Use `cn()` from `@/lib/utils` for Tailwind class merging
- Avoid `any` types; use proper typing with `extends` constraints

### Imports & Aliases

Use the `@/` alias for internal imports:
```ts
import { cn } from "@/lib/utils"
import { useTranslations } from "@/i18n/ui"
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
- Use Tailwind CSS 4 with `@tailwindcss/vite` plugin
- Use `cn()` utility for conditional classes
- Custom variants available: `dark:` prefix for dark mode

**Global CSS:**
- `src/styles/global.css`: Contains CSS variables and base Tailwind imports.
- `src/styles/animations.css`: Contains all custom CSS keyframes and transitions for scroll animations.

### I18n Pattern

```astro
---
import { useTranslations } from '@/i18n/ui'

const t = useTranslations(Astro.currentLocale)
---

<h1>{t('home.title')}</h1>
```

**Translation keys** are defined in `src/data/dataPage.json`.

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Astro components | PascalCase | `Button.astro`, `Card.astro` |
| React components | PascalCase.tsx | `InteractiveGridPattern.tsx` |
| Utilities | camelCase | `generate-projectsData.ts` |
| Pages | kebab-case | `projects/[slug].astro` |
| Data | kebab-case | `projects.json`, `dataPage.json` |

### Directory Structure

```
src/
├── components/
│   ├── sections/    # Page sections (Header, Hero, Projects)
│   ├── ui/           # Reusable UI components
│   └── effects/      # Visual effects (Snow, CursorTrail)
├── layouts/          # Page layouts
├── lib/              # Utilities (notion.ts, projects.ts, utils.ts, animations.ts)
├── i18n/             # Internationalization (ui.ts)
├── pages/            # Routes (index.astro, /en/ for English)
├── styles/           # Global CSS with theme variables and animations.css
├── content/project/  # Auto-generated project markdown
└── data/             # Auto-generated data (projects.json, dataPage.json)
```

### Error Handling

- Use try/catch for async operations (Notion API calls)
- Provide meaningful error messages
- Handle missing environment variables gracefully

### Environment Variables

Required in `.env`:
```env
NOTION_TOKEN=your_notion_api_token
NOTION_DATABASE_ID=your_database_id
```

Access via `process.env.NOTION_TOKEN` in lib files or `import 'dotenv/config'` at top.

## Key Patterns

### Animations & Performance (No GSAP)
- **Zero Dependencies**: All animations use Vanilla JS (`IntersectionObserver`, `requestAnimationFrame`) and CSS transitions for maximum performance. GSAP and Framer Motion are strictly prohibited.
- **Scroll Animations**: Add the `.scroll-animate` or `.scroll-animate-stagger` classes to HTML elements. The global observer in `src/lib/animations.ts` will trigger them when they enter the viewport.
- **CSS Transitions**: Defined in `src/styles/animations.css`. Elements start with `opacity: 0` and transform, then transition to `opacity: 1` when the `.is-visible` class is added.
- **ClientRouter (ViewTransitions)**: Animation observers are automatically re-initialized on `astro:page-load` events to work seamlessly with Astro's ViewTransitions.

### Static Generation
This is a **static site**—all Notion content must be pre-generated via `pnpm generate` before build. Generated files:
- `src/data/projects.json` - Project metadata
- `src/content/project/*.md` - Project markdown content

### Notion Integration
- Projects must have `Status: "Published"` in Notion to be included
- Use `src/lib/notion.ts` for Notion client
- Use `src/lib/projects.ts` for fetching project cards
- Use `src/lib/projectPage.ts` for fetching project details

### Dark Mode Implementation
- Toggle via `data-theme` attribute on `<html>`
- Use CSS variables for colors
- Components read from `data-theme="dark"` selector

### i18n Routing
- Spanish (default): `/`, `/projects/[slug]`
- English: `/en/*`, `/en/projects/[slug]`
- Each locale requires separate page files
- Do NOT use `prefixDefaultLocale: true` in astro.config
