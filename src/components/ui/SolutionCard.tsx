'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import type { HeroIcon } from '@/types/hero-icons';

interface SolutionCardProps {
  icon: HeroIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  className?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
  featureIconColor?: string;
  featureTextColor?: string;
}

export default function SolutionCard({
  icon: Icon,
  title,
  description,
  features,
  href,
  className,
  iconClassName,
  iconContainerClassName,
  featureIconColor = 'text-green-500',
  featureTextColor = 'text-gray-600'
}: SolutionCardProps) {
  return (
    <Link href={href}>
      <div className={twMerge(
        'bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer h-full',
        className
      )}>
        <div className={twMerge(
          'w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-6',
          iconContainerClassName
        )}>
          <Icon className={twMerge(
            'w-6 h-6 text-purple-600',
            iconClassName
          )} />
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
                className={twMerge('w-4 h-4 mr-2', featureIconColor)} 
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
              <span className={featureTextColor}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
} 