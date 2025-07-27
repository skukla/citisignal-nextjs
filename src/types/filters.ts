export interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

export interface FilterSection {
  title: string;
  key: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio';
} 