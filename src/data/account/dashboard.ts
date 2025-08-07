export type AccountSectionId = 'profile' | 'orders' | 'payment' | 'saved';

export const dashboardConfig = {
  title: 'Account Dashboard',
  description: 'Manage your CitiSignal account settings and preferences',
  sections: {
    profile: {
      title: 'Account & Preferences',
      description: 'Manage your profile, addresses, and account settings',
      features: [
        'Personal information',
        'Contact preferences',
        'Shipping addresses',
        'Communication settings'
      ]
    },
    orders: {
      title: 'Orders & Subscriptions',
      description: 'View orders, track shipments, and manage your plans',
      features: [
        'Order history',
        'Track shipments',
        'Active plans',
        'Service subscriptions'
      ]
    },
    payment: {
      title: 'Payment Methods',
      description: 'Manage payment options and billing preferences',
      features: [
        'Saved cards',
        'Payment preferences',
        'Billing history',
        'Auto-pay settings'
      ]
    },
    saved: {
      title: 'Saved Items',
      description: 'Access your wishlist, saved plans, and recent views',
      features: [
        'Wishlist',
        'Saved plans',
        'Recently viewed',
        'Saved searches'
      ]
    }
  }
} as const;