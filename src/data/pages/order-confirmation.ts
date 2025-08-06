import type { OrderDetails, OrderConfirmationPageData } from '@/types/order';

export const orderConfirmationPageData: OrderConfirmationPageData = {
  message: {
    title: 'Thank you for your order!',
    description: 'We\'ll send you a confirmation email with your order details.'
  },
  sections: {
    items: {
      title: 'Items',
      quantity: 'Qty'
    },
    shipping: {
      title: 'Shipping Address'
    },
    total: {
      title: 'Total'
    }
  },
  actions: {
    continueShopping: 'Continue Shopping'
  }
};

// Example order data - in real app, this would come from the server/state
export const mockOrderData: OrderDetails = {
  number: "ORD-12345",
  date: new Date().toLocaleDateString(),
  items: [
    { 
      name: "iPhone 15 Pro", 
      quantity: 1, 
      price: 999,
      image: "/images/products/iphone-15-pro.jpg"
    },
    { 
      name: "AppleCare+", 
      quantity: 1, 
      price: 199,
      image: "/images/products/applecare.jpg"
    }
  ],
  total: 1198,
  shipping: {
    name: "John Doe",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105"
  }
};