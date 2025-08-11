'use client';

import { useState } from 'react';
import { AccountDashboard } from '@/components/ui/layout/Account/AccountDashboard';
import AccountSection from '@/components/ui/layout/AccountSection';
import AddressForm from '@/components/ui/forms/account/AddressForm';
import Button from '@/components/ui/foundations/Button';
import IconButton from '@/components/ui/foundations/IconButton';
import Badge from '@/components/ui/foundations/Badge';
import EmptyState from '@/components/ui/feedback/EmptyState';
import { addressConfig } from '@/data/route-groups/account/addresses';
import { PlusIcon, PencilIcon, TrashIcon, MapPinIcon } from '@heroicons/react/24/outline';
import type { AddressFields } from '@/data/route-groups/account/profile';

// Temporary mock data - would come from API/store
const mockAddresses: AddressFields[] = [
  {
    name: 'John Doe',
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    isDefault: true
  }
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);

  const handleAddressSubmit = async (data: AddressFields) => {
    // TODO: Implement address update/create
    console.log('Address update:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingAddress !== null) {
      setAddresses(prev => prev.map((addr, idx) => 
        idx === editingAddress ? data : addr
      ));
      setEditingAddress(null);
    } else {
      setAddresses(prev => [...prev, data]);
      setShowAddForm(false);
    }
  };

  const handleDelete = (index: number) => {
    setAddresses(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleEdit = (index: number) => {
    setEditingAddress(index);
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingAddress(null);
  };

  return (
    <AccountDashboard>
      <AccountSection
        title={addressConfig.list.title}
        description={addressConfig.list.description}
        actions={
          !showAddForm && editingAddress === null && (
            <Button
              variant="outline"
              leftIcon={PlusIcon}
              onClick={() => setShowAddForm(true)}
            >
              {addressConfig.list.addButton}
            </Button>
          )
        }
      >
        <div className="space-y-8">
          {/* Address List */}
          {addresses.length > 0 && !showAddForm && editingAddress === null && (
            <div className="grid gap-4">
              {addresses.map((address, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-6 w-6 text-gray-400" />
                      <div>
                        <h3 className="font-medium text-gray-900">{address.name}</h3>
                        <div className="text-sm text-gray-500">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                        {address.isDefault && (
                          <Badge variant="purple" className="mt-2">
                            Default Address
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <IconButton
                        icon={PencilIcon}
                        onClick={() => handleEdit(index)}
                        aria-label="Edit address"
                      />
                      <IconButton
                        icon={TrashIcon}
                        onClick={() => handleDelete(index)}
                        aria-label="Delete address"
                        variant="danger"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {addresses.length === 0 && !showAddForm && editingAddress === null && (
            <EmptyState
              icon={MapPinIcon}
              title={addressConfig.list.emptyState.title}
              description={addressConfig.list.emptyState.description}
              actionLabel={addressConfig.list.addButton}
              onAction={() => setShowAddForm(true)}
            />
          )}

          {/* Address Form */}
          {(showAddForm || editingAddress !== null) && (
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <AddressForm
                  initialValues={editingAddress !== null ? addresses[editingAddress] : undefined}
                  onSubmit={handleAddressSubmit}
                  onCancel={handleCancel}
                />
              </div>
            </div>
          )}
        </div>
      </AccountSection>
    </AccountDashboard>
  );
}