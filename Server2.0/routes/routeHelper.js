export const createUploadRoute = (router, path, uploadMiddleware, controllerMethod) => {
  router.post(path, uploadMiddleware, async (req, res) => {
    try {
      // для категорій з кількома файлами
      if (req.files) {
        if (req.files.mainImage) {
          req.body.mainImage = `/assets/categories/${req.files.mainImage[0].filename}`;
        }
        if (req.files.image) {
          req.body.image = `/assets/categories/${req.files.image[0].filename}`;
        }

        // для продуктів
        if (req.file) {
          req.body.imagePath = `/assets/products/${req.file.filename}`;
        }
      }

      const result = await controllerMethod(req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Помилка при створенні' });
    }
  });
};
