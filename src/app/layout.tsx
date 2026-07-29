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
  metadataBase: new URL("https://innobrain.in"),
  alternates: {
    canonical: "https://innobrain.in",
  },
  title: {
    default:
      "InnoBrain IT & AI Services Private Limited | Computer Support & Services in Indore, Madhya Pradesh",
    template: "%s | InnoBrain IT & AI Services",
  },
  description:
    "INNOBRAIN IT & AI Services Private Limited is a forward-thinking technology company delivering innovative IT solutions and AI-driven services in Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010. Accelerating digital transformation through intelligent, scalable, and reliable technology solutions.",
  keywords: [
    "InnoBrain IT & AI Services Private Limited",
    "Computer support and services in Indore",
    "Computer support and services in Madhya Pradesh",
    "Vijay Nagar Scheme No 54 Indore IT Company",
    "IT Services Indore 452010",
    "AI Services Indore",
    "Software Development Indore",
    "Cloud Services Madhya Pradesh",
    "Enterprise IT Support Indore",
    "Cyber Security Indore",
    "Digital Transformation Solutions India",
    "InnoBrain",
    "InnoBrain Indore",
  ],
  authors: [{ name: "InnoBrain IT & AI Services Private Limited" }],
  creator: "InnoBrain IT & AI Services Private Limited",
  publisher: "InnoBrain IT & AI Services Private Limited",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://innobrain.in",
    siteName: "InnoBrain IT & AI Services Private Limited",
    title:
      "InnoBrain IT & AI Services Private Limited | Computer Support & Services in Indore, MP",
    description:
      "A forward-thinking technology company delivering innovative IT solutions and AI-driven services in Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InnoBrain IT & AI Services Private Limited - Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "InnoBrain IT & AI Services Private Limited | Computer Support & Services in Indore",
    description:
      "Delivering innovative IT solutions and AI-driven services in Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010.",
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
        "@id": "https://innobrain.in/#organization",
        name: "InnoBrain IT & AI Services Private Limited",
        legalName: "InnoBrain IT & AI Services Private Limited",
        url: "https://innobrain.in",
        logo: "https://innobrain.in/logo.png",
        image: "https://innobrain.in/og-image.png",
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
