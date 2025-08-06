export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderDetails {
  number: string;
  date: string;
  items: OrderItem[];
  total: number;
  shipping: ShippingAddress;
}

export interface OrderConfirmationMessage {
  title: string;
  description: string;
}

export interface OrderConfirmationSections {
  items: {
    title: string;
    quantity: string;
  };
  shipping: {
    title: string;
  };
  total: {
    title: string;
  };
}

export interface OrderConfirmationActions {
  continueShopping: string;
}

export interface OrderConfirmationPageData {
  message: OrderConfirmationMessage;
  sections: OrderConfirmationSections;
  actions: OrderConfirmationActions;
}