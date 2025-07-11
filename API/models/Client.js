const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    uuid: {
    type: String,
    required: true,
    unique: true,
  },
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  motDePasse: { type: String, required: true }, // À hacher avant de stocker
  telephone: { type: String, trim: true },
  adresse: { type: String, trim: true },
  verificationIdentite: {
    documentType: { type: String, enum: ['CNI', 'passport', 'permis de conduire'], required: false },
    documentUrl: { type: String, required: false }, // URL du document d'identité
    statut: { type: String, enum: ['en attente', 'validé', 'rejeté'], default: 'en attente' }
  },
  historiqueLocations: [{
    idVehicule: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    note: { type: Number, min: 0, max: 5 },
    commentaire: { type: String, maxlength: 500 }
  }],
  systemeFidelite: {
    points: { type: Number, default: 0 },
    niveau: { type: String, enum: ['Bronze', 'Argent', 'Or', 'Platine'], default: 'Bronze' } // Statut fidélité
  },
  dateInscription: { type: Date, default: Date.now },
  statutCompte: { type: String, enum: ['actif', 'suspendu'], default: 'actif' }
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);