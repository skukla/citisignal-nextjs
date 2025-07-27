import { FilterSection } from '@/types/filters';

export const accessoryFilters: FilterSection[] = [
  {
    title: 'Category',
    key: 'subcategory',
    options: [],  // Will be populated from accessoryFilterOptions.manufacturer
    type: 'checkbox'
  },
  {
    title: 'Brand',
    key: 'brand',
    options: [],  // Will be populated from accessoryFilterOptions.manufacturer
    type: 'checkbox'
  },
  {
    title: 'Price Range',
    key: 'price',
    options: [],  // Will be populated from accessoryFilterOptions.price
    type: 'checkbox'
  },
  {
    title: 'Compatibility',
    key: 'compatibility',
    options: [],  // Will be populated from accessoryFilterOptions.compatibility
    type: 'checkbox'
  }
];

export const giftCardFilters: FilterSection[] = [
  {
    title: 'Card Type',
    key: 'type',
    options: [],  // Will be populated from giftCardFilterOptions.type
    type: 'checkbox'
  },
  {
    title: 'Amount',
    key: 'amount',
    options: [],  // Will be populated from giftCardFilterOptions.amount
    type: 'checkbox'
  },
  {
    title: 'Delivery',
    key: 'delivery_time',
    options: [],  // Will be populated from giftCardFilterOptions.delivery_time
    type: 'checkbox'
  }
];

export const internetFilters: FilterSection[] = [
  {
    title: 'Connection Type',
    key: 'type',
    options: [],  // Will be populated from internetDealsFilterOptions.type
    type: 'checkbox'
  },
  {
    title: 'Speed Range',
    key: 'speed',
    options: [],  // Will be populated from internetDealsFilterOptions.speed
    type: 'checkbox'
  },
  {
    title: 'Price Range',
    key: 'price',
    options: [],  // Will be populated from internetDealsFilterOptions.price
    type: 'checkbox'
  },
  {
    title: 'Contract Length',
    key: 'contractLength',
    options: [],  // Will be populated from internetDealsFilterOptions.contract_length
    type: 'checkbox'
  },
  {
    title: 'Features',
    key: 'features',
    options: [],  // Will be populated from internetDealsFilterOptions.features
    type: 'checkbox'
  }
];

export const streamingFilters: FilterSection[] = [
  {
    title: 'Provider',
    key: 'provider',
    options: [],  // Will be populated from streamingFilterOptions.provider
    type: 'checkbox'
  },
  {
    title: 'Price Range',
    key: 'price',
    options: [],  // Will be populated from streamingFilterOptions.price
    type: 'checkbox'
  },
  {
    title: 'Content Type',
    key: 'contentType',
    options: [],  // Will be populated from streamingFilterOptions.content_type
    type: 'checkbox'
  },
  {
    title: 'Video Quality',
    key: 'videoQuality',
    options: [],  // Will be populated from streamingFilterOptions.video_quality
    type: 'checkbox'
  },
  {
    title: 'Features',
    key: 'features',
    options: [],  // Will be populated from streamingFilterOptions.features
    type: 'checkbox'
  }
]; 