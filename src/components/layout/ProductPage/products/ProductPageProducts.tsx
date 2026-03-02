'use client';

import ProductGrid from '@/components/ui/grids/ProductGrid';
import { useProductData } from '../providers/ProductDataContext';

export default function ProductPageProducts() {
  const { filteredProducts } = useProductData();

  return <ProductGrid products={filteredProducts} columns={{ sm: 1, md: 2, lg: 3 }} gap="md" />;
}
