import { DevicePhoneMobileIcon as PhoneIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import type { BuyingGuide } from '@/types/phones';

export const buyingGuides: BuyingGuide[] = [
  {
    icon: PhoneIcon,
    title: 'How to Choose Your Perfect Phone',
    description: 'From screen size to battery life, learn what features matter most for your needs.',
    href: '/guides/choosing-phone'
  },
  {
    icon: CreditCardIcon,
    title: 'Understanding Phone Financing',
    description: 'Compare payment plans, trade-in options, and find the best way to finance your new phone.',
    href: '/guides/phone-financing'
  }
]; 