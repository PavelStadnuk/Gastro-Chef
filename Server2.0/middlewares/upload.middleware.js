import multer from 'multer';
import path from 'path';
import fs from 'fs';


export const createUploadMiddleware = (folderName, fieldName) => {
  const uploadDir = path.join('assets', folderName);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });

  return [
    upload.single(fieldName),
    (req, res, next) => {
      if (req.file) req.body[fieldName] = `/assets/${folderName}/${req.file.filename}`;
      next();
    }
  ];
};


export const createMultipleUploadMiddleware = (folderName, fields) => {
  const uploadDir = path.join('assets', folderName);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });

  return [
    upload.fields(fields),
    (req, res, next) => {
      if (req.files) {
        for (const key in req.files) {
          if (req.files[key] && req.files[key][0]) {
            req.body[key] = `/assets/${folderName}/${req.files[key][0].filename}`;
          }
        }
      }
      next();
    }
  ];
};
