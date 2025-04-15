# Hướng dẫn quy trình làm việc với Git

## Cài đặt ban đầu

1. Cài đặt Git: [Download Git](https://git-scm.com/downloads)
2. Cấu hình Git:
```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

## Quy trình làm việc hàng ngày

### 1. Bắt đầu làm việc
```bash
# Lấy code mới nhất từ GitHub
git pull origin main

# Tạo branch mới cho tính năng
git checkout -b feature/ten-tinh-nang
```

### 2. Trong quá trình làm việc
```bash
# Kiểm tra trạng thái thường xuyên
git status

# Thêm file mới hoặc thay đổi
git add .

# Commit thay đổi
git commit -m "Mô tả thay đổi"
```

### 3. Khi hoàn thành tính năng
```bash
# Đẩy code lên GitHub
git push origin feature/ten-tinh-nang

# Tạo Pull Request trên GitHub
# Sau khi được approve, merge vào main
git checkout main
git merge feature/ten-tinh-nang
git push origin main
```

## Quy tắc commit message

- Viết bằng tiếng Việt
- Bắt đầu bằng động từ
- Ngắn gọn, rõ ràng
- Mô tả được thay đổi chính

Ví dụ:
- "Thêm chức năng đăng nhập"
- "Sửa lỗi hiển thị menu"
- "Cập nhật giao diện trang chủ"

## Quản lý branch

1. **Branch chính**: `main`
   - Chứa code ổn định
   - Chỉ merge khi code đã được review và test

2. **Branch phát triển**: `develop`
   - Chứa code đang phát triển
   - Tạo từ main

3. **Branch tính năng**: `feature/*`
   - Tạo từ develop
   - Đặt tên theo format: `feature/ten-tinh-nang`
   - Ví dụ: `feature/dang-nhap`, `feature/thanh-toan`

4. **Branch sửa lỗi**: `fix/*`
   - Tạo từ develop
   - Đặt tên theo format: `fix/ten-loi`
   - Ví dụ: `fix/loi-dang-nhap`

## Xử lý conflict

1. Khi có conflict:
```bash
# Kiểm tra file conflict
git status

# Giải quyết conflict trong file
# Sau đó add và commit lại
git add .
git commit -m "Giải quyết conflict"
```

## Các lệnh Git hữu ích

```bash
# Xem lịch sử commit
git log

# Xem thay đổi trong file
git diff

# Xóa branch local
git branch -d ten-branch

# Xóa branch remote
git push origin --delete ten-branch

# Reset về commit trước đó
git reset --hard HEAD~1

# Stash thay đổi tạm thời
git stash
git stash pop
```

## Best Practices

1. **Commit thường xuyên**
   - Mỗi commit nên là một thay đổi logic
   - Không commit quá nhiều thay đổi trong một lần

2. **Pull trước khi push**
   - Luôn pull code mới nhất trước khi push
   - Giảm thiểu conflict

3. **Review code**
   - Tạo Pull Request cho mọi thay đổi
   - Yêu cầu review từ đồng nghiệp

4. **Test trước khi commit**
   - Chạy test (nếu có)
   - Kiểm tra lỗi cơ bản

5. **Giữ branch sạch sẽ**
   - Xóa branch đã merge
   - Đặt tên branch rõ ràng 