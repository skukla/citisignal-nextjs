import { createContext, useContext, useState, useMemo } from 'react';
import { ProductCardContextValue, ProductType, hasColors } from './ProductCard.types';
import { useWishlist } from './useWishlist';

const ProductCardContext = createContext<ProductCardContextValue | undefined>(undefined);

interface ProductCardProviderProps {
  product: ProductType;
  children: React.ReactNode;
}

export function ProductCardProvider({ product, children }: ProductCardProviderProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    hasColors(product) && product.colors?.[0]?.name ? product.colors[0].name : undefined
  );

  const value = useMemo(() => ({
    product,
    isWishlisted: isWishlisted(product.id),
    selectedColor,
    toggleWishlist: () => toggleWishlist(product.id),
    selectColor: setSelectedColor
  }), [product, isWishlisted, selectedColor, toggleWishlist]);

  return (
    <ProductCardContext.Provider value={value}>
      {children}
    </ProductCardContext.Provider>
  );
}

export function useProductCard() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error('useProductCard must be used within a ProductCardProvider');
  }
  return context;
}