export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  shippingAddress: string;
}

export const orderConfig = {
  list: {
    title: 'Order History',
    description: 'View and track your orders',
    emptyState: {
      title: 'No orders yet',
      description: 'When you make a purchase, it will appear here'
    }
  },
  details: {
    title: 'Order Details',
    backLabel: 'Back to Orders',
    statuses: {
      pending: { label: 'Pending', color: 'yellow' },
      processing: { label: 'Processing', color: 'blue' },
      shipped: { label: 'Shipped', color: 'purple' },
      delivered: { label: 'Delivered', color: 'green' },
      cancelled: { label: 'Cancelled', color: 'red' }
    }
  }
} as const;
