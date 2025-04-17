/**
 * API - Quản lý các hàm gọi API
 */

import axios, { AxiosError } from 'axios';

// Cấu hình axios
const API_BASE_URL = 'http://localhost:5000/api';

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 giây
});

// Thêm interceptor để xử lý token trong header
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('auth_token');
    
    // Nếu có token thì thêm vào header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý response
api.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu response
    return response.data;
  },
  async (error: AxiosError) => {
    // Lấy status code từ error
    const statusCode = error.response?.status;
    
    // Xử lý lỗi 401 (Unauthorized) - Token hết hạn hoặc không hợp lệ
    if (statusCode === 401) {
      // Xóa token và user khỏi localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      
      // Redirect về trang đăng nhập nếu không phải là request đăng nhập
      if (!error.config?.url?.includes('/auth/login')) {
        window.location.href = '/dang-nhap';
      }
    }
    
    // Trả về lỗi để xử lý tiếp
    return Promise.reject(error);
  }
);

export default api;
