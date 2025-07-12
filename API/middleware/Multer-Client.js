// middleware/multer-config.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/config-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'location-client', // Dossier sur Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => file.originalname.split('.')[0] + '-' + Date.now(),
  },
});

const getUploadMiddleware = () => multer({ storage }).fields([
  { name: 'photoProfil', maxCount: 1 },
  { name: 'documentIdentite', maxCount: 1 }
]);

module.exports = getUploadMiddleware;
