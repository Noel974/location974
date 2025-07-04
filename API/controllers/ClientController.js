const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // pour générer idClient

// Créer un compte client
exports.createClient = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      motDePasse,
      telephone,
      adresse,
      verificationIdentite
    } = req.body;

    // Vérifier s'il existe déjà un client avec cet email
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Un compte avec cet email existe déjà." });
    }

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(motDePasse, salt);

    // Créer un nouveau client
    const nouveauClient = new Client({
      idClient: uuidv4(), // générer un ID unique
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
      telephone,
      adresse,
      verificationIdentite: {
        documentType: verificationIdentite?.documentType,
        documentUrl: verificationIdentite?.documentUrl,
        statut: 'en attente'
      },
      systemeFidelite: {
        points: 0,
        niveau: 'Bronze'
      }
    });

    await nouveauClient.save();

    // Générer un token JWT
    const token = jwt.sign(
      { id: nouveauClient._id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "Compte client créé avec succès.",
      client: {
        id: nouveauClient._id,
        nom: nouveauClient.nom,
        prenom: nouveauClient.prenom,
        email: nouveauClient.email,
        telephone: nouveauClient.telephone,
        adresse: nouveauClient.adresse,
        statutCompte: nouveauClient.statutCompte
      },
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création du compte client.",
      error: error.message
    });
  }
};
// Connexion du client
exports.loginClient = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        // Vérifie si le client existe
        const client = await Client.findOne({ email });
        if (!client) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect." });
        }

        // Vérifie le mot de passe
        const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
        if (!isMatch) {
            return res.status(400).json({ message: "Email ou mot de passe incorrect." });
        }

        // Génère un token JWT
        const token = jwt.sign(
            { id: client._id, role: 'client' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            client: {
                id: client._id,
                nom: client.nom,
                prenom: client.prenom,
                email: client.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
    }
};


// Obtenir le profil du client (accessible au client lui-même)
exports.getClientProfile = async (req, res) => {
    try {
        const client = await Client.findById(req.user.id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du profil.", error: error.message });
    }
};

// Mettre à jour le profil du client (accessible au client lui-même)
exports.updateClientProfile = async (req, res) => {
    try {
        const updatedData = req.body;

        if (updatedData.email || updatedData.motDePasse) {
            return res.status(400).json({ message: "Modification de l'email ou du mot de passe non autorisée ici." });
        }

        const client = await Client.findByIdAndUpdate(req.user.id, updatedData, { new: true });
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du profil.", error: error.message });
    }
};

// Obtenir l'historique des locations d'un client
exports.getClientHistory = async (req, res) => {
    try {
        const client = await Client.findById(req.user.id).populate('historiqueLocations');
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        res.status(200).json(client.historiqueLocations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique.", error: error.message });
    }
};

// Supprimer un client (admin uniquement)
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du client.", error: error.message });
    }
};