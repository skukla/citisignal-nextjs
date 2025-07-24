import clsx from 'clsx';

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

  const getBadgeStyle = () => {
    switch (variant) {
      case 'new':
        return 'badge-success';
      case 'discount':
        return 'badge-danger';
      case 'out-of-stock':
        return 'badge-gray';
      default:
        return 'badge-gray';
    }
  };

  return (
    <span className={clsx('badge', getBadgeStyle())}>
      {getContent()}
    </span>
  );
} 