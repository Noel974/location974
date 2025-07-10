const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');
const { verifyToken } = require('../middleware/AuthClient');

router.get('/client/profile', verifyToken, clientController.getClientProfile);


router.post('/client/register', clientController.registerClient);
router.post('/client/login', clientController.loginClient);


module.exports = router;
