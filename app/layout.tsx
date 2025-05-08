import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FloatingContactButton from "@/components/floating-contact-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neural Nexus | AbdElKader Seif El Islem RAHMANI - AI Research & Development Expert",
  description:
    "Portfolio of AbdElKader Seif El Islem RAHMANI - PhD Researcher and AI Developer specializing in deep learning, computer vision, NLP, and AI agent development for innovative real-world solutions.",
  keywords: [
    "AI researcher",
    "deep learning engineer",
    "machine learning expert",
    "PhD AI researcher",
    "AI agent development",
    "computer vision specialist",
    "natural language processing",
    "full-stack AI developer",
    "neural networks researcher",
    "AI consulting services",
    "artificial intelligence solutions",
    "machine learning models",
    "AI portfolio",
    "data science expert",
    "neural nexus AI",
  ],
  authors: [{ name: "AbdElKader Seif El Islem RAHMANI", url: "https://aekrahmani.netlify.app" }],
  creator: "AbdElKader Seif El Islem RAHMANI",
  publisher: "Neural Nexus",
  category: "Technology",
  applicationName: "Neural Nexus Portfolio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aekrahmani.netlify.app",
    title: "Neural Nexus | AbdElKader Seif El Islem RAHMANI - AI Research & Development Expert",
    description:
      "Portfolio of AbdElKader Seif El Islem RAHMANI - PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator specializing in cutting-edge artificial intelligence solutions.",
    siteName: "Neural Nexus",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Neural Nexus - Where AI Research Meets Real-World Innovation",
      },
      {
        url: "/profile.png", 
        width: 1200,
        height: 630,
        alt: "AbdElKader Seif El Islem RAHMANI - AI Research & Development Expert",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neural Nexus | AbdElKader Seif El Islem RAHMANI - AI Expert",
    description: "PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator delivering cutting-edge AI solutions",
    creator: "@aekrahmani",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    languages: {
      "en-US": "https://aekrahmani.netlify.app",
    },
  },
  verification: {
    google: "google-site-verification-code", // Replace with your actual verification code
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2D3047",
      },
    ],
  },
  metadataBase: new URL("https://aekrahmani.netlify.app"),
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col bg-[#2D3047]">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingContactButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}