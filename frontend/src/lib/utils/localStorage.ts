// Các khóa để lưu trữ trong localStorage
const TOKEN_KEY = 'kinh_do_ca_canh_access_token';
const REFRESH_TOKEN_KEY = 'kinh_do_ca_canh_refresh_token';
const USER_KEY = 'kinh_do_ca_canh_user';

// Lưu access token
export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Lấy access token
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

// Lưu refresh token
export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

// Lấy refresh token
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

// Lưu thông tin người dùng
export const setUser = (user: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

// Lấy thông tin người dùng
export const getUser = (): any | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

// Xóa tất cả tokens và thông tin người dùng
export const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

// Kiểm tra xem người dùng đã đăng nhập chưa
export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!getAccessToken();
  }
  return false;
}; 