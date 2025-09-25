'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';
import Button from '@/components/ui/foundations/Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'yellow' | 'link';
  isDestructive?: boolean;
  isLoading?: boolean;
  className?: string;
}

/**
 * A reusable confirmation dialog component using Headless UI.
 * Perfect for confirming destructive actions like deleting items.
 *
 * @example
 * ```tsx
 * const [showConfirm, setShowConfirm] = useState(false);
 *
 * <ConfirmationDialog
 *   isOpen={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   onConfirm={async () => {
 *     await deleteItem();
 *     setShowConfirm(false);
 *   }}
 *   title="Clear Cart"
 *   message="Are you sure you want to remove all items? This action cannot be undone."
 *   confirmText="Clear Cart"
 *   isDestructive
 * />
 * ```
 */
export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary',
  isDestructive = false,
  isLoading = false,
  className,
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  'w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all',
                  className
                )}
              >
                <div className="flex items-start">
                  {/* Icon */}
                  <div
                    className={twMerge(
                      'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
                      isDestructive ? 'bg-red-100' : 'bg-yellow-100'
                    )}
                  >
                    <ExclamationTriangleIcon
                      className={twMerge(
                        'h-6 w-6',
                        isDestructive ? 'text-red-600' : 'text-yellow-600'
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <div className="ml-4 mt-0 text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3 justify-end">
                  <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
                    {cancelText}
                  </Button>
                  <Button
                    variant={isDestructive ? 'secondary' : confirmVariant}
                    size="sm"
                    onClick={handleConfirm}
                    loading={isLoading}
                    className={isDestructive ? 'bg-red-600 text-white hover:bg-red-700' : undefined}
                  >
                    {confirmText}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
