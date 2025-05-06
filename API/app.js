require('dotenv').config(); // Chargement des variables d'environnement

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

// Importation des routes
const authRoutes = require('./routes/authRoutes'); // Gestion des connexions
const employeRoutes = require('./routes/employeRoutes'); // Gestion des employés
const clientRoutes = require('./routes/clientRoutes'); // Gestion des clients
const voitureRoutes = require('./routes/voitureRoutes'); // Gestion des voitures
const motoRoutes = require('./routes/motoRoutes'); // Gestion des motos


// Activation du cron
require('./cron/passwordGenerator');

const app = express();

// Configuration des middlewares
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Définition des headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Configuration des routes
// Configuration des routes
app.use('/api/auth', authRoutes); // Authentification (admin, employé, client)
app.use('/api/employes', employeRoutes); // Gestion des employés
app.use('/api/clients', clientRoutes); // Gestion des clients
app.use('/api/voitures', voitureRoutes); // Gestion des voitures
app.use('/api/moto', motoRoutes); // Gestion des motos


// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(3000, () => console.log('API démarrée sur http://localhost:3100')))
    .catch(err => console.error('Erreur de connexion à MongoDB :', err));


module.exports = app;