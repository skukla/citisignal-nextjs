import { FilterOption } from '@/types/filters';
import { colorOptions } from '@/types/commerce';

export const commonPriceRanges: Record<string, FilterOption[]> = {
  accessories: [
    { id: 'under-25', name: 'Under $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: 'over-100', name: 'Over $100' }
  ],
  streaming: [
    { id: 'under-10', name: 'Under $10' },
    { id: '10-15', name: '$10 - $15' },
    { id: 'over-15', name: 'Over $15' }
  ],
  plans: [
    { id: 'under-40', name: 'Under $40' },
    { id: '40-60', name: '$40 - $60' },
    { id: '60-80', name: '$60 - $80' },
    { id: 'over-80', name: 'Over $80' }
  ]
};

export const commonManufacturers: FilterOption[] = [
  { id: 'apple', name: 'Apple' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'citisignal', name: 'CitiSignal' }
];

export const commonFeatures: Record<string, FilterOption[]> = {
  phones: [
    { id: '5g', name: '5G' },
    { id: 'wireless-charging', name: 'Wireless Charging' },
    { id: 'face-id', name: 'Face ID' },
    { id: 'fingerprint', name: 'Fingerprint Sensor' }
  ],
  watches: [
    { id: 'gps', name: 'GPS' },
    { id: 'cellular', name: 'Cellular' },
    { id: 'heart-rate', name: 'Heart Rate Monitor' },
    { id: 'ecg', name: 'ECG' }
  ],
  plans: [
    { id: 'unlimited-data', name: 'Unlimited Data' },
    { id: 'hotspot', name: 'Mobile Hotspot' },
    { id: 'international', name: 'International' },
    { id: '5g-access', name: '5G Access' }
  ]
};

export const colorFilters: FilterOption[] = colorOptions.map(color => ({
  id: color.id,
  name: color.name
})); 