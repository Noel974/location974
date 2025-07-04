const express = require('express');
const router = express.Router();
const avisController = require('../controllers/AvisController');
const authClient = require('../middleware/AuthClientddfd');

// Route pour ajouter un avis (seuls les clients)
router.post('/', authClient, avisController.createAvis);

// Route pour récupérer les avis d'un véhicule
router.get('/:idVehicule', avisController.getAvisByVehicule);

// Route pour supprimer un avis (client auteur ou admin)
router.delete('/:id', authClient, avisController.deleteAvis);

module.exports = router;
