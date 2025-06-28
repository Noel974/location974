const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authClient = require('../middleware/authClient');
const authAdmin = require('../middleware/authAdmin'); // Pour suppression admin

// Routes accessibles aux clients eux-mêmes
router.get('/profile', authClient, clientController.getClientProfile);
router.put('/profile', authClient, clientController.updateClientProfile);

// Route accessible uniquement aux admins
router.delete('/:id', authAdmin, clientController.deleteClient); // Suppression par l’admin

module.exports = router;