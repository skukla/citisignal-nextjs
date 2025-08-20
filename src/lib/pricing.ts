/**
 * TEMPORARY: Pricing utilities only for demo/fake plan card data
 * Real product data receives pre-formatted prices from the mesh
 * TODO: Remove when plan cards use real data from mesh
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
 * Calculate discount percentage for plans
 * Used in PlanBadge and PlanCard components
 * @param originalPrice Original price
 * @param salePrice Sale price
 * @returns Discount percentage
 */
export function calculateDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}