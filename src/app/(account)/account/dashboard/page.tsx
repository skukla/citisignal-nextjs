'use client';

import Link from 'next/link';
import { AccountPage, AccountPageProvider, useAccountPage } from '@/components/layout/AccountPage';
import { dashboardConfig } from '@/data/route-groups/account/dashboard';
import type { DashboardSectionId } from '@/components/ui/layout/Account/Account.types';

export default function DashboardPage() {
  const pageData = {
    title: dashboardConfig.title,
    description: dashboardConfig.description
  };

  return (
    <AccountPageProvider pageData={pageData}>
      <AccountPage.Root>
        <AccountPage.Layout>
          <AccountPage.Navigation />
          
          <AccountPage.Main>
            <AccountPage.Section>
              <AccountPage.Header />
              <AccountPage.Content>
                <DashboardGrid />
              </AccountPage.Content>
            </AccountPage.Section>
          </AccountPage.Main>
        </AccountPage.Layout>
      </AccountPage.Root>
    </AccountPageProvider>
  );
}

function DashboardGrid() {
  const { navigation } = useAccountPage();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {navigation
        .filter(item => item.id !== 'dashboard')
        .map((item) => {
          const Icon = item.icon;
          const sectionConfig = dashboardConfig.sections[item.id as DashboardSectionId];
          
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
              <p className="text-sm text-gray-500">
                {sectionConfig.description}
              </p>
            </Link>
          );
        })}
    </div>
  );
}