const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/AuthClient');
const reservationController = require('../controllers/ReservationController');

router.post('/create', verifyToken, reservationController.creerReservation);

module.exports = router;
