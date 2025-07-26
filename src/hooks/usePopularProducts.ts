'use client';

import { useMemo } from 'react';
import { phones } from '@/data/phones';

interface Product {
  id: string | number;
  sku: string;
  name: string;
  manufacturer: string;
  price: number;
  original_price?: number;
  media_gallery?: { url: string }[];
  category: string;
  memory?: string[];
  available_colors?: { name: string; hex: string }[];
  stock_status: string;
  isNew?: boolean;
  review_count: number;
}

interface UsePopularProductsResult {
  popularProducts: Product[];
  isLoading: boolean;
  error: Error | null;
}

export default function usePopularProducts(limit: number = 4): UsePopularProductsResult {
  const popularProducts = useMemo(() => {
    return phones
      .sort((a, b) => b.review_count - a.review_count)
      .slice(0, limit);
  }, [limit]);

  return {
    popularProducts,
    isLoading: false,
    error: null
  };
} 