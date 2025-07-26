import { MapPinIcon, SignalIcon, GlobeAmericasIcon } from '@heroicons/react/24/outline';
import type { HeroIcon } from '@/types/hero-icons';

interface CoverageStat {
  label: string;
  value: number;
}

interface NetworkStat {
  icon: HeroIcon;
  text: string;
}

export const coverageStats: CoverageStat[] = [
  { label: 'Population Coverage', value: 99 },
  { label: 'Geographic Coverage', value: 92 }
] as const;

export const networkStats: NetworkStat[] = [
  { icon: MapPinIcon, text: '450,000+ Cell Towers' },
  { icon: MapPinIcon, text: '98% 4G LTE Coverage' },
  { icon: MapPinIcon, text: 'Expanding 5G Ultra Capacity' }
] as const;

export const coverageIcon = SignalIcon;
export const networkIcon = GlobeAmericasIcon; 