'use client';

import { SignalIcon, ShieldCheckIcon, CurrencyDollarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import type { HeroIcon } from '@/types/hero-icons';

interface Feature {
  icon: HeroIcon;
  title: string;
  description: string;
}

export const whyCitiSignalFeatures: Feature[] = [
  {
    icon: SignalIcon,
    title: 'Superior Coverage',
    description: 'Nationwide 5G network with 99% population coverage and growing'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Reliable Security',
    description: 'Advanced network security and data protection for peace of mind'
  },
  {
    icon: CurrencyDollarIcon,
    title: 'Competitive Pricing',
    description: 'Flexible plans and transparent pricing to fit your budget'
  },
  {
    icon: UserGroupIcon,
    title: '24/7 Support',
    description: 'Expert customer service available around the clock'
  }
]; 