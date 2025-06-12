# Code Flow Overview

This project includes a Spring Boot backend (`backendv4`) and a React frontend (`frontendv4`). Dưới đây là mô tả ngắn gọn các luồng chính của ứng dụng.

## Backend (Spring Boot)
1. **Authentication & Authorization**
   - Người dùng đăng nhập thông qua các endpoint `/api/auth/**`.
   - `SecurityConfig` định nghĩa các URL công khai và yêu cầu xác thực cho các API còn lại.
   - JWT được sử dụng để xác thực các request protected.

2. **Quản lý Người dùng và Vai trò**
   - Các endpoint `/api/admin/users` cho phép Admin tạo, chỉnh sửa, xoá (soft delete) người dùng.
   - Người dùng có thể xem và cập nhật hồ sơ của mình qua `/api/users/me/profile`.

3. **Quản lý Nhóm máu & Tương thích**
   - `BloodCompatibilityController` cung cấp danh sách và chi tiết quy tắc tương thích máu cho mọi người dùng.
   - Các quy tắc có thể được Admin chỉnh sửa (tạo, cập nhật, xoá).

4. **Yêu cầu & Quy trình hiến máu**
   - Thành viên và nhân viên có thể tạo yêu cầu cần máu, sau đó Staff/Admin phê duyệt.
   - Khi có người hiến phù hợp, Staff lập lịch và theo dõi quy trình hiến máu.

5. **Inventory (Kho máu)**
   - Sau khi túi máu đạt kiểm tra chất lượng, hệ thống nhập kho và cập nhật trạng thái (RESERVED, USED, DISCARDED...).

## Frontend (React)
1. **Routing & Layout**
   - Các route được định nghĩa trong `src/routes/AppRoutes.jsx` chia thành public và authenticated routes.
   - `MainLayout` bao gồm Navbar và Footer, hiển thị cho phần lớn trang.

2. **Quản lý Thành viên**
   - Thành viên có thể xem/chỉnh sửa hồ sơ cá nhân ở trang `UserProfilePage`.
   - Tính năng "Tìm người hiến" (`FindDonorPage`) cho phép nhập toạ độ hoặc dùng vị trí hiện tại để tìm người hiến gần đó.

3. **Trang quản trị**
   - Admin/Staff truy cập các trang quản trị để quản lý người dùng, yêu cầu máu, kho máu, nội dung...

4. **Thông báo**
   - Ứng dụng sử dụng `react-hot-toast` để hiển thị thông báo thành công/lỗi sau các hành động.

Tài liệu này chỉ mang tính khái quát, các chi tiết cài đặt cụ thể nằm trong từng module của backend và frontend.
