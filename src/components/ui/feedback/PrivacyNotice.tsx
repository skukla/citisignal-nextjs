'use client';

import { memo } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface PrivacyNoticeProps {
  text: string;
  linkText: string;
  linkHref: string;
  className?: string;
}

/**
 * A privacy notice component with text and link.
 * 
 * @example
 * ```tsx
 * <PrivacyNotice 
 *   text="We respect your privacy. Unsubscribe at any time."
 *   linkText="Privacy Policy"
 *   linkHref="/privacy"
 * />
 * ```
 */
function PrivacyNotice({
  text,
  linkText,
  linkHref,
  className
}: PrivacyNoticeProps) {
  return (
    <p className={twMerge('text-sm text-purple-200', className)}>
      {text}{' '}
      <Link href={linkHref} className="underline text-purple-200 hover:text-white">
        {linkText}
      </Link>
    </p>
  );
}

export default memo(PrivacyNotice); 