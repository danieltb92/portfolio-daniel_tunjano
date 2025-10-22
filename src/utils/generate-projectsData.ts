import "dotenv/config";
import { getProjectCard } from "../lib/projects";
import { getProjectContent } from "../lib/projectPage";
import fs from "node:fs/promises";
import path from "node:path";

async function generateProjectsData() {
  try {
    console.log('🔍 Obteniendo proyectos de Notion...');
    const projects = await getProjectCard();

    // 1. Guardar datos de las cards
    const outputDir = path.join(process.cwd(), 'src/data');
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(
      path.join(outputDir, 'projects.json'),
      JSON.stringify(projects, null, 2)
    );

    // 2. Generar archivos markdown para cada proyecto
    const contentDir = path.join(process.cwd(), 'src/content/project');
    await fs.mkdir(contentDir, { recursive: true });

    for (const project of projects) {
      console.log(`📝 Generando contenido para: ${project.title}`);
      
      if (project.idPage) {
        const projectContent = await getProjectContent(project.idPage);
        
        // Verificar que tenemos contenido real
        if (!projectContent.content.trim()) {
          console.warn(`⚠️ No se encontró contenido para ${project.title}`);
          continue;
        }

        const mdContent = `---
title: "${project.title}"
---

${projectContent.content.trim()}
`;

        const filePath = path.join(contentDir, `${project.slug}.md`);
        await fs.writeFile(filePath, mdContent);
        console.log(`✅ Archivo generado: ${filePath}`);
      }
    }

    console.log('✅ Generación completada');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}
generateProjectsData();
