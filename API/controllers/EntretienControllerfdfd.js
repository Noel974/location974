const Entretien = require('../models/Entretien');
const Voiture = require('../models/Voiture');
const Moto = require('../models/Moto');

// Fonction utilitaire pour vérifier les rôles
const isAdmin = (req) => req.user && req.user.role === 'admin';

// Fonction utilitaire pour récupérer un véhicule selon le type
const getVehiculeById = async (typeVehicule, idVehicule) => {
    if (typeVehicule === 'voiture') {
        return await Voiture.findById(idVehicule);
    } else if (typeVehicule === 'moto') {
        return await Moto.findById(idVehicule);
    }
    return null;
};

// Ajouter un entretien
exports.createEntretien = async (req, res) => {
    try {
        const { idVehicule, typeVehicule, typeEntretien, dateEntretien, coût, commentaire } = req.body;

        if (!idVehicule || !typeVehicule || !typeEntretien || !dateEntretien || coût === undefined) {
            return res.status(400).json({ message: "Tous les champs requis doivent être remplis." });
        }

        const vehicule = await getVehiculeById(typeVehicule, idVehicule);
        if (!vehicule) {
            return res.status(404).json({ message: "Véhicule non trouvé" });
        }

        const idEntretien = `ENT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const entretien = new Entretien({
            idEntretien,
            idVehicule,
            typeVehicule,
            typeEntretien,
            dateEntretien,
            coût,
            commentaire
        });

        await entretien.save();
        return res.status(201).json(entretien);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Modifier un entretien
exports.updateEntretien = async (req, res) => {
    try {
        if (!isAdmin(req)) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const entretien = await Entretien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!entretien) {
            return res.status(404).json({ message: "Entretien non trouvé" });
        }

        return res.json(entretien);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Supprimer un entretien
exports.deleteEntretien = async (req, res) => {
    try {
        if (!isAdmin(req)) {
            return res.status(403).json({ message: "Accès interdit" });
        }

        const entretien = await Entretien.findByIdAndDelete(req.params.id);
        if (!entretien) {
            return res.status(404).json({ message: "Entretien non trouvé" });
        }

        return res.json({ message: "Entretien supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Lister tous les entretiens
exports.getEntretiens = async (req, res) => {
    try {
        const entretiens = await Entretien.find();
        return res.json(entretiens);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};