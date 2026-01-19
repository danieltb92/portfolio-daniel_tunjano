import { NotionToMarkdown } from "notion-to-md";
import { notion } from "./notion";
import type {
  BlockObjectResponse,
  VideoBlockObjectResponse,
  CodeBlockObjectResponse,
  EmbedBlockObjectResponse,
  ImageBlockObjectResponse,
  FileBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface ProjectContent {
  content: string;
  metadata: {
    title: string;
    description?: string;
    type: string;
    tags: string[];
    created_date: string;
    updated_date: string;
    url: string;
  };
}

// Configurar notion-to-md con opciones específicas
const n2m = new NotionToMarkdown({
  notionClient: notion,
  config: {
    convertImagesToBase64: false,
    separateChildPage: false,
  },
});

// Añadir custom transformers para diferentes tipos de bloques
// Añadir custom transformers para diferentes tipos de bloques
n2m.setCustomTransformer("video", async (block) => {
  const videoBlock = block as VideoBlockObjectResponse;
  const video = videoBlock.video;
  const url = video.type === "external" ? video.external.url : video.file.url;

  // Descargar video
  const { downloadImage } = await import("./download-image");
  const filename = `video-${block.id}.${
    url.split("?")[0].split(".").pop() || "mp4"
  }`;
  const localUrl = await downloadImage(url, filename);

  return `<video preload:auto autoplay loop class="w-full rounded-lg">
    <source src="${localUrl}" type="video/mp4">
    Tu navegador no soporta el tag de video.
  </video>`;
});

n2m.setCustomTransformer("code", async (block) => {
  const codeBlock = block as CodeBlockObjectResponse;
  const code = codeBlock.code;
  return `\`\`\`${code.language || ""}
${code.rich_text[0].plain_text}
\`\`\``;
});

n2m.setCustomTransformer("embed", async (block) => {
  const embedBlock = block as EmbedBlockObjectResponse;
  const embed = embedBlock.embed;
  return `<iframe 
    src="${embed.url}"
    class="w-full min-h-[400px] rounded-lg border-0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>`;
});

n2m.setCustomTransformer("image", async (block) => {
  const imageBlock = block as ImageBlockObjectResponse;
  const image = imageBlock.image;
  const url = image.type === "external" ? image.external.url : image.file.url;
  const caption =
    imageBlock.image.caption?.length > 0
      ? imageBlock.image.caption[0].plain_text
      : "";

  // Descargar imagen
  const { downloadImage } = await import("./download-image");
  const filename = `image-${block.id}.${
    url.split("?")[0].split(".").pop() || "jpg"
  }`;
  const localUrl = await downloadImage(url, filename);

  return `![${caption}](${localUrl})`;
});

n2m.setCustomTransformer("file", async (block) => {
  const fileBlock = block as FileBlockObjectResponse;
  const file = fileBlock.file;
  const url = file.type === "external" ? file.external.url : file.file.url;
  const caption =
    fileBlock.file.caption?.[0]?.plain_text || "Descargar archivo";

  // Descargar archivo
  const { downloadImage } = await import("./download-image");
  const filename = `file-${block.id}.${
    url.split("?")[0].split(".").pop() || "pdf"
  }`;
  const localUrl = await downloadImage(url, filename);

  return `<a href="${localUrl}" target="_blank" class="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    ${caption}
  </a>`;
});

export async function getProjectContent(
  pageId: string,
): Promise<ProjectContent> {
  if (!pageId) {
    throw new Error("pageId es requerido");
  }

  try {
    console.log(`🔍 Obteniendo contenido para página ${pageId}...`);

    // 1. Obtener los bloques de la página
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    console.log(`📦 Bloques encontrados: ${blocks.results.length}`);

    // 2. Convertir bloques a markdown usando blocksToMarkdown en lugar de pageToMarkdown
    const mdBlocks = await n2m.blocksToMarkdown(blocks.results);
    // console.log('Bloques MD:', JSON.stringify(mdBlocks, null, 2));

    // 3. Convertir a string asegurándonos de que sea texto plano
    const markdown = n2m.toMarkdownString(mdBlocks);
    // console.log("Markdown generado:", markdown.parent);

    // 4. Obtener metadata de la página
    const page = await notion.pages.retrieve({
      page_id: pageId,
    });

    // 5. Construir el contenido final asegurándonos de que sea string
    const finalContent =
      typeof markdown.parent === "string"
        ? markdown.parent
        : JSON.stringify(markdown.parent, null, 2);

    if (!finalContent.trim()) {
      console.warn("⚠️ Advertencia: No se encontró contenido en la página");
    }

    return {
      content: finalContent,
      metadata: {
        title:
          (page as any).properties?.Title?.title?.[0]?.plain_text ||
          "Sin título",
        description:
          (page as any).properties?.Description?.rich_text?.[0]?.plain_text ||
          "Sin descripción",
        type: (page as any).properties?.Type?.select?.name || "Sin tipo",
        tags:
          (page as any).properties?.Tags?.multi_select?.map(
            (tag: any) => tag.name,
          ) || [],
        created_date: (page as any).created_time,
        updated_date: (page as any).last_edited_time,
        url: (page as any).url,
      },
    };
  } catch (error) {
    console.error("Error obteniendo contenido del proyecto:", error);
    console.error(
      "Detalles del error:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}
