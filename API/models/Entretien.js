const entretienSchema = new mongoose.Schema({
    idVehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Voiture', required: true },
    typeEntretien: { type: String, enum: ['vidange', 'freins', 'pneus', 'autre'], required: true },
    dateEntretien: { type: Date, required: true },
    coût: { type: Number, required: true },
    commentaire: { type: String, maxlength: 500 }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Entretien', entretienSchema);
  