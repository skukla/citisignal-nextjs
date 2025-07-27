import { ElementType } from 'react';
import { ThemeTextColor } from '../../types/theme';

interface FeatureItemProps {
  text: string;
  icon?: ElementType;
  iconColor?: ThemeTextColor;
}

export default function FeatureItem({ text, icon: Icon, iconColor = 'text-green-500' }: FeatureItemProps) {
  return (
    <li className="flex items-center">
      {Icon && (
        <Icon className={`w-5 h-5 ${iconColor} mr-3`} />
      )}
      {text}
    </li>
  );
} 