// TODO: Use next/image when implementing real Commerce API images
interface ProductImagePlaceholderProps {
  image?: {
    url: string;
    label: string;
  };
  category: string;
}

export default function ProductImagePlaceholder({ image, category }: ProductImagePlaceholderProps) {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
      {image ? (
        <img 
          src={image.url}
          alt={image.label}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">{category}</span>
        </div>
      )}
    </div>
  );
} 