// ... existing Account types ...

export type DashboardSectionId = 'profile' | 'orders' | 'addresses' | 'payment' | 'wishlists' | 'rewards';

export interface DashboardSection {
  title: string;
  description: string;
}
