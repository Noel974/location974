const Moto = require("../models/Moto");
const mongoose = require("mongoose");

// Créer une moto (admin uniquement)
exports.createMoto = async (req, res) => {
  try {
    const {
      marque,
      modele,
      prixParJour,
      carburant,
      boiteVitesse,
      typeMoto,
      description,
    } = req.body;

    // Vérification des fichiers
    const photoPrincipale = req.files?.photoPrincipale?.[0];
    const autresPhotos = req.files?.autresPhotos || [];

    if (!photoPrincipale || autresPhotos.length !== 3) {
      console.error("🚨 Erreur: Nombre d'images incorrect !");
      return res.status(400).json({ message: 'Une photo principale et 3 autres photos sont requises.' });
    }

    if (!photoPrincipale || autresPhotos.length !== 3) {
      return res
        .status(400)
        .json({
          message: "Une photo principale et 3 autres photos sont requises.",
        });
    }

    const idMoto = req.body.idMoto || new mongoose.Types.ObjectId().toString();
    // Récupération des URLs Cloudinary
    const imageUrls = [
      photoPrincipale.path, // Cloudinary fournit une URL accessible via .path
      ...autresPhotos.map(photo => photo.path)
    ];

    const moto = await Moto.create({
      idMoto,
      marque,
      modele,
      prixParJour: Number(prixParJour),
      carburant,
      boiteVitesse,
      typeMoto,
      description,
      imageUrls,
    });

    res.status(201).json(moto);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la création de la moto.",
        error: error.message,
      });
  }
};

// Obtenir toutes les motos
exports.getAllMotos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const motos = await Moto.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(motos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des motos.",
        error: error.message,
      });
  }
};

// Obtenir une moto par ID
exports.getMotoById = async (req, res) => {
  try {
    const moto = await Moto.findById(req.params.id);
    if (!moto) {
      return res.status(404).json({ message: "Moto non trouvée." });
    }
    res.status(200).json(moto);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération de la moto.",
        error: error.message,
      });
  }
};

// Mettre à jour une moto (admin uniquement)
exports.updateMoto = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.files?.photoPrincipale?.[0]) {
      updates.photoPrincipale = req.files.photoPrincipale[0].path;
    }

    if (req.files?.autresPhotos) {
      updates.autresPhotos = req.files.autresPhotos.map((p) => p.path);
    }

    const moto = await Moto.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!moto) {
      return res.status(404).json({ message: "Moto non trouvée." });
    }

    res.status(200).json(moto);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la moto.",
        error: error.message,
      });
  }
};

// Supprimer une moto (admin uniquement)
exports.deleteMotoById = async (req, res) => {
  try {
    const moto = await Moto.findById(req.params.id);
    if (!moto) {
      return res.status(404).json({ message: "Moto non trouvée." });
    }

    // Tu pourrais ici supprimer les images de Cloudinary si tu stockes les `public_id`

    await Moto.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de la moto.",
        error: error.message,
      });
  }
};
