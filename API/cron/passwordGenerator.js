const cron = require('node-cron');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const generatePassword = require('../utils/generatePassword');
const sendPasswordEmail = require('../utils/emailService');

cron.schedule('0 0 * * *', async () => {
  const admin = await Admin.findOne();
  if (admin) {
    const password = generatePassword();
    const hashed = await bcrypt.hash(password, 10);
    admin.motDePasse = hashed;
    admin.dateExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await admin.save();
    await sendPasswordEmail(admin.email, password);
    console.log("Mot de passe généré et envoyé à l'admin.");
  }
});
