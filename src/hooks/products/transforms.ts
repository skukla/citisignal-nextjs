import type { Phone, Watch, Accessory } from '@/types/commerce';

interface PriceData {
  price: number;
  originalPrice?: number;
  currency: string;
}

/**
 * Extract price data from either ComplexProductView or SimpleProductView
 */
export function extractPriceData(productView: any): PriceData {
  let price = 0;
  let originalPrice: number | undefined;
  let currency = '$';

  // Use display_price if available (from mesh-enhanced fields)
  if (productView.display_price !== undefined) {
    price = productView.display_price;
    // If is_on_sale is true, we know there's a discount but don't have original price
    // This is a limitation of using only enhanced fields
    if (productView.is_on_sale) {
      originalPrice = price * 1.2; // Estimate for now, or could be undefined
    }
    currency = '$'; // Default to USD
  } else if (productView.priceRange) {
    // Complex product with full price data
    const minimum = productView.priceRange.minimum;
    price = minimum.final.amount.value;
    const regularPrice = minimum.regular.amount.value;
    
    if (regularPrice !== price) {
      originalPrice = regularPrice;
    }
    
    currency = minimum.final.amount.currency === 'USD' ? '$' : minimum.final.amount.currency;
  } else if (productView.price) {
    // Simple product with full price data
    price = productView.price.final.amount.value;
    const regularPrice = productView.price.regular.amount.value;
    
    if (regularPrice !== price) {
      originalPrice = regularPrice;
    }
    
    currency = productView.price.final.amount.currency === 'USD' ? '$' : productView.price.final.amount.currency;
  }

  return { price, originalPrice, currency };
}

/**
 * Extract attribute value by name
 */
export function getAttributeValue(attributes: any[], name: string): string | undefined {
  return attributes?.find((attr: any) => attr.name === name)?.value;
}

/**
 * Transform product data to Phone interface
 */
export function transformToPhone(item: any): Phone {
  // Handle both productView and product field names from different resolvers
  const productView = item.productView || item.product || item;
  const { price, originalPrice, currency } = extractPriceData(productView);
  
  // Use custom resolver fields directly
  const manufacturer = productView.manufacturer || 'CitiSignal';
  const memoryOptions = productView.memory_options || ['128GB'];
  const availableColors = productView.available_colors || [{ name: 'Default', hex: '#000000' }];
  const isOnSale = productView.is_on_sale || false;
  
  // Extract additional attributes
  const attributes = productView.attributes || [];
  const network5G = getAttributeValue(attributes, 'network_5g');
  const isNew = getAttributeValue(attributes, 'is_new') === '1';
  
  return {
    id: productView.id,
    sku: productView.sku,
    name: productView.name,
    url_key: productView.urlKey,
    description: productView.description || productView.shortDescription || '',
    price,
    original_price: originalPrice,
    currency,
    rating_summary: 0, // Not available in Catalog Service
    review_count: 0, // Not available in Catalog Service
    images: productView.images?.map((img: any) => ({
      url: img.url?.replace('http://', 'https://') || img.url,
      label: img.label,
      roles: img.roles || []
    })) || [],
    category: 'phones',
    stock_status: 'in_stock' as const,
    manufacturer: manufacturer as any,
    memory: memoryOptions,
    extended_capacity_5g: network5G === 'extended_capacity' || network5G === 'both',
    extended_range_5g: network5G === 'extended_range' || network5G === 'both',
    available_colors: availableColors,
    isNew: isNew || false,
    isSale: isOnSale
  };
}

/**
 * Transform product data to Watch interface
 */
export function transformToWatch(item: any): Watch {
  // Handle both productView and product field names from different resolvers
  const productView = item.productView || item.product || item;
  const { price, originalPrice, currency } = extractPriceData(productView);
  
  // Use custom resolver fields
  const manufacturer = productView.manufacturer || 'CitiSignal';
  const isOnSale = productView.is_on_sale || false;
  
  // Extract watch-specific attributes
  const attributes = productView.attributes || [];
  const connectivity = getAttributeValue(attributes, 'connectivity') || 'Bluetooth';
  const batteryLife = getAttributeValue(attributes, 'battery_life') || '18 hours';
  const waterResistant = getAttributeValue(attributes, 'water_resistant') || 'IP68';
  const isNew = getAttributeValue(attributes, 'is_new') === '1';
  
  // Extract sizes from options
  const sizeOptions = productView.options?.find((opt: any) => opt.title === 'Size')?.values || [];
  const sizes = sizeOptions.map((size: any) => size.title) || ['40mm'];
  
  return {
    id: productView.id,
    sku: productView.sku,
    name: productView.name,
    url_key: productView.urlKey,
    description: productView.description || productView.shortDescription || '',
    price,
    original_price: originalPrice,
    currency,
    rating_summary: 0,
    review_count: 0,
    images: productView.images?.map((img: any) => ({
      url: img.url?.replace('http://', 'https://') || img.url,
      label: img.label,
      roles: img.roles || []
    })) || [],
    category: 'watches',
    stock_status: 'in_stock' as const,
    manufacturer: manufacturer as any,
    sizes,
    connectivity,
    battery_life: batteryLife,
    water_resistant: waterResistant,
    available_colors: productView.available_colors || [{ name: 'Default', hex: '#000000' }],
    isNew: isNew || false,
    isSale: isOnSale
  };
}

/**
 * Transform product data to Accessory interface
 */
export function transformToAccessory(item: any): Accessory {
  // Handle both productView and product field names from different resolvers
  const productView = item.productView || item.product || item;
  const { price, originalPrice, currency } = extractPriceData(productView);
  
  // Extract accessory-specific attributes
  const attributes = productView.attributes || [];
  const manufacturer = productView.manufacturer || getAttributeValue(attributes, 'manufacturer') || 'CitiSignal';
  const compatibility = getAttributeValue(attributes, 'compatibility')?.split(',') || [];
  const isNew = getAttributeValue(attributes, 'is_new') === '1';
  const isOnSale = productView.is_on_sale || false;
  
  return {
    id: productView.id,
    sku: productView.sku,
    name: productView.name,
    url_key: productView.urlKey,
    description: productView.description || productView.shortDescription || '',
    price,
    original_price: originalPrice,
    currency,
    rating_summary: 0,
    review_count: 0,
    images: productView.images?.map((img: any) => ({
      url: img.url?.replace('http://', 'https://') || img.url,
      label: img.label,
      roles: img.roles || []
    })) || [],
    category: 'accessories',
    stock_status: 'in_stock' as const,
    manufacturer,
    compatibility,
    available_colors: productView.available_colors || [{ name: 'Default', hex: '#000000' }],
    isNew: isNew || false,
    isSale: isOnSale
  };
}