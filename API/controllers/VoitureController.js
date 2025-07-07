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
        // Convertir les valeurs en nombres
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        console.log("🔍 Récupération des voitures - Page:", page, "Limite:", limit);

        const voitures = await Voiture.find()
            .skip((page - 1) * limit)
            .limit(limit);

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

// Mettre à jour une voiture (admin uniquement)
exports.updateVoiture = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.files?.photoPrincipale?.[0]) {
      updates.photoPrincipale = req.files.photoPrincipale[0].path;
    }

    if (req.files?.autresPhotos) {
      updates.autresPhotos = req.files.autresPhotos.map((p) => p.path);
    }

    const voiture = await voiture.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!voiture) {
      return res.status(404).json({ message: "voiture non trouvée." });
    }

    res.status(200).json(voiture);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la voiture.",
        error: error.message,
      });
  }
};

// Supprimer une voiture
exports.deleteVoitureById = async (req, res) => {
  try {
    const voiture = await voiture.findById(req.params.id);
    if (!voiture) {
      return res.status(404).json({ message: "voiture non trouvée." });
    }

    // Suppression des images sur Cloudinary
    if (voiture.imageUrls && voiture.imageUrls.length > 0) {
      await Promise.all(
        voiture.imageUrls.map(async (imageUrl) => {
          const publicId = imageUrl.split("/").pop().split(".")[0]; // Extraction du public_id Cloudinary
          await cloudinary.uploader.destroy(publicId);
        })
      );
    }

    // Supprimer la voiture de la base de données
    await voiture.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "voiture et images supprimées avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la voiture et des images.",
      error: error.message,
    });
  }
};

