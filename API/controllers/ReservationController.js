const moment = require('moment');
const Voiture = require('../models/Voiture');
const Moto = require('../models/Moto');

exports.creerReservation = async (req, res) => {
  try {
    const { vehicule, vehiculeType, dateDebut, dateFin } = req.body;
    const clientId = req.user.id;

    const debut = moment(dateDebut);
    const fin = moment(dateFin);
    const nbJours = fin.diff(debut, 'days');

    if (nbJours <= 0) {
      return res.status(400).json({ message: 'Dates invalides.' });
    }

    // Récupérer le prix/jour selon le type
    let vehiculeData;
    if (vehiculeType === 'Voiture') {
      vehiculeData = await Voiture.findById(vehicule);
    } else if (vehiculeType === 'Moto') {
      vehiculeData = await Moto.findById(vehicule);
    } else {
      return res.status(400).json({ message: 'Type de véhicule inconnu.' });
    }

    if (!vehiculeData) {
      return res.status(404).json({ message: 'Véhicule introuvable.' });
    }

    const prixTotal = nbJours * vehiculeData.prixParJour;

    const nouvelleReservation = new Reservation({
      client: clientId,
      vehicule,
      vehiculeType,
      dateDebut,
      dateFin,
      prixTotal
    });

    await nouvelleReservation.save();

    res.status(201).json({
      message: 'Réservation créée avec succès',
      reservation: nouvelleReservation
    });
  } catch (error) {
    console.error('Erreur reservation :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
