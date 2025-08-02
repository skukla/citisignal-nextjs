import { ShieldCheckIcon, SignalIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import type { ElementType } from 'react';

/**
 * Why CitiSignal Section Data
 * Content for the company value proposition section
 */

export interface Benefit {
  icon: ElementType;
  title: string;
  description: string;
}

export interface WhyCitiSignalContent {
  header: {
    title: string;
    description: string;
  };
  benefits: Benefit[];
}

export const whyCitiSignalContent: WhyCitiSignalContent = {
  header: {
    title: "Why Choose CitiSignal",
    description: "Experience the difference with our industry-leading service"
  },
  benefits: [
    {
      icon: SignalIcon,
      title: "Superior Coverage",
      description: "Nationwide 5G network with 99% population coverage and growing"
    },
    {
      icon: ShieldCheckIcon,
      title: "Reliable Security",
      description: "Advanced network security and data protection for peace of mind"
    },
    {
      icon: CurrencyDollarIcon,
      title: "Competitive Pricing",
      description: "Flexible plans and transparent pricing to fit your budget"
    },
    {
      icon: UserGroupIcon,
      title: "24/7 Support",
      description: "Expert customer service available around the clock"
    }
  ]
};