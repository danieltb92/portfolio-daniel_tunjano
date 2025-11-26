import "dotenv/config";
import { getProjectCard } from "../lib/projects";
import { getProjectContent } from "../lib/projectPage";
import fs from "node:fs/promises";
import path from "node:path";

async function generateProjectsData() {
  try {
    // Verificar variables de entorno
    console.log("🔐 Verificando configuración...");
    if (!process.env.NOTION_TOKEN) {
      throw new Error(
        "❌ NOTION_TOKEN no está definido en las variables de entorno"
      );
    }
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error(
        "❌ NOTION_DATABASE_ID no está definido en las variables de entorno"
      );
    }
    console.log("✅ Variables de entorno verificadas");

    console.log("🔍 Obteniendo proyectos de Notion...");
    const projects = await getProjectCard();

    if (!projects || projects.length === 0) {
      console.warn("⚠️ No se encontraron proyectos en Notion");
      return;
    }

    console.log(`📊 Se encontraron ${projects.length} proyectos`);

    // 1. Guardar datos de las cards
    const outputDir = path.join(process.cwd(), "src/data");
    await fs.mkdir(outputDir, { recursive: true });

    const projectsJsonPath = path.join(outputDir, "projects.json");
    await fs.writeFile(projectsJsonPath, JSON.stringify(projects, null, 2));
    console.log(`✅ Guardado: ${projectsJsonPath}`);

    // 2. Generar archivos markdown para cada proyecto
    const contentDir = path.join(process.cwd(), "src/content/project");
    await fs.mkdir(contentDir, { recursive: true });

    let successCount = 0;
    let errorCount = 0;

    for (const project of projects) {
      try {
        console.log(`\n📝 Procesando: ${project.title} (${project.slug})`);

        if (!project.idPage) {
          console.warn(`⚠️ Proyecto sin idPage, saltando: ${project.title}`);
          continue;
        }

        console.log(
          `   🔗 Obteniendo contenido de Notion (ID: ${project.idPage})...`
        );
        const projectContent = await getProjectContent(project.idPage);

        // Verificar que tenemos contenido real
        if (!projectContent.content.trim()) {
          console.warn(`⚠️ No se encontró contenido para ${project.title}`);
          errorCount++;
          continue;
        }

        const mdContent = `---
title: "${project.title}"
---

${projectContent.content.trim()}
`;

        const filePath = path.join(contentDir, `${project.slug}.md`);
        await fs.writeFile(filePath, mdContent);
        console.log(
          `   ✅ Archivo generado: ${project.slug}.md (${mdContent.length} bytes)`
        );
        successCount++;
      } catch (error) {
        console.error(
          `   ❌ Error procesando ${project.title}:`,
          error instanceof Error ? error.message : String(error)
        );
        errorCount++;
      }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 Resumen de generación:");
    console.log(`   ✅ Exitosos: ${successCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);
    console.log(`   📁 Total proyectos: ${projects.length}`);
    console.log("=".repeat(50));

    if (successCount === 0) {
      throw new Error(
        "❌ No se generó ningún archivo markdown. Revisa los logs anteriores."
      );
    }

    console.log("\n✅ Generación completada exitosamente");
  } catch (error) {
    console.error(
      "\n❌ Error fatal en la generación:",
      error instanceof Error ? error.message : String(error)
    );
    if (error instanceof Error && error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
}

generateProjectsData();
