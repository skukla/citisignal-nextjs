'use client';

import { useState } from 'react';
import { AccountPage, AccountPageProvider } from '@/components/layout/AccountPage';
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

  const handleSetDefault = (index: number) => {
    setAddresses(prev => prev.map((addr, idx) => ({
      ...addr,
      isDefault: idx === index
    })));
  };

  const pageData = {
    title: addressConfig.title,
    description: addressConfig.description
  };

  return (
    <AccountPageProvider pageData={pageData}>
      <AccountPage.Root>
        <AccountPage.Layout>
          <AccountPage.Navigation />
          
          <AccountPage.Main>
            <AccountPage.Section>
              <AccountPage.Header />
              <AccountPage.Content>
                <div className="space-y-6">
                  {/* Add Address Button */}
                  {!showAddForm && editingAddress === null && (
                    <div className="flex justify-end">
                      <Button
                        variant="primary"
                        onClick={() => setShowAddForm(true)}
                        className="inline-flex items-center"
                      >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New Address
                      </Button>
                    </div>
                  )}

                  {/* Add/Edit Form */}
                  {(showAddForm || editingAddress !== null) && (
                    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {editingAddress !== null ? 'Edit Address' : 'Add New Address'}
                      </h3>
                      <AddressForm
                        initialValues={editingAddress !== null ? addresses[editingAddress] : undefined}
                        onSubmit={handleAddressSubmit}
                        onCancel={() => {
                          setShowAddForm(false);
                          setEditingAddress(null);
                        }}
                      />
                    </div>
                  )}

                  {/* Address List */}
                  {addresses.length > 0 ? (
                    <div className="grid gap-4">
                      {addresses.map((address, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-6 relative bg-white"
                        >
                          {address.isDefault && (
                            <Badge variant="success" className="absolute top-6 right-6">
                              Default
                            </Badge>
                          )}
                          
                          <div className="pr-24">
                            <p className="font-medium text-gray-900">{address.name}</p>
                            <p className="text-gray-600 mt-1">
                              {address.street}<br />
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>

                          <div className="mt-4 flex gap-2">
                            {!address.isDefault && (
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleSetDefault(index)}
                              >
                                Set as Default
                              </Button>
                            )}
                            <IconButton
                              icon={PencilIcon}
                              onClick={() => setEditingAddress(index)}
                              size="sm"
                              variant="secondary"
                            />
                            <IconButton
                              icon={TrashIcon}
                              onClick={() => handleDelete(index)}
                              size="sm"
                              variant="secondary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    !showAddForm && (
                      <EmptyState
                        icon={MapPinIcon}
                        title="No addresses saved"
                        description="Add your first address to get started"
                        actionLabel="Add Address"
                        onAction={() => setShowAddForm(true)}
                      />
                    )
                  )}
                </div>
              </AccountPage.Content>
            </AccountPage.Section>
          </AccountPage.Main>
        </AccountPage.Layout>
      </AccountPage.Root>
    </AccountPageProvider>
  );
}