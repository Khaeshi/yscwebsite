// Standard API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Media upload responses
export interface PresignedUrlResponse {
  uploadUrl: string;
  s3Key: string;
}

export interface MediaUploadResponse {
  id: string;
  s3_key: string;
  s3_url: string;
  filename: string;
}

// Authentication
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    isApproved?: boolean;
    role: string;
  };
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Form submissions
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface EnrollmentFormData {
  studentFirstName: string;
  studentLastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  guardianName: string;
  guardianPhone: string;
  programId: string;
  notes?: string;
}
