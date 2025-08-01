import type { UserProfile } from '@/features/account/types/account.types';

export const demoUser: UserProfile = {
  id: 'demo-1',
  name: 'Demo User',
  email: 'demo@example.com'
} as const;