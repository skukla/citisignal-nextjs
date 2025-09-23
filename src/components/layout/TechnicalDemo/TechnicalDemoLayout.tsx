import { ReactNode } from 'react';
import Link from 'next/link';

interface TechnicalDemoLayoutProps {
  title: string;
  description: string;
  apiEndpoint?: string;
  queryName?: string;
  children: ReactNode;
}

/**
 * Standardized layout for technical demo pages
 * Provides consistent styling and navigation for IT/developer audience
 */
export function TechnicalDemoLayout({
  title,
  description,
  apiEndpoint,
  queryName,
  children,
}: TechnicalDemoLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Technical Header */}
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm"></div>
            <div className="text-xs text-gray-400">Adobe API Mesh Technical Demos</div>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>

          {/* Technical Info */}
          {(apiEndpoint || queryName) && (
            <div className="mt-4 flex items-center space-x-6 text-sm">
              {apiEndpoint && (
                <div className="flex items-center">
                  <span className="text-gray-500">Endpoint:</span>
                  <code className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {apiEndpoint}
                  </code>
                </div>
              )}
              {queryName && (
                <div className="flex items-center">
                  <span className="text-gray-500">Query:</span>
                  <code className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {queryName}
                  </code>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ label, value, unit, trend }: MetricCardProps) {
  return (
    <div className="bg-white rounded border p-4">
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div className="flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {unit && <span className="ml-1 text-sm text-gray-500">{unit}</span>}
        {trend && (
          <span
            className={`ml-2 text-sm ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                  ? 'text-red-600'
                  : 'text-gray-500'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'}
          </span>
        )}
      </div>
    </div>
  );
}

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
}

export function CodeBlock({ title, language = 'javascript', code }: CodeBlockProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
          {title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
    </div>
  );
}

interface DataTableProps {
  headers: string[];
  rows: (string | number | ReactNode)[][];
}

export function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
