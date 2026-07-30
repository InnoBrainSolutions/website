import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://innobrainitservices.com"),
  alternates: {
    canonical: "https://innobrainitservices.com",
  },
  title: {
    default:
      "Inno Brains | Enterprise AI Development & Custom Software Engineering",
    template: "%s | Inno Brains Enterprise AI & Software",
  },
  description:
    "Inno Brains builds production-grade AI solutions, custom SaaS applications, and enterprise cloud software for startups and scaling organizations worldwide.",
  keywords: [
    "Inno Brains",
    "InnoBrain IT & AI Services",
    "Enterprise AI Development",
    "Generative AI Solutions",
    "Custom Software Engineering",
    "SaaS Application Development",
    "Next.js Enterprise Apps",
    "Cloud Automation & n8n Workflows",
    "AI Agents & RAG Pipelines",
    "IT Services Indore",
    "Software Engineering Company India",
  ],
  authors: [{ name: "Inno Brains" }],
  creator: "Inno Brains",
  publisher: "Inno Brains",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://innobrainitservices.com",
    siteName: "Inno Brains Enterprise AI & Software",
    title:
      "Inno Brains | Enterprise AI Development & Custom Software Engineering",
    description:
      "Engineered for Performance. Scaled for Impact. We build production-grade AI systems, custom SaaS platforms, and enterprise cloud software.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inno Brains - Enterprise AI Development & Custom Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Inno Brains | Enterprise AI Development & Custom Software Engineering",
    description:
      "Production-grade AI solutions, custom SaaS applications, and enterprise cloud software built for zero-downtime scale.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Local Business & Professional IT Service JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://innobrainitservices.com/#organization",
        name: "InnoBrain IT & AI Services Private Limited",
        legalName: "InnoBrain IT & AI Services Private Limited",
        url: "https://innobrainitservices.com",
        logo: "https://innobrainitservices.com/logo.png",
        image: "https://innobrainitservices.com/og-image.png",
        description:
          "INNOBRAIN IT & AI Services Private Limited is a forward-thinking technology company delivering innovative IT solutions and AI-driven services in Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010. Our mission is to help businesses accelerate digital transformation through intelligent, scalable, and reliable technology solutions that drive growth, efficiency, and innovation.",
        category: "Computer support and services",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Vijay Nagar, Scheme No 54",
          addressLocality: "Indore",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
          postalCode: "452010",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 22.7533,
          longitude: 75.8937,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Indore",
          },
          {
            "@type": "State",
            name: "Madhya Pradesh",
          },
          {
            "@type": "Country",
            name: "India",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT & AI Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Computer Support and Services",
                description: "Enterprise IT support, hardware and network maintenance, infrastructure management.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI & Machine Learning Development",
                description: "Custom LLM fine-tuning, computer vision, automated agents, predictive analytics.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Software Engineering & Cloud Architecture",
                description: "Full-stack web & mobile development, AWS/Azure cloud migration, DevOps automation.",
              },
            },
          ],
        },
        sameAs: [
          "https://linkedin.com/company/innobrain",
          "https://twitter.com/innobrain",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["English", "Hindi"],
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-screen bg-deep-space text-foreground antialiased noise-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
