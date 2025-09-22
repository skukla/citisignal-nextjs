import { createContext, useContext, useMemo } from 'react';
import { ProductCardContextValue, ProductType } from './ProductCard.types';
import { useWishlist } from './useWishlist';

const ProductCardContext = createContext<ProductCardContextValue | undefined>(undefined);

interface ProductCardProviderProps {
  product: ProductType;
  children: React.ReactNode;
}

export function ProductCardProvider({ product, children }: ProductCardProviderProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();

  const value = useMemo(
    () => ({
      product,
      isWishlisted: isWishlisted(product.id),
      toggleWishlist: () => toggleWishlist(product.id),
    }),
    [product, isWishlisted, toggleWishlist]
  );

  return <ProductCardContext.Provider value={value}>{children}</ProductCardContext.Provider>;
}

export function useProductCard() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error('useProductCard must be used within a ProductCardProvider');
  }
  return context;
}
