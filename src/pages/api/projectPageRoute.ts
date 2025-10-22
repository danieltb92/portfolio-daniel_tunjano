// import type { APIRoute } from "astro";
// import { getProjectContent } from "../../lib/projectPage";

// export const GET: APIRoute = async ({ params }) => {
//   try {
//     const slug = params?.slug;
//     if (!slug) {
//       return new Response(JSON.stringify({ error: "Missing slug" }), {
//         status: 400,
//       });
//     }
//     const project = await getProjectContent(slug);

//     if (!project) {
//       return new Response(JSON.stringify({ error: "Proyecto no encontrado" }), {
//         status: 404,
//       });
//     }

//     return new Response(JSON.stringify(project, null, 2), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(`Error en API /projects/${params?.slug ?? "unknown"}:`, error);
//     return new Response(JSON.stringify({ error: (error as Error).message }), {
//       status: 500,
//     });
//   }
// };