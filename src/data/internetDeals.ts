export interface InternetDeal {
  id: string;
  name: string;
  provider: string;
  type: 'fiber' | 'cable' | '5g-home' | 'satellite';
  speed: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  isPopular: boolean;
  isNew: boolean;
  isSale: boolean;
  contractLength: string;
  installation: string;
  dataLimit: string;
  equipmentIncluded: string[];
  availability: string;
}

export const internetDeals: InternetDeal[] = [
  {
    id: 'fiber-gig-ultimate',
    name: 'Fiber Gig Ultimate',
    provider: 'CitiSignal Fiber',
    type: 'fiber',
    speed: '1 Gig',
    price: 79.99,
    originalPrice: 99.99,
    category: 'internet-deals',
    description: 'Lightning-fast fiber internet with symmetrical upload and download speeds.',
    features: ['1 Gig Up/Down', 'No Data Limits', 'Free Installation', 'WiFi 6 Router Included'],
    rating: 4.8,
    reviews: 3400,
    isPopular: true,
    isNew: false,
    isSale: true,
    contractLength: 'No Contract',
    installation: 'Free Professional Installation',
    dataLimit: 'Unlimited',
    equipmentIncluded: ['WiFi 6 Router', 'Professional Installation'],
    availability: 'Select Areas'
  },
  {
    id: '5g-home-ultra',
    name: '5G Home Ultra',
    provider: 'CitiSignal 5G',
    type: '5g-home',
    speed: '300-1000 Mbps',
    price: 59.99,
    originalPrice: 79.99,
    category: 'internet-deals',
    description: 'Wireless home internet powered by our 5G Ultra Wideband network.',
    features: ['No Installation Required', 'Self-Setup', 'Mobile Gateway', '5G Ultra Speed'],
    rating: 4.6,
    reviews: 2100,
    isPopular: true,
    isNew: true,
    isSale: true,
    contractLength: 'No Contract',
    installation: 'Self-Installation',
    dataLimit: 'Unlimited',
    equipmentIncluded: ['5G Gateway', 'Setup Kit'],
    availability: '5G Coverage Areas'
  },
  {
    id: 'cable-high-speed',
    name: 'Cable High Speed',
    provider: 'CitiSignal Cable',
    type: 'cable',
    speed: '200 Mbps',
    price: 49.99,
    category: 'internet-deals',
    description: 'Reliable cable internet perfect for families and remote work.',
    features: ['200 Mbps Download', 'Cable Modem Included', 'WiFi 5 Router', '24/7 Support'],
    rating: 4.4,
    reviews: 5600,
    isPopular: false,
    isNew: false,
    isSale: false,
    contractLength: '12 months',
    installation: 'Professional Installation $99',
    dataLimit: 'Unlimited',
    equipmentIncluded: ['Cable Modem', 'WiFi Router'],
    availability: 'Most Areas'
  },
  {
    id: 'fiber-500-value',
    name: 'Fiber 500 Value',
    provider: 'CitiSignal Fiber',
    type: 'fiber',
    speed: '500 Mbps',
    price: 59.99,
    originalPrice: 69.99,
    category: 'internet-deals',
    description: 'Mid-tier fiber speed perfect for streaming and gaming families.',
    features: ['500 Mbps Up/Down', 'Symmetrical Speeds', 'Gaming Optimized', 'Smart Home Ready'],
    rating: 4.7,
    reviews: 2800,
    isPopular: false,
    isNew: false,
    isSale: true,
    contractLength: 'No Contract',
    installation: 'Free Installation',
    dataLimit: 'Unlimited',
    equipmentIncluded: ['Fiber Gateway', 'WiFi 6 Router'],
    availability: 'Fiber Service Areas'
  },
  {
    id: 'satellite-rural',
    name: 'Satellite Rural Connect',
    provider: 'CitiSignal Satellite',
    type: 'satellite',
    speed: '100 Mbps',
    price: 89.99,
    category: 'internet-deals',
    description: 'High-speed satellite internet for rural and remote locations.',
    features: ['100 Mbps Download', 'Rural Coverage', 'Weather Resistant', 'Professional Install'],
    rating: 4.2,
    reviews: 890,
    isPopular: false,
    isNew: false,
    isSale: false,
    contractLength: '24 months',
    installation: 'Professional Installation Included',
    dataLimit: '500 GB/month',
    equipmentIncluded: ['Satellite Dish', 'Modem', 'Weather Protection'],
    availability: 'Rural Areas'
  },
  {
    id: 'business-fiber-pro',
    name: 'Business Fiber Pro',
    provider: 'CitiSignal Business',
    type: 'fiber',
    speed: '500 Mbps',
    price: 149.99,
    originalPrice: 199.99,
    category: 'internet-deals',
    description: 'Enterprise-grade fiber internet with business-class support.',
    features: ['Dedicated Bandwidth', 'SLA Guaranteed', '99.9% Uptime', 'Priority Support'],
    rating: 4.9,
    reviews: 450,
    isPopular: false,
    isNew: true,
    isSale: true,
    contractLength: '36 months',
    installation: 'Professional Installation Included',
    dataLimit: 'Unlimited',
    equipmentIncluded: ['Enterprise Router', 'Backup Gateway', 'Security Package'],
    availability: 'Business Districts'
  },
  {
    id: 'starter-internet',
    name: 'Starter Internet',
    provider: 'CitiSignal Basic',
    type: 'cable',
    speed: '50 Mbps',
    price: 29.99,
    originalPrice: 39.99,
    category: 'internet-deals',
    description: 'Affordable internet for basic browsing and email.',
    features: ['50 Mbps Download', 'Basic Router', 'Email Support', 'Affordable'],
    rating: 4.0,
    reviews: 1200,
    isPopular: false,
    isNew: false,
    isSale: true,
    contractLength: '12 months',
    installation: 'Self-Installation Kit',
    dataLimit: '1 TB/month',
    equipmentIncluded: ['Basic Modem', 'Setup Instructions'],
    availability: 'Most Areas'
  },
  {
    id: 'gaming-fiber-elite',
    name: 'Gaming Fiber Elite',
    provider: 'CitiSignal Gaming',
    type: 'fiber',
    speed: '2 Gig',
    price: 129.99,
    originalPrice: 159.99,
    category: 'internet-deals',
    description: 'Ultra-fast fiber designed for serious gamers and content creators.',
    features: ['2 Gig Speeds', 'Ultra-Low Latency', 'Gaming Router', 'Priority Traffic'],
    rating: 4.8,
    reviews: 670,
    isPopular: false,
    isNew: true,
    isSale: true,
    contractLength: 'No Contract',
    installation: 'Professional Gaming Setup',
    dataLimit: 'Unlimited',
    equipmentIncluded: ['Gaming Router', 'Ethernet Cables', 'Speed Optimizer'],
    availability: 'Select Gaming Hubs'
  }
];

