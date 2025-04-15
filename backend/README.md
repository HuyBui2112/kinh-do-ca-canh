# Backend API với Node.js và MongoDB Atlas

## Yêu cầu hệ thống
- Node.js (v14 trở lên)
- MongoDB Atlas account
- npm hoặc yarn

## Cài đặt

1. Clone repository
```bash
git clone <repository-url>
cd <project-folder>
```

2. Cài đặt dependencies
```bash
npm install
```

3. Tạo file .env
- Copy file .env.example thành .env
- Cập nhật các biến môi trường trong file .env

4. Khởi động server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Cấu trúc thư mục
```
src/
├── controllers/    # Xử lý logic nghiệp vụ
├── models/         # Định nghĩa schema MongoDB
├── routes/         # Định nghĩa API routes
├── middlewares/    # Middleware functions
├── utils/          # Utility functions
├── config/         # Configuration files
├── app.js          # Express app setup
└── server.js       # Server entry point
```

## API Endpoints

### Users
- GET /api/v1/users - Lấy danh sách users
- GET /api/v1/users/:id - Lấy thông tin user
- POST /api/v1/users - Tạo user mới
- PUT /api/v1/users/:id - Cập nhật user
- DELETE /api/v1/users/:id - Xóa user

## Bảo mật
- JWT Authentication
- Password hashing với bcrypt
- Helmet middleware cho security headers
- CORS enabled
- Rate limiting

## Development
- Sử dụng ES modules
- ESLint cho code linting
- Prettier cho code formatting
- Jest cho testing

## Production
- Error handling
- Logging
- Performance optimization
- Security best practices 