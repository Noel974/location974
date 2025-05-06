const express = require('express');
const router = express.Router();
const voitureController = require('../controllers/voitureController');
const authAdmin = require('../middleware/authAdmin'); // Ajout du middleware

// Routes CRUD restreintes aux admins
router.post('/', authAdmin, voitureController.createVoiture);
router.put('/:id', authAdmin, voitureController.updateVoiture);
router.delete('/:id', authAdmin, voitureController.deleteVoiture);

// Routes accessibles à tous
router.get('/', voitureController.getAllVoitures);
router.get('/:id', voitureController.getVoitureById);

module.exports = router;
