import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

// Định nghĩa interface cho Request đã được xác thực
export interface AuthRequest<P = {}, ResBody = {}, ReqBody = {}, ReqQuery = {}>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: string;
  };
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Lấy token từ header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Không tìm thấy token xác thực'
      });
    }

    // Xác thực token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { id: string; tokenVersion: number };

    // Kiểm tra user và tokenVersion
    const user = await User.findById(decoded.id);
    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn'
      });
    }

    // Thêm thông tin user vào request
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }
}; 