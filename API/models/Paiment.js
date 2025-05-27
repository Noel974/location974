const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Pour générer une référence unique

const paiementSchema = new mongoose.Schema({
  idReservation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  montant: {
    type: Number,
    required: true,
    min: [0, 'Le montant ne peut pas être négatif.']
  },
  methodePaiement: {
    type: String,
    enum: ['stripe', 'carte bancaire', 'paypal', 'espèces'],
    required: true
  },
  statut: {
    type: String,
    enum: ['en attente', 'validé', 'échoué', 'remboursé'],
    default: 'en attente'
  },
  reference: {
    type: String,
    unique: true
  },
  stripePaymentIntentId: {
    type: String,
    default: null
  },
  datePaiement: {
    type: Date
  },
  remboursé: {
    type: Boolean,
    default: false
  },
  detailsTransaction: {
    type: Object,
    default: {}
  }
}, { timestamps: true });

// Générer une référence unique automatiquement
paiementSchema.pre('save', function (next) {
  if (!this.reference) {
    this.reference = 'PAY-' + uuidv4();
  }
  next();
});

module.exports = mongoose.model('Paiement', paiementSchema);
