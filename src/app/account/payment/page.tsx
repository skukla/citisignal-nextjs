'use client';

import { useState } from 'react';
import { AccountDashboard } from '@/components/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import { paymentConfig } from '@/data/account/payment';
import Button from '@/components/ui/foundations/Button';
import IconButton from '@/components/ui/foundations/IconButton';
import Badge from '@/components/ui/foundations/Badge';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { PlusIcon, PencilIcon, TrashIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import type { CardFormFields } from '@/data/account/payment';

// Temporary mock data - would come from API/store
const mockPaymentMethods: CardFormFields[] = [
  {
    number: '•••• •••• •••• 4242',
    name: 'John Doe',
    expiryMonth: '12',
    expiryYear: '2024',
    cvc: '',
    billingAddressId: '1',
    isDefault: true
  }
];

export default function PaymentPage() {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<number | null>(null);

  return (
    <AccountDashboard>
      <AccountSection
        title={paymentConfig.list.title}
        description={paymentConfig.list.description}
        actions={
          <Button
            variant="outline"
            leftIcon={PlusIcon}
            onClick={() => setShowAddForm(true)}
          >
            {paymentConfig.list.addButton}
          </Button>
        }
      >
        <div className="space-y-6">
          {paymentMethods.length > 0 ? (
            <div className="grid gap-4">
              {paymentMethods.map((method, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <CreditCardIcon className="h-6 w-6 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">{method.number}</h3>
                        <p className="text-sm text-gray-500">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                        {method.isDefault && (
                          <Badge variant="purple" className="mt-2">
                            Default Payment Method
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <IconButton
                        icon={PencilIcon}
                        onClick={() => setEditingMethod(index)}
                        aria-label="Edit payment method"
                      />
                      <IconButton
                        icon={TrashIcon}
                        onClick={() => {
                          setPaymentMethods(prev => 
                            prev.filter((_, idx) => idx !== index)
                          );
                        }}
                        aria-label="Delete payment method"
                        variant="danger"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={CreditCardIcon}
              title={paymentConfig.list.emptyState.title}
              description={paymentConfig.list.emptyState.description}
              actionLabel={paymentConfig.list.addButton}
              onAction={() => setShowAddForm(true)}
            />
          )}
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}