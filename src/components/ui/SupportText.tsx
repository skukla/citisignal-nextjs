interface SupportTextProps {
  text?: string;
  phone?: string;
  className?: string;
}

export default function SupportText({ text, phone, className = '' }: SupportTextProps) {
  if (!text && !phone) return null;
  
  return (
    <div className={`text-center lg:text-left ${className}`}>
      <p className="text-sm text-gray-500">
        {text}
        {phone && (
          <span className="font-medium text-gray-900">
            {text ? ' ' : ''}{phone}
          </span>
        )}
      </p>
    </div>
  );
} 