import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://aekrahmani.netlify.app";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "AbdElKader Seif El Islem Rahmani — AI Research & Intelligent Agents Engineering",
  description:
    "PhD candidate researching autonomous and self-improving LLM agents, Lead AI Engineer building production agentic systems, and university lecturer. Publications, teaching, engineering work and CV.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: "AbdElKader Seif El Islem Rahmani — AI Research × Intelligent Agents × Engineering",
    description: "Research on autonomous, self-improving LLM agents; engineering of production AI systems.",
    url: "/"
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='7' y='7' width='18' height='18' fill='none' stroke='%23D99A1E' stroke-width='2.5'/%3E%3Crect x='7' y='7' width='18' height='18' fill='none' stroke='%230B6B68' stroke-width='2.5' transform='rotate(45 16 16)'/%3E%3C/svg%3E"
  }
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@500&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
