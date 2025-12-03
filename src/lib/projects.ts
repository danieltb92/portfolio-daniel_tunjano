import "dotenv/config";
import type { QueryDataSourceResponse } from "@notionhq/client";
import { notion } from "./notion";

export interface Project {
  id: string;
  name: string;
  slug: string;
  cover: string;
  type: string;
  url: string | null;
  idPage: string | null;
  title: string;
  description: string | null;
  image: {
    src: string;
    alt: string;
  };
  tags: string[];
  link: {
    href: string;
    text: string;
    external: boolean;
  };
}

export async function getProjectCard(): Promise<Project[]> {
  try {
    // const databaseId = import.meta.env.NOTION_DATABASE_ID;
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!databaseId) throw new Error("NOTION_DATABASE_ID no definido");

    // 1️⃣ Recuperar metadata del database (para obtener el data_source_id)
    const db: any = await notion.databases.retrieve({
      database_id: databaseId,
    });
    const dataSourceId = db.data_sources?.[0]?.id;

    if (!dataSourceId) {
      throw new Error("No se encontró ningún data_source_id en el database.");
    }

    // 2️⃣ Consultar el data source con filtro y orden
    const response: QueryDataSourceResponse = await (
      notion as any
    ).dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Status",
        select: { equals: "Published" },
      },
      sorts: [
        {
          property: "Date",
          direction: "ascending",
        },
      ],
    });

    // 3️⃣ Mapear resultados
    const projects = await Promise.all(
      response.results.map(async (page: any) => {
        const slug = page?.properties?.Slug.rich_text?.[0]?.plain_text || null;
        const coverUrl = page?.properties?.Cover?.files?.[0]?.file.url || null;

        let localCoverUrl = coverUrl;
        if (coverUrl) {
          // Usar el slug o ID para el nombre del archivo
          const extension = coverUrl.split("?")[0].split(".").pop() || "jpg";
          const filename = `cover-${slug}.${extension}`;
        }

        return {
          id: page?.properties?.Slug.rich_text?.[0]?.plain_text || null,
          name: page?.properties?.Name?.title?.[0]?.plain_text || null,
          slug: slug,
          cover: coverUrl, // Se actualizará después
          title:
            page?.properties?.TitleProject?.rich_text?.[0]?.plain_text || null,
          description:
            page?.properties?.Description?.rich_text?.[0]?.plain_text || null,
          type: page?.properties?.Type?.rich_text?.[0]?.plain_text || null,
          url: page?.public_url || null,
          idPage: page?.id || null,

          image: {
            src: coverUrl ?? "",
            alt: page.properties.Name.title[0]?.plain_text ?? "",
          },
          tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
          link: {
            href: slug,
            text: "Ver Proyecto",
            external: true,
          },
        };
      })
    );

    // Descargar imágenes en paralelo
    const { downloadImage } = await import("./download-image");

    const projectsWithLocalImages = await Promise.all(
      projects.map(async (project) => {
        if (project.cover) {
          const extension =
            project.cover.split("?")[0].split(".").pop() || "jpg";
          // Limpiar query params de la extensión si existen
          const cleanExtension = extension.split("&")[0];
          const filename = `cover-${project.slug}.${cleanExtension}`;
          const localPath = await downloadImage(project.cover, filename);

          project.cover = localPath;
          project.image.src = localPath;
        }
        return project;
      })
    );

    return projectsWithLocalImages;
  } catch (err: any) {
    console.error("❌ Error al obtener proyectos desde Notion:", err.message);
    throw err;
  }
}
