type ValidationError = {
  message: string;
};

export type ValidationErrors<T> = {
  [P in keyof T]?: ValidationError;
};

export type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

export type ValidationRules<T> = {
  [P in keyof T]?: ValidationRule<T[P]>[];
};

export function useFieldValidation<T extends Record<string, unknown>>(
  values: T,
  rules: ValidationRules<T>
) {
  const validateField = (field: keyof T): ValidationError | undefined => {
    const fieldRules = rules[field];
    if (!fieldRules) return undefined;

    for (const rule of fieldRules) {
      if (!rule.validate(values[field])) {
        return { message: rule.message };
      }
    }

    return undefined;
  };

  const validateForm = (): ValidationErrors<T> => {
    const errors: ValidationErrors<T> = {};
    let hasErrors = false;

    for (const field in rules) {
      const error = validateField(field as keyof T);
      if (error) {
        errors[field as keyof T] = error;
        hasErrors = true;
      }
    }

    return hasErrors ? errors : {};
  };

  const getFieldError = (field: keyof T): string | undefined => {
    const error = validateField(field);
    return error?.message;
  };

  return {
    validateField,
    validateForm,
    getFieldError
  };
}