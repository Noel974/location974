const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
    idReservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    montant: { type: Number, required: true },
    methodePaiement: { type: String, enum: ['carte bancaire', 'paypal', 'espèces'], required: true },
    statut: { type: String, enum: ['en attente', 'validé', 'échoué'], default: 'en attente' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Paiement', paiementSchema);
  