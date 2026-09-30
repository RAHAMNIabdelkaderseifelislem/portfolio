export default function sitemap() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://aekrahmani.netlify.app";
  return [{ url: `${site}/`, changeFrequency: "monthly", priority: 1 }];
}
