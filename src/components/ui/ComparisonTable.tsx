'use client';

interface ComparisonTableProps {
  headers: React.ReactNode[];
  children: React.ReactNode;
  className?: string;
}

export default function ComparisonTable({
  headers,
  children,
  className
}: ComparisonTableProps) {
  return (
    <div className={className}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`py-4 px-6 text-sm font-semibold text-gray-900 ${
                    index === 0 ? 'text-left min-w-[280px]' : 'text-center min-w-[140px]'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
} 