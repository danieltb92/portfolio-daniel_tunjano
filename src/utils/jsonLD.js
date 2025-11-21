import siteData from "../data/seo.json";
import { slugify } from "./slugify";

/**
 * Genera el script JSON-LD para SEO estructurado.
 * @param {Object} options
 * @param {string} options.type - Tipo de página ('post' o 'website')
 * @param {Object} [options.post] - Datos del post (si aplica)
 * @param {string} [options.url] - URL canónica de la página
 * @returns {string} Script HTML con JSON-LD
 */
export default function jsonLDGenerator({ type, post, url }) {
  const siteTitle = siteData.default.title;
  const siteUrl = siteData.default.siteUrl;

  if (type === "post" && post) {
    return `<script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url || siteUrl
        },
        "headline": post.title,
        "description": post.description,
        "image": post.image?.src ? new URL(post.image.src, siteUrl).href : undefined,
        "author": {
          "@type": "Person",
          "name": post.author,
          "url": `/author/${slugify(post.author)}`
        },
        "datePublished": post.date
      }, null, 2)}
    </script>`;
  }
  // Por defecto, genera para WebSite
  return `<script type="application/ld+json">
    ${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteTitle,
      "url": siteUrl
    }, null, 2)}
  </script>`;
}