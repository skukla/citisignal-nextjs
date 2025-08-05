'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import Card from './Card';
import type { HeroIcon } from '@/types/hero-icons';

interface SolutionCardProps {
  icon: HeroIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  className?: string;
}

/**
 * A card component for displaying solution information with features list.
 * 
 * @example
 * ```tsx
 * <SolutionCard 
 *   icon={PhoneIcon}
 *   title="Mobile Plans"
 *   description="Flexible plans for every need"
 *   features={["Unlimited calls", "5G network"]}
 *   href="/plans"
 * />
 * ```
 */
export default function SolutionCard({
  icon: Icon,
  title,
  description,
  features,
  href,
  className
}: SolutionCardProps) {
  return (
    <Card 
      as={Link}
      href={href}
      interactive
      className={twMerge('p-6 h-full group shadow-sm hover:shadow-md transition-shadow', className)}
    >
      <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-6">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 mb-4">
        {description}
      </p>

      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <svg 
              className="w-4 h-4 mr-2 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
} 