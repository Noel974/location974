require('dotenv').config(); // Chargement des variables d'environnement

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Sécurité HTTP
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 🔐 Configuration CORS
const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://admin-locationvoiture.netlify.app", // admin prod
  "https://auto-localuxe.netlify.app" // client prod
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origine non autorisée par CORS"));
    }
  },
  credentials: true,
}));

// 📦 Importation des routes
const authRoutes = require('./routes/AuthRoutes');
const employeRoutes = require('./routes/EmployeRoutes');
const clientRoutes = require('./routes/ClientRoutes');
const voitureRoutes = require('./routes/VoitureRoutes');
const motoRoutes = require('./routes/MotoRoutes');
const avisRoutes = require('./routes/AvisRoutes');
const dashboardRoutes = require('./routes/DashboardRoutes');
const entretienRoutes = require('./routes/EntretienRoutes');

// 🔁 Cron Job
require('./cron/PasswordGeneratorl');

// 🛣️ Montage des routes
app.get("/", (req, res) => {
  res.send("✅ API Location fonctionne !");
});
app.use('/api/auth', authRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/voitures', voitureRoutes);
app.use('/api/moto', motoRoutes);
app.use('/api/avis', avisRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/entretien', entretienRoutes);

// 🧠 Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  const PORT = process.env.PORT || 3100;
  app.listen(PORT, () => console.log(`✅ API démarrée sur http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ Erreur de connexion à MongoDB :', err);
});

module.exports = app;
