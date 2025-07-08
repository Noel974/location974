const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.post('/client/login', clientController.loginClient);
router.post('/client/register', clientController.registerClient);


module.exports = router;