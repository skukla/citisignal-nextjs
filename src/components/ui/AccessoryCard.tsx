'use client';

interface AccessoryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  price: string;
  href: string;
  className?: string;
}

export default function AccessoryCard({
  icon: Icon,
  title,
  price,
  href,
  className
}: AccessoryCardProps) {
  return (
    <a href={href} className="group">
      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600">
        {price}
      </p>
    </a>
  );
} 