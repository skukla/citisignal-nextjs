export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  storage: string[];
  colors: string[];
  features: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  os: string;
  screenSize: string;
  camera: string;
  battery: string;
}

export const phones: Phone[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2850,
    image: '/phones/iphone-15-pro-max.jpg',
    category: 'phones',
    storage: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['5G Ready', 'A17 Pro Chip', 'Pro Camera System', 'Titanium Design'],
    inStock: true,
    isNew: true,
    isSale: true,
    os: 'iOS',
    screenSize: '6.7"',
    camera: '48MP Main',
    battery: 'All Day'
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 1950,
    image: '/phones/iphone-15-pro.jpg',
    category: 'phones',
    storage: ['128GB', '256GB', '512GB', '1TB'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    features: ['5G Ready', 'A17 Pro Chip', 'Pro Camera System', 'Titanium Design'],
    inStock: true,
    isNew: true,
    isSale: true,
    os: 'iOS',
    screenSize: '6.1"',
    camera: '48MP Main',
    battery: 'All Day'
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    price: 699,
    originalPrice: 799,
    rating: 4.6,
    reviews: 3200,
    image: '/phones/iphone-15.jpg',
    category: 'phones',
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    features: ['5G Ready', 'A16 Bionic', 'Advanced Camera', 'USB-C'],
    inStock: true,
    isNew: false,
    isSale: true,
    os: 'iOS',
    screenSize: '6.1"',
    camera: '48MP Main',
    battery: 'All Day'
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1199,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 1840,
    image: '/phones/galaxy-s24-ultra.jpg',
    category: 'phones',
    storage: ['256GB', '512GB', '1TB'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    features: ['S Pen Included', '200MP Camera', '5G Ultra', 'AI Features'],
    inStock: true,
    isNew: true,
    isSale: true,
    os: 'Android',
    screenSize: '6.8"',
    camera: '200MP Main',
    battery: '5000mAh'
  },
  {
    id: 'samsung-galaxy-s24',
    name: 'Galaxy S24',
    brand: 'Samsung',
    price: 799,
    rating: 4.5,
    reviews: 1250,
    image: '/phones/galaxy-s24.jpg',
    category: 'phones',
    storage: ['128GB', '256GB'],
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    features: ['5G Ready', 'AI Camera', 'Fast Charging', 'Premium Display'],
    inStock: true,
    isNew: false,
    isSale: false,
    os: 'Android',
    screenSize: '6.2"',
    camera: '50MP Main',
    battery: '4000mAh'
  },
  {
    id: 'google-pixel-8-pro',
    name: 'Pixel 8 Pro',
    brand: 'Google',
    price: 899,
    originalPrice: 999,
    rating: 4.6,
    reviews: 980,
    image: '/phones/pixel-8-pro.jpg',
    category: 'phones',
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    features: ['AI Photography', 'Pure Android', 'Magic Eraser', 'Titan M Security'],
    inStock: true,
    isNew: false,
    isSale: true,
    os: 'Android',
    screenSize: '6.7"',
    camera: '50MP Main',
    battery: '5050mAh'
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 699,
    rating: 4.4,
    reviews: 567,
    image: '/phones/oneplus-12.jpg',
    category: 'phones',
    storage: ['256GB', '512GB'],
    colors: ['Silky Black', 'Flowy Emerald'],
    features: ['Snapdragon 8 Gen 3', '100W Fast Charging', 'Hasselblad Camera', 'OxygenOS'],
    inStock: false,
    isNew: false,
    isSale: false,
    os: 'Android',
    screenSize: '6.82"',
    camera: '50MP Main',
    battery: '5400mAh'
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    brand: 'Apple',
    price: 599,
    originalPrice: 699,
    rating: 4.5,
    reviews: 4200,
    image: '/phones/iphone-14.jpg',
    category: 'phones',
    storage: ['128GB', '256GB', '512GB'],
    colors: ['Blue', 'Purple', 'Midnight', 'Starlight', 'Product Red'],
    features: ['5G Ready', 'A15 Bionic', 'Dual Camera', 'Crash Detection'],
    inStock: true,
    isNew: false,
    isSale: true,
    os: 'iOS',
    screenSize: '6.1"',
    camera: '12MP Main',
    battery: 'All Day'
  }
];

export const phoneFilterOptions = {
  brand: [
    { id: 'apple', name: 'Apple', count: 4 },
    { id: 'samsung', name: 'Samsung', count: 2 },
    { id: 'google', name: 'Google', count: 1 },
    { id: 'oneplus', name: 'OnePlus', count: 1 }
  ],
  os: [
    { id: 'ios', name: 'iOS', count: 4 },
    { id: 'android', name: 'Android', count: 4 }
  ],
  storage: [
    { id: '128gb', name: '128GB', count: 5 },
    { id: '256gb', name: '256GB', count: 7 },
    { id: '512gb', name: '512GB', count: 6 },
    { id: '1tb', name: '1TB', count: 2 }
  ],
  price: [
    { id: 'under-700', name: 'Under $700', count: 3 },
    { id: '700-1000', name: '$700 - $1000', count: 3 },
    { id: 'over-1000', name: 'Over $1000', count: 2 }
  ],
  features: [
    { id: '5g', name: '5G Ready', count: 6 },
    { id: 'wireless-charging', name: 'Wireless Charging', count: 8 },
    { id: 'face-id', name: 'Face ID', count: 4 },
    { id: 'fast-charging', name: 'Fast Charging', count: 8 }
  ]
}; 