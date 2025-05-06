const supportSchema = new mongoose.Schema({
    idClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    typeDemande: { type: String, enum: ['réclamation', 'question', 'assistance'], required: true },
    message: { type: String, required: true, maxlength: 1000 },
    statut: { type: String, enum: ['en cours', 'résolu'], default: 'en cours' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Support', supportSchema);
  