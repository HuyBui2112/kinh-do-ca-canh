import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/user';
import { 
  ApiResponse, 
  RegisterRequest, 
  LoginRequest, 
  UpdateProfileRequest, 
  ChangePasswordRequest,
  LoginResponse,
  UserWithoutPassword
} from '../utils/userInterface';
import { AuthRequest } from '../middleware/auth';

// Hàm tạo token JWT
const generateToken = (userId: string, tokenVersion: number): string => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] || '24h'
  };

  return jwt.sign(
    { 
      id: userId,
      tokenVersion
    },
    process.env.JWT_SECRET || 'your-secret-key',
    options
  );
};

// Đăng ký tài khoản mới
export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response<ApiResponse<LoginResponse>>
) => {
  try {
    const { email, password, fullname, phonenumber, address } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email đã được sử dụng'
      });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo user mới
    const newUser = new User({
      email,
      password: hashedPassword,
      fullname,
      phonenumber,
      address,
      tokenVersion: 0
    });

    await newUser.save();

    // Tạo token với tokenVersion
    const token = generateToken(newUser._id.toString(), newUser.tokenVersion);

    // Trả về thông tin user và token
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({
      success: true,
      message: 'Đăng ký thành công',
      data: {
        user: userWithoutPassword as UserWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Đăng nhập
export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<ApiResponse<LoginResponse>>
) => {
  try {
    const { email, password } = req.body;

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email hoặc mật khẩu không đúng'
      });
    }

    // Tạo token với tokenVersion hiện tại
    const token = generateToken(user._id.toString(), user.tokenVersion);

    // Trả về thông tin user và token
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: userWithoutPassword as UserWithoutPassword,
        token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Lấy thông tin tài khoản
export const getProfile = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.json({
      success: true,
      message: 'Lấy thông tin thành công',
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Cập nhật thông tin tài khoản
export const updateProfile = async (
  req: AuthRequest<{}, {}, UpdateProfileRequest>,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.user?.id;
    const { fullname, phonenumber, address } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Cập nhật thông tin
    if (fullname) user.fullname = fullname;
    if (phonenumber) user.phonenumber = phonenumber;
    if (address) user.address = address;

    await user.save();

    const { password: _, ...updatedUser } = user.toObject();
    res.json({
      success: true,
      message: 'Cập nhật thông tin thành công',
      data: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Đổi mật khẩu
export const changePassword = async (
  req: AuthRequest<{}, {}, ChangePasswordRequest>,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Đăng xuất
export const logout = async (
  req: AuthRequest,
  res: Response<ApiResponse>
) => {
  try {
    const userId = req.user?.id;
    
    // Tăng tokenVersion lên 1, làm cho token hiện tại không hợp lệ
    await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });

    res.json({
      success: true,
      message: 'Đăng xuất thành công'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 