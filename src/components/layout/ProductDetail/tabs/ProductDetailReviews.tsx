import { useProductDetail } from '../providers/ProductDetailContext';
import type { ProductDetailReviewsProps } from '../types';

/**
 * ProductDetailReviews component
 * Displays product reviews and ratings
 * Placeholder for Phase 4 implementation
 */
export function ProductDetailReviews({ className }: ProductDetailReviewsProps) {
  const { product } = useProductDetail();

  if (!product?.reviews) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Reviews</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">{product.reviews.rating_summary}</span>
          <span className="text-sm text-gray-500 ml-1">/5</span>
        </div>
        <span className="text-sm text-gray-600">
          Based on {product.reviews.review_count} reviews
        </span>
      </div>
      {/* TODO: Add detailed reviews in Phase 4 */}
    </div>
  );
}
