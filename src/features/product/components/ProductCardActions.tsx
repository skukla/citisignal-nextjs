import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { ProductCardActionsProps } from '../types/product.types';
import { useProductCard } from '../context/ProductCardContext';
import { useCart } from '../hooks/useCart';
import Button from '@/components/ui/Button';

export function ProductCardActions({ className, showQuickAdd }: ProductCardActionsProps) {
  const { isWishlisted, toggleWishlist, product } = useProductCard();
  const { addToCart } = useCart();
  const { stock_status, id } = product;
  const isOutOfStock = stock_status === 'OUT_OF_STOCK';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(id);
  };

  return (
    <div className={`flex items-center justify-between p-4 pt-0 ${className ?? ''}`}>
      {showQuickAdd && (
        <Button
          onClick={handleAddToCartClick}
          disabled={isOutOfStock}
          className="w-full"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      )}
      <button
        onClick={handleWishlistClick}
        className="ml-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? (
          <HeartIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIconOutline className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}