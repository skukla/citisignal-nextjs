export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
  inStock: boolean;
  type: 'product' | 'plan';
}

export const savedConfig = {
  wishlist: {
    title: 'Wishlist',
    description: 'Products and plans you\'ve saved for later',
    emptyState: {
      title: 'Your wishlist is empty',
      description: 'Save items for later by clicking the heart icon on any product'
    },
    grid: {
      columns: { sm: 1, md: 2, lg: 3 },
      gap: 'lg' as const
    }
  }
} as const;
