// src/hooks/useApi.ts
import { useState, useCallback } from 'react';
import type { ApiResponse } from '../types/api';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Custom hook for making API requests
 * 
 * @example
 * const { data, loading, error, execute } = useApi<Student[]>({
 *   onSuccess: (students) => console.log('Fetched students:', students),
 *   onError: (err) => console.error('Error:', err)
 * });
 * 
 * // Usage
 * useEffect(() => {
 *   execute('/api/students');
 * }, []);
 */
export function useApi<T = any>(options: UseApiOptions = {}): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const json: ApiResponse<T> = await response.json();

      if (!response.ok) {
        throw new Error(json.error || `HTTP ${response.status}`);
      }

      setData(json.data || json as any);
      options.onSuccess?.(json.data || json);
      return json.data || json as any;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Hook for uploading files to S3
 */
export function useFileUpload(options: UseApiOptions = {}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(async (
    file: File,
    folder: string = 'uploads'
  ): Promise<{ s3Key: string; s3Url: string } | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Step 1: Get presigned URL
      const presignedResponse = await fetch('/api/media/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          fileType: file.type,
          folder,
        }),
      });

      if (!presignedResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { uploadUrl, s3Key } = await presignedResponse.json();

      // Step 2: Upload to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }

      setProgress(100);

      // Step 3: Confirm upload and save metadata
      const confirmResponse = await fetch('/api/media/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          s3Key,
          filename: file.name,
          fileType: file.type,
          fileSize: file.size,
          folder,
        }),
      });

      if (!confirmResponse.ok) {
        throw new Error('Failed to confirm upload');
      }

      const { media } = await confirmResponse.json();
      options.onSuccess?.(media);

      return {
        s3Key: media.s3_key,
        s3Url: media.s3_url,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  }, [options]);

  return { upload, uploading, progress, error };
}
