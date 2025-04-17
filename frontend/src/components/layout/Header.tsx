"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks";
import { categories } from "@/lib/types";

// Menu chính cho website
const mainMenu = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "#", hasSubmenu: true },
  { name: "Bài viết", href: "/bai-viet" },
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useRef(false);

  // Lấy thông tin user từ AuthContext
  const { user, isAuthenticated, logout, loading } = useAuth();

  // State để quản lý trạng thái đang đăng xuất
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Đánh dấu component đã được mount vào DOM
  useEffect(() => {
    setMounted(true);
  }, []);

  // Kiểm tra xem menu item có đang active không dựa vào path
  const isActive = (href: string, hasSubmenu = false): boolean => {
    // Chỉ thực hiện kiểm tra khi component đã được mount
    if (!mounted) return false;

    if (href === "/" && pathname === "/") return true;
    if (href === "/bai-viet" && pathname?.startsWith("/bai-viet")) return true;
    if (href === "/ve-chung-toi" && pathname?.startsWith("/ve-chung-toi"))
      return true;

    // Kiểm tra đặc biệt cho menu Sản phẩm (so sánh với danh sách categories)
    if (hasSubmenu && pathname) {
      // Cắt bỏ dấu / đầu tiên để lấy phần slug
      const currentSlug = pathname.split("/")[1];
      // Kiểm tra xem slug hiện tại có thuộc danh sách categories không
      return categories.some((category) => category.slug === currentSlug);
    }

    return false;
  };

  // Xử lý click bên ngoài dropdown để đóng dropdown (chỉ áp dụng cho desktop)
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      // Bỏ qua xử lý click outside nếu đang ở mobile menu
      if (isMobile.current) return;

      // Kiểm tra nếu click bên ngoài dropdown và nút
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpenSubmenu(null);
      }
    };

    const checkIfMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };

    // Kiểm tra lần đầu
    checkIfMobile();

    // Thêm event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleToggleSubmenu = (
    name: string,
    isMobileClick: boolean = false
  ) => {
    // Chỉ xử lý toggle khi ở mobile menu hoặc khi sự kiện được đánh dấu là từ mobile
    if (isMobileClick) {
      setOpenSubmenu((prevState) => (prevState === name ? null : name));
    } else if (!isMobile.current) {
      // Ở desktop, chỉ mở submenu
      setOpenSubmenu(name);
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(
        `/ket-qua-tim-kiem?q=${encodeURIComponent(searchTerm.trim())}`
      );
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // Gọi logout từ context, việc chuyển trang và xử lý localStorage đã được xử lý trong context
      await logout();
      // Không cần thêm logic chuyển trang ở đây nữa
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Hiển thị skeleton loading khi đang kiểm tra trạng thái đăng nhập
  const renderAuthLinks = () => {
    if (!mounted || loading) {
      return (
        <div className="flex items-center space-x-3">
          <div className="h-4 w-16 bg-white/20 animate-pulse rounded"></div>
          <span>|</span>
          <div className="h-4 w-16 bg-white/20 animate-pulse rounded"></div>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-3">
          <Link
            href="/thong-tin-nguoi-dung"
            className="text-white hover:text-white/80"
          >
            {user?.fullname || "Tài khoản"}
          </Link>
          <span>|</span>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-white hover:text-white/80 cursor-pointer disabled:opacity-70"
          >
            {isLoggingOut ? "Đang xử lý..." : "Đăng xuất"}
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Link href="/dang-nhap" className="text-white hover:text-white/80">
          Đăng nhập
        </Link>
        <span>|</span>
        <Link href="/dang-ky" className="text-white hover:text-white/80">
          Đăng ký
        </Link>
      </div>
    );
  };

  return (
    <header className="min-w-[320px] bg-white shadow-sm sticky top-0 z-50">
      {/* Top header với thông tin liên hệ */}
      <div className="bg-[var(--primary)] text-white">
        <div className="container py-2 flex items-center min-[530px]:justify-between justify-end text-sm">
          <div className="hidden min-[530px]:flex items-center space-x-4">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              0123.456.789
            </span>
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              info@kinhdocacanh.vn
            </span>
          </div>

          {/* Phần đăng nhập/đăng ký/tài khoản */}
          {renderAuthLinks()}
        </div>
      </div>

      {/* Main header với logo và menu */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div>
              {/* Logo lớn cho màn hình từ lg trở lên */}
              <div className="hidden lg:block">
                <Image
                  src="/logos/kinhdocacanh-logo-full.png"
                  alt="Logo Kinh Đô Cá Cảnh"
                  width={220}
                  height={44}
                />
              </div>

              {/* Logo vừa cho màn hình md và nhỏ hơn */}
              <div className="hidden min-[374px]:block lg:hidden">
                <Image
                  src="/logos/kinhdocacanh-logo-half-full.png"
                  alt="Logo Kinh Đô Cá Cảnh"
                  width={180}
                  height={36}
                />
              </div>

              {/* Logo vừa cho màn hình nhỏ hơn 374px */}
              <div className="block min-[374px]:hidden">
                <Image
                  src="/logos/kinhdocacanh-logo-small.png"
                  alt="Logo Kinh Đô Cá Cảnh"
                  width={36}
                  height={36}
                />
              </div>
            </div>
          </Link>

          {/* Desktop Menu - Chỉ hiển thị trên thiết bị lớn hơn 767px */}
          <nav className="hidden md:flex items-center space-x-6">
            {mainMenu.map((item) => (
              <div
                key={item.name}
                className={`relative ${item.hasSubmenu ? "group" : ""}`}
              >
                {item.hasSubmenu ? (
                  <button
                    ref={buttonRef}
                    className={`text-sm font-medium ${
                      mounted && isActive(item.href, item.hasSubmenu)
                        ? "text-[var(--primary)] font-semibold"
                        : "text-gray-700 hover:text-[var(--primary)]"
                    } transition-colors flex items-center`}
                    onClick={() => handleToggleSubmenu(item.name)}
                    onMouseEnter={() => handleToggleSubmenu(item.name)}
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium ${
                      mounted && isActive(item.href)
                        ? "text-[var(--primary)] font-semibold"
                        : "text-gray-700 hover:text-[var(--primary)]"
                    } transition-colors flex items-center`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Submenu cho danh mục sản phẩm - Hiển thị khi hover HOẶC click */}
                {item.hasSubmenu && (
                  <div
                    ref={dropdownRef}
                    className={`absolute top-full left-0 bg-white shadow-md rounded-md py-2 mt-1 w-56 z-50 ${
                      openSubmenu === item.name
                        ? "block"
                        : "hidden group-hover:block"
                    }`}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        className={`block px-4 py-2 text-sm ${
                          mounted && pathname === `/${category.slug}`
                            ? "text-[var(--primary)] font-medium bg-gray-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]"
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-[var(--primary)]"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Cart Button */}
            <Link
              href="/gio-hang"
              className={`p-2 ${
                mounted && pathname === "/gio-hang"
                  ? "text-[var(--primary)]"
                  : "text-gray-500 hover:text-[var(--primary)]"
              } relative`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* Mobile menu button - CHỈ hiển thị trên thiết bị nhỏ hơn 768px */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-500 hover:text-[var(--primary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar (toggleable) */}
        {searchOpen && (
          <div className="mt-4 relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full p-2 pl-10 border text-black border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <button type="submit" className="hidden">
                Tìm kiếm
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu - CHỈ hiển thị khi mobileMenuOpen = true */}
        {mobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
            ref={mobileMenuRef}
          >
            <nav className="flex flex-col space-y-2">
              {mainMenu.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    {item.hasSubmenu ? (
                      <button
                        onClick={() => handleToggleSubmenu(item.name, true)}
                        className={`text-base font-medium ${
                          mounted && isActive(item.href, item.hasSubmenu)
                            ? "text-[var(--primary)] font-semibold"
                            : "text-gray-700 hover:text-[var(--primary)]"
                        } py-2 text-left flex-1`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`text-base font-medium ${
                          mounted && isActive(item.href)
                            ? "text-[var(--primary)] font-semibold"
                            : "text-gray-700 hover:text-[var(--primary)]"
                        } py-2`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                    {item.hasSubmenu && (
                      <button
                        onClick={() => handleToggleSubmenu(item.name, true)}
                        className="p-2 text-gray-500"
                        aria-label="Mở/Đóng danh mục con"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {openSubmenu === item.name ? (
                            <polyline points="18 15 12 9 6 15"></polyline>
                          ) : (
                            <polyline points="6 9 12 15 18 9"></polyline>
                          )}
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Submenu cho mobile */}
                  {item.hasSubmenu && openSubmenu === item.name && (
                    <div className="pl-4 py-2 space-y-2 border-l border-gray-200 ml-2 mt-1">
                      {categories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/${category.slug}`}
                          className={`block py-1 text-sm ${
                            mounted && pathname === `/${category.slug}`
                              ? "text-[var(--primary)] font-medium"
                              : "text-gray-600 hover:text-[var(--primary)]"
                          }`}
                          onClick={(e) => {
                            // Ngăn sự kiện lan truyền để không đóng dropdown
                            e.stopPropagation();
                            setMobileMenuOpen(false);
                          }}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Hiển thị thêm menu tài khoản ở mobile nếu đã đăng nhập */}
              {mounted && isAuthenticated && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link
                    href="/thong-tin-nguoi-dung"
                    className="block text-base font-medium py-2 text-gray-700 hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Thông tin tài khoản
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    disabled={isLoggingOut}
                    className="block text-base font-medium py-2 text-gray-700 hover:text-[var(--primary)] text-left w-full disabled:opacity-70"
                  >
                    {isLoggingOut ? "Đang xử lý..." : "Đăng xuất"}
                  </button>
                </div>
              )}

              {/* Hiển thị skeleton loading cho menu mobile khi đang kiểm tra trạng thái đăng nhập */}
              {!mounted || loading ? (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="h-8 bg-gray-200 animate-pulse rounded my-2"></div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                </div>
              ) : null}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
