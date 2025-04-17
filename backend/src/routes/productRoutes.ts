import express from 'express';
import { createProduct, getProducts, getProductDetail } from '../controllers/productController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Route công khai (không cần xác thực)
router.get('/products', getProducts);
router.get('/products/:id', getProductDetail);

// Route cần xác thực admin
router.post('/products', auth, createProduct);

export default router; 