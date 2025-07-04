const Avis = require('../models/Avis');

// Ajouter un avis (uniquement accessible aux clients)
exports.createAvis = async (req, res) => {
    try {
        const { note, commentaire, idVehicule } = req.body;

        if (!note || !idVehicule) {
            return res.status(400).json({ message: "Note et véhicule requis." });
        }

        if (note < 0 || note > 5) {
            return res.status(400).json({ message: "La note doit être entre 0 et 5." });
        }

        const avis = await Avis.create({
            idClient: req.user.id, // On récupère l'ID du client via le middleware d'authentification
            idVehicule,
            note,
            commentaire
        });

        res.status(201).json({ message: "Avis ajouté avec succès !", avis });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de l'avis.", error: error.message });
    }
};

// Récupérer les avis d'un véhicule
exports.getAvisByVehicule = async (req, res) => {
    try {
        const avis = await Avis.find({ idVehicule: req.params.idVehicule }).populate('idClient', 'nom prenom');
        res.status(200).json(avis);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des avis.", error: error.message });
    }
};

// Supprimer un avis (uniquement par l'auteur ou l'admin)
exports.deleteAvis = async (req, res) => {
    try {
        const avis = await Avis.findById(req.params.id);
        if (!avis) {
            return res.status(404).json({ message: "Avis non trouvé." });
        }

        // Vérification que seul le client qui a écrit l'avis ou l'admin peut le supprimer
        if (avis.idClient.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Suppression non autorisée." });
        }

        await Avis.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Avis supprimé." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'avis.", error: error.message });
    }
};
