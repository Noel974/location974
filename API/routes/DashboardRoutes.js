const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/DashboardController");

// Route pour récupérer les statistiques en temps réel
router.get("/", DashboardController.getStats);

module.exports = router;
