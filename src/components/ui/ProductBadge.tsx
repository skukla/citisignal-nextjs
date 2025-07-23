interface ProductBadgeProps {
  variant: 'new' | 'discount' | 'out-of-stock';
  originalPrice?: number;
  price?: number;
}

export default function ProductBadge({ variant, originalPrice, price }: ProductBadgeProps) {
  const getContent = () => {
    switch (variant) {
      case 'new':
        return 'NEW';
      case 'discount':
        if (!originalPrice || !price) return '';
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        return `-${discount}%`;
      case 'out-of-stock':
        return 'OUT OF STOCK';
      default:
        return '';
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'new':
        return 'bg-green-500';
      case 'discount':
        return 'bg-red-500';
      case 'out-of-stock':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <span className={`${getBackgroundColor()} text-white text-xs font-bold px-2 py-1 rounded`}>
      {getContent()}
    </span>
  );
} 