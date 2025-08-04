/**
 * Utility functions for pricing calculations and formatting
 */

/**
 * Calculate the discount percentage between original and sale price
 * @param originalPrice The original price before discount
 * @param salePrice The discounted price
 * @returns The discount percentage as a whole number (e.g., 25 for 25%)
 */
export function calculateDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0 || salePrice < 0 || salePrice >= originalPrice) {
    return 0;
  }
  
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Format a price for display with currency symbol
 * @param price The price to format
 * @param currency The currency symbol (default: '$')
 * @returns Formatted price string (e.g., '$99')
 */
export function formatPrice(price: number, currency: string = '$'): string {
  return `${currency}${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

/**
 * Check if a price represents a sale (has discount)
 * @param originalPrice The original price
 * @param currentPrice The current price
 * @returns True if current price is less than original price
 */
export function isSalePrice(originalPrice: number | undefined, currentPrice: number): boolean {
  return originalPrice !== undefined && originalPrice > currentPrice;
}