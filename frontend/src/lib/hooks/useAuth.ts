/**
 * useAuth hook - Phương thức nhanh để sử dụng AuthContext
 */

import { useAuth as useAuthContext } from '../contexts/AuthContext';

// Export hook từ context để dễ dàng sử dụng
export const useAuth = useAuthContext;

export default useAuth;