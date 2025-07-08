const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.post('/client/register', clientController.registerClient);
router.post('/client/login', clientController.loginClient);

module.exports = router;
