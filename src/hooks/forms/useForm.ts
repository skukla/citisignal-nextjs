import { useState } from 'react';
import { useFieldValidation, type ValidationRules, type ValidationErrors } from './useFieldValidation';
import { useFormSubmission } from './useFormSubmission';

interface UseFormOptions<T> {
  initialValues: T;
  validationRules: ValidationRules<T>;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T extends { [K in keyof T]: T[K] }>({
  initialValues,
  validationRules,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof T, boolean>>>({});
  const [dirtyFields, setDirtyFields] = useState<Partial<Record<keyof T, boolean>>>({});

  const { validateField, validateForm, getFieldError } = useFieldValidation(values, validationRules);
  const { isSubmitting, handleSubmit: submitForm } = useFormSubmission<T>({
    onSubmit
  });

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [field]: value }));
    // Mark field as dirty if value is different from initial
    if (value !== initialValues[field]) {
      setDirtyFields(prev => ({ ...prev, [field]: true }));
    } else {
      setDirtyFields(prev => ({ ...prev, [field]: false }));
    }
    // Validate if field is both touched and dirty
    if (touchedFields[field] && dirtyFields[field]) {
      const fieldError = validateField(field);
      setErrors(prev => ({ ...prev, [field]: fieldError }));
    }
  };

  const handleBlur = (field: keyof T) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    // Only validate if the field has been modified
    if (dirtyFields[field]) {
      const fieldError = validateField(field);
      setErrors(prev => ({ ...prev, [field]: fieldError }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Mark all fields as touched and dirty on submit
      const allFields = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);
      setTouchedFields(allFields);
      setDirtyFields(allFields);
      return;
    }

    await submitForm(values);
  };

  return {
    values,
    errors,
    touchedFields,
    dirtyFields,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldError
  };
}