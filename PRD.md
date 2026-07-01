# Product Requirement Document (PRD) - Portfolio Daniel Tunjano

## 1. Introducción

Este documento define los requerimientos, funcionalidades y estructura técnica para el portafolio personal de Daniel Tunjano. El objetivo principal es crear una presencia digital profesional, moderna y de alto rendimiento para exhibir proyectos y habilidades técnicas.

## 2. Visión del Producto

Un sitio web estático generado con Astro que destaca por su velocidad, diseño visual impactante y facilidad de administración de contenido a través de Notion como CMS headless. El sitio debe servir como punto central para reclutadores y clientes potenciales.

## 3. Stack Tecnológico

- **Core Framework:** [Astro](https://astro.build/) (v5+)
- **UI Framework:** [React](https://react.dev/) (v19) para componentes interactivos.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (v4) con `@tailwindcss/vite`.
- **Animaciones:** CSS nativas + IntersectionObserver (sin librerías externas). Ver `src/lib/animations.ts` y `src/styles/animations.css`.
- **CMS / Datos:** [Notion API](https://developers.notion.com/) y `notion-to-md` para gestionar el contenido de los proyectos dinámicamente.
- **Markdown:** [marked](https://marked.js.org/) (v16) para renderizar contenido de proyectos.
- **Despliegue:** [Vercel](https://vercel.com/) con `@astrojs/vercel` + Web Analytics.
- **shadcn/ui:** Componentes base con `lucide-react` y registro `@magicui`.

## 4. Requerimientos Funcionales

### 4.1. Estructura de la Página

La navegación principal ocurre en una sola página (`index.astro`) dividida en secciones claras:

1.  **Hero Section (`Hero.astro`)**
    - Presentación principal del desarrollador.
    - Incluye `InteractiveGridPattern` (React) como fondo interactivo.
    - Efectos de fondo `Background.astro` (blobs animados CSS) y `BackgroundAura.astro`.
    - Llamada a la acción (CTA) inicial.

2.  **Call to Action (`CTA.astro`)**
    - Sección estratégica para dirigir al usuario a contacto.
    - Incluye ilustración SVG decorativa.

3.  **Logo Scroller (`LogoScroller.astro`)**
    - Carrusel infinito horizontal con tecnologías dominadas.
    - Implementado con `Scroller.astro` (componente UI reutilizable).

4.  **Proyectos (`Projects.astro`)**
    - Exhibición de trabajos realizados en grid de `Card.astro`.
    - **Integración de Datos:** Los proyectos se generan estáticamente obteniendo datos desde Notion mediante `pnpm generate` (`src/utils/generate-projectsData.ts`).
    - Cada tarjeta incluye título, descripción, tecnologías y enlaces.

5.  **Layout General (`Layout.astro`)**
    - `Header` con navegación, ThemeToggle y LanguageToggle.
    - `Footer` con redes sociales y botón de copiar email (Web Component).
    - Configuración de SEO vía `HeadLayout.astro`.

### 4.2. Páginas Adicionales

- **About** (`/about`, `/en/about`): Página de perfil y habilidades.
- **Detalle de Proyecto** (`/projects/[slug]`): Renderiza markdown con `marked.parse()` y estilos prose.
- **404**: Página personalizada de error.
- **API Webhook** (`/api/make-webhook`): POST endpoint para re-generar contenido desde Make.com.

### 4.3. Funcionalidades Transversales Implementadas

- **Gestión de Contenido (CMS):**
  - Sincronización con Notion a través de `pnpm generate`.
  - Webhook externo para re-generación automática desde Make.com.
  - Transformers personalizados para bloques: video, code, embed, image, callout, file, column_list, column.

- **Internacionalización (i18n):**
  - Configurado nativamente en Astro (`astro.config.mjs`).
  - Idiomas: Español (`es`, default sin prefijo) e Inglés (`en` con prefijo).
  - Traducciones en `src/data/dataPage.json` con hook `useTranslations()`.

- **Modo Oscuro/Claro:**
  - Toggle con 3 estados: light, dark, system.
  - Persistencia en `localStorage("theme")`.
  - Flash-prevention con script inline en `<head>`.
  - CSS variables semánticas que cambian según `[data-theme="dark"]`.

- **SEO:**
  - Componente `SEO.astro` con Open Graph, Twitter Card, JSON-LD (Person, Website, BreadcrumbList).
  - Sitemap automático con prioridades por sección.
  - Meta tags de hreflang para i18n.

- **Analytics:**
  - Google Tag Manager
  - ContentSquare
  - Vercel Web Analytics

- **Animaciones:**
  - Scroll animations vía IntersectionObserver (fade-in, slide, scale, stagger).
  - View Transitions con crossfade entre páginas.
  - Respeto por `prefers-reduced-motion`.
  - Efectos: CursorTrail, Snow, VantaBackground (web components).

### 4.4. Detalles Visuales y Sistema de Diseño

El proyecto cuenta con un sistema de diseño robusto definido en `src/styles/global.css`:

- **Tipografía:**
  - **Títulos (Headings):** [Kufam](https://fonts.google.com/specimen/Kufam) (Variable Font). Estilo moderno y geométrico.
  - **Cuerpo (Body):** [Inter](https://fonts.google.com/specimen/Inter) (Variable Font). Legibilidad y neutralidad.

- **Paleta de Colores:**
  - **Primary Blue:** Escala completa desde `#eff9ff` (50) hasta `#04314d` (950).
  - **Secondary Slate:** Escala de grises azulados para interfaces modernas.
  - **Neutrals:** Escala de grises puros para textos y fondos.
  - **Accent:** Un tono "Mint" vibrante (`#00c8b3`) para destacar elementos clave.

- **Variables Semánticas:**
  - `--color-bg`: Fondo principal (Light: Blue-50 / Dark: Black).
  - `--color-text`: Texto principal (Light: Black / Dark: White).
  - `--color-primary`: Color de marca (Light: Blue-600 / Dark: Blue-300).
  - `--color-secondary`: Color secundario (Light: Slate-800 / Dark: Blue-500).

- **shadcn/ui:** Variables CSS en formato `--background`, `--foreground`, `--primary`, etc. con variantes `.dark`.

## 5. Requerimientos No Funcionales

- **Performance:** Sitio 100% estático. Sin JavaScript innecesario (islas de React solo donde se necesitan).
- **SEO:** Implementación completa de meta tags, Open Graph, Twitter Cards, JSON-LD y sitemap.
- **Diseño Responsivo:** Adaptabilidad total usando Tailwind CSS v4 con enfoque mobile-first.
- **Accesibilidad:** Contraste suficiente, etiquetas aria, navegación por teclado.

## 6. Scripts del Proyecto (pnpm)

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo en puerto 4321 |
| `pnpm build` | Ejecuta `pnpm generate` + `astro build` |
| `pnpm preview` | Vista previa de la build de producción |
| `pnpm generate` | Obtiene datos de Notion y genera JSON + MD |
| `pnpm start` | Ejecuta generate + dev secuencialmente |
| `pnpm start:prod` | Ejecuta generate + build secuencialmente |
| `pnpm astro ...` | Ejecuta comandos de Astro CLI |

## 7. Variables de Entorno

```env
NOTION_TOKEN=tu_notion_api_token
NOTION_DATABASE_ID=tu_database_id
MAKE_WEBHOOK_SECRET=tu_secreto_para_webhook
```

## 8. Estructura del Proyecto

```
src/
├── assets/            # SVG icons, socials, tools, imágenes
├── components/
│   ├── effects/       # Snow, CursorTrail, VantaBackground
│   ├── sections/      # Header, Hero, CTA, LogoScroller, Projects, Footer
│   ├── seo/           # SEO.astro con JSON-LD
│   └── ui/            # Button, Card, Badge, FadeIn, Scroller, Background, ThemeToggle, LanguageToggle, InteractiveGridPattern
├── content/
│   ├── config.ts      # Content collections
│   └── project/       # MDs auto-generados desde Notion
├── data/
│   ├── projects.json  # Auto-generado
│   ├── dataPage.json  # Traducciones ES/EN
│   ├── data.json      # Perfil personal
│   └── seo.json       # Config SEO
├── i18n/
│   ├── ui.ts          # languageList
│   └── utils.ts       # useTranslations()
├── layouts/
│   ├── HeadLayout.astro  # <head> con SEO, fonts, flash-prevention
│   └── Layout.astro      # Layout base con Header/Footer
├── lib/
│   ├── notion.ts      # Cliente Notion API
│   ├── projects.ts    # Fetch de project cards
│   ├── projectPage.ts # Fetch + transformers a MD
│   ├── download-image.ts # Descarga de imágenes Notion
│   ├── animations.ts  # IntersectionObserver controller
│   └── utils.ts       # cn() utility
├── pages/
│   ├── index.astro    # Home ES
│   ├── about.astro    # About ES
│   ├── 404.astro
│   ├── projects/[slug].astro
│   ├── en/            # Rutas EN
│   └── api/           # make-webhook.ts
├── scripts/
│   └── start.ts       # Helper generate + dev/build
├── styles/
│   ├── global.css     # Tailwind v4, variables, fonts
│   └── animations.css # Keyframes, scroll animations, view transitions
└── utils/
    ├── generate-projectsData.ts  # Script principal de generación
    ├── jsonLD.js      # Schema JSON-LD
    └── slugify.js     # URL slugs
```

## 9. Futuras Mejoras / Roadmap

- Blog personal integrado mediante Notion.
- Formulario de contacto funcional (Formspree o serverless).
- Tests automatizados (Playwright/Vitest).
- Más variantes de animaciones de scroll.
