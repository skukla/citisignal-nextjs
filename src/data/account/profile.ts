export interface AddressFields {
  name: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface ProfileFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const profileConfig = {
  personalInfo: {
    title: 'Personal Information',
    description: 'Update your personal details and contact information.',
    emptyState: {
      title: 'No profile information',
      description: 'Add your personal details to help us serve you better.',
      action: 'Add Profile Information'
    },
    form: {
      fields: [
        {
          id: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true
        },
        {
          id: 'lastName',
          label: 'Last Name',
          type: 'text',
          required: true
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true
        },
        {
          id: 'phone',
          label: 'Phone Number',
          type: 'tel',
          required: false
        }
      ]
    }
  },
  addresses: {
    title: 'Address Management',
    description: 'Manage your shipping and billing addresses.',
    emptyState: {
      title: 'No addresses saved',
      description: 'Add an address to make checkout faster.',
      action: 'Add New Address'
    }
  }
};