'use client';

import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface PrivacyNoticeProps {
  text: string;
  linkText: string;
  linkHref: string;
  textColor?: string;
  linkColor?: string;
  className?: string;
}

export default function PrivacyNotice({
  text,
  linkText,
  linkHref,
  textColor = 'text-purple-200',
  linkColor = 'text-purple-200 hover:text-white',
  className
}: PrivacyNoticeProps) {
  return (
    <p className={twMerge('text-sm', textColor, className)}>
      {text}{' '}
      <Link href={linkHref} className={twMerge('underline', linkColor)}>
        {linkText}
      </Link>
    </p>
  );
} 