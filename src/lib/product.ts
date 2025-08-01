/**
 * Product-related utility functions
 */

/**
 * Calculates the discount percentage between original and sale prices
 * 
 * @param originalPrice - The original price before discount
 * @param price - The current sale price
 * @returns The discount percentage as a whole number
 * 
 * @example
 * ```typescript
 * calculateDiscount(100, 80) // Returns 20
 * calculateDiscount(50, 25) // Returns 50
 * ```
 */
export function calculateDiscount(originalPrice: number, price: number): number {
  if (originalPrice <= 0 || price < 0 || price >= originalPrice) {
    return 0;
  }
  
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Formats a price for display
 * 
 * @param price - The price to format
 * @param currency - The currency symbol (default: '$')
 * @returns Formatted price string
 * 
 * @example
 * ```typescript
 * formatPrice(29.99) // Returns '$29.99'
 * formatPrice(100, '€') // Returns '€100.00'
 * ```
 */
export function formatPrice(price: number, currency: string = '$'): string {
  return `${currency}${price.toFixed(2)}`;
}