const express = require('express');
const router = express.Router();
const motoController = require('../controllers/motoController');
const authAdmin = require('../middleware/authAdmin'); // Ajout du middleware

// Routes CRUD restreintes aux admins
router.post('/', authAdmin, motoController.createMoto);
router.put('/:id', authAdmin, motoController.updateMoto);
router.delete('/:id', authAdmin, motoController.deleteMoto);

// Routes accessibles à tous
router.get('/', motoController.getAllMotos);
router.get('/:id', motoController.getMotoById);

module.exports = router;
