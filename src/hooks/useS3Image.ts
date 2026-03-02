// src/hooks/useS3Image.ts
import { useState, useEffect } from 'react';
import { getOptimizedImageUrl } from '../lib/aws/s3';

interface UseS3ImageOptions {
  width?: number;
  height?: number;
  format?: 'webp' | 'jpeg' | 'png';
  quality?: number;
  fallback?: string;
}

interface UseS3ImageReturn {
  src: string;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook to load S3 images with optimization
 * 
 * @example
 * const { src, isLoading, error } = useS3Image('uploads/instrument-piano.jpg', {
 *   width: 800,
 *   format: 'webp',
 *   quality: 80
 * });
 */
export function useS3Image(
  s3Key: string | null | undefined,
  options: UseS3ImageOptions = {}
): UseS3ImageReturn {
  const [src, setSrc] = useState<string>(options.fallback || '');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!s3Key) {
      setSrc(options.fallback || '');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = getOptimizedImageUrl(s3Key, {
        width: options.width,
        height: options.height,
        format: options.format,
        quality: options.quality,
      });

      // Preload the image
      const img = new Image();
      img.onload = () => {
        setSrc(imageUrl);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError(new Error('Failed to load image'));
        setSrc(options.fallback || '');
        setIsLoading(false);
      };
      img.src = imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setSrc(options.fallback || '');
      setIsLoading(false);
    }
  }, [s3Key, options.width, options.height, options.format, options.quality, options.fallback]);

  return { src, isLoading, error };
}

/**
 * Simple helper to get S3 URL directly (no hook)
 */
export function getS3ImageUrl(
  s3Key: string,
  options?: UseS3ImageOptions
): string {
  return getOptimizedImageUrl(s3Key, options);
}
