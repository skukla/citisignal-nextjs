/**
 * Minimal pricing utilities for checkout and non-product displays
 * Product cards now receive pre-formatted prices from the mesh
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