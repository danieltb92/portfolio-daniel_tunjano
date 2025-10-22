import { defineCollection, z } from 'astro:content';

// Define el esquema para los proyectos
const projectCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }).optional(),
    link: z.object({
      href: z.string(),
      text: z.string().default('Ver Proyecto'),
      external: z.boolean().default(true)
    }).optional(),
    repository: z.string().url().optional(),
    liveUrl: z.string().url().optional()
  })
});

// Exporta las colecciones
export const collections = {
  'project': projectCollection
};