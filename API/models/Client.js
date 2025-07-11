const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  prenom: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    trim: true,
  },
  adresse: {
    type: String,
    trim: true,
  },
  verificationIdentite: {
    documentType: {
      type: String,
      enum: ['CNI', 'passport', 'permis de conduire'],
      default: null,
    },
    documentUrl: {
      type: String,
      default: null,
    },
    statut: {
      type: String,
      enum: ['en attente', 'validé', 'rejeté'],
      default: 'en attente',
    },
  },
  historiqueLocations: [
    {
      idVehicule: {
        type: String,
        required: true,
      },
      dateDebut: {
        type: Date,
        required: true,
      },
      dateFin: {
        type: Date,
        required: true,
      },
      note: {
        type: Number,
        min: 0,
        max: 5,
      },
      commentaire: {
        type: String,
        maxlength: 500,
        trim: true,
      },
    },
  ],
  systemeFidelite: {
    points: {
      type: Number,
      default: 0,
    },
    niveau: {
      type: String,
      enum: ['Bronze', 'Argent', 'Or', 'Platine'],
      default: 'Bronze',
    },
  },
  dateInscription: {
    type: Date,
    default: Date.now,
  },
  statutCompte: {
    type: String,
    enum: ['actif', 'suspendu'],
    default: 'actif',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Client', clientSchema);
