'use client';

/**
 * AuthContext - Quản lý trạng thái đăng nhập của người dùng
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, UpdateProfileRequest, ChangePasswordRequest } from '../interfaces';
import { authApi } from '../api';

// Định nghĩa kiểu dữ liệu cho context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, fullname: string, phonenumber?: string, address?: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateProfile: (data: UpdateProfileRequest) => Promise<boolean>;
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
}

// Tạo context với giá trị mặc định
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: async () => false,
  updateProfile: async () => false,
  changePassword: async () => false,
  error: null,
  clearError: () => {},
});

// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check xem người dùng đã đăng nhập chưa (khi component mount)
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Kiểm tra xem có token trong localStorage không
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Gọi API để lấy thông tin user
          const response = await authApi.getCurrentUser();
          
          if (response.success) {
            setUser(response.data);
          } else {
            // Nếu API trả về lỗi, xóa token
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_info');
          }
        }
      } catch (err) {
        console.error('Lỗi khi kiểm tra đăng nhập:', err);
        // Xóa token nếu có lỗi
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Hàm đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authApi.login(email, password);
      
      if (response.success) {
        setUser(response.data.user);
        setError(null);
        return true;
      } else {
        setError(response.message || 'Đăng nhập thất bại');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi kết nối server');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng ký
  const register = async (
    email: string, 
    password: string, 
    fullname: string, 
    phonenumber?: string, 
    address?: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authApi.register(email, password, fullname, phonenumber, address);
      
      if (response.success) {
        setUser(response.data.user);
        setError(null);
        return true;
      } else {
        setError(response.message || 'Đăng ký thất bại');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi kết nối server');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm đăng xuất
  const logout = async (): Promise<boolean> => {
    try {
      // Đặt user về null ngay lập tức để UI được cập nhật
      setUser(null);
      
      // Chuyển hướng người dùng về trang đăng nhập trước
      router.push('/dang-nhap');
      
      // Sau đó mới gọi API đăng xuất và xóa localStorage
      setTimeout(async () => {
        try {
          // Gọi API để đăng xuất
          await authApi.logout();
        } catch (err) {
          console.error('Lỗi khi gọi API đăng xuất:', err);
          // Ngay cả khi API lỗi, vẫn xóa dữ liệu local
        } finally {
          // Đảm bảo xóa localStorage trong mọi trường hợp
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_info');
          localStorage.removeItem('user_cache_time');
        }
      }, 100);
      
      return true;
    } catch (err) {
      console.error('Lỗi khi đăng xuất:', err);
      return false;
    }
  };

  // Hàm cập nhật thông tin
  const updateProfile = async (data: UpdateProfileRequest): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authApi.updateProfile(data);
      
      if (response.success) {
        setUser(response.data);
        setError(null);
        return true;
      } else {
        setError(response.message || 'Cập nhật thông tin thất bại');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi kết nối server');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm đổi mật khẩu
  const changePassword = async (data: ChangePasswordRequest): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authApi.changePassword(data);
      
      if (response.success) {
        setError(null);
        return true;
      } else {
        setError(response.message || 'Đổi mật khẩu thất bại');
        return false;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi kết nối server');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa lỗi
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 