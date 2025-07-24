import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {/* Home Link */}
        <li>
          <Link 
            href="/" 
            className={clsx(
              'nav-link text-gray-500',
              'hover:text-primary-600 transition-colors',
              'flex items-center'
            )}
          >
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
                className={clsx(
                  'nav-link text-sm font-medium',
                  'text-gray-500 hover:text-primary-600',
                  'transition-colors'
                )}
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 