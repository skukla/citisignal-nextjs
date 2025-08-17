import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import type { BreadcrumbItem } from '@/types/layout';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  dataSource?: 'commerce' | 'static';
}

export default function Breadcrumb({ items, dataSource }: BreadcrumbProps) {
  return (
    <nav 
      className="flex mb-6" 
      aria-label="Breadcrumb"
      {...(dataSource === 'commerce' && {
        'data-inspector-source': 'commerce',
        'data-inspector-type': 'breadcrumbs'
      })}>
      <ol className="flex items-center space-x-2">
        {/* Home Link */}
        <li>
          <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
            <HomeIcon className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-2" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900 text-sm font-medium">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 