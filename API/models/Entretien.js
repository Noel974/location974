const mongoose = require('mongoose');

const entretienSchema = new mongoose.Schema({
    idEntretien: { type: String, required: true, unique: true }, // Ajout d'un identifiant unique
    idVehicule: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'typeVehicule' }, // Référence dynamique
    typeVehicule: { type: String, enum: ['voiture', 'moto'], required: true }, // Indique si l’entretien concerne une voiture ou une moto
    typeEntretien: { type: String, enum: ['vidange', 'freins', 'pneus', 'autre'], required: true },
    dateEntretien: { type: Date, required: true },
    coût: { type: Number, required: true },
    commentaire: { type: String, maxlength: 500 }
}, { timestamps: true });

module.exports = mongoose.model('Entretien', entretienSchema);
