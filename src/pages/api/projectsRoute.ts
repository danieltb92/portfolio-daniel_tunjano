// import type { APIRoute } from "astro";
// import { getProjectCard } from "../../lib/projects";

// export const GET: APIRoute = async () => {
//   try {
//     const projects = await getProjectCard();
//     return new Response(JSON.stringify(projects, null, 2), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error en API /projects:", error);
//     return new Response(JSON.stringify({ error: (error as Error).message }), {
//       status: 500,
//     });
//   }
// };
