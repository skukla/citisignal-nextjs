'use client';

export interface ResultsCountProps {
  showing: number;
  total: number;
  itemLabel: string;
}

/**
 * Results count display with smart pluralization.
 * Shows "Showing X of Y items" with consistent styling.
 * 
 * @example
 * <ResultsCount showing={5} total={12} itemLabel="plans" />
 * // Renders: "Showing 5 of 12 plans"
 */
export default function ResultsCount({ 
  showing, 
  total, 
  itemLabel 
}: ResultsCountProps) {
  return (
    <div className="mb-6">
      <p className="text-gray-600">
        Showing {showing} of {total} {itemLabel}
      </p>
    </div>
  );
}