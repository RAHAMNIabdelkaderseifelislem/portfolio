export default function robots() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://aekrahmani.netlify.app";
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }, sitemap: `${site}/sitemap.xml` };
}
