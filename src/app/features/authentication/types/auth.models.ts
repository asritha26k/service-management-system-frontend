export interface User {
  userId: string;
  email: string;
  role: string;
  name?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiryDuration: number;
  userId: string;
  email: string;
  role: string;
  forcePasswordChange?: boolean;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiryDuration: number;
}
