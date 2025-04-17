import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';

// Load biến môi trường từ file .env
dotenv.config();

// Khởi tạo Express app
const app = express();

// Middleware
app.use(cors()); // Cho phép CORS
app.use(helmet()); // Bảo mật HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Kết nối MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kinh-do-ca-canh';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Đã kết nối thành công với MongoDB');
  })
  .catch((error) => {
    console.error('❌ Lỗi kết nối MongoDB:', error);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được
  });

// Route cơ bản
app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ 
    success: true,
    message: 'Chào mừng đến với API của Kinh Do Cá Cảnh' 
  });
});

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// Xử lý lỗi 404
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy đường dẫn'
  });
});

// Xử lý lỗi chung
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Có lỗi xảy ra ở server'
  });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
}); 