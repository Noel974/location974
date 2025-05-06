const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  posteOccupe: { type: String, required: true },
  dateExpiration: Date,
  employesAdmin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employe' }] // Liste des employés devenus admin
});

module.exports = mongoose.model('Admin', adminSchema);
