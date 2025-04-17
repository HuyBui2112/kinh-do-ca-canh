import Link from "next/link";
import { categories } from "@/lib/types";
// import Image from "next/image";

// Danh sách sản phẩm nổi bật (ví dụ)
const featuredProducts = [
  {
    id: 1,
    name: "Cá Betta Halfmoon",
    slug: "ca-betta-halfmoon",
    price: 150000,
    salePrice: 120000,
    image: "/images/products/ca-betta-halfmoon.jpg",
    category: "Cá cảnh",
  },
  {
    id: 2,
    name: "Lọc thác Atman HF-0600",
    slug: "loc-thac-atman-hf-0600",
    price: 350000,
    salePrice: null,
    image: "/images/products/loc-thac-atman.jpg",
    category: "Phụ kiện",
  },
  {
    id: 3,
    name: "Cây thủy sinh Anubias",
    slug: "cay-thuy-sinh-anubias",
    price: 45000,
    salePrice: null,
    image: "/images/products/cay-anubias.jpg",
    category: "Thủy sinh",
  },
  {
    id: 4,
    name: "Thức ăn Tetra Pro Color",
    slug: "thuc-an-tetra-pro-color",
    price: 120000,
    salePrice: 99000,
    image: "/images/products/thuc-an-tetra.jpg",
    category: "Thức ăn",
  },
  {
    id: 5,
    name: "Cá vàng Ranchu",
    slug: "ca-vang-ranchu",
    price: 250000,
    salePrice: null,
    image: "/images/products/ca-vang-ranchu.jpg",
    category: "Cá cảnh",
  },
  {
    id: 6,
    name: "Máy sủi oxy Resun",
    slug: "may-sui-oxy-resun",
    price: 180000,
    salePrice: 150000,
    image: "/images/products/may-sui-oxy.jpg",
    category: "Phụ kiện",
  },
  {
    id: 7,
    name: "Cây Water Wisteria",
    slug: "cay-water-wisteria",
    price: 35000,
    salePrice: null,
    image: "/images/products/cay-water-wisteria.jpg",
    category: "Thủy sinh",
  },
  {
    id: 8,
    name: "Thức ăn Hikari Cichlid Gold",
    slug: "thuc-an-hikari-cichlid-gold",
    price: 165000,
    salePrice: null,
    image: "/images/products/thuc-an-hikari.jpg",
    category: "Thức ăn",
  },
];

// Danh sách tin tức mới nhất
const latestNews = [
  {
    id: 1,
    title: "Hướng dẫn chăm sóc cá Betta cho người mới nuôi",
    slug: "huong-dan-cham-soc-ca-betta-cho-nguoi-moi-nuoi",
    excerpt:
      "Tất tần tật những điều cần biết khi nuôi cá Betta từ điều kiện nước, thức ăn đến phòng bệnh...",
    image: "/images/news/huong-dan-cham-soc-ca-betta.jpg",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Top 5 loại cá dễ nuôi cho người mới bắt đầu",
    slug: "top-5-loai-ca-de-nuoi-cho-nguoi-moi-bat-dau",
    excerpt:
      "Những loại cá cảnh dễ nuôi, bền, đẹp phù hợp cho người mới tập chơi cá cảnh...",
    image: "/images/news/top-5-ca-de-nuoi.jpg",
    date: "2023-05-10",
  },
  {
    id: 3,
    title: "Cách setup bể thủy sinh cho người mới bắt đầu",
    slug: "cach-setup-be-thuy-sinh-cho-nguoi-moi-bat-dau",
    excerpt:
      "Hướng dẫn chi tiết cách setup một bể thủy sinh đơn giản nhưng hiệu quả cho người mới...",
    image: "/images/news/setup-be-thuy-sinh.jpg",
    date: "2023-05-05",
  },
];

// Định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

export default function Home() {
  return (
    <>
      {/* Banner Slider */}
      <section className="min-w-[320px] bg-gradient-to-r from-blue-500 to-cyan-500 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4">Kinh Đô Cá Cảnh</h1>
              <p className="text-xl mb-6">
                Thiên đường cá cảnh và phụ kiện thủy sinh chất lượng cao
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/san-pham"
                  className="bg-white text-blue-600 hover:bg-blue-50 py-2 px-6 rounded-full font-semibold transition-colors"
                >
                  Mua ngay
                </Link>
                <Link
                  href="/ve-chung-toi"
                  className="border border-white text-white hover:bg-white hover:text-blue-600 py-2 px-6 rounded-full font-semibold transition-colors"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center">
                <p className="text-center text-lg italic">
                  [Hình ảnh banner sẽ được đặt ở đây]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section className="min-w-[320px] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Danh mục sản phẩm
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <p className="text-center text-gray-800 font-medium p-4">
                      [Ảnh {category.name}]
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="min-w-[320px] py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Sản phẩm nổi bật</h2>
            <Link
              href="/san-pham"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/san-pham/${product.slug}`}>
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                      <p className="text-center text-gray-800 p-4">
                        [Ảnh {product.name}]
                      </p>
                    </div>
                    {product.salePrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                        Giảm{" "}
                        {Math.round(
                          (1 - product.salePrice / product.price) * 100
                        )}
                        %
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/san-pham/${product.slug}`}>
                    <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-red-600 mr-2">
                            {formatCurrency(product.salePrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-800">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
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
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner quảng cáo */}
      <section className="min-w-[320px] py-16 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Khuyến mãi đặc biệt</h2>
            <p className="text-xl mb-8">
              Giảm giá lên đến 30% cho tất cả sản phẩm trong tuần này
            </p>
            <Link
              href="/khuyen-mai"
              className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-8 rounded-full font-semibold text-lg transition-colors inline-block"
            >
              Xem ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Tin tức mới nhất */}
      <section className="min-w-[320px] py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Tin tức mới nhất</h2>
            <Link
              href="/tin-tuc"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/tin-tuc/${news.slug}`}>
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                      <p className="text-center text-gray-800 p-4">
                        [Ảnh {news.title}]
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(news.date).toLocaleDateString("vi-VN")}
                  </p>
                  <Link href={`/tin-tuc/${news.slug}`}>
                    <h3 className="text-xl font-semibold mb-3 hover:text-blue-600 transition-colors">
                      {news.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{news.excerpt}</p>
                  <Link
                    href={`/tin-tuc/${news.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    Đọc tiếp
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
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
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Đăng ký nhận khuyến mãi */}
      <section className="min-w-[320px] py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Đăng ký nhận khuyến mãi</h2>
            <p className="text-gray-600 mb-8">
              Đăng ký để nhận thông tin về sản phẩm mới, khuyến mãi và mẹo chăm
              sóc thú cưng.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