export const internetDealsFilterOptions = {
  type: [
    { id: 'fiber', name: 'Fiber', count: 4 },
    { id: 'cable', name: 'Cable', count: 2 },
    { id: '5g-home', name: '5G Home', count: 1 },
    { id: 'satellite', name: 'Satellite', count: 1 }
  ],
  speed: [
    { id: 'under-100', name: 'Under 100 Mbps', count: 2 },
    { id: '100-500', name: '100-500 Mbps', count: 3 },
    { id: '500-1000', name: '500 Mbps - 1 Gig', count: 2 },
    { id: 'over-1-gig', name: 'Over 1 Gig', count: 1 }
  ],
  price: [
    { id: 'under-50', name: 'Under $50', count: 2 },
    { id: '50-100', name: '$50 - $100', count: 4 },
    { id: 'over-100', name: 'Over $100', count: 2 }
  ],
  contractLength: [
    { id: 'no-contract', name: 'No Contract', count: 4 },
    { id: '12-months', name: '12 Months', count: 2 },
    { id: '24-months', name: '24+ Months', count: 2 }
  ],
  features: [
    { id: 'unlimited-data', name: 'Unlimited Data', count: 6 },
    { id: 'free-installation', name: 'Free Installation', count: 3 },
    { id: 'wifi-included', name: 'WiFi Router Included', count: 7 },
    { id: 'business-class', name: 'Business Class', count: 1 }
  ]
}; 