import type { DashboardSectionId, DashboardSection } from '@/components/layout/Account/Account.types';

export const dashboardConfig = {
  title: 'Account Dashboard',
  description: 'Manage your account settings and preferences.',
  sections: {
    profile: {
      title: 'Profile',
      description: 'Manage your personal information and preferences.'
    },
    orders: {
      title: 'Orders',
      description: 'Track your orders and view order history.'
    },
    addresses: {
      title: 'Addresses',
      description: 'Manage your shipping and billing addresses.'
    },
    payment: {
      title: 'Payment Methods',
      description: 'Manage your saved payment methods securely.'
    },
    wishlists: {
      title: 'Wishlists',
      description: 'Keep track of items you want to purchase later.'
    },
    rewards: {
      title: 'Rewards',
      description: 'Redeem gift cards and manage your rewards.'
    }
  } satisfies Record<DashboardSectionId, DashboardSection>
};