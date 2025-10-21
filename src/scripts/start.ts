import { execSync } from 'node:child_process';

const mode = process.argv[2] || 'dev'; // Por defecto modo dev
const run = (cmd: string) => execSync(cmd, { stdio: 'inherit' });

console.log(`🚀 Iniciando en modo ${mode.toUpperCase()}...`);

try {
  console.log('📦 Generando datos desde Notion...');
  run('tsx src/utils/generate-projectsData.ts');

  if (mode === 'dev') {
    console.log('🧑‍💻 Iniciando servidor de desarrollo estático...');
    run('astro dev');
  } else if (mode === 'build') {
    console.log('🏗️ Construyendo el sitio estático...');
    run('astro build');
    console.log('✅ Sitio estático generado en ./dist');
  } else {
    console.error('❌ Modo no válido. Usa: dev o build');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error al ejecutar el script:', error);
  process.exit(1);
}
