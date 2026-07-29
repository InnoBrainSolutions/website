import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Intelligent Process & RPA Automation | InnoBrain Solutions",
  description:
    "Robotic process automation (RPA), autonomous agent orchestration, workflow efficiency, and seamless enterprise API automation systems.",
  alternates: {
    canonical: "https://innobrain.in/solutions/automation",
  },
  keywords: [
    "RPA Workflow Automation",
    "Intelligent Process Automation",
    "Autonomous Business Agents",
    "Enterprise API Orchestration",
    "InnoBrain Automation",
  ],
  openGraph: {
    title: "Intelligent Process & RPA Automation | InnoBrain",
    description:
      "Robotic process automation (RPA), autonomous agent orchestration, workflow efficiency, and enterprise API automation systems.",
    url: "https://innobrain.in/solutions/automation",
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
