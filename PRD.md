# Product Requirement Document (PRD) - Portfolio Daniel Tunjano

## 1. Introducción

Este documento define los requerimientos, funcionalidades y estructura técnica para el portafolio personal de Daniel Tunjano. El objetivo principal es crear una presencia digital profesional, moderna y de alto rendimiento para exhibir proyectos y habilidades técnicas.

## 2. Visión del Producto

Un sitio web estático generado con Astro que destaca por su velocidad, diseño visual impactante y facilidad de administración de contenido a través de Notion como CMS headless. El sitio debe servir como punto central para reclutadores y clientes potenciales.

## 3. Stack Tecnológico

- **Core Framework:** [Astro](https://astro.build/) (v5+)
- **UI Framework:** [React](https://react.dev/) (v19) para componentes interactivos.
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (v4) para un diseño utility-first y responsive.
- **Animaciones:** [Motion](https://motion.dev/) (anteriormente Framer Motion) para transiciones fluidas.
- **CMS / Datos:** [Notion API](https://developers.notion.com/) y `notion-to-md` para gestionar el contenido de los proyectos dinámicamente.
- **Despliegue:** [Vercel](https://vercel.com/) con `@astrojs/vercel`.

## 4. Requerimientos Funcionales

### 4.1. Estructura de la Página (Single Page Application feel)

La navegación principal ocurre en una sola página (`index.astro`) dividida en secciones claras:

1.  **Hero Section (`Hero.astro`)**

    - Presentación principal del desarrollador.
    - Debe incluir elementos visuales atractivos (posibles efectos de fondo o animaciones de entrada).
    - Llamada a la acción (CTA) inicial.

2.  **Call to Action (`CTA.astro`)**

    - Sección estratégica para dirigir al usuario a contactar o ver proyectos.

3.  **Logo Scroller (`LogoScroller.astro`)**

    - Carrusel infinito o grid para mostrar tecnologías dominadas (Tech Stack) o clientes anteriores.

4.  **Proyectos (`Projects.astro`)**

    - Exhibición de trabajos realizados.
    - **Integración de Datos:** Los proyectos se generan estáticamente obteniendo datos desde Notion mediante el script `src/utils/generate-projectsData.ts`.
    - Cada tarjeta de proyecto debe incluir título, descripción, tecnologías usadas y enlaces (repo/demo).

5.  **Layout General (`Layout.astro`)**
    - Debe incluir `Header` y `Footer`.
    - Configuración de SEO y metadatos globales.

### 4.2. Funcionalidades Transversales Implementadas

- **Gestión de Contenido (CMS):**
  - Sincronización con Notion a través del comando `pnpm generate` (`src/utils/generate-projectsData.ts`).
- **Internacionalización (i18n):**

  - Configurado nativamente en Astro (`astro.config.mjs`).
  - Idiomas soportados: Español (`es`, default) e Inglés (`en`).
  - Enrutamiento sin prefijo para el idioma por defecto.

- **Modo Oscuro/Claro:**
  - Implementado totalmente vía CSS Variables y atributo `data-theme="dark"`.
  - Definición de colores semánticos (`--color-bg`, `--color-text`, `--color-primary`, etc.) que cambian automáticamente según el tema activo.

### 4.3. Detalles Visuales y Sistema de Diseño

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

## 5. Requerimientos No Funcionales

- **Performance:** Optimización extrema aprovechando la arquitectura de "Islas" de Astro.
- **SEO:** Implementación de etiquetas meta, Open Graph y mapa del sitio (`@astrojs/sitemap`).
- **Diseño Responsivo:** Adaptabilidad total usando Tailwind CSS v4.

## 6. Scripts del Proyecto (pnpm)

- `pnpm dev`: Inicia el servidor de desarrollo.
- `pnpm build`: Ejecuta la generación de datos y construye el sitio.
- `pnpm generate`: Ejecuta el script de extracción de datos de Notion.
- `pnpm preview`: Vista previa de la build de producción.

## 7. Futuras Mejoras / Roadmap

- Implementación de modo oscuro/claro (si no está ya implementado).
- Blog personal integrado también mediante Notion.
- Formulario de contacto funcional (integración con servicios como Formspree o serverless functions).
