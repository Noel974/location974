const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientControllefeer');
const authClient = require('../middleware/AuthClient');
const authAdmin = require('../middleware/AuthAdmin'); // Pour suppression admin

// Routes accessibles aux clients eux-mêmes
router.post('/register', clientController.createClient);
router.post('/login', clientController.loginClient); 

router.get('/profile', authClient, clientController.getClientProfile);
router.put('/profile', authClient, clientController.updateClientProfile);

// Route accessible uniquement aux admins
router.delete('/:id', authAdmin, clientController.deleteClient); // Suppression par l’admin

module.exports = router;