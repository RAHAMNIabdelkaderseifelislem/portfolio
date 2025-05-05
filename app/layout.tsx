import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neural Nexus | AbdElKader Seif El Islem RAHMANI - AI Researcher & Developer",
  description:
    "Portfolio of AbdElKader Seif El Islem RAHMANI - PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator specializing in AI agents, computer vision, and NLP solutions.",
  keywords: [
    "AI researcher",
    "deep learning",
    "machine learning",
    "PhD researcher",
    "AI agent development",
    "computer vision",
    "NLP",
    "full-stack AI",
    "neural networks",
    "AI consulting",
  ],
  authors: [{ name: "AbdElKader Seif El Islem RAHMANI" }],
  creator: "AbdElKader Seif El Islem RAHMANI",
  publisher: "Neural Nexus",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aekrahmani.netlify.app",
    title: "Neural Nexus | AbdElKader Seif El Islem RAHMANI - AI Researcher & Developer",
    description:
      "Portfolio of AbdElKader Seif El Islem RAHMANI - PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator",
    siteName: "Neural Nexus",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Neural Nexus - Where AI Research Meets Real-World Innovation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neural Nexus | AbdElKader Seif El Islem RAHMANI",
    description: "PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aekrahmani.netlify.app",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&family=Fira+Code:wght@400;500&family=Roboto+Condensed:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-[#2D3047]">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
