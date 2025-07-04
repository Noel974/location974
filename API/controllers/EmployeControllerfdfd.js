const Employe = require('../models/Employe');

// Création d'un employé (admin uniquement)
exports.createEmploye = async (req, res) => {
    try {
        const { nom, prenom, email, motDePasse, posteOccupe } = req.body;

        if (!nom || !prenom || !email || !motDePasse || !posteOccupe) {
            return res.status(400).json({ message: "Tous les champs requis doivent être fournis." });
        }

        const employe = await Employe.create({ ...req.body, roles: ['employé'] }); // Par défaut, il commence en tant qu'employé
        res.status(201).json(employe);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'employé.", error: error.message });
    }
};

// Récupérer tous les employés (admin uniquement)
exports.getAllEmployes = async (req, res) => {
    try {
        const employes = await Employe.find();
        res.status(200).json(employes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des employés.", error: error.message });
    }
};

// Promotion d'un employé en admin (admin uniquement)
exports.promoteEmploye = async (req, res) => {
    try {
        const employe = await Employe.findById(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé." });
        }

        employe.roles.push('admin'); // Ajout du rôle admin
        await employe.save();

        res.status(200).json({ message: "Employé promu au rang d'admin.", employe });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la promotion de l'employé.", error: error.message });
    }
};

// Suppression d'un employé (admin uniquement)
exports.deleteEmploye = async (req, res) => {
    try {
        const employe = await Employe.findByIdAndDelete(req.params.id);
        if (!employe) {
            return res.status(404).json({ message: "Employé non trouvé." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'employé.", error: error.message });
    }
};
