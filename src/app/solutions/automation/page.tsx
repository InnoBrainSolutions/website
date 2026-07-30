import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Intelligent Workflow Automation & Cloud DevOps Services | Inno Brains",
  description:
    "Eliminate manual operational bottlenecks with custom n8n automation, serverless cloud pipelines, and enterprise DevOps engineering.",
  alternates: {
    canonical: "https://innobrainitservices.com/solutions/automation",
  },
  keywords: [
    "Workflow Automation Services",
    "n8n Automation Engineering",
    "Intelligent Process Automation",
    "Autonomous Business Agents",
    "Cloud DevOps Services",
    "Inno Brains Automation",
  ],
  openGraph: {
    title: "Intelligent Workflow Automation & Cloud DevOps Services | Inno Brains",
    description:
      "Eliminate manual operational bottlenecks with custom n8n automation, serverless cloud pipelines, and enterprise DevOps engineering.",
    url: "https://innobrainitservices.com/solutions/automation",
  },
};

export default function AutomationPage() {
  return (
    <ComingSoonPage
      category="WORKFLOW AUTOMATION"
      title="RPA & Autonomous Agent Workflows"
      description="Intelligent process automation, robotic workflow orchestration, and API automation systems."
      expectedLaunch="Q3 2026"
    />
  );
}
