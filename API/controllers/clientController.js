const Client = require('../models/Client');

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
