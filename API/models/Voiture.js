const mongoose = require('mongoose');

const voitureSchema = new mongoose.Schema({
  idVoiture: { type: String, required: true },
  marque: { type: String, required: true, trim: true },
  modele: { type: String, required: true, trim: true },
  prixParJour: { type: Number, required: true, min: 0 },
  imageUrls: { type: [String], required: true }, // Photos de présentation
  notesVerification: { type: Number, min: 0, max: 5 }, // Note attribuée à l'état du véhicule
  description: { type: String, maxlength: 500 },
  carburant: { type: String, enum: ['essence', 'diesel', 'électrique', 'hybride'], required: true },
  boiteVitesse: { type: String, enum: ['manuelle', 'automatique'], required: true },
  kilometrage: { type: Number, min: 0 },
  dateMiseEnService: { type: Date },
  disponible: { type: Boolean, default: true },
  estLouee: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Voiture', voitureSchema, 'voitures');
