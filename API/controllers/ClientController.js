const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// ✅ Inscription client
exports.registerClient = async (req, res) => {
  try {
    console.log('➡️ Requête reçue sur /client/register');
    console.log('Corps reçu :', req.body);

    const { nom, prenom, email, motDePasse } = req.body;

    // Vérification des champs requis
    if (!nom || !prenom || !email || !motDePasse) {
      return res.status(400).json({ message: "Tous les champs requis doivent être fournis." });
    }

    // Vérification de l'unicité de l'email
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Création du client
    const client = await Client.create({
      uuid: uuidv4(),
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
    });

    console.log('✅ Client créé avec succès :', client._id);

    // Réponse
    res.status(201).json({
      message: "Inscription réussie !",
      client: {
        id: client._id,
        uuid: client.uuid,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email
      }
    });

  } catch (error) {
    console.error('🔥 Erreur dans registerClient :', error);
    res.status(500).json({ message: "Erreur lors de l'inscription.", error: error.message });
  }
};



// ✅ Connexion client
exports.loginClient = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    // Recherche du client
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // Génération du token
    const token = jwt.sign(
      { id: client._id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Réponse
    res.status(200).json({
      message: "Connexion réussie !",
      token,
      client: {
        id: client._id,
        uuid: client.uuid,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email,
      }
    });

  } catch (error) {
    console.error('🔥 Erreur dans loginClient :', error);
    res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
  }
};



// ✅ Récupérer profil client (requiert auth middleware qui met req.user)
exports.getClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id).select('-motDePasse');

    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    res.status(200).json({
      client: {
        id: client._id,
        uuid: client.uuid,
        nom: client.nom,
        prenom: client.prenom,
        email: client.email
      }
    });

  } catch (error) {
    console.error('🔥 Erreur dans getClientProfile :', error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};
