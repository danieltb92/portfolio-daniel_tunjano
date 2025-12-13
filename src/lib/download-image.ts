import fs from "node:fs/promises";
import path from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

export async function downloadImage(
  url: string,
  filename: string
): Promise<string> {
  try {
    // Definir el directorio de destino
    // const publicDir = path.join(process.cwd(), "src", "assets");
    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(publicDir, "content", "notion");

    // Asegurarse de que el directorio existe
    await fs.mkdir(imagesDir, { recursive: true });

    // Definir la ruta completa del archivo
    const filePath = path.join(imagesDir, filename);
    // const publicPath = `/src/assets/content/notion/${filename}`;
    const publicPath = `/content/notion/${filename}`;

    // Verificar si el archivo ya existe (opcional: podrías querer sobrescribirlo siempre)
    // Para simplificar y asegurar frescura, lo sobrescribiremos si la URL ha cambiado o si forzamos
    // Pero como las URLs de Notion cambian, mejor descargamos siempre o verificamos si es la misma imagen.
    // Por ahora, descargamos siempre para asegurar que funciona.

    // Realizar la petición
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("No body in response");
    }

    // Guardar el archivo
    const fileStream = createWriteStream(filePath);
    // @ts-ignore - response.body is a ReadableStream, pipeline accepts it
    await pipeline(Readable.fromWeb(response.body), fileStream);

    console.log(`   ⬇️ Imagen descargada: ${filename}`);
    return publicPath;
  } catch (error) {
    console.error(`   ❌ Error descargando imagen ${filename}:`, error);
    // En caso de error, devolvemos la URL original como fallback, aunque probablemente esté rota pronto
    return url;
  }
}
