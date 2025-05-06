const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  idEmploye: { type: String, unique: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  posteOccupe: { type: String, required: true },
  roles: { type: [String], enum: ['employé', 'admin'], default: ['employé'] }, // Peut être employé ou admin
  dateEmbauche: { type: Date, default: Date.now },
  statutCompte: { type: String, enum: ['actif', 'suspendu'], default: 'actif' }
}, { timestamps: true });

module.exports = mongoose.model('Employe', employeSchema);
