import type { APIRoute } from 'astro';
import { execSync } from 'child_process';

export const POST: APIRoute = async ({ request }) => {
  const MAKE_SECRET = import.meta.env.MAKE_WEBHOOK_SECRET;
  
  if (request.headers.get('Authorization') !== `Bearer ${MAKE_SECRET}`) {
    return new Response('No autorizado', { status: 401 });
  }

  try {
    execSync('npm run generate');
    return new Response('Datos actualizados correctamente', { status: 200 });
  } catch (error) {
    console.error('Error en la actualización:', error);
    return new Response('Error en la actualización', { status: 500 });
  }
}