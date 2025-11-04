import express from 'express';
import category from '../methods/category.method.js';
import { createMultipleUploadMiddleware } from '../middlewares/upload.middleware.js';
import { createUploadRoute } from './routeHelper.js';

const router = express.Router();

// middleware для категорій (два файли: mainImage і image)
const uploadCategory = createMultipleUploadMiddleware('categories', [
  { name: 'mainImage', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

// 🟢 створення нової категорії
createUploadRoute(router, '/create', uploadCategory, category.createCategory);

// 🟦 оновлення фото існуючої категорії
router.post('/update-images', uploadCategory, async (req, res) => {
  try {
    const { categoryId } = req.body;
    const mainImage = req.body.mainImage || null;
    const image = req.body.image || null;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Missing categoryId',
      });
    }

    const result = await category.updateCategoryImages({
      categoryId,
      mainImage,
      image,
    });

    res.json({ success: true, data: result });
  } catch (err) {
    console.error('❌ Error updating category images:', err);
    res.status(500).json({
      success: false,
      message: 'Помилка при оновленні зображень',
    });
  }
});

export default router;
