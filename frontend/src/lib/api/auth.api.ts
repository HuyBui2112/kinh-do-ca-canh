/**
 * Auth API - Quản lý các API liên quan đến xác thực
 */

import api from './api';
import { 
  LoginResponse, 
  RegisterResponse, 
  ProfileResponse, 
  UpdateProfileResponse, 
  ChangePasswordResponse, 
  LogoutResponse, 
  UpdateProfileRequest, 
  ChangePasswordRequest 
} from '../interfaces';

// Base Keys cho cache
const AUTH_CACHE_KEY = 'auth';
const USER_CACHE_KEY = 'user';

/**
 * API đăng ký tài khoản
 */
export const register = async (
  email: string, 
  password: string, 
  fullname: string, 
  phonenumber?: string, 
  address?: string
): Promise<RegisterResponse> => {
  const response = await api.post<any, RegisterResponse>('/auth/register', {
    email,
    password,
    fullname,
    phonenumber,
    address
  });

  // Lưu token vào localStorage
  if (response.success && response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_info', JSON.stringify(response.data.user));
  }

  return response;
};

/**
 * API đăng nhập
 */
export const login = async (
  email: string, 
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<any, LoginResponse>('/auth/login', {
    email,
    password
  });

  // Lưu token vào localStorage
  if (response.success && response.data.token) {
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_info', JSON.stringify(response.data.user));
  }

  return response;
};

/**
 * API lấy thông tin user hiện tại
 */
export const getCurrentUser = async (): Promise<ProfileResponse> => {
  // Check cache trước
  const cachedUser = localStorage.getItem('user_info');
  if (cachedUser) {
    const userData = JSON.parse(cachedUser);
    // Kiểm tra xem dữ liệu có còn mới không (dưới 5 phút)
    const cachedTime = localStorage.getItem('user_cache_time');
    if (cachedTime) {
      const timeDiff = Date.now() - parseInt(cachedTime);
      if (timeDiff < 5 * 60 * 1000) { // 5 phút
        return {
          success: true,
          message: 'Lấy thông tin thành công',
          data: userData
        };
      }
    }
  }

  // Nếu không có cache hoặc cache đã hết hạn, gọi API
  const response = await api.get<any, ProfileResponse>('/users/profile');

  // Lưu vào cache nếu thành công
  if (response.success) {
    localStorage.setItem('user_info', JSON.stringify(response.data));
    localStorage.setItem('user_cache_time', Date.now().toString());
  }

  return response;
};

/**
 * API cập nhật thông tin user
 */
export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await api.put<any, UpdateProfileResponse>('/users/profile', data);

  // Cập nhật cache nếu thành công
  if (response.success) {
    const cachedUser = localStorage.getItem('user_info');
    if (cachedUser) {
      const userData = JSON.parse(cachedUser);
      localStorage.setItem('user_info', JSON.stringify({
        ...userData,
        ...response.data
      }));
      localStorage.setItem('user_cache_time', Date.now().toString());
    }
  }

  return response;
};

/**
 * API đổi mật khẩu
 */
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  return await api.put<any, ChangePasswordResponse>('/users/password', data);
};

/**
 * API đăng xuất
 */
export const logout = async (): Promise<LogoutResponse> => {
  // Chỉ gọi API đăng xuất, không xử lý localStorage ở đây
  // Việc xử lý localStorage đã được chuyển lên AuthContext
  return await api.post<any, LogoutResponse>('/auth/logout');
}; 