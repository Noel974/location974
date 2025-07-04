const Client = require('../models/Client');

module.exports = async (req, res, next) => {
    try {
        const client = await Client.findById(req.user.id); // Supposant que l'ID utilisateur est dans `req.user`

        if (!client) {
            return res.status(403).json({ message: "Accès refusé. Seuls les clients peuvent effectuer cette action." });
        }

        next(); // Autorise la requête si l’utilisateur est bien un client
    } catch (error) {
        res.status(500).json({ message: "Erreur de vérification des permissions.", error: error.message });
    }
};
