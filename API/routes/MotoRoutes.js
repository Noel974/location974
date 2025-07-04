const express = require('express');
const router = express.Router();
const motoController = require('../controllers/MotoController');
const authAdmin = require('../middleware/AuthAdminfff');
const upload = require('../middleware/Multer-configdsds'); // Cloudinary + multer configuré

// 🛡 Routes protégées (admin uniquement)
router.post('/', upload, motoController.createMoto);
router.put('/:id', upload, motoController.updateMoto);
router.delete('/:id', motoController.deleteMotoById);

// 🌐 Routes publiques
router.get('/', motoController.getAllMotos);
router.get('/:id', motoController.getMotoById);

module.exports = router;
