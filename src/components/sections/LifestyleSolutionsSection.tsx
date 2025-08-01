'use client';

import { BriefcaseIcon, HomeIcon, RocketLaunchIcon, HeartIcon } from '@heroicons/react/24/outline';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import SolutionGrid from '@/components/ui/SolutionGrid';
import Link from '@/components/ui/Link';

export default function LifestyleSolutionsSection() {
  const solutions = [
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
  ];

  return (
    <Section background="bg-gray-50">
      <SectionHeader
        title="Solutions for Every Lifestyle"
        description="Discover tailored mobile solutions designed to fit your unique lifestyle and needs."
        centered
        className="mb-16"
      />

      <SolutionGrid solutions={solutions} />

      <div className="mt-16 text-center">
        <Link
          href="/solutions"
          variant="button"
          buttonStyle="primary"
          className="px-8 py-4 text-lg"
        >
          Find Your Perfect Solution
        </Link>
      </div>
    </Section>
  );
} 