/**
 * Utility functions for rating calculations and display
 */

/**
 * Convert a rating value to a 5-star scale
 * @param rating The rating value (e.g., 0-100 scale)
 * @param maxRating The maximum rating value (default: 100)
 * @returns Rating converted to 0-5 scale
 */
export function convertRatingToStars(rating: number, maxRating: number = 100): number {
  if (rating < 0 || maxRating <= 0) return 0;
  if (rating > maxRating) return 5;
  
  return (rating / maxRating) * 5;
}

/**
 * Get the number of filled stars for display
 * @param rating The rating value (0-100 scale)
 * @param maxRating The maximum rating value (default: 100)
 * @returns Number of filled stars (0-5)
 */
export function getFilledStars(rating: number, maxRating: number = 100): number {
  const starRating = convertRatingToStars(rating, maxRating);
  return Math.floor(starRating);
}

/**
 * Format rating for display with decimal places
 * @param rating The rating value (0-100 scale)
 * @param maxRating The maximum rating value (default: 100)
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted rating string (e.g., "4.7")
 */
export function formatRatingDisplay(rating: number, maxRating: number = 100, decimals: number = 1): string {
  const starRating = convertRatingToStars(rating, maxRating);
  return starRating.toFixed(decimals);
}

/**
 * Format review count for display
 * @param count The number of reviews
 * @returns Formatted review count string (e.g., "1,250 reviews", "1 review")
 */
export function formatReviewCount(count: number): string {
  if (count === 0) return 'No reviews';
  if (count === 1) return '1 review';
  
  return `${count.toLocaleString()} reviews`;
}