const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'vehiculeType'
  },
  vehiculeType: {
    type: String,
    required: true,
    enum: ['Voiture', 'Moto']
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
   prixTotal: {
    type: Number,
    required: true,
    min: 0
  },
  statut: {
    type: String,
    enum: ['confirmée', 'annulée', 'terminée'],
    default: 'confirmée'
  },
  dateReservation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
