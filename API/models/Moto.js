const mongoose = require('mongoose');

const motoSchema = new mongoose.Schema({
    idMoto: { type: String, required: true },
    marque: { type: String, required: true, trim: true },
    modele: { type: String, required: true, trim: true },
    prixParJour: { type: Number, required: true, min: 0 },
    imageUrls: { type: [String], required: true },
    description: { type: String, maxlength: 500 },
    carburant: { type: String, enum: ['essence', 'diesel', 'électrique', 'hybride'], required: true },
    boiteVitesse: { type: String, enum: ['manuelle', 'automatique'], required: true },
    typeMoto: { type: String, enum: ['standard', 'sportive', 'touring', 'custom', 'hybride'] }, // Ajout du type
    kilometrage: { type: Number, min: 0 },
    dateMiseEnService: { type: Date },
    disponible: { type: Boolean, default: true },
    estLouee: { type: Boolean, default: false }
  }, { timestamps: true });
  

module.exports = mongoose.model('moto', motoSchema, 'motos');
