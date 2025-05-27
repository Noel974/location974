const mongoose = require('mongoose');

const penaliteSchema = new mongoose.Schema({
  idReservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  typePenalite: { 
    type: String, 
    enum: ['retard', 'dommage', 'infraction'], 
    required: true 
  },
  montant: { type: Number, required: true }, // Montant de la pénalité
  description: { type: String, maxlength: 500 }, // Détails de l'incident
  statut: { type: String, enum: ['en attente', 'payée'], default: 'en attente' },
  datePenalite: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Penalite', penaliteSchema);
