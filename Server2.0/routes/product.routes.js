import express from 'express';
import product from '../methods/product.method.js';
import { createUploadMiddleware } from '../middlewares/upload.middleware.js';
import { createUploadRoute } from './routeHelper.js';

const router = express.Router();


const uploadProduct = createUploadMiddleware('products', 'image');


createUploadRoute(router, '/create', uploadProduct, product.createProduct);


const uploadProductImage = createUploadMiddleware('products', 'image');

router.post('/update-image', uploadProductImage, async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const imagePath = req.file ? `/assets/products/${req.file.filename}` : null;
    const { productId } = req.body;

    if (!productId || !imagePath) {
      return res.status(400).json({
        success: false,
        data: {
          error: -21212,
          message: 'Missing required fields: productId or imagePath',
        },
      });
    }

    const result = await product.updateProductImage({ productId, imagePath });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('Error updating product image:', err);
    res.status(500).json({ success: false, message: 'Помилка при оновленні фото' });
  }
});

export default router;
