export default function StructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://aekrahmani.netlify.app/#person",
          name: "AbdElKader Seif El Islem RAHMANI",
          givenName: "AbdElKader Seif El Islem",
          familyName: "RAHMANI",
          description: "PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator",
          jobTitle: "PhD Researcher in Artificial Intelligence",
          worksFor: {
            "@type": "Organization",
            name: "University Centre of Naama – Salhi Ahmed",
          },
          alumniOf: [
            {
              "@type": "Organization",
              name: "University of Saida Dr. Moulay Tahar",
            },
          ],
          knowsAbout: [
            "Artificial Intelligence",
            "Deep Learning",
            "Machine Learning",
            "Computer Vision",
            "Natural Language Processing",
            "AI Agents",
            "Full-Stack Development",
          ],
          url: "https://aekrahmani.netlify.app",
          sameAs: ["https://github.com/RAHAMNIabdelkaderseifelislem/", "https://www.linkedin.com/in/aek-seif-el-islem-rahmani/", "https://kaggle.com/aek426rahmani"],
        },
        {
          "@type": "WebSite",
          "@id": "https://aekrahmani.netlify.app/#website",
          url: "https://aekrahmani.netlify.app",
          name: "Neural Nexus",
          description:
            "Portfolio of AbdElKader Seif El Islem RAHMANI - PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator",
          publisher: {
            "@id": "https://aekrahmani.netlify.app/#person",
          },
        },
        {
          "@type": "WebPage",
          "@id": "https://aekrahmani.netlify.app/#webpage",
          url: "https://aekrahmani.netlify.app",
          name: "Neural Nexus | AbdElKader Seif El Islem RAHMANI - AI Researcher & Developer",
          description:
            "Portfolio of AbdElKader Seif El Islem RAHMANI - PhD Researcher, Deep Learning Engineer, and Full-Stack AI Innovator",
          isPartOf: {
            "@id": "https://aekrahmani.netlify.app/#website",
          },
          about: {
            "@id": "https://aekrahmani.netlify.app/#person",
          },
        },
        {
          "@type": "ProfessionalService",
          "@id": "https://aekrahmani.netlify.app/#service",
          name: "AI Development and Consulting Services",
          description:
            "Specialized AI and development services including AI Agent Development, Deep Learning Solutions, Computer Vision Systems, NLP & Chatbot Development, Full-Stack AI Applications, and AI Research Consulting.",
          provider: {
            "@id": "https://aekrahmani.netlify.app/#person",
          },
          serviceType: [
            "AI Agent Development",
            "Deep Learning Solutions",
            "Computer Vision Systems",
            "NLP & Chatbot Development",
            "Full-Stack AI Applications",
            "AI Research Consulting",
          ],
          areaServed: "Worldwide",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "AI Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "AI Agent Development",
                  description:
                    "Custom AI agents built with LangChain, RAG, and MoE approaches for specialized tasks and domain-specific applications.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Deep Learning Solutions",
                  description:
                    "End-to-end deep learning systems from data preparation to model deployment, optimized for performance and accuracy.",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Computer Vision Systems",
                  description:
                    "Advanced computer vision applications including object detection, image classification, and real-time video analysis.",
                },
              },
            ],
          },
        },
      ],
    }
  
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
  }
  