export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

// Centralized color palette for products
export const colorOptions: readonly ColorOption[] = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'blue', name: 'Blue', hex: '#286885' },
  { id: 'burgundy', name: 'Burgundy', hex: '#64464e' },
  { id: 'cream', name: 'Cream', hex: '#e4e0bf' },
  { id: 'gold', name: 'Gold', hex: '#f8e8d1' },
  { id: 'graphite', name: 'Graphite', hex: '#5f5e5a' },
  { id: 'green', name: 'Green', hex: '#425456' },
  { id: 'lavender', name: 'Lavender', hex: '#cec0de' },
  { id: 'midnight', name: 'Midnight', hex: '#2b323b' },
  { id: 'navy', name: 'Navy', hex: '#1f2330' },
  { id: 'phantom-black', name: 'Phantom Black', hex: '#08080a' },
  { id: 'phantom-white', name: 'Phantom White', hex: '#fcfcfc' },
  { id: 'pink', name: 'Pink', hex: '#fde2de' },
  { id: 'pink-gold', name: 'Pink Gold', hex: '#f6ddda' },
  { id: 'purple', name: 'Purple', hex: '#bcb3ea' },
  { id: 'red', name: 'Red', hex: '#b7072a' },
  { id: 'sierra-blue', name: 'Sierra Blue', hex: '#adc6dc' },
  { id: 'silver', name: 'Silver', hex: '#f1f3ee' },
  { id: 'starlight', name: 'Starlight', hex: '#e7e1dc' },
  { id: 'white', name: 'White', hex: '#f9f9f9' }
] as const;

// Helper function to get color by ID
export const getColorById = (id: string): ColorOption | undefined => {
  return colorOptions.find(color => color.id === id);
};

// Helper function to get colors by IDs
export const getColorsByIds = (ids: string[]): ColorOption[] => {
  return ids.map(id => getColorById(id)).filter(Boolean) as ColorOption[];
};