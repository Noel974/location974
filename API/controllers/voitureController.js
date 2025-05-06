const Voiture = require('../models/Voiture');

// Créer une voiture
exports.createVoiture = async (req, res) => {
    try {
        const { marque, modele, prixParJour, imageUrls, carburant, boiteVitesse } = req.body;

        if (!marque || !modele || !prixParJour || !imageUrls?.length || !carburant || !boiteVitesse) {
            return res.status(400).json({ message: "Tous les champs requis doivent être fournis, y compris les images." });
        }

        if (isNaN(prixParJour) || prixParJour <= 0) {
            return res.status(400).json({ message: "Le prix par jour doit être un nombre positif." });
        }

        const voiture = await Voiture.create(req.body);
        res.status(201).json(voiture);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la voiture.", error: error.message });
    }
};


// Obtenir toutes les voitures avec pagination
exports.getAllVoitures = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Récupération des paramètres de pagination
        const voitures = await Voiture.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json(voitures);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des voitures.", error: error.message });
    }
};

// Obtenir une voiture par ID
exports.getVoitureById = async (req, res) => {
    try {
        const voiture = await Voiture.findById(req.params.id);
        if (!voiture) {
            return res.status(404).json({ message: "Voiture non trouvée." });
        }
        res.status(200).json(voiture);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la voiture.", error: error.message });
    }
};

// Mise à jour d'une voiture (avec validation des images)
exports.updateVoiture = async (req, res) => {
    try {
        if (req.body.imageUrls && !Array.isArray(req.body.imageUrls)) {
            return res.status(400).json({ message: "Les images doivent être un tableau d'URLs." });
        }

        const voiture = await Voiture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!voiture) {
            return res.status(404).json({ message: "Voiture non trouvée." });
        }
        res.status(200).json(voiture);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la voiture.", error: error.message });
    }
};


// Supprimer une voiture
exports.deleteVoiture = async (req, res) => {
    try {
        const voiture = await Voiture.findByIdAndDelete(req.params.id);
        if (!voiture) {
            return res.status(404).json({ message: "Voiture non trouvée." });
        }
        res.status(204).send(); // Aucun contenu retourné
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la voiture.", error: error.message });
    }
};
