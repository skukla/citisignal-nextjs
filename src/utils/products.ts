import type { BaseProduct } from '@/types/commerce';

/**
 * Product utility functions for normalization and formatting
 */

/**
 * Normalize an array of products
 */
export function normalizeProducts(items: unknown[]): BaseProduct[] {
  return (items || []) as BaseProduct[];
}

/**
 * Extract product attributes safely
 */
export function extractProductAttributes(product: Record<string, unknown>) {
  return {
    manufacturer: product.manufacturer || product.brand || '',
    memory: product.memory || product.storage || '',
    color: product.color || product.colour || '',
    condition: product.condition || 'new'
  };
}

/**
 * Format product price for display
 */
export function formatProductPrice(price: number | undefined, currency = 'USD'): string {
  if (!price) return '$0.00';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(price);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(regularPrice: number, salePrice: number): number {
  if (!regularPrice || !salePrice || salePrice >= regularPrice) return 0;
  return Math.round((1 - salePrice / regularPrice) * 100);
}

/**
 * Check if product is in stock
 */
export function isProductInStock(product: BaseProduct): boolean {
  return product.stock_status === 'IN_STOCK';
}

/**
 * Check if product is on sale
 */
export function isProductOnSale(product: BaseProduct): boolean {
  return !!(
    product.price_range?.minimum_price?.discount?.amount_off &&
    product.price_range.minimum_price.discount.amount_off > 0
  );
}