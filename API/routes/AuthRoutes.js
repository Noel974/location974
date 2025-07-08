const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// Routes pour chaque type d'utilisateur
router.post('/admin/login', authController.loginAdmin);
router.post('/employe/login', authController.loginEmploye);

module.exports = router;
