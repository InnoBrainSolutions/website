import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Big Data Pipelines & Cloud Analytics | InnoBrain Solutions",
  description:
    "Real-time big data streaming, cloud data warehousing, ETL pipelines, vector databases, and enterprise analytics dashboards.",
  alternates: {
    canonical: "https://innobrain.in/solutions/data",
  },
  keywords: [
    "Big Data Engineering",
    "Real-Time ETL Pipelines",
    "Cloud Data Warehousing",
    "Vector Databases RAG",
    "InnoBrain Data Solutions",
  ],
  openGraph: {
    title: "Big Data Pipelines & Cloud Analytics | InnoBrain",
    description:
      "Real-time big data streaming, cloud data warehousing, ETL pipelines, vector databases, and enterprise analytics dashboards.",
    url: "https://innobrain.in/solutions/data",
  },
};

export default function DataEngineeringPage() {
  return (
    <ComingSoonPage
      category="DATA ENGINEERING"
      title="Real-Time Data Pipelines & Analytics"
      description="Big data streaming, cloud data warehousing, ETL pipelines, and business intelligence dashboards."
      expectedLaunch="Q3 2026"
    />
  );
}
