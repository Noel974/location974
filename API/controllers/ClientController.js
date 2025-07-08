const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//client
exports.registerClient = async (req, res) => {
  try {
    console.log('➡️ Requête reçue sur /client/register');
    console.log('Corps reçu :', req.body);

    const { nom, prenom, email, motDePasse } = req.body;

    if (!nom || !prenom || !email || !motDePasse) {
      console.log('❌ Champs manquants');
      return res.status(400).json({ message: "Tous les champs requis doivent être fournis." });
    }

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      console.log('⚠️ Email déjà utilisé');
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const client = await Client.create({
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
    });

    console.log('✅ Client créé avec succès :', client._id);
    res.status(201).json({ message: "Inscription réussie !", client });
  } catch (error) {
    console.error('🔥 Erreur dans registerClient :', error);
    res.status(500).json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
};


exports.loginClient = async (req, res) => {
  try {
      const { email, motDePasse } = req.body;

      if (!email || !motDePasse) {
          return res.status(400).json({ message: "Email et mot de passe requis." });
      }

      // Vérifier si le client existe
      const client = await Client.findOne({ email });
      if (!client) {
          return res.status(401).json({ message: "Identifiants invalides." });
      }

      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
      if (!isMatch) {
          return res.status(401).json({ message: "Mot de passe incorrect." });
      }

      // Générer un token JWT
      const token = jwt.sign({ id: client._id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.status(200).json({ message: "Connexion réussie !", token });
  } catch (error) {
      res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findById(id).select('-motDePasse'); // on masque le mot de passe
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération du client :", error);
    res.status(500).json({ message: "Erreur lors de la récupération du client.", error: error.message });
  }
};
