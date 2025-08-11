import React from 'react';

export interface AccountMenuItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  requiresAuth?: boolean;
}

// Account navigation menu items
export const accountMenuItems: readonly AccountMenuItem[] = [
  { 
    id: 'profile', 
    label: 'Profile', 
    href: '/account/profile',
    description: 'Manage your personal information and preferences',
    requiresAuth: true
  },
  { 
    id: 'orders', 
    label: 'Orders', 
    href: '/account/orders',
    description: 'View your order history and track shipments',
    requiresAuth: true
  },
  { 
    id: 'wishlist', 
    label: 'Wishlist', 
    href: '/account/wishlist',
    description: 'Save items for later purchase',
    requiresAuth: true
  }
] as const;

// Authentication-related configuration
export const authConfig = {
  loginRedirect: '/account/dashboard',
  logoutRedirect: '/',
  protectedRoutes: ['/account', '/checkout']
} as const;