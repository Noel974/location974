const Moto = require('../models/Moto');

// Créer une moto (admin uniquement)
exports.createMoto = async (req, res) => {
    try {
        const { marque, modele, prixParJour, imageUrls, carburant, boiteVitesse, typeMoto } = req.body;

        if (!marque || !modele || !prixParJour || !imageUrls?.length || !carburant || !boiteVitesse || !typeMoto) {
            return res.status(400).json({ message: "Tous les champs requis doivent être fournis, y compris les images et le type de moto." });
        }

        if (isNaN(prixParJour) || prixParJour <= 0) {
            return res.status(400).json({ message: "Le prix par jour doit être un nombre positif." });
        }

        const moto = await Moto.create(req.body);
        res.status(201).json(moto);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la moto.", error: error.message });
    }
};

// Obtenir toutes les motos (accessible à tous)
exports.getAllMotos = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const motos = await Moto.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json(motos);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des motos.", error: error.message });
    }
};

// Obtenir une moto par ID (accessible à tous)
exports.getMotoById = async (req, res) => {
    try {
        const moto = await Moto.findById(req.params.id);
        if (!moto) {
            return res.status(404).json({ message: "Moto non trouvée." });
        }
        res.status(200).json(moto);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la moto.", error: error.message });
    }
};

// Mettre à jour une moto (admin uniquement)
exports.updateMoto = async (req, res) => {
    try {
        if (req.body.imageUrls && !Array.isArray(req.body.imageUrls)) {
            return res.status(400).json({ message: "Les images doivent être un tableau d'URLs." });
        }

        const moto = await Moto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!moto) {
            return res.status(404).json({ message: "Moto non trouvée." });
        }
        res.status(200).json(moto);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la moto.", error: error.message });
    }
};

// Supprimer une moto (admin uniquement)
exports.deleteMoto = async (req, res) => {
    try {
        const moto = await Moto.findByIdAndDelete(req.params.id);
        if (!moto) {
            return res.status(404).json({ message: "Moto non trouvée." });
        }
        res.status(204).send(); // Aucun contenu retourné
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la moto.", error: error.message });
    }
};
