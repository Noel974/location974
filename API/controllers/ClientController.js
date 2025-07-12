const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/config-cloudinary');
const { v4: uuidv4 } = require('uuid');

// ✅ Inscription client
exports.registerClient = async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    if (!nom || !prenom || !email || !motDePasse) {
      return res.status(400).json({ message: "Tous les champs requis doivent être fournis." });
    }

    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const client = await Client.create({
      uuid: uuidv4(),
      nom,
      prenom,
      email,
      motDePasse: hashedPassword,
    });

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

    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: client._id, role: 'client' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

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

// ✅ Récupération profil client
exports.getClientProfile = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id).select('-motDePasse');
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    res.status(200).json({ client });

  } catch (error) {
    console.error('🔥 Erreur dans getClientProfile :', error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

// ✅ Mise à jour du profil client
exports.updateClientProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updateData = {};

    const allowedFields = ['nom', 'prenom', 'email', 'motDePasse', 'telephone', 'adresse'];

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    }

    // Hash du mot de passe si fourni
    if (updateData.motDePasse) {
      updateData.motDePasse = await bcrypt.hash(updateData.motDePasse, 10);
    }

    // 📸 Gestion photoProfil
    if (req.files && req.files.photoProfil && req.files.photoProfil.length > 0) {
      updateData.photoUrl = req.files.photoProfil[0].path;
    }

    // 🧾 Gestion documentIdentite
    if (req.files && req.files.documentIdentite && req.files.documentIdentite.length > 0) {
      if (!updateData.verificationIdentite) updateData.verificationIdentite = {};
      updateData.verificationIdentite.documentUrl = req.files.documentIdentite[0].path;
    }

    // Autres champs de verificationIdentite
    if (updates.verificationIdentite) {
      if (!updateData.verificationIdentite) updateData.verificationIdentite = {};
      const { documentType, statut } = updates.verificationIdentite;
      if (documentType !== undefined) updateData.verificationIdentite.documentType = documentType;
      if (statut !== undefined) updateData.verificationIdentite.statut = statut;
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    ).select('-motDePasse');

    if (!updatedClient) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    res.status(200).json({
      message: "Profil mis à jour avec succès.",
      client: updatedClient
    });

  } catch (error) {
    console.error('🔥 Erreur dans updateClientProfile :', error);
    res.status(500).json({ message: "Erreur lors de la mise à jour.", error: error.message });
  }
};

// 🔧 Extraire le public_id de l’URL Cloudinary
const extractPublicId = (url) => {
  const segments = url.split('/');
  const filename = segments[segments.length - 1]; // photo-123456.jpg
  return `location-client/${filename.split('.')[0]}`; // location-client/photo-123456
};

// ✅ Suppression du compte client
exports.deleteClientAccount = async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    const urlsToDelete = [];
    if (client.photoUrl) urlsToDelete.push(client.photoUrl);
    if (client.verificationIdentite?.documentUrl) urlsToDelete.push(client.verificationIdentite.documentUrl);

    for (const url of urlsToDelete) {
      const publicId = extractPublicId(url);
      await cloudinary.uploader.destroy(publicId);
    }

    await Client.findByIdAndDelete(req.user.id);

    res.status(200).json({ message: "Compte client et fichiers supprimés avec succès." });

  } catch (error) {
    console.error('🔥 Erreur deleteClientAccount :', error);
    res.status(500).json({ message: "Erreur lors de la suppression du compte.", error: error.message });
  }
};
