import { useProductDetail } from '../providers/ProductDetailContext';
// import { useProductActions } from '@/hooks/useProductActions';
import Button from '@/components/ui/foundations/Button';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import type { ProductDetailActionsProps } from '../types';

/**
 * ProductDetailActions component
 * Add to cart and wishlist actions
 * Reuses existing hooks and Button component
 */
export function ProductDetailActions({ className }: ProductDetailActionsProps) {
  const { product, loading } = useProductDetail();
  // TODO: Uncomment when hooks are available
  // const { addToCart, toggleWishlist, isWishlisted } = useProductActions();

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-3">
          <div className="h-12 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  // Mock functions for testing
  const isWishlistedProduct = false;
  const handleAddToCart = () => console.log('Add to cart:', product.id);
  const handleToggleWishlist = () => console.log('Toggle wishlist:', product.id);

  return (
    <div className={className}>
      <div className="space-y-3">
        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>

        {/* Wishlist */}
        <Button onClick={handleToggleWishlist} variant="secondary" size="md" className="w-full">
          {isWishlistedProduct ? (
            <>
              <HeartIconSolid className="h-5 w-5 text-red-500" />
              Remove from Wishlist
            </>
          ) : (
            <>
              <HeartIcon className="h-5 w-5" />
              Add to Wishlist
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
