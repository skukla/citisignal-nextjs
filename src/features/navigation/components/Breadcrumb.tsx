'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { useNavigation } from '../hooks/useNavigation';
import type { BreadcrumbProps } from '../types/breadcrumb.types';
import type { FC } from 'react';

export const Breadcrumb: FC<BreadcrumbProps> = ({ items, className, showHome = true }) => {
  const { isActive } = useNavigation();

  return (
    <nav className={twMerge('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {/* Home Link */}
        {showHome && (
          <li>
            <Link 
              href="/"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <HomeIcon className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
        )}

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            {index < items.length - 1 ? (
              <Link
                href={item.href}
                className={twMerge(
                  'text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium',
                  isActive(item.href) && 'text-gray-900'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 text-sm font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;