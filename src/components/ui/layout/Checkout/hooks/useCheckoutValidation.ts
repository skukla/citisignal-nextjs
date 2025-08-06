'use client';

import { useCallback } from 'react';
import type { 
  CheckoutStepId, 
  ShippingDetails, 
  PaymentDetails,
  ValidationResult,
  ValidationErrors
} from '../types';
import { validationData } from '../data/validation';

export function useCheckoutValidation(
  shippingDetails: ShippingDetails | null,
  paymentDetails: PaymentDetails | null
) {
  const validateShipping = useCallback((): ValidationResult<ShippingDetails> => {
    const errors: ValidationErrors<ShippingDetails> = {};
    
    if (!shippingDetails) {
      return { isValid: false, errors };
    }

    // Required field validation
    validationData.requiredFields.shipping.forEach(field => {
      if (!shippingDetails[field]) {
        errors[field as keyof ShippingDetails] = { message: validationData.messages.required(field as keyof ShippingDetails) };
      }
    });

    // Phone number validation
    if (shippingDetails.phone && !validationData.patterns.phone.test(shippingDetails.phone.replace(/\D/g, ''))) {
      errors.phone = { message: validationData.messages.phone };
    }

    // ZIP code validation
    if (shippingDetails.zipCode && !validationData.patterns.zipCode.test(shippingDetails.zipCode)) {
      errors.zipCode = { message: validationData.messages.zipCode };
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [shippingDetails]);

  const validatePayment = useCallback((): ValidationResult<PaymentDetails> => {
    const errors: ValidationErrors<PaymentDetails> = {};
    
    if (!paymentDetails) {
      return { isValid: false, errors };
    }

    // Required field validation
    validationData.requiredFields.payment.forEach(field => {
      if (!paymentDetails[field]) {
        errors[field as keyof PaymentDetails] = { message: validationData.messages.required(field as keyof PaymentDetails) };
      }
    });

    // Card number validation
    if (paymentDetails.cardNumber) {
      const cardNumber = paymentDetails.cardNumber.replace(/\D/g, '');
      if (!validationData.patterns.cardNumber.test(cardNumber)) {
        errors.cardNumber = { message: validationData.messages.cardNumber };
      }
    }

    // Expiry date validation
    if (paymentDetails.expiryDate && !validationData.patterns.expiryDate.test(paymentDetails.expiryDate)) {
      errors.expiryDate = { message: validationData.messages.expiryDate };
    }

    // CVV validation
    if (paymentDetails.cvv && !validationData.patterns.cvv.test(paymentDetails.cvv)) {
      errors.cvv = { message: validationData.messages.cvv };
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [paymentDetails]);

  const validateStep = useCallback((stepId: CheckoutStepId): ValidationResult<ShippingDetails | PaymentDetails> => {
    switch (stepId) {
      case 'shipping': return validateShipping();
      case 'payment': return validatePayment();
      case 'review': {
        const shippingResult = validateShipping();
        const paymentResult = validatePayment();
        return {
          isValid: shippingResult.isValid && paymentResult.isValid,
          errors: { ...shippingResult.errors, ...paymentResult.errors }
        };
      }
      default: return { isValid: false, errors: {} };
    }
  }, [validateShipping, validatePayment]);

  const isStepComplete = useCallback((stepId: CheckoutStepId): boolean => {
    return validateStep(stepId).isValid;
  }, [validateStep]);

  return { isStepComplete, validateStep };
}