// middleware/multer-config.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/config-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'location-automoto', // Dossier sur Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => file.originalname.split('.')[0] + '-' + Date.now(),
  },
});

const upload = multer({ storage });

module.exports = upload.fields([
  { name: 'photoPrincipale', maxCount: 1 },
  { name: 'autresPhotos', maxCount: 3 }
]);
