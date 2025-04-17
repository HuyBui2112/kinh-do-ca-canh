import { Request, Response } from 'express';
import Product from '../models/product';
import { IImage, IPrice, IDetail, ISeoInfo, IProduct } from '../models/product';
import { GetProductsQuery, ProductListResponse, SortOption, ProductCategory } from '../utils/productInterface';
import slugify from 'slugify';

// Interface cho request tạo sản phẩm mới
interface CreateProductRequest {
  name: string;
  description: string;
  price: IPrice;
  imageList: IImage[];
  category: string;
  specification: IDetail[];
  seoInfo: ISeoInfo;
  stock: number;
  isBestSeller?: boolean;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

/**
 * Tạo một hoặc nhiều sản phẩm mới
 * @route POST /api/products
 * @param req Request với body là một sản phẩm hoặc mảng sản phẩm
 * @param res Response với thông tin sản phẩm đã tạo
 */
export const createProduct = async (
  req: Request<{}, {}, CreateProductRequest | CreateProductRequest[]>,
  res: Response<ApiResponse>
) => {
  try {
    // Kiểm tra và chuyển đổi dữ liệu đầu vào
    const productsToCreate: CreateProductRequest[] = Array.isArray(req.body) ? req.body : [req.body];

    // Validate từng sản phẩm
    for (const product of productsToCreate) {
      // Validate giá
      if (product.price.price < 0) {
        return res.status(400).json({
          success: false,
          message: `Giá sản phẩm "${product.name}" không thể âm`
        });
      }

      // Validate giảm giá
      if (product.price.discount < 0 || product.price.discount > 100) {
        return res.status(400).json({
          success: false,
          message: `Giảm giá của sản phẩm "${product.name}" phải từ 0-100%`
        });
      }

      // Validate hình ảnh
      if (!product.imageList || product.imageList.length === 0) {
        return res.status(400).json({
          success: false,
          message: `Sản phẩm "${product.name}" phải có ít nhất 1 hình ảnh`
        });
      }
    }

    // Kiểm tra slug trùng lặp
    const slugs = productsToCreate.map(product => product.seoInfo.slug);
    const existingSlugs = await Product.find({
      'seoInfo.slug': { $in: slugs }
    }).select('seoInfo.slug');

    if (existingSlugs.length > 0) {
      const duplicateSlugs = existingSlugs.map(product => product.seoInfo.slug).join(', ');
      return res.status(400).json({
        success: false,
        message: `Các slug sau đã tồn tại: ${duplicateSlugs}`
      });
    }

    // Chuẩn bị dữ liệu để tạo sản phẩm
    const productsData = productsToCreate.map(product => ({
      ...product,
      rating: 0,
      numReviews: 0,
      isActive: true,
      isBestSeller: product.isBestSeller || false
    }));

    // Tạo sản phẩm trong database
    const savedProducts = await Product.insertMany(productsData);

    // Trả về response thành công
    res.status(201).json({
      success: true,
      message: Array.isArray(req.body)
        ? `Đã tạo thành công ${savedProducts.length} sản phẩm`
        : 'Tạo sản phẩm thành công',
      data: Array.isArray(req.body) ? savedProducts : savedProducts[0]
    });

  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo sản phẩm',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

/**
 * Lấy danh sách sản phẩm với các tùy chọn lọc và sắp xếp
 * @route GET /api/products
 */
export const getProducts = async (
  req: Request<{}, {}, {}, GetProductsQuery>,
  res: Response<ProductListResponse>
) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '10');
    const skip = (page - 1) * limit;

    // Xây dựng query
    const filter: any = { isActive: true };

    // Lọc theo category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Lọc theo khoảng giá (sau khi giảm giá)
    if (req.query.minPrice || req.query.maxPrice) {
      filter.$expr = { $let: {
        vars: {
          finalPrice: {
            $subtract: [
              '$price.price',
              { $multiply: ['$price.price', { $divide: ['$price.discount', 100] }] }
            ]
          }
        },
        in: {
          $and: [
            req.query.minPrice ? { $gte: ['$$finalPrice', parseInt(req.query.minPrice)] } : true,
            req.query.maxPrice ? { $lte: ['$$finalPrice', parseInt(req.query.maxPrice)] } : true
          ]
        }
      }};
    }

    // Lọc theo rating
    if (req.query.minRating || req.query.maxRating) {
      filter.rating = {};
      if (req.query.minRating) filter.rating.$gte = parseFloat(req.query.minRating);
      if (req.query.maxRating) filter.rating.$lte = parseFloat(req.query.maxRating);
    }

    // Lọc theo còn hàng
    if (req.query.inStock === 'true') {
      filter.stock = { $gt: 0 };
    }

    // Lọc theo specification
    if (req.query.specification) {
      filter['specification'] = {
        $elemMatch: {
          key: req.query.specification.key,
          value: req.query.specification.value
        }
      };
    }

    // Xử lý tìm kiếm theo tên
    if (req.query.search) {
      const searchRegex = new RegExp(slugify(req.query.search, {
        lower: true,
        locale: 'vi',
        strict: true
      }), 'i');

      const allProducts = await Product.find({ isActive: true }).select('name');
      const matchedIds = allProducts
        .filter(product => {
          const normalizedName = slugify(product.name, {
            lower: true,
            locale: 'vi',
            strict: true
          });
          return searchRegex.test(normalizedName);
        })
        .map(product => product._id);

      filter._id = { $in: matchedIds };
    }

    // Xây dựng sort options
    let sortOptions: any = {};
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case SortOption.PRICE_ASC:
          sortOptions['price.price'] = 1;
          break;
        case SortOption.PRICE_DESC:
          sortOptions['price.price'] = -1;
          break;
        case SortOption.RATING_ASC:
          sortOptions.rating = 1;
          break;
        case SortOption.RATING_DESC:
          sortOptions.rating = -1;
          break;
        case SortOption.NAME_ASC:
          sortOptions.name = 1;
          break;
        case SortOption.NAME_DESC:
          sortOptions.name = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    } else {
      sortOptions.createdAt = -1;
    }

    // Thực hiện query
    const [products, totalItems] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .select('name price imageList category stock rating'),
      Product.countDocuments(filter)
    ]);

    // Format response data
    const formattedProducts = products.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.imageList[0],
      category: product.category as ProductCategory,
      stock: product.stock,
      rating: product.rating
    }));

    // Tính toán phân trang
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      success: true,
      message: 'Lấy danh sách sản phẩm thành công',
      data: {
        products: formattedProducts,
        pagination: {
          page,
          limit,
          totalPages,
          totalItems
        }
      }
    });

  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error instanceof Error ? error.message : 'Unknown error',
      data: { products: [], pagination: { page: 1, limit: 10, totalPages: 0, totalItems: 0 } }
    });
  }
};

/**
 * Lấy chi tiết sản phẩm theo ID
 * @route GET /api/products/:id
 */
export const getProductDetail = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IProduct>>
) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }

    if (!product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Sản phẩm không còn hoạt động'
      });
    }

    res.json({
      success: true,
      message: 'Lấy chi tiết sản phẩm thành công',
      data: product
    });

  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy chi tiết sản phẩm',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
