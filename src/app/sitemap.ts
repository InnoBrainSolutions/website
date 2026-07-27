import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://innobrain.in";
  const routes = [
    "",
    "/solutions",
    "/solutions/ai",
    "/solutions/software",
    "/solutions/cloud",
    "/solutions/cybersecurity",
    "/solutions/automation",
    "/solutions/data",
    "/industries",
    "/industries/healthcare",
    "/industries/fintech",
    "/industries/retail",
    "/industries/manufacturing",
    "/industries/startups",
    "/work",
    "/work/projects",
    "/work/cases",
    "/work/testimonials",
    "/insights",
    "/insights/blog",
    "/insights/research",
    "/insights/docs",
    "/company",
    "/company/about",
    "/company/vision",
    "/company/careers",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
