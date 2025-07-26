import { MapIcon, CalculatorIcon, SignalIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import type { HeroIcon } from '@/types/hero-icons';

interface Tool {
  icon: HeroIcon;
  title: string;
  description: string;
  link: string;
}

interface OptimizerFeature {
  title: string;
  description: string;
}

export const interactiveTools: Tool[] = [
  {
    icon: MapIcon,
    title: "Coverage Checker",
    description: "Check 5G coverage and network strength at your location",
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
] as const;

export const optimizerFeatures: OptimizerFeature[] = [
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
] as const; 