import mongoose, { Document, Schema, Types } from 'mongoose';

// Định nghĩa interface cho Image
export interface IImage {
  url: string;
  alt: string;
}

// Định nghĩa interface cho Price
export interface IPrice {
  price: number;
  discount: number;
}

// Định nghĩa interface cho IDetail
export interface IDetail {
    key: string;
    value: string;
}

// Định nghĩa interface cho SeoInfo
export interface ISeoInfo {
  title: string;
  description: string;
  image: string;
  keywords: string[];
  slug: string;
}

// Định nghĩa interface cho Product document
export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: IPrice;
  imageList: IImage[];
  category: string;
  specification: IDetail[];
  seoInfo: ISeoInfo;
  stock: number;
  rating: number;
  numReviews: number;
  isBestSeller: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema cho Image
const ImageSchema = new Schema<IImage>({
  url: { type: String, required: true },
  alt: { type: String, required: true }
});

// Schema cho Price
const PriceSchema = new Schema<IPrice>({
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }
});

// Schema cho Detail
const DetailSchema = new Schema<IDetail>({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

// Schema cho SeoInfo
const SeoInfoSchema = new Schema<ISeoInfo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  keywords: [{ type: String }],
  slug: { type: String, required: true, unique: true }
});

// Schema chính cho Product
const ProductSchema = new Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: [true, 'Tên sản phẩm là bắt buộc'],
      trim: true 
    },
    description: { 
      type: String, 
      required: [true, 'Mô tả sản phẩm là bắt buộc'] 
    },
    price: { 
      type: PriceSchema, 
      required: true 
    },
    imageList: [{ 
      type: ImageSchema, 
      required: true,
      validate: [(val: IImage[]) => val.length > 0, 'Phải có ít nhất 1 hình ảnh']
    }],
    category: { 
      type: String, 
      required: [true, 'Danh mục sản phẩm là bắt buộc'] 
    },
    specification: [{ 
      type: DetailSchema 
    }],
    seoInfo: { 
      type: SeoInfoSchema, 
      required: true 
    },
    stock: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isBestSeller: { 
      type: Boolean, 
      default: false 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Index cho tìm kiếm
ProductSchema.index({ name: 'text', description: 'text', 'seoInfo.keywords': 'text' });

// Middleware trước khi lưu để đảm bảo slug là unique
ProductSchema.pre('save', async function(next) {
  if (this.isModified('seoInfo.slug')) {
    const Product = mongoose.model('Product');
    const slugExists = await Product.findOne({ 'seoInfo.slug': this.seoInfo.slug });
    if (slugExists && !slugExists._id.equals(this._id)) {
      throw new Error('Slug đã tồn tại');
    }
  }
  next();
});

// Export model
const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
