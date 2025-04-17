import { Types } from 'mongoose';

// Interface cho Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Interface cho Request đăng ký
export interface RegisterRequest {
  email: string;
  password: string;
  fullname?: string;
  phonenumber: string;
  address: string;
}

// Interface cho Request đăng nhập
export interface LoginRequest {
  email: string;
  password: string;
}

// Interface cho Request cập nhật thông tin
export interface UpdateProfileRequest {
  fullname?: string;
  phonenumber?: string;
  address?: string;
}

// Interface cho Request đổi mật khẩu
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Interface cho plain object user (không có password và các phương thức Mongoose)
export interface UserWithoutPassword {
  _id: Types.ObjectId;
  email: string;
  fullname?: string;
  phonenumber: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface cho Response đăng nhập thành công
export interface LoginResponse {
  user: UserWithoutPassword;
  token: string;
} 