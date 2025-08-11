import { BriefcaseIcon, HomeIcon, RocketLaunchIcon, HeartIcon } from '@heroicons/react/24/outline';
import type { HeroIcon } from '@/types/hero-icons';

/**
 * Lifestyle Solutions Section Data
 * Content for the lifestyle-based solution offerings
 */

export interface Solution {
  icon: HeroIcon;
  title: string;
  description: string;
  features: string[];
  link: string;
}

export interface LifestyleSolutionsContent {
  header: {
    title: string;
    description: string;
  };
  solutions: Solution[];
}

export const lifestyleSolutionsContent: LifestyleSolutionsContent = {
  header: {
    title: "Solutions for Every Lifestyle",
    description: "Find the perfect mobile plan designed specifically for your lifestyle and needs."
  },
  solutions: [
    {
      icon: BriefcaseIcon,
      title: "Business Pro",
      description: "Stay connected with reliable service for remote work and business travel.",
      features: ["Unlimited 5G", "Mobile Hotspot", "International Roaming"],
      link: "/solutions/business"
    },
    {
      icon: HomeIcon,
      title: "Family Connect",
      description: "Keep the whole family connected with shared data and parental controls.",
      features: ["Family Location", "Content Filters", "Usage Alerts"],
      link: "/solutions/family"
    },
    {
      icon: RocketLaunchIcon,
      title: "Student Essential",
      description: "Perfect for students with streaming, studying, and staying in touch.",
      features: ["Student Discount", "Unlimited Data", "Free Streaming"],
      link: "/solutions/student"
    },
    {
      icon: HeartIcon,
      title: "Senior Friendly",
      description: "Simple plans with large text and easy-to-use features for seniors.",
      features: ["24/7 Support", "Simple Interface", "Health Features"],
      link: "/solutions/senior"
    }
  ]
};