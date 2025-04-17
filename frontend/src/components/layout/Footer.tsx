"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic đăng ký nhận tin tức
    console.log("Đăng ký email:", email);
    setEmail("");
    // Hiển thị thông báo thành công (trong thực tế sẽ gọi API)
    alert("Cảm ơn bạn đã đăng ký nhận tin!");
  };

  return (
    <footer className="min-w-[320px] bg-gray-100 pt-12 pb-6 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Thông tin về cửa hàng */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kinh Đô Cá Cảnh</h3>
            <p className="text-gray-600 mb-4">
              Chuyên cung cấp các loại cá cảnh, phụ kiện thủy sinh và dịch vụ tư
              vấn trang trí thủy sinh chuyên nghiệp.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[var(--primary)] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-600">
                  Số 123, Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[var(--primary)] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-600">0123.456.789</span>
              </div>
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[var(--primary)] mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-600">info@kinhdocacanh.vn</span>
              </div>
            </div>
          </div>

          {/* Danh mục sản phẩm */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ca-canh"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Cá cảnh
                </Link>
              </li>
              <li>
                <Link
                  href="/phu-kien"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Phụ kiện
                </Link>
              </li>
              <li>
                <Link
                  href="/thuy-sinh"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Thủy sinh
                </Link>
              </li>
              <li>
                <Link
                  href="/thuc-an"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Thức ăn
                </Link>
              </li>
              <li>
                <Link
                  href="/thuoc-va-hoa-chat"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Thuốc và hóa chất
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin hỗ trợ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/huong-dan-mua-hang"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Hướng dẫn mua hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-van-chuyen"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-doi-tra"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach-bao-mat"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/dieu-khoan-dich-vu"
                  className="text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  Điều khoản dịch vụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Đăng ký nhận tin */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-600 mb-4">
              Đăng ký để nhận thông tin về sản phẩm mới, khuyến mãi và mẹo chăm
              sóc thú cưng.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-4 bg-[var(--primary)] text-white rounded-r-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </form>
            {/* Social media */}
            <div className="mt-5">
              <h4 className="text-base font-medium mb-3">
                Kết nối với chúng tôi
              </h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--primary)] text-white h-8 w-8 rounded-full flex items-center justify-center hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--primary)] text-white h-8 w-8 rounded-full flex items-center justify-center hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--primary)] text-white h-8 w-8 rounded-full flex items-center justify-center hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--primary)] text-white h-8 w-8 rounded-full flex items-center justify-center hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} Kinh Đô Cá Cảnh. Tất cả các quyền được
            bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
