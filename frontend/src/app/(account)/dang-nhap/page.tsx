"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/contexts";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, error, clearError } = useAuth();
  const router = useRouter();

  // Xử lý đăng nhập
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    // Validate form
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      setIsSubmitting(false);
      return;
    }

    try {
      // Gọi hàm login từ AuthContext
      const success = await login(email, password);

      if (success) {
        // Chuyển hướng về trang chủ sau khi đăng nhập thành công
        router.push("/");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Đăng Nhập
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email của bạn"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu của bạn"
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
          {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/dang-ky"
            className="text-[var(--primary)] hover:underline font-medium"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
