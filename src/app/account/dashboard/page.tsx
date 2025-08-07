'use client';

import { AccountDashboard } from '@/components/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import { useAccountNavigation } from '@/components/layout/Account/useAccountNavigation';
import { dashboardConfig } from '@/data/account/dashboard';
import Link from 'next/link';

export default function DashboardPage() {
  const { navigation } = useAccountNavigation();

  return (
    <AccountDashboard>
      <AccountSection
        title={dashboardConfig.title}
        description={dashboardConfig.description}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 max-w-4xl">
          {navigation.map((item) => {
            const Icon = item.icon;
            const sectionConfig = dashboardConfig.sections[item.id];
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col p-6 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center mb-4">
                  <Icon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {item.label}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {sectionConfig.description}
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mt-auto">
                  {sectionConfig.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}