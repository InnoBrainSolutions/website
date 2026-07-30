import { MetadataRoute } from "next";

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://innobrainitservices.com";
  const defaultDate = new Date("2026-07-30T10:00:00Z");

  const sitemapEntries: SitemapEntry[] = [
    // 1. Homepage (Priority 1.0)
    {
      url: "",
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: new Date("2026-07-30T12:00:00Z"),
    },

    // 2. Solutions (Priority 0.9)
    { url: "/solutions", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-29T15:30:00Z") },
    { url: "/solutions/ai", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-28T14:20:00Z") },
    { url: "/solutions/software", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-28T11:00:00Z") },
    { url: "/solutions/cloud", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-27T09:45:00Z") },
    { url: "/solutions/cybersecurity", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-26T16:15:00Z") },
    { url: "/solutions/automation", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-25T10:30:00Z") },
    { url: "/solutions/data", priority: 0.9, changeFrequency: "weekly", lastModified: new Date("2026-07-25T08:00:00Z") },

    // 3. Industries (Priority 0.8)
    { url: "/industries", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-29T10:00:00Z") },
    { url: "/industries/healthcare", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-27T13:40:00Z") },
    { url: "/industries/fintech", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-27T11:15:00Z") },
    { url: "/industries/retail", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-26T14:50:00Z") },
    { url: "/industries/manufacturing", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-25T09:20:00Z") },
    { url: "/industries/startups", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-24T17:00:00Z") },

    // 4. Work & Case Studies (Priority 0.8 Main / 0.6 Individual)
    { url: "/work", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-29T16:00:00Z") },
    { url: "/work/projects", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-28T10:30:00Z") },
    { url: "/work/cases", priority: 0.8, changeFrequency: "weekly", lastModified: new Date("2026-07-28T09:15:00Z") },
    { url: "/work/testimonials", priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-07-20T12:00:00Z") },
    { url: "/work/cases/fintech-cloud-migration", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-22T14:10:00Z") },
    { url: "/work/cases/healthcare-ai", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-21T11:45:00Z") },
    { url: "/work/cases/ecommerce-scaling", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-19T08:30:00Z") },

    // 5. Insights & Blogs (Priority 0.7 Main / 0.6 Individual)
    { url: "/insights", priority: 0.7, changeFrequency: "daily", lastModified: new Date("2026-07-30T09:00:00Z") },
    { url: "/insights/blog", priority: 0.7, changeFrequency: "daily", lastModified: new Date("2026-07-30T08:30:00Z") },
    { url: "/insights/research", priority: 0.7, changeFrequency: "weekly", lastModified: new Date("2026-07-27T15:00:00Z") },
    { url: "/insights/docs", priority: 0.7, changeFrequency: "weekly", lastModified: new Date("2026-07-26T12:00:00Z") },
    { url: "/insights/blog/ai-trends-2026", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-28T18:22:10Z") },
    { url: "/insights/blog/cloud-security", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-25T14:15:00Z") },
    { url: "/insights/blog/enterprise-ai-transformation", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-20T10:00:00Z") },
    { url: "/insights/docs/rest-api", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-24T11:00:00Z") },
    { url: "/insights/docs/ai-sdk", priority: 0.6, changeFrequency: "monthly", lastModified: new Date("2026-07-23T16:45:00Z") },

    // 6. Company & Contact Pages
    { url: "/company", priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-07-20T10:00:00Z") },
    { url: "/company/about", priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-07-20T10:00:00Z") },
    { url: "/company/vision", priority: 0.7, changeFrequency: "monthly", lastModified: new Date("2026-07-15T09:00:00Z") },
    { url: "/company/careers", priority: 0.6, changeFrequency: "weekly", lastModified: new Date("2026-07-29T14:00:00Z") },
    { url: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: new Date("2026-07-28T08:00:00Z") },
  ];

  return sitemapEntries.map((entry) => ({
    url: `${baseUrl}${entry.url}`,
    lastModified: entry.lastModified || defaultDate,
    changeFrequency: entry.changeFrequency || "weekly",
    priority: entry.priority !== undefined ? entry.priority : 0.7,
  }));
}

