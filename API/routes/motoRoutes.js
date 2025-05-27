const express = require('express');
const router = express.Router();
const motoController = require('../controllers/motoController');
const authAdmin = require('../middleware/authAdmin');
const upload = require('../middleware/multer-config'); // Cloudinary + multer configuré

// 🛡 Routes protégées (admin uniquement)
router.post('/', upload, motoController.createMoto);
router.put('/:id', upload, motoController.updateMoto);
router.delete('/:id', motoController.deleteMotoById);

// 🌐 Routes publiques
router.get('/', motoController.getAllMotos);
router.get('/:id', motoController.getMotoById);

module.exports = router;
