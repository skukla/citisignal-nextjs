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
    <div className={twMerge('flex items-center justify-between px-4 pb-4', className)}>
      {showQuickAdd && (
        <Button
          onClick={handleAddToCartClick}
          disabled={isOutOfStock}
          className="w-full"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleWishlistClick}
        leftIcon={isWishlisted ? HeartIcon : HeartIconOutline}
        className="ml-4 rounded-full text-gray-500 hover:bg-gray-100"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      />
    </div>
  );
}