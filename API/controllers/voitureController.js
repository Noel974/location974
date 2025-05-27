const Voiture = require('../models/Voiture');
const mongoose = require("mongoose");

// Créer une voiture avec upload de fichiers
exports.createVoiture = async (req, res) => {
  try {
    console.log("📥 Requête reçue:", req.body);
    console.log("📷 Fichiers reçus:", req.files);

    const { marque, modele, prixParJour, carburant, boiteVitesse, description } = req.body;

    // Vérification des fichiers
    const photoPrincipale = req.files?.photoPrincipale?.[0];
    const autresPhotos = req.files?.autresPhotos || [];

    if (!photoPrincipale || autresPhotos.length !== 3) {
      console.error("🚨 Erreur: Nombre d'images incorrect !");
      return res.status(400).json({ message: 'Une photo principale et 3 autres photos sont requises.' });
    }

    // Génération d'un idVoiture unique
    const idVoiture = req.body.idVoiture || new mongoose.Types.ObjectId().toString();
    console.log("🆔 ID généré pour la voiture:", idVoiture);

    // Récupération des URLs Cloudinary
    const imageUrls = [
      photoPrincipale.path, // Cloudinary fournit une URL accessible via .path
      ...autresPhotos.map(photo => photo.path)
    ];

    console.log("🖼️ URLs des images Cloudinary:", imageUrls);

    // Création de la voiture
    const voiture = await Voiture.create({
      idVoiture,
      marque,
      modele,
      prixParJour: Number(prixParJour),
      carburant,
      boiteVitesse,
      description,
      imageUrls
    });

    console.log("✅ Voiture créée avec succès:", voiture);
    res.status(201).json(voiture);

  } catch (error) {
    console.error("🚨 Erreur lors de la création de la voiture:", error.message);
    res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
  }
};


// Obtenir toutes les voitures avec pagination
exports.getAllVoitures = async (req, res) => {
    try {
        console.log("🔍 Récupération des voitures - Page:", req.query.page, "Limite:", req.query.limit);
        const { page = 1, limit = 10 } = req.query;
        const voitures = await Voiture.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        console.log("🚗 Voitures récupérées:", voitures.length);
        res.status(200).json(voitures);

    } catch (error) {
        console.error("🚨 Erreur récupération voitures:", error.message);
        res.status(500).json({ message: "Erreur lors de la récupération des voitures.", error: error.message });
    }
};

// Obtenir une voiture par ID
exports.getVoitureById = async (req, res) => {
    try {
        console.log("🆔 Récupération voiture ID:", req.params.id);

        const voiture = await Voiture.findById(req.params.id);
        if (!voiture) {
            console.warn("⚠️ Voiture non trouvée !");
            return res.status(404).json({ message: "Voiture non trouvée." });
        }

        console.log("✅ Voiture trouvée:", voiture);
                console.log("🔍 URL de l'image :", voiture.imageUrls[0]);
        res.status(200).json(voiture);

    } catch (error) {
        console.error("🚨 Erreur récupération voiture:", error.message);
        res.status(500).json({ message: "Erreur lors de la récupération de la voiture.", error: error.message });
    }
};

// Mise à jour d'une voiture
exports.updateVoiture = async (req, res) => {
    try {
        console.log("🛠️ Mise à jour voiture ID:", req.params.id);
        console.log("📩 Données reçues pour mise à jour:", req.body);

        const voiture = await Voiture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voiture) {
            console.warn("⚠️ Voiture non trouvée pour mise à jour !");
            return res.status(404).json({ message: "Voiture non trouvée." });
        }

        console.log("✅ Voiture mise à jour:", voiture);
        res.status(200).json(voiture);

    } catch (error) {
        console.error("🚨 Erreur mise à jour voiture:", error.message);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la voiture.", error: error.message });
    }
};

// Supprimer une voiture
exports.deleteVoiture = async (req, res) => {
    try {
        console.log("🗑️ Suppression voiture ID:", req.params.id);
        const voiture = await Voiture.findByIdAndDelete(req.params.id);
        if (!voiture) {
            console.warn("⚠️ Voiture non trouvée pour suppression !");
            return res.status(404).json({ message: "Voiture non trouvée." });
        }

        console.log("✅ Voiture supprimée avec succès !");
        res.status(204).send(); // Aucun contenu retourné

    } catch (error) {
        console.error("🚨 Erreur suppression voiture:", error.message);
        res.status(500).json({ message: "Erreur lors de la suppression de la voiture.", error: error.message });
    }
};
