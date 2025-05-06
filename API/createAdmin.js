const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin'); // Vérifie bien le chemin du modèle

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("Admin1234", 10);

    const newAdmin = new Admin({
      nom: "Noël",
      prenom: "Antoine",
      email: "noelantoine974manu@gmail.com",
      motDePasse: hashedPassword,
      posteOccupe: "Administrateur"
    });

    await newAdmin.save();
    console.log("✅ Admin créé avec succès !");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Erreur lors de la connexion ou de la création :", err);
  });
