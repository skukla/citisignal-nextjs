/**
 * Utility functions for URL validation and processing
 */

/**
 * Checks if a URL is external (starts with http:// or https://)
 * 
 * @param url - The URL to check
 * @returns true if the URL is external, false otherwise
 * 
 * @example
 * ```ts
 * isExternalUrl('https://example.com') // true
 * isExternalUrl('http://example.com')  // true
 * isExternalUrl('/internal-page')      // false
 * isExternalUrl('mailto:test@test.com') // false
 * ```
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Checks if a URL is internal (relative path or same domain)
 * 
 * @param url - The URL to check
 * @returns true if the URL is internal, false otherwise
 */
export function isInternalUrl(url: string): boolean {
  return !isExternalUrl(url);
}

/**
 * Validates if a string is a valid URL format
 * 
 * @param url - The URL string to validate
 * @returns true if the URL format is valid, false otherwise
 * 
 * @example
 * ```ts
 * isValidUrl('https://example.com')    // true
 * isValidUrl('/path/to/page')          // true
 * isValidUrl('not-a-url')              // false
 * isValidUrl('')                       // false
 * ```
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Check for external URLs
  if (isExternalUrl(url)) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Check for internal paths (must start with / or be a valid relative path)
  return url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || !url.includes(' ');
}

/**
 * Sanitizes a URL by trimming whitespace and ensuring proper format
 * 
 * @param url - The URL to sanitize
 * @returns the sanitized URL
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  return url.trim();
}

/**
 * Gets the domain from a URL
 * 
 * @param url - The URL to extract domain from
 * @returns the domain or empty string if invalid
 * 
 * @example
 * ```ts
 * getDomain('https://example.com/path') // 'example.com'
 * getDomain('/internal-path')           // ''
 * ```
 */
export function getDomain(url: string): string {
  if (!isExternalUrl(url)) {
    return '';
  }

  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}