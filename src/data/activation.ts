import { PhoneIcon, WifiIcon, CheckCircleIcon, CogIcon } from '@heroicons/react/24/outline';
import type { HeroIcon } from '@/types/hero-icons';

interface ActivationStep {
  icon: HeroIcon;
  title: string;
  description: string;
  details: string[];
}

interface Feature {
  text: string;
  icon: HeroIcon;
}

export const activationSteps: ActivationStep[] = [
  {
    icon: PhoneIcon,
    title: 'Choose Your Device',
    description: 'Select from our wide range of smartphones, tablets, and watches.',
    details: ['Latest iPhone and Android models', 'Certified refurbished options', 'Trade-in credit available']
  },
  {
    icon: WifiIcon,
    title: 'Select Your Plan',
    description: 'Pick the perfect plan for your lifestyle and budget.',
    details: ['Unlimited data options', 'Family plan discounts', 'No hidden fees or contracts']
  },
  {
    icon: CogIcon,
    title: 'Easy Setup',
    description: 'Get your device activated and ready to use in minutes.',
    details: ['Online activation', 'In-store assistance', 'Phone number transfer']
  },
  {
    icon: CheckCircleIcon,
    title: 'Start Using',
    description: 'Enjoy your new device with CitiSignal\'s reliable network.',
    details: ['24/7 customer support', 'Network optimization', 'Mobile app included']
  }
] as const;

export const activationFeatures: Feature[] = [
  { text: 'Free activation and setup', icon: CheckCircleIcon },
  { text: 'Keep your current phone number', icon: CheckCircleIcon },
  { text: '30-day satisfaction guarantee', icon: CheckCircleIcon }
] as const; 