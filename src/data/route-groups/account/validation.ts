import type { ValidationRules } from '@/hooks/forms/useFieldValidation';
import type { ProfileFormFields, AddressFields } from './profile';
import type { CardFormFields } from './payment';

export const profileValidation: ValidationRules<ProfileFormFields> = {
  firstName: [
    {
      validate: (value) => value.length > 0,
      message: 'First name is required'
    },
    {
      validate: (value) => value.length <= 50,
      message: 'First name must be 50 characters or less'
    }
  ],
  lastName: [
    {
      validate: (value) => value.length > 0,
      message: 'Last name is required'
    },
    {
      validate: (value) => value.length <= 50,
      message: 'Last name must be 50 characters or less'
    }
  ],
  email: [
    {
      validate: (value) => value.length > 0,
      message: 'Email is required'
    },
    {
      validate: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: 'Please enter a valid email address'
    }
  ],
  phone: [
    {
      validate: (value) => {
        if (!value) return true; // Optional field
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        return phoneRegex.test(value.replace(/\s/g, ''));
      },
      message: 'Please enter a valid phone number'
    }
  ]
};

export const addressValidation: ValidationRules<AddressFields> = {
  name: [
    {
      validate: (value) => value.length > 0,
      message: 'Full name is required'
    }
  ],
  street: [
    {
      validate: (value) => value.length > 0,
      message: 'Street address is required'
    }
  ],
  city: [
    {
      validate: (value) => value.length > 0,
      message: 'City is required'
    }
  ],
  state: [
    {
      validate: (value) => value.length > 0,
      message: 'State is required'
    }
  ],
  zipCode: [
    {
      validate: (value) => value.length > 0,
      message: 'ZIP code is required'
    },
    {
      validate: (value) => /^\d{5}(-\d{4})?$/.test(value),
      message: 'Please enter a valid ZIP code'
    }
  ]
};

export const paymentValidation: ValidationRules<CardFormFields> = {
  number: [
    {
      validate: (value) => value.length > 0,
      message: 'Card number is required'
    },
    {
      validate: (value) => /^\d{16}$/.test(value.replace(/\s/g, '')),
      message: 'Please enter a valid card number'
    }
  ],
  name: [
    {
      validate: (value) => value.length > 0,
      message: 'Name on card is required'
    }
  ],
  expiryMonth: [
    {
      validate: (value) => value.length > 0,
      message: 'Expiry month is required'
    },
    {
      validate: (value) => /^(0[1-9]|1[0-2])$/.test(value),
      message: 'Please enter a valid month (01-12)'
    }
  ],
  expiryYear: [
    {
      validate: (value) => value.length > 0,
      message: 'Expiry year is required'
    },
    {
      validate: (value) => {
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        return /^\d{4}$/.test(value) && year >= currentYear;
      },
      message: 'Please enter a valid year'
    }
  ],
  cvc: [
    {
      validate: (value) => value.length > 0,
      message: 'CVC is required'
    },
    {
      validate: (value) => /^\d{3,4}$/.test(value),
      message: 'Please enter a valid CVC'
    }
  ]
};