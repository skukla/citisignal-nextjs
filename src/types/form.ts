import { SelectHTMLAttributes } from 'react';

/**
 * Base props shared by all form components
 */
export interface BaseFormProps {
  className?: string;
}

/**
 * Base option type for select-like components
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Group type for organizing select options
 */
export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectOptions = (SelectOption | SelectGroup)[];

/**
 * Props for the Select component
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOptions;
  placeholder?: string;
  clearable?: boolean;
  containerClassName?: string;
  className?: string;
}