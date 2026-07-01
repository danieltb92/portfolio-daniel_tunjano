# ![Open Graph](https://github.com/user-attachments/assets/45a80196-9909-43fe-a37c-03cb1132eb80)

# Daniel Tunjano - Portafolio

Portafolio estático moderno construido con **Astro 5**, **Tailwind CSS 4** e integración con **Notion CMS**. Disponible en español e inglés con soporte para modo oscuro.

![License](https://img.shields.io/badge/license-MIT-blue)
![Astro](https://img.shields.io/badge/Astro-5.0-blueviolet)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![pnpm](https://img.shields.io/badge/pnpm-latest-F69220)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Notion API](https://img.shields.io/badge/Notion%20API-Integrated-000000?logo=notion)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel)
![i18n](https://img.shields.io/badge/i18n-ES%2FEN-FF6B6B)
![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Enabled-FDB022)


## ✨ Características

- 🌍 **Multiidioma** - Soporte completo en español e inglés con routing automático
- 🎨 **Modo Oscuro** - Toggle de tema con 3 estados (light/dark/system) y flash-prevention
- 📦 **Notion CMS** - Gestión de proyectos desde Notion + webhook para auto-actualización
- ⚡ **Rendimiento** - Sitio estático pre-generado, sin JavaScript innecesario
- 📱 **Responsive** - Diseño mobile-first con Tailwind CSS 4
- 🔍 **SEO Optimizado** - Open Graph, Twitter Cards, JSON-LD, sitemap con prioridades
- 🚀 **Vercel Ready** - Desplegado en Vercel con Web Analytics y builds automáticos
- 🎬 **Animaciones Nativas** - Scroll animations con IntersectionObserver (sin librerías externas)

## 🛠️ Tech Stack

- **Framework:** [Astro 5](https://astro.build) + ViewTransitions
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) + `@tailwindcss/vite`
- **UI Library:** [shadcn/ui](https://ui.shadcn.com) (new-york style) + [lucide-react](https://lucide.dev)
- **CMS:** [Notion API](https://developers.notion.com)
- **Markdown:** [marked](https://marked.js.org) + [notion-to-md](https://github.com/souvikinator/notion-to-md)
- **React:** v19 (componentes interactivos como InteractiveGridPattern)
- **Animaciones:** CSS + IntersectionObserver (src/lib/animations.ts)
- **Despliegue:** [Vercel](https://vercel.com) (static adapter + Web Analytics)
- **Analytics:** Google Tag Manager + ContentSquare

## 📋 Requisitos Previos

- Node.js 18+
- pnpm (recomendado)
- Notion API Token
- Database ID de Notion

## 🚀 Guía de Inicio

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/portfolio-daniel-tunjano.git
cd portfolio-daniel_tunjano
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
NOTION_TOKEN=tu_notion_api_token
NOTION_DATABASE_ID=tu_database_id
MAKE_WEBHOOK_SECRET=tu_secreto_para_webhook
```

Obtener el token en [Notion Integrations](https://www.notion.so/my-integrations).

### 4. Generar datos de proyectos

```bash
pnpm generate
```

Este comando:
- Obtiene proyectos de tu base de datos de Notion (estado: "Published")
- Genera `src/data/projects.json`
- Crea archivos markdown en `src/content/project/`

### 5. Iniciar servidor de desarrollo

```bash
pnpm dev
```

Acceder a `http://localhost:4321`

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor local en puerto 4321 |
| `pnpm build` | Genera datos + build del sitio en `./dist/` |
| `pnpm preview` | Previsualiza build local |
| `pnpm generate` | Sincroniza proyectos desde Notion |
| `pnpm start` | Generate + dev secuencial |
| `pnpm start:prod` | Generate + build secuencial |
| `pnpm astro ...` | Ejecuta comandos de Astro CLI |

## 📁 Estructura del Proyecto

```
src/
├── assets/               # Íconos SVG (icons/, socials/, tools/)
├── components/
│   ├── effects/          # Efectos visuales (Snow, CursorTrail, VantaBackground)
│   ├── sections/         # Secciones de página (Header, Hero, Projects, CTA, Footer, LogoScroller)
│   ├── seo/              # SEO component con JSON-LD
│   └── ui/               # Componentes reutilizables (Button, Card, Badge, FadeIn, Scroller, Toggles, Background, InteractiveGridPattern)
├── content/
│   ├── config.ts         # Content collections de Astro
│   └── project/          # Archivos markdown de proyectos (auto-generados)
├── data/
│   ├── projects.json     # Datos de proyectos (auto-generado)
│   ├── dataPage.json     # Traducciones ES/EN
│   ├── data.json         # Perfil personal
│   └── seo.json          # Configuración SEO
├── i18n/
│   ├── ui.ts             # languageList
│   └── utils.ts          # useTranslations()
├── layouts/
│   ├── HeadLayout.astro  # <head> con SEO, fonts, theme flash-prevention
│   └── Layout.astro      # Layout base con Header/Footer/animations
├── lib/
│   ├── notion.ts         # Cliente de Notion
│   ├── projects.ts       # Fetch de project cards
│   ├── projectPage.ts    # Fetch + transformers a markdown
│   ├── download-image.ts # Descarga imágenes de Notion
│   ├── animations.ts     # IntersectionObserver controller
│   └── utils.ts          # cn() utility
├── pages/
│   ├── index.astro       # Home (ES)
│   ├── about.astro       # About (ES)
│   ├── 404.astro
│   ├── projects/         # Detalle de proyecto
│   ├── en/               # Rutas en inglés
│   └── api/              # Webhook endpoint (make-webhook.ts)
├── scripts/
│   └── start.ts          # Helper para generate + dev/build
├── styles/
│   ├── global.css        # Tailwind v4, variables CSS, fuentes
│   └── animations.css    # Keyframes, scroll animations, view transitions
└── utils/
    ├── generate-projectsData.ts  # Script de generación de datos
    ├── jsonLD.js                 # Generación de JSON-LD
    └── slugify.js                # URL slugs
```

## 🎨 Personalización

### Modificar Colores del Tema

Editar `src/styles/global.css`:

```css
:root {
  --color-bg: /* color de fondo */
  --color-text: /* color de texto */
  --color-primary: /* color primario */
  --color-secondary: /* color secundario */
  --color-accent: /* color de acento */
}

[data-theme="dark"] {
  /* colores para modo oscuro */
}
```

### Agregar Traducciones

Editar `src/data/dataPage.json` y usar `useTranslations(lang)` en componentes:

```astro
---
import { useTranslations } from '@/i18n/utils'
import { languageList } from '@/i18n/ui'
const t = useTranslations(Astro.currentLocale)
---

<h1>{t('home.title')}</h1>
```

### Agregar un Nuevo Proyecto

1. Crear página en Notion con Status = "Published"
2. Ejecutar `pnpm generate`
3. El proyecto aparecerá automáticamente en el portafolio

## 🚀 Despliegue

El sitio está configurado para despliegue en **Vercel**:

1. Conectar repositorio a Vercel
2. Agregar variables de entorno (`NOTION_TOKEN`, `NOTION_DATABASE_ID`, `MAKE_WEBHOOK_SECRET`)
3. Framework preset: Astro (seleccionado automáticamente)
4. Vercel ejecutará `pnpm generate && astro build` automáticamente
5. El sitio se actualiza con cada push a la rama principal

### Actualización Automática vía Webhook

El proyecto expone un endpoint POST en `/api/make-webhook` protegido por `MAKE_WEBHOOK_SECRET`. Puedes configurar Make.com (o cualquier servicio) para llamar este endpoint cuando haya cambios en Notion, y el sitio se re-generará automáticamente.

## 🎬 Animaciones

El proyecto **no usa librerías externas** (no GSAP, no Framer Motion). Las animaciones son:

- **Scroll-based:** IntersectionObserver (ver `src/lib/animations.ts` y `src/styles/animations.css`)
- **View Transitions:** Crossfade nativo de Astro
- **Efectos:** Cursor trail, snow particles (Web Components)
- **Respeto:** `prefers-reduced-motion` para accesibilidad

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

## 📚 Recursos Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Notion API Docs](https://developers.notion.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
