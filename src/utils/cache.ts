/**
 * Cache utility functions
 */

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Cache key prefix
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_VERSION = 'v1';

/**
 * Generate cache key with version and prefix
 */
export function getCacheKey(key: string, prefix?: string): string {
  const parts = [CACHE_VERSION];
  if (prefix) parts.push(prefix);
  parts.push(key);
  return parts.join(':');
}

/**
 * Check if cached data is stale
 */
export function isStale(timestamp: number, ttl = DEFAULT_TTL): boolean {
  return Date.now() - timestamp > ttl;
}

/**
 * Get data from cache
 */
export function getFromCache<T>(key: string, options?: CacheOptions): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const cacheKey = getCacheKey(key, options?.key);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);

    if (isStale(timestamp, options?.ttl)) {
      localStorage.removeItem(cacheKey);
      return null;
    }

    return data;
  } catch {
    // Silently fail on cache errors
    return null;
  }
}

/**
 * Set data in cache
 */
export function setInCache<T>(key: string, data: T, options?: CacheOptions): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getCacheKey(key, options?.key);
    const cacheData = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION,
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch {
    // Silently fail on cache errors (e.g., quota exceeded)
  }
}

/**
 * Clear specific cache key
 */
export function clearCache(key: string, prefix?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const cacheKey = getCacheKey(key, prefix);
    localStorage.removeItem(cacheKey);
  } catch {
    // Silently fail
  }
}

/**
 * Clear all cache with optional prefix filter
 */
export function clearAllCache(prefix?: string): void {
  if (typeof window === 'undefined') return;

  try {
    const keys = Object.keys(localStorage);
    const cachePrefix = prefix ? `${CACHE_VERSION}:${prefix}` : CACHE_VERSION;

    keys.forEach((key) => {
      if (key.startsWith(cachePrefix)) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // Silently fail
  }
}

/**
 * Create a memoized cache key from object
 */
export function createCacheKeyFromObject(obj: Record<string, unknown>): string {
  const sorted = Object.keys(obj)
    .sort()
    .reduce(
      (result, key) => {
        if (obj[key] !== undefined && obj[key] !== null) {
          result[key] = obj[key];
        }
        return result;
      },
      {} as Record<string, unknown>
    );

  return JSON.stringify(sorted);
}
