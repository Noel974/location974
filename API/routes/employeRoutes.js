const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');
const authAdmin = require('../middleware/authAdmin'); // Vérifie que l'utilisateur est admin

// Routes CRUD restreintes aux admins
router.post('/', authAdmin, employeController.createEmploye);
router.get('/', authAdmin, employeController.getAllEmployes);
router.put('/promote/:id', authAdmin, employeController.promoteEmploye); // Promotion en admin
router.delete('/:id', authAdmin, employeController.deleteEmploye);

module.exports = router;
