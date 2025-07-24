'use client';

import { ElementType } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: ElementType;
}

export default function PageHeader({ title, description, icon: Icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-8 h-8 text-purple-600" />
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-3xl">
        {description}
      </p>
    </div>
  );
} 