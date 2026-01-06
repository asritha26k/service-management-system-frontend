export interface User {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  forcePasswordChange?: boolean;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiryDuration: number;
}

// Request interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RegisterCustomerRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface RegisterManagerRequest {
  email: string;
  name: string;
  role: string;
  phone?: string;
}

// Response interfaces
export interface MessageResponse {
  message: string;
  success: boolean;
}

export interface IdMessageResponse {
  id: string;
  message: string;
}
