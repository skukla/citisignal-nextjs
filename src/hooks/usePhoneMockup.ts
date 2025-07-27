import { ThemeSize } from '@/types/theme';

interface PhoneMockupSizes {
  container: string;
  screen: string;
  title: string;
  subtitle: string;
  bar: string;
}

const SIZES: Record<ThemeSize, PhoneMockupSizes> = {
  sm: {
    container: 'w-36',
    screen: 'h-64',
    title: 'text-2xl',
    subtitle: 'text-xs',
    bar: 'w-1.5 h-full'
  },
  md: {
    container: 'w-48',
    screen: 'h-80',
    title: 'text-3xl',
    subtitle: 'text-sm',
    bar: 'w-2 h-full'
  },
  lg: {
    container: 'w-56',
    screen: 'h-96',
    title: 'text-4xl',
    subtitle: 'text-base',
    bar: 'w-2.5 h-full'
  }
};

export function usePhoneMockup(size: ThemeSize = 'md') {
  return {
    sizes: SIZES[size]
  };
} 