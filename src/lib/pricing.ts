/**
 * Pricing utilities for product price operations
 * Handles both formatted price strings from mesh and numeric calculations
 */

/**
 * Format a numeric price for checkout/cart operations
 * Only used when we need to work with numeric values (e.g., cart totals)
 * @param price The numeric price to format
 * @returns Formatted price string (e.g., '$99.99')
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

/**
 * Parse a formatted price string to extract numeric value
 * Handles price strings like '$1,299.99' or '€99.95'
 * @param priceString The formatted price string
 * @returns Numeric price value
 */
export function parsePrice(priceString: string): number {
  if (!priceString) return 0;
  // Remove all non-numeric characters except decimals
  const cleaned = priceString.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Calculate discount percentage from formatted price strings
 * @param originalPrice Original price (formatted string or number)
 * @param salePrice Sale price (formatted string or number)
 * @returns Discount percentage
 */
export function calculateDiscountPercentage(
  originalPrice: string | number,
  salePrice: string | number
): number {
  const original = typeof originalPrice === 'string' ? parsePrice(originalPrice) : originalPrice;
  const sale = typeof salePrice === 'string' ? parsePrice(salePrice) : salePrice;

  if (!original || !sale || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}
