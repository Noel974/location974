const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    idVehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Voiture', required: true },
    note: { type: Number, min: 0, max: 5, required: true },
    commentaire: { type: String, maxlength: 500 }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Avis', avisSchema);
  