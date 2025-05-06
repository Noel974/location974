const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  idVehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Voiture', required: true }, // Ou 'Moto'
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  statut: { type: String, enum: ['en attente', 'confirmée', 'annulée', 'terminée'], default: 'en attente' },
  prixTotal: { type: Number, required: true },
  verificationAgence: {
    photosAvantDepart: { type: [String] }, // URLs des photos prises avant le départ
    etatVehicule: { type: String, enum: ['bon état', 'mauvais état'], required: true },
    commentaireClient: { type: String, maxlength: 500 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
