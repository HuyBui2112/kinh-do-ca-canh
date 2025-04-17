/**
 * User Interface - Định nghĩa các interface cho request và response liên quan đến User
 */

// Các request interfaces
export interface UpdateProfileRequest {
  fullName?: string;
  phonenumber?: string;
  address?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Các response interfaces
export interface User {
  _id: string;
  email: string;
  fullname: string;
  phonenumber?: string;
  address?: string;
  tokenVersion: number;
  createdAt: string;
  updatedAt: string;
  _v: number;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
} 