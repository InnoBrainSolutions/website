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
    default: "InnoBrain IT & AI Services | Engineering Intelligence. Building Tomorrow.",
    template: "%s | InnoBrain",
  },
  description:
    "InnoBrain IT & AI Services Private Limited — Where Intelligence Meets Innovation. AI Solutions, Software Engineering, Cloud, Automation & Enterprise Innovation.",
  keywords: [
    "AI Services",
    "Software Engineering",
    "Cloud Engineering",
    "Machine Learning",
    "DevOps",
    "Automation",
    "InnoBrain",
    "Enterprise Innovation",
    "Cyber Security",
    "Web Development",
    "Mobile Development",
  ],
  authors: [{ name: "InnoBrain IT & AI Services Private Limited" }],
  creator: "InnoBrain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://innobrain.in",
    siteName: "InnoBrain",
    title: "InnoBrain IT & AI Services | Engineering Intelligence. Building Tomorrow.",
    description:
      "Where Intelligence Meets Innovation. AI Solutions, Software Engineering, Cloud, Automation & Enterprise Innovation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InnoBrain IT & AI Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InnoBrain IT & AI Services",
    description: "Where Intelligence Meets Innovation.",
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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "InnoBrain IT & AI Services Private Limited",
              url: "https://innobrain.in",
              logo: "https://innobrain.in/logo.png",
              description:
                "Where Intelligence Meets Innovation. AI Solutions, Software Engineering, Cloud, Automation & Enterprise Innovation.",
              sameAs: [
                "https://linkedin.com/company/innobrain",
                "https://twitter.com/innobrain",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-deep-space text-foreground antialiased noise-overlay">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
