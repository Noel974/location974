const express = require('express');
const router = express.Router();
const voitureController = require('../controllers/VoitureControllerfdfd');
const upload = require('../middleware/Multer-config')

// Routes CRUD restreintes aux admins
router.post('/',upload, voitureController.createVoiture);

router.put('/:id', voitureController.updateVoiture);
router.delete('/:id', voitureController.deleteVoitureById);

// Routes accessibles à tous
router.get('/', voitureController.getAllVoitures);
router.get('/:id', voitureController.getVoitureById);

module.exports = router;
