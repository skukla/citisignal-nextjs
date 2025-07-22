export interface Watch {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  features: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  connectivity: string;
  batteryLife: string;
  waterResistant: string;
  compatibility: string[];
}

export const watches: Watch[] = [
  {
    id: 'apple-watch-series-9',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    price: 399,
    originalPrice: 449,
    rating: 4.8,
    reviews: 1850,
    image: '/watches/apple-watch-series-9.jpg',
    category: 'watches',
    sizes: ['41mm', '45mm'],
    colors: ['Pink', 'Midnight', 'Starlight', 'Silver', 'Product Red'],
    features: ['Double Tap Gesture', 'S9 Chip', 'Always-On Retina', 'Blood Oxygen'],
    inStock: true,
    isNew: true,
    isSale: true,
    connectivity: 'GPS + Cellular',
    batteryLife: '18 hours',
    waterResistant: '50 meters',
    compatibility: ['iPhone']
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    price: 799,
    rating: 4.9,
    reviews: 950,
    image: '/watches/apple-watch-ultra-2.jpg',
    category: 'watches',
    sizes: ['49mm'],
    colors: ['Natural', 'Blue', 'Orange'],
    features: ['Titanium Build', 'Action Button', 'Siren', 'Precision Finding'],
    inStock: true,
    isNew: true,
    isSale: false,
    connectivity: 'GPS + Cellular',
    batteryLife: '36 hours',
    waterResistant: '100 meters',
    compatibility: ['iPhone']
  },
  {
    id: 'samsung-galaxy-watch-6',
    name: 'Galaxy Watch 6',
    brand: 'Samsung',
    price: 329,
    originalPrice: 379,
    rating: 4.6,
    reviews: 1240,
    image: '/watches/galaxy-watch-6.jpg',
    category: 'watches',
    sizes: ['40mm', '44mm'],
    colors: ['Graphite', 'Silver', 'Gold'],
    features: ['Body Composition', 'Sleep Tracking', 'GPS', 'Samsung Pay'],
    inStock: true,
    isNew: false,
    isSale: true,
    connectivity: 'Bluetooth + WiFi',
    batteryLife: '40 hours',
    waterResistant: '50 meters',
    compatibility: ['Android', 'iPhone']
  },
  {
    id: 'samsung-galaxy-watch-6-classic',
    name: 'Galaxy Watch 6 Classic',
    brand: 'Samsung',
    price: 429,
    rating: 4.7,
    reviews: 780,
    image: '/watches/galaxy-watch-6-classic.jpg',
    category: 'watches',
    sizes: ['43mm', '47mm'],
    colors: ['Black', 'Silver'],
    features: ['Rotating Bezel', 'Premium Design', 'Advanced Health', 'Long Battery'],
    inStock: true,
    isNew: false,
    isSale: false,
    connectivity: 'Bluetooth + WiFi',
    batteryLife: '40 hours',
    waterResistant: '50 meters',
    compatibility: ['Android', 'iPhone']
  },
  {
    id: 'fitbit-sense-2',
    name: 'Fitbit Sense 2',
    brand: 'Fitbit',
    price: 249,
    originalPrice: 299,
    rating: 4.3,
    reviews: 1560,
    image: '/watches/fitbit-sense-2.jpg',
    category: 'watches',
    sizes: ['One Size'],
    colors: ['Shadow Grey', 'Lunar White', 'Soft Gold'],
    features: ['Stress Management', 'ECG App', 'SpO2', '6+ Day Battery'],
    inStock: true,
    isNew: false,
    isSale: true,
    connectivity: 'Bluetooth + WiFi',
    batteryLife: '6+ days',
    waterResistant: '50 meters',
    compatibility: ['Android', 'iPhone']
  },
  {
    id: 'garmin-venu-3',
    name: 'Garmin Venu 3',
    brand: 'Garmin',
    price: 449,
    rating: 4.5,
    reviews: 890,
    image: '/watches/garmin-venu-3.jpg',
    category: 'watches',
    sizes: ['41mm', '45mm'],
    colors: ['Slate', 'Sage', 'Ivory'],
    features: ['Voice Calling', 'Built-in Speaker', 'Health Insights', 'Sports Apps'],
    inStock: false,
    isNew: true,
    isSale: false,
    connectivity: 'Bluetooth + WiFi',
    batteryLife: '14 days',
    waterResistant: '50 meters',
    compatibility: ['Android', 'iPhone']
  },
  {
    id: 'apple-watch-se',
    name: 'Apple Watch SE',
    brand: 'Apple',
    price: 249,
    originalPrice: 279,
    rating: 4.4,
    reviews: 2340,
    image: '/watches/apple-watch-se.jpg',
    category: 'watches',
    sizes: ['40mm', '44mm'],
    colors: ['Midnight', 'Starlight', 'Silver'],
    features: ['Fall Detection', 'Crash Detection', 'Heart Rate', 'Always-On'],
    inStock: true,
    isNew: false,
    isSale: true,
    connectivity: 'GPS',
    batteryLife: '18 hours',
    waterResistant: '50 meters',
    compatibility: ['iPhone']
  },
  {
    id: 'amazfit-gts-4',
    name: 'Amazfit GTS 4',
    brand: 'Amazfit',
    price: 199,
    rating: 4.2,
    reviews: 670,
    image: '/watches/amazfit-gts-4.jpg',
    category: 'watches',
    sizes: ['42mm'],
    colors: ['Infinite Black', 'Rosebud Pink', 'Autumn Brown', 'Misty White'],
    features: ['Alexa Built-in', 'GPS', 'Health Tracking', 'Long Battery'],
    inStock: true,
    isNew: false,
    isSale: false,
    connectivity: 'Bluetooth + WiFi',
    batteryLife: '8 days',
    waterResistant: '50 meters',
    compatibility: ['Android', 'iPhone']
  }
];

export const watchFilterOptions = {
  brand: [
    { id: 'apple', name: 'Apple', count: 3 },
    { id: 'samsung', name: 'Samsung', count: 2 },
    { id: 'fitbit', name: 'Fitbit', count: 1 },
    { id: 'garmin', name: 'Garmin', count: 1 },
    { id: 'amazfit', name: 'Amazfit', count: 1 }
  ],
  price: [
    { id: 'under-300', name: 'Under $300', count: 3 },
    { id: '300-500', name: '$300 - $500', count: 4 },
    { id: 'over-500', name: 'Over $500', count: 1 }
  ],
  compatibility: [
    { id: 'iphone', name: 'iPhone', count: 6 },
    { id: 'android', name: 'Android', count: 5 }
  ],
  features: [
    { id: 'gps', name: 'GPS', count: 7 },
    { id: 'cellular', name: 'Cellular', count: 2 },
    { id: 'health-tracking', name: 'Health Tracking', count: 8 },
    { id: 'voice-assistant', name: 'Voice Assistant', count: 3 }
  ],
  batteryLife: [
    { id: 'under-24h', name: 'Under 24 hours', count: 3 },
    { id: '1-7-days', name: '1-7 days', count: 3 },
    { id: 'over-7-days', name: 'Over 7 days', count: 2 }
  ]
}; 