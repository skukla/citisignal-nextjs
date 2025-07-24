'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AddressForm from '@/components/ui/checkout/AddressForm';
import PaymentForm from '@/components/ui/checkout/PaymentForm';
import { ShippingAddress, BillingAddress, PaymentMethod, CheckoutFormData } from '@/types/cart';
import SearchInput from '@/components/ui/SearchInput';

const initialShippingAddress: ShippingAddress = {
  firstName: '',
  lastName: '',
  address1: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'US',
  phone: '',
};

const initialPaymentMethod: PaymentMethod = {
  type: 'credit_card',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialShippingAddress);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({ ...initialShippingAddress, sameAsShipping: true });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialPaymentMethod);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShippingAddressChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    if (billingAddress.sameAsShipping) {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBillingAddressChange = (field: keyof ShippingAddress, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (field: keyof PaymentMethod, value: string) => {
    setPaymentMethod(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to process the order
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const formData: CheckoutFormData = {
        email,
        shippingAddress,
        billingAddress,
        paymentMethod,
        notes,
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Clear cart and redirect to success page
      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      console.error('Error processing order:', error);
      // Handle error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Contact Information</h2>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <SearchInput
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email address"
                    color="purple"
                    variant="default"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Address</h2>
              <AddressForm
                type="shipping"
                values={shippingAddress}
                onChange={handleShippingAddressChange}
              />
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Billing Address</h2>
                <div className="flex items-center">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    checked={billingAddress.sameAsShipping}
                    onChange={(e) => {
                      setBillingAddress(prev => ({
                        ...(e.target.checked ? shippingAddress : prev),
                        sameAsShipping: e.target.checked,
                      }));
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="same-as-shipping" className="ml-2 block text-sm text-gray-900">
                    Same as shipping address
                  </label>
                </div>
              </div>

              {!billingAddress.sameAsShipping && (
                <AddressForm
                  type="billing"
                  values={billingAddress}
                  onChange={handleBillingAddressChange}
                />
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Method</h2>
              <PaymentForm
                values={paymentMethod}
                onChange={handlePaymentMethodChange}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {item.product.media_gallery[0] ? (
                          <Image
                            src={item.product.media_gallery[0].url}
                            alt={item.product.media_gallery[0].label}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">No image</span>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.product.name}</h3>
                            <p className="ml-4">${item.product.price}</p>
                          </div>
                          {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
                            <p key={key} className="mt-1 text-sm text-gray-500">
                              {key}: {value}
                            </p>
                          ))}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${cart.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">
                    {cart.shipping === 0 ? 'Free' : `$${cart.shipping.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Tax</p>
                  <p className="text-sm font-medium text-gray-900">${cart.tax.toFixed(2)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Order total</p>
                  <p className="text-base font-medium text-gray-900">${cart.total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>

              <div className="mt-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Order notes (optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
} 