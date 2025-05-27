const express = require('express');
const router = express.Router();
const entretienController = require('../controllers/entretienController');


router.post('/', entretienController.createEntretien);
router.put('/:id',  entretienController.updateEntretien);
router.delete('/:id', entretienController.deleteEntretien);
router.get('/', entretienController.getEntretiens);

module.exports = router;
