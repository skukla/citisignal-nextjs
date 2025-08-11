import { MapPinIcon } from '@heroicons/react/24/outline';
import type { CoverageContent } from '@/types/section';

export const coverageContent: CoverageContent = {
  header: {
    title: "Network Coverage",
    description: "Experience our nationwide 5G network coverage"
  },
  coverageStats: [
    { label: 'Population Coverage', value: 99 },
    { label: 'Geographic Coverage', value: 92 }
  ],
  networkStats: [
    { icon: MapPinIcon, text: '450,000+ Cell Towers' },
    { icon: MapPinIcon, text: '98% 4G LTE Coverage' },
    { icon: MapPinIcon, text: 'Expanding 5G Ultra Capacity' }
  ]
};