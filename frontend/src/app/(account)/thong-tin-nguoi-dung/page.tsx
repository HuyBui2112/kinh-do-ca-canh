"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts";
import { UpdateProfileRequest, ChangePasswordRequest } from "@/lib/interfaces";

export default function ProfilePage() {
  // State cho form thông tin cá nhân
  const [profileData, setProfileData] = useState<UpdateProfileRequest>({
    fullName: "",
    phonenumber: "",
    address: "",
  });

  // State cho form đổi mật khẩu
  const [passwordData, setPasswordData] = useState<ChangePasswordRequest>({
    currentPassword: "",
    newPassword: "",
  });

  // State để xác nhận mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState("");

  // State để quản lý trạng thái submitting
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  // Khai báo message khi submit thành công
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Sử dụng context Auth
  const {
    user,
    loading,
    isAuthenticated,
    updateProfile,
    changePassword,
    error,
    clearError,
  } = useAuth();
  const router = useRouter();

  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/dang-nhap");
    }
  }, [loading, isAuthenticated, router]);

  // Cập nhật form khi user data được load
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.fullname || "",
        phonenumber: user.phonenumber || "",
        address: user.address || "",
      });
    }
  }, [user]);

  // Xử lý thay đổi form thông tin cá nhân
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý thay đổi form mật khẩu
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setPasswordData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Xử lý cập nhật thông tin cá nhân
  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingProfile(true);
    setProfileSuccess(null);
    clearError();

    try {
      const success = await updateProfile(profileData);

      if (success) {
        setProfileSuccess("Cập nhật thông tin thành công!");
      }
    } catch (err) {
      console.error("Lỗi cập nhật thông tin:", err);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  // Xử lý đổi mật khẩu
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingPassword(true);
    setPasswordSuccess(null);
    clearError();

    // Kiểm tra xác nhận mật khẩu
    if (passwordData.newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      setIsSubmittingPassword(false);
      return;
    }

    try {
      const success = await changePassword(passwordData);

      if (success) {
        setPasswordSuccess("Đổi mật khẩu thành công!");
        // Reset form đổi mật khẩu
        setPasswordData({
          currentPassword: "",
          newPassword: "",
        });
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("Lỗi đổi mật khẩu:", err);
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  // Hiển thị loading khi đang tải thông tin
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-lg">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Thông Tin Tài Khoản
      </h1>

      {/* Hiển thị thông báo lỗi */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Phần cập nhật thông tin cá nhân */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Thông Tin Cá Nhân</h2>

          {profileSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>{profileSuccess}</p>
            </div>
          )}

          <form onSubmit={handleProfileSubmit}>
            {/* Email (readonly) */}
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
                value={user?.email || ""}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                readOnly
              />
              <p className="text-sm text-gray-500 mt-1">
                Email không thể thay đổi
              </p>
            </div>

            {/* Họ và tên */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Họ và tên
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={profileData.phonenumber}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={profileData.address}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingProfile}
              className={`w-full py-2 px-4 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)] transition duration-300 ${
                isSubmittingProfile ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmittingProfile ? "Đang cập nhật..." : "Cập Nhật Thông Tin"}
            </button>
          </form>
        </div>

        {/* Phần đổi mật khẩu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Đổi Mật Khẩu</h2>

          {passwordSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              <p>{passwordSuccess}</p>
            </div>
          )}

          <form onSubmit={handlePasswordSubmit}>
            {/* Mật khẩu hiện tại */}
            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Mật khẩu mới */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingPassword}
              className={`w-full py-2 px-4 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-dark)] transition duration-300 ${
                isSubmittingPassword ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmittingPassword ? "Đang xử lý..." : "Đổi Mật Khẩu"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
