import { HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { ProductCardActionsProps } from './ProductCard.types';
import { useProductCard } from './ProductCardContext';
import { useCart } from '@/components/ui/layout/Cart';
import Button from '@/components/ui/foundations/Button';
import { twMerge } from 'tailwind-merge';

export function ProductCardActions({ className, showQuickAdd }: ProductCardActionsProps) {
  const { isWishlisted, toggleWishlist, product } = useProductCard();
  const { addItem } = useCart();
  const { stock_status, id, name, price } = product;
  const isOutOfStock = stock_status === 'OUT_OF_STOCK';

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Convert product to CartItem format
    const cartItem = {
      id,
      name,
      price,
      quantity: 1,
      imageUrl: 'media_gallery' in product ? product.media_gallery?.[0]?.url : undefined
    };
    
    addItem(cartItem);
  };

  return (
    <div className={twMerge('px-4 pb-4', className)}>
      <div className="space-y-2">
        {showQuickAdd && (
          <Button
            onClick={handleAddToCartClick}
            disabled={isOutOfStock}
            className={`w-full ${isOutOfStock ? 'bg-gray-300 text-gray-500' : 'bg-[#8821f4] text-white'}`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        )}
        <Button
          variant="outline"
          className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          View Details
        </Button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleWishlistClick}
        leftIcon={isWishlisted ? HeartIcon : HeartIconOutline}
        className="absolute top-8 right-8 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      />
    </div>
  );
}