export interface PlanType {
  id: 'basic' | 'premium' | 'unlimited';
  name: string;
}

export interface PlanFeature {
  name: string;
  description: string;
  availableIn: Array<PlanType['id']>;
}

export interface FilterSection {
  title: string;
  key: string;
  options: Array<{ id: string; name: string }>;
  type: 'checkbox';
} 