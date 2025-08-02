import { MapIcon, CalculatorIcon, SignalIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import type { ElementType } from 'react';

/**
 * Interactive Tools Section Data
 * Content for the interactive tools and utilities section
 */

export interface Tool {
  icon: ElementType;
  title: string;
  description: string;
  link: string;
}

export interface OptimizerFeature {
  title: string;
  description: string;
}

export interface InteractiveToolsContent {
  header: {
    title: string;
    description: string;
  };
  tools: Tool[];
  optimizer: {
    title: string;
    description: string;
    features: OptimizerFeature[];
    buttonText: string;
    buttonLink: string;
  };
}

export const interactiveToolsContent: InteractiveToolsContent = {
  header: {
    title: "Interactive Tools & Resources",
    description: "Explore our suite of interactive tools designed to help you make informed decisions and optimize your mobile experience."
  },
  tools: [
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
  ],
  optimizer: {
    title: "Plan Optimizer",
    description: "Get personalized recommendations and find the perfect plan for your needs",
    features: [
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
    ],
    buttonText: "Optimize My Plan",
    buttonLink: "/tools/optimizer"
  }
};