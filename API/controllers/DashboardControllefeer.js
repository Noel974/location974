const Voiture = require("../models/Voiture");
const Moto = require("../models/Moto");
const Paiement = require("../models/Paiment");

exports.getStats = async (req, res) => {
  try {
    // Comptage des voitures et motos disponibles/louées
    const voituresDispo = await Voiture.countDocuments({ disponible: true });
    const voituresLouees = await Voiture.countDocuments({ estLouee: true });

    const motosDispo = await Moto.countDocuments({ disponible: true });
    const motosLouees = await Moto.countDocuments({ estLouee: true });

    // Calcul du chiffre d'affaires (total des paiements validés)
    const chiffreAffaire = await Paiement.aggregate([
      { $match: { statut: "validé" } }, // Filtrer uniquement les paiements validés
      { $group: { _id: null, total: { $sum: "$montant" } } } // Somme des paiements
    ]);

    const totalChiffreAffaire = chiffreAffaire.length ? chiffreAffaire[0].total : 0;

    res.json({ voituresDispo, voituresLouees, motosDispo, motosLouees, chiffreAffaire: totalChiffreAffaire });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques", error });
  }
};
