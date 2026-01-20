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
- 🎨 **Modo Oscuro** - Toggle de tema implementado con CSS variables
- 📦 **Notion CMS** - Gestión de proyectos directamente desde Notion
- ⚡ **Rendimiento** - Sitio estático pre-generado, sin JavaScript innecesario
- 📱 **Responsive** - Diseño móvil-first con Tailwind CSS 4
- 🔍 **SEO Optimizado** - Sitemaps automáticos y metadatos
- 🚀 **Vercel Ready** - Desplegado en Vercel con builds automáticos

## 🛠️ Tech Stack

- **Framework:** [Astro 5](https://astro.build)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com) + `@tailwindcss/vite`
- **CMS:** [Notion API](https://developers.notion.com)
- **Markdown:** [marked](https://marked.js.org) + [notion-to-md](https://github.com/souvikinator/notion-to-md)
- **React:** v19 (para componentes interactivos)
- **Despliegue:** [Vercel](https://vercel.com)

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
| `pnpm build` | Genera sitio estático en `./dist/` |
| `pnpm preview` | Previsualiza build local antes de desplegar |
| `pnpm generate` | Sincroniza proyectos desde Notion |
| `pnpm astro ...` | Ejecuta comandos de Astro CLI |

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── sections/       # Secciones principales (Header, Hero, Projects, etc.)
│   ├── ui/            # Componentes reutilizables (Button, Card, Badge, etc.)
│   └── effects/       # Animaciones y efectos visuales (Snow, VantaBackground)
├── content/
│   └── project/       # Archivos markdown de proyectos (auto-generados)
├── data/
│   ├── projects.json  # Datos de proyectos (auto-generado)
│   └── dataPage.json  # Traducciones y configuración
├── i18n/
│   └── ui.ts          # Sistema de traducciones
├── layouts/
│   └── Layout.astro   # Layout base del sitio
├── lib/
│   ├── notion.ts      # Cliente de Notion
│   ├── projects.ts    # Lógica de obtención de proyectos
│   └── projectPage.ts # Lógica de detalles de proyectos
├── pages/
│   ├── index.astro    # Página de inicio (ES)
│   ├── projects/      # Rutas de proyectos
│   └── en/            # Rutas en inglés
├── styles/
│   └── global.css     # Variables CSS y estilos globales
└── utils/
    └── generate-projectsData.ts # Script de generación de datos
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
import { useTranslations } from '@/i18n/ui'
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
2. Agregar variables de entorno (`NOTION_TOKEN`, `NOTION_DATABASE_ID`)
3. Vercel ejecutará automáticamente `pnpm generate && pnpm build`
4. El sitio se actualiza con cada push a la rama principal

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo [LICENSE](LICENSE) para más detalles.

## 📚 Recursos Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Notion API Docs](https://developers.notion.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)
