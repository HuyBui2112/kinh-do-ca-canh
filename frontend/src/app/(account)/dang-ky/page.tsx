"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phonenumber: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, error, clearError } = useAuth();
  const router = useRouter();

  // Xử lý thay đổi giá trị input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý đăng ký
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    // Validate form
    if (!formData.email || !formData.password || !formData.fullname) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      setIsSubmitting(false);
      return;
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      setIsSubmitting(false);
      return;
    }

    try {
      // Gọi hàm register từ AuthContext
      const success = await register(
        formData.email,
        formData.password,
        formData.fullname,
        formData.phonenumber,
        formData.address
      );

      if (success) {
        // Chuyển hướng về trang chủ sau khi đăng ký thành công
        router.push("/");
      }
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Đăng Ký Tài Khoản
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email của bạn"
            required
          />
        </div>

        {/* Họ tên */}
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập họ và tên của bạn"
            required
          />
        </div>

        {/* Số điện thoại */}
        <div className="mb-4">
          <label
            htmlFor="phonenumber"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập số điện thoại của bạn"
          />
        </div>

        {/* Địa chỉ */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập địa chỉ của bạn"
          />
        </div>

        {/* Mật khẩu */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Xác nhận mật khẩu <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập lại mật khẩu của bạn"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)] transition duration-300 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng Ký"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Đã có tài khoản?{" "}
          <Link
            href="/dang-nhap"
            className="text-[var(--primary)] hover:underline font-medium"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
