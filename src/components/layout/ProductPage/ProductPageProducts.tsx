'use client';

import ProductGrid from '@/components/ui/grids/ProductGrid';
import { useProductPage } from './ProductPageContext';
import type { ProductType } from '@/components/ui/cards/ProductCard/ProductCard.types';

export default function ProductPageProducts() {
  const { filteredProducts } = useProductPage();
  
  return (
    <ProductGrid 
      products={filteredProducts as ProductType[]}
      columns={{ sm: 1, md: 2, lg: 3 }} 
      gap="md"
    />
  );
}