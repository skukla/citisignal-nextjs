export interface EmptyState {
  title: string;
  description: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'select';
  required: boolean;
  options?: { value: string; label: string; }[];
}

export interface SectionConfig {
  title: string;
  description: string;
  emptyState?: EmptyState;
}

export interface GridConfig {
  columns: {
    sm: number;
    md: number;
    lg: number;
  };
  gap: 'sm' | 'md' | 'lg';
}

export interface FormConfig extends SectionConfig {
  fields: FormField[];
}
