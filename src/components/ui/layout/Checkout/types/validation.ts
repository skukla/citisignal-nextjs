export interface ValidationError {
  message: string;
}

export type ValidationErrors<T> = Partial<Record<keyof T, ValidationError>>;

export interface ValidationResult<T> {
  isValid: boolean;
  errors: ValidationErrors<T>;
}