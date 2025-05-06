const Employe = require('../models/Employe');

module.exports = async (req, res, next) => {
    try {
        const employe = await Employe.findById(req.user.id); // Supposant que l'ID utilisateur est dans `req.user`

        if (!employe || !employe.roles.includes('admin')) {
            return res.status(403).json({ message: "Accès refusé. Seuls les administrateurs peuvent modifier les véhicules." });
        }

        next(); // Continue si l'utilisateur est admin
    } catch (error) {
        res.status(500).json({ message: "Erreur de vérification des permissions.", error: error.message });
    }
};
