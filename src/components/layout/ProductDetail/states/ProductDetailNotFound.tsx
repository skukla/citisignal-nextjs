import Link from 'next/link';
import Button from '@/components/ui/foundations/Button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ProductDetailNotFoundProps {
  productSlug?: string;
}

/**
 * ProductDetailNotFound component
 * 404 state for when product doesn't exist
 */
export function ProductDetailNotFound({ productSlug }: ProductDetailNotFoundProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />

        <h1 className="mt-4 text-2xl font-bold text-gray-900">Product Not Found</h1>

        <p className="mt-2 text-gray-600 max-w-xl mx-auto leading-relaxed">
          {productSlug ? (
            <>This product is no longer available.</>
          ) : (
            "The product you're looking for doesn't exist."
          )}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link href="/phones">
            <Button variant="primary" className="w-full">
              Browse Phones
            </Button>
          </Link>

          <Link href="/">
            <Button variant="secondary" className="w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
