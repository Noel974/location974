const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthControllerdf');

// Routes pour chaque type d'utilisateur
router.post('/admin/login', authController.loginAdmin);
router.post('/employe/login', authController.loginEmploye);
router.post('/client/login', authController.loginClient);

module.exports = router;
