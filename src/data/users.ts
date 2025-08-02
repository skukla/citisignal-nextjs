import type { UserProfile } from '@/components/ui/Account/Account.types';

export const demoUser: UserProfile = {
  id: 'demo-1',
  name: 'Demo User',
  email: 'demo@example.com'
} as const;