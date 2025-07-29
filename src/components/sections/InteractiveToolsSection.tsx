'use client';

import { MapIcon, CalculatorIcon, SignalIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import SectionContainer from '@/components/ui/SectionContainer';
import SectionHeader from '@/components/ui/SectionHeader';
import ToolGrid from '@/components/ui/ToolGrid';
import FeaturedTool from '@/components/ui/FeaturedTool';

export default function InteractiveToolsSection() {
  const tools = [
    {
      icon: MapIcon,
      title: "Coverage Checker",
      description: "Check 5G coverage and network strength",
      link: "/tools/coverage"
    },
    {
      icon: CalculatorIcon,
      title: "Plan Calculator",
      description: "Find the perfect plan based on your usage patterns",
      link: "/tools/calculator"
    },
    {
      icon: SignalIcon,
      title: "Speed Test",
      description: "Test your current connection speed and performance",
      link: "/tools/speed-test"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Phone Finder",
      description: "Discover the perfect phone for your needs and budget",
      link: "/tools/phone-finder"
    }
  ];

  const optimizerFeatures = [
    {
      title: "Personalized Analysis",
      description: "Based on your actual usage"
    },
    {
      title: "Smart Recommendations",
      description: "AI-powered plan suggestions"
    },
    {
      title: "Potential Savings",
      description: "See how much you could save"
    }
  ];

  return (
    <SectionContainer>
      <SectionHeader
        title="Interactive Tools"
        description="Make informed decisions with our suite of interactive tools designed to help you get the most from your mobile service."
        centered
        className="mb-16"
      />

      <ToolGrid tools={tools} />

      <FeaturedTool
        title="Try Our Plan Optimizer"
        description="Answer a few questions about your usage and let our AI recommend the perfect plan for you. Save up to 30% on your monthly bill!"
        buttonText="Start Optimization"
        buttonHref="/tools/plan-optimizer"
        features={optimizerFeatures}
        className="mt-16"
      />
    </SectionContainer>
  );
} 