import { ComponentType } from 'react';
import Button from '@/components/ui/foundations/Button';

interface EmptyStateProps {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  onAction,
  actionLabel
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {Icon && (
        <Icon className="mx-auto h-12 w-12 text-gray-400" />
      )}
      <h3 className="mt-2 text-lg font-medium text-gray-900">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
      {(action || onAction) && (
        <div className="mt-6">
          {action || (
            <Button
              variant="primary"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}