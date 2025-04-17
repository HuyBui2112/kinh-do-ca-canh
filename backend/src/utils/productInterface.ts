import { IPrice } from '../models/product';

// Enum cho category
export enum ProductCategory {
  CA_CANH = 'ca-canh',
  THUC_AN = 'thuc-an',
  THUOC = 'thuoc',
  BE_CA = 'be-ca',
  THUC_VAT = 'thuc-vat-thuy-sinh',
  THIET_BI = 'thiet-bi',
  PHU_KIEN = 'phu-kien',
  PHAN_COT_NEN = 'phan-cot-nen'
}

// Enum cho sort
export enum SortOption {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  RATING_ASC = 'rating_asc',
  RATING_DESC = 'rating_desc',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc'
}

// Interface cho response item
export interface ProductListItem {
  id: string;
  name: string;
  price: IPrice;
  image: {
    url: string;
    alt: string;
  };
  category: ProductCategory;
  stock: number;
  rating: number;
}

// Interface cho query params
export interface GetProductsQuery {
  page?: string;
  limit?: string;
  category?: ProductCategory;
  sortBy?: SortOption;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  maxRating?: string;
  inStock?: string;
  search?: string;
  specification?: {
    key: string;
    value: string;
  };
}

// Interface cho response
export interface ProductListResponse {
  success: boolean;
  message: string;
  data: {
    products: ProductListItem[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalItems: number;
    };
  };
  error?: any;
}

// Các giá trị cho specification theo category
export const SPECIFICATION_VALUES = {
  'ca-canh': {
    'loai-ca': ['Betta', 'Guppy', 'Vàng', 'Mún, Molly', 'Dĩa', 'Rồng', 'La Hán', 'Neon', 'Chuột', 'Otto', 'Sơn Đá/Bút Chì'],
    'muc-do': ['Dễ', 'Vừa', 'Khó']
  },
  'thuc-an': {
    'dang-thuc-an': ['Viên', 'Mảnh', 'Bột', 'Khối', 'Tươi']
  },
  'thuoc': {
    'cong-dung': ['Trị nấm', 'Trị vi khuẩn', 'Trị ký sinh', 'Tăng đề kháng', 'Kháng sinh', 'Diệt tảo', 'Bổ sung vitamin']
  },
  'be-ca': {
    'dung-tich': ['< 20', '20 - 50', '50 - 150', '> 150'],
    'chat-lieu': ['Thủy tinh', 'Mica', 'Khác'],
    'hinh-dang': ['Vuông', 'Tròn', 'Khác']
  },
  'thuc-vat-thuy-sinh': {
    'loai-cay': ['Ngập nước', 'Bán ngập nước', 'Nổi']
  },
  'thiet-bi': {
    'loai-thiet-bi': ['Chiếu sáng', 'Lọc nước', 'Sủi oxy', 'Bơm nước', 'Sưởi bể'],
    'che-do': ['Tự động', 'Cảm biến', 'Thủ công']
  },
  'phu-kien': {
    'chat-lieu': ['Nhựa', 'Đá', 'Gỗ', 'Kim loại']
  },
  'phan-cot-nen': {
    'loai': ['Phân nền', 'Cốt nền', 'Bổ sung vi lượng'],
    'thanh-phan': ['NPK', 'Vi lượng', 'Hữu cơ']
  }
} as const; 