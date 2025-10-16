import 'dotenv/config';
import { getProjectCard } from '../lib/projects';
import fs from 'node:fs/promises';
import path from 'node:path';

async function generateProjectsData() {
  try {
    console.log('🔍 Obteniendo proyectos de Notion...');
    const projects = await getProjectCard();

    console.log('📊 Proyectos obtenidos:', projects.length);

    const outputDir = path.join(process.cwd(), 'src/data');
    await fs.mkdir(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'projects.json');
    await fs.writeFile(outputPath, JSON.stringify(projects, null, 2));

    console.log(`✅ Datos guardados en: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateProjectsData();
