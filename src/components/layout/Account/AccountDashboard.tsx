'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { useAccountNavigation } from './useAccountNavigation';

interface AccountDashboardProps {
  children: ReactNode;
}

export function AccountDashboard({ children }: AccountDashboardProps) {
  const { navigation, isActive } = useAccountNavigation();

  return (
    <div className="min-h-[calc(100vh-16rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:w-60 flex-shrink-0">
          <nav className="sticky top-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={twMerge(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md border transition-shadow',
                    active
                      ? 'bg-white text-purple-700 shadow-sm border-gray-200'
                      : 'text-gray-700 hover:bg-white hover:text-purple-700 hover:shadow-sm border-transparent hover:border-gray-200'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon
                    className={twMerge(
                      'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                      active
                        ? 'text-purple-700'
                        : 'text-gray-400 group-hover:text-purple-700'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}